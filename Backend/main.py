from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from deepface import DeepFace
from werkzeug.utils import secure_filename
import cv2
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS to allow your Vercel frontend and all origins for now
CORS(app, 
     origins="*", 
     methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"], 
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
     supports_credentials=True)

# Add manual CORS headers for additional compatibility
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Directory to save uploaded files
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cosine_similarity(vector1, vector2):
    dot_product = np.dot(vector1, vector2)
    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)
    return dot_product / (norm_vector1 * norm_vector2)

def convert_to_native_types(obj):
    if isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, np.bool_):
        return bool(obj)
    return obj

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "DeepFake Detection API is running",
        "endpoints": {
            "detect": "/detect (POST)",
            "health": "/health (GET)"
        }
    }), 200

@app.route('/detect', methods=['OPTIONS'])
def detect_options():
    return '', 200

@app.route('/detect', methods=['POST'])
def detect():
    if 'realMedia' not in request.files or 'fakeMedia' not in request.files:
        return jsonify({"message": "Both realMedia and fakeMedia files are required"}), 400

    real_media = request.files['realMedia']
    fake_media = request.files['fakeMedia']

    # Validate file types
    if not (allowed_file(real_media.filename) and allowed_file(fake_media.filename)):
        return jsonify({"message": "Only PNG and JPG files are allowed"}), 400

    try:
        # Secure the filenames
        real_filename = secure_filename(real_media.filename)
        fake_filename = secure_filename(fake_media.filename)
        
        real_media_path = os.path.join(UPLOAD_FOLDER, real_filename)
        fake_media_path = os.path.join(UPLOAD_FOLDER, fake_filename)

        # Save files
        real_media.save(real_media_path)
        fake_media.save(fake_media_path)

        # Verify images can be opened
        real_img = cv2.imread(real_media_path)
        fake_img = cv2.imread(fake_media_path)
        
        if real_img is None or fake_img is None:
            raise ValueError("Unable to read one or both images")

        # Get face embeddings with optimized settings for faster processing
        try:
            # Use VGG-Face model which is faster than Facenet512
            representation_real = DeepFace.represent(
                img_path=real_media_path, 
                model_name="VGG-Face",  # Faster model
                enforce_detection=False,
                detector_backend="opencv"
            )
            representation_fake = DeepFace.represent(
                img_path=fake_media_path, 
                model_name="VGG-Face",  # Faster model
                enforce_detection=False,
                detector_backend="opencv"
            )

            vector_real = representation_real[0]["embedding"]
            vector_fake = representation_fake[0]["embedding"]

            similarity_score = cosine_similarity(vector_real, vector_fake)
            
            return jsonify({
                "message": "Analysis completed successfully",
                "similarity_score": convert_to_native_types(similarity_score),
                "is_likely_deepfake": convert_to_native_types(similarity_score < 0.7)
            }), 200

        except Exception as e:
            logger.error(f"DeepFace processing error: {str(e)}")
            return jsonify({
                "error": "Face analysis failed",
                "message": "Unable to process images. Please ensure images contain clear faces and try again.",
                "details": str(e)
            }), 500

    except Exception as e:
        logger.error(f"General processing error: {str(e)}")
        return jsonify({
            "error": "Processing failed", 
            "message": str(e)
        }), 400

    finally:
        # Clean up files in finally block to ensure they're always removed
        for path in [real_media_path, fake_media_path]:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 8877))
    # Use production WSGI server for Render
    app.run(host='0.0.0.0', port=port, debug=False, threaded=True)