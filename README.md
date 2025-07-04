# Deepfake-Detection

## Overview
Deepfake-Detection is a project designed to detect deepfake images and videos using state-of-the-art face recognition and feature extraction techniques. It leverages deep learning (via [DeepFace](https://github.com/serengil/deepface)) and computer vision to compare real and potentially fake media, providing similarity scores and deepfake likelihood.

## Features
- Detects deepfake images and videos
- Uses DeepFace with the Facenet512 model for feature extraction
- Supports both image and video input
- REST API built with Flask for backend processing
- React + Vite frontend for user interaction
- Calculates cosine and Euclidean similarity between real and fake media

## Project Structure

```
Deepfake-Detection/
│
├── Backend/           # Flask backend API
├── Frontend/          # React + Vite frontend
├── face_align.py      # Face alignment and detection utilities
├── feature_extraction.py # Feature extraction using DeepFace
├── main.py            # Main backend server (Flask)
├── requirements.txt   # Python dependencies
├── utils.py           # Video frame extraction utility
└── media_files/       # Temporary storage for uploaded media
```

## Installation

### Backend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Deepfake-Detection.git
   cd Deepfake-Detection
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   python main.py
   ```
   The backend will start on `http://localhost:8877`.

### Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173` (default Vite port).

## Usage

- **API Endpoint:**  
  `POST /detect`  
  Upload two files: `realMedia` (original) and `fakeMedia` (suspected deepfake).  
  The API returns similarity scores and a boolean indicating if the fake is likely a deepfake.

- **Example cURL:**
  ```bash
  curl -X POST http://localhost:8877/detect \
    -F "realMedia=@/path/to/real.jpg" \
    -F "fakeMedia=@/path/to/fake.jpg"
  ```

- **Frontend:**  
  Use the React-based UI in the `Frontend` directory to upload and compare media files visually.

## How it Works

1. **Frame Extraction:** For videos, frames are extracted at equal intervals.
2. **Face Alignment:** Faces are detected and aligned for consistency.
3. **Feature Extraction:** DeepFace (Facenet512) extracts embeddings from faces.
4. **Similarity Calculation:** Cosine and Euclidean similarity scores are computed between real and fake media.
5. **Result:** If the cosine similarity is below a threshold (e.g., 0.7), the media is flagged as a likely deepfake.

## Dependencies

**Backend:**
- opencv-python
- numpy
- pandas
- matplotlib
- Pillow
- deepface
- flask
- flask-cors

**Frontend:**
- React
- Vite
- TailwindCSS
- Axios
- (see `Frontend/package.json` for full list)

## Results

- The API returns similarity scores and a boolean flag for deepfake likelihood.
- (You can add screenshots or sample output here.)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

<<<<<<< HEAD
- [Your Name](https://github.com/yourusername)
=======
- [Your Name](https://github.com/yourusername)
>>>>>>> db5098e (Add homepage images for deployment and update .gitignore)
