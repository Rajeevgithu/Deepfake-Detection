from deepface import DeepFace
import os
import numpy as np

def extract_features(path:os.PathLike):
    """
    Extract features from a folder of aligned images or a single image using DeepFace.
    
    Args:
        path (os.PathLike): Path to the folder containing the aligned images or a single image file

    Returns:
        return stack of features in a numpy array
    """
    features = []
    if os.path.isdir(path):
        for i in os.listdir(path):
            img_path = os.path.join(path, i)
            features.append(
                DeepFace.represent(
                    img_path,
                    model_name="Facenet512",
                    enforce_detection=False
                )[0]["embedding"]
            )
    elif os.path.isfile(path):
        features.append(
            DeepFace.represent(
                path,
                model_name="Facenet512",
                enforce_detection=False
            )[0]["embedding"]
        )
    else:
        raise ValueError(f"Path {path} is neither a file nor a directory")

    return np.stack(features)


