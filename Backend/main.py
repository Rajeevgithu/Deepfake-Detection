from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
from deepface import DeepFace
from werkzeug.utils import secure_filename
import cv2
import logging
import gc
from PIL import Image

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

def optimize_image_for_memory(image_path, max_size=512):
    """
    Optimize image to reduce memory usage by resizing and compressing
    """
    try:
        # Open image with PIL
        with Image.open(image_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if image is too large
            if max(img.size) > max_size:
                img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
            # Save optimized image
            optimized_path = image_path.replace('.', '_optimized.')
            img.save(optimized_path, 'JPEG', quality=85, optimize=True)
            
            return optimized_path
    except Exception as e:
        logger.warning(f"Image optimization failed: {str(e)}")
        return image_path

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
        "status": "healthy",
        "endpoints": {
            "detect": "/detect (POST)",
            "health": "/health (GET)"
        }
    }), 200

@app.route('/health', methods=['GET'])
def health():
    import psutil
    memory_info = psutil.virtual_memory()
    return jsonify({
        "status": "healthy",
        "message": "DeepFake Detection API is operational",
        "timestamp": str(pd.Timestamp.now()),
        "memory_usage": {
            "percent": memory_info.percent,
            "available_mb": round(memory_info.available / 1024 / 1024, 2),
            "used_mb": round(memory_info.used / 1024 / 1024, 2)
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

        # Optimize images for memory efficiency
        logger.info("Optimizing images for memory efficiency...")
        real_optimized_path = optimize_image_for_memory(real_media_path, max_size=512)
        fake_optimized_path = optimize_image_for_memory(fake_media_path, max_size=512)

        # Verify images can be opened
        real_img = cv2.imread(real_optimized_path)
        fake_img = cv2.imread(fake_optimized_path)
        
        if real_img is None or fake_img is None:
            raise ValueError("Unable to read one or both images")

        # Get face embeddings with proper face detection
        try:
            logger.info("Starting face detection and feature extraction...")
            
            # First, verify faces can be detected using optimized images
            try:
                # Test face detection on both optimized images
                from deepface import DeepFace
                real_faces = DeepFace.extract_faces(real_optimized_path, detector_backend="opencv")
                fake_faces = DeepFace.extract_faces(fake_optimized_path, detector_backend="opencv")
                
                if len(real_faces) == 0:
                    raise ValueError("No face detected in the real image. Please ensure the image contains a clear, visible face.")
                if len(fake_faces) == 0:
                    raise ValueError("No face detected in the suspected deepfake image. Please ensure the image contains a clear, visible face.")
                
                logger.info(f"Detected {len(real_faces)} face(s) in real image, {len(fake_faces)} face(s) in fake image")
                
                # Clear face arrays from memory
                del real_faces, fake_faces
                gc.collect()
                
            except Exception as face_error:
                logger.error(f"Face detection error: {str(face_error)}")
                return jsonify({
                    "error": "Face detection failed",
                    "message": str(face_error),
                    "similarity_score": 0,
                    "is_likely_deepfake": False
                }), 400

            # Use VGG-Face for better memory efficiency (smaller model than Facenet512)
            representation_real = DeepFace.represent(
                img_path=real_optimized_path, 
                model_name="VGG-Face",  # More memory efficient model
                enforce_detection=True,    # Strict face detection
                detector_backend="opencv"
            )
            representation_fake = DeepFace.represent(
                img_path=fake_optimized_path, 
                model_name="VGG-Face",  # More memory efficient model
                enforce_detection=True,    # Strict face detection
                detector_backend="opencv"
            )

            vector_real = representation_real[0]["embedding"]
            vector_fake = representation_fake[0]["embedding"]

            similarity_score = cosine_similarity(vector_real, vector_fake)
            
            # More conservative threshold for better accuracy
            is_deepfake = similarity_score < 0.8  # Higher threshold = more conservative
            
            logger.info(f"Similarity score: {similarity_score:.4f}, Is deepfake: {is_deepfake}")
            
            return jsonify({
                "message": "Analysis completed successfully",
                "similarity_score": convert_to_native_types(similarity_score),
                "is_likely_deepfake": convert_to_native_types(is_deepfake),
                "confidence": "high" if abs(similarity_score - 0.8) > 0.15 else "medium"
            }), 200

        except Exception as e:
            logger.error(f"DeepFace processing error: {str(e)}")
            return jsonify({
                "error": "Face analysis failed",
                "message": "Unable to process images. Please ensure images contain clear faces and try again.",
                "details": str(e),
                "similarity_score": 0,
                "is_likely_deepfake": False
            }), 500

    except Exception as e:
        logger.error(f"General processing error: {str(e)}")
        return jsonify({
            "error": "Processing failed", 
            "message": str(e)
        }), 400

    finally:
        # Clean up files and memory in finally block to ensure they're always removed
        cleanup_paths = [real_media_path, fake_media_path]
        
        # Add optimized file paths if they exist
        if 'real_optimized_path' in locals():
            cleanup_paths.append(real_optimized_path)
        if 'fake_optimized_path' in locals():
            cleanup_paths.append(fake_optimized_path)
        
        for path in cleanup_paths:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass
        
        # Clear variables from memory
        if 'real_img' in locals():
            del real_img
        if 'fake_img' in locals():
            del fake_img
        if 'representation_real' in locals():
            del representation_real
        if 'representation_fake' in locals():
            del representation_fake
        if 'vector_real' in locals():
            del vector_real
        if 'vector_fake' in locals():
            del vector_fake
        
        # Force garbage collection
        gc.collect()
        logger.info("Memory cleanup completed")

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 8877))
    # Use production WSGI server for Render
    app.run(host='0.0.0.0', port=port, debug=False, threaded=True)