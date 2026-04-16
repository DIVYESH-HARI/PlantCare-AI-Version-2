import io
import os
import sys
import base64
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image

# Add Real-ESRGAN path
real_esrgan_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Real-ESRGAN"))
sys.path.append(real_esrgan_path)
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

from disease_data import get_disease_info

# Initialize FastAPI app
app = FastAPI(title="PlantCare AI API", description="Plant Disease Detection API using YOLOv11m")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8080", "http://127.0.0.1:8080"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLO model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "runs", "classify", "plant_disease_cls", "yolo11m_38cls", "weights", "best.pt")

try:
    model = YOLO(MODEL_PATH)
    print(f"Successfully loaded YOLO model from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Load Real-ESRGAN upsampler
try:
    esrgan_model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
    esrgan_weights = os.path.join(real_esrgan_path, "weights", "RealESRGAN_x4plus.pth")
    upsampler = RealESRGANer(
        scale=4,
        model_path=esrgan_weights,
        model=esrgan_model,
        tile=0,
        tile_pad=10,
        pre_pad=0,
        half=False
    )
    print("Successfully loaded Real-ESRGAN upsampler")
except Exception as e:
    print(f"Error loading Real-ESRGAN: {e}")
    upsampler = None



@app.get("/health")
def health_check():
    """Endpoint for frontend to check if backend is online."""
    return {"status": "online", "model_loaded": model is not None, "upsampler_loaded": upsampler is not None}

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...), enhance: str = Form("false")):
    """
    Accepts an image file, runs YOLO object classification, and returns disease info.
    """
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded correctly.")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        enhanced_image_b64 = None
        
        # Apply Real-ESRGAN enhancement if requested
        is_enhance_requested = enhance.lower() == "true"
        if is_enhance_requested and upsampler:
            # Convert PIL image to OpenCV format (BGR)
            cv_img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            # Enhance
            output, _ = upsampler.enhance(cv_img, outscale=4)
            # Convert back to PIL Image (RGB) for YOLO
            image = Image.fromarray(cv2.cvtColor(output, cv2.COLOR_BGR2RGB))
            
            # Encode enhanced image to base64 to send back to frontend
            _, buffer = cv2.imencode('.jpg', output)
            enhanced_image_b64 = base64.b64encode(buffer).decode('utf-8')
        
        # Run inference on the (potentially enhanced) image
        results = model(image)
        
        # Extract classification info
        probs = results[0].probs
        
        # Top 1 class
        top1_index = probs.top1
        top1_conf = float(probs.top1conf)
        class_name = results[0].names[top1_index]
        
        # Top 5 classes (for the chart)
        top5 = []
        for i, conf in zip(probs.top5, probs.top5conf):
            idx = int(i)
            top5.append({
                "label": results[0].names[idx],
                "confidence": float(conf)
            })
            
        # Get enriched disease info from database
        disease_info = get_disease_info(class_name)
        
        response_data = {
            "success": True,
            "class_name": class_name,
            "confidence": top1_conf,
            "disease_info": disease_info,
            "top5": top5
        }
        
        if enhanced_image_b64:
            response_data["enhanced_image"] = f"data:image/jpeg;base64,{enhanced_image_b64}"
            
        return response_data
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
