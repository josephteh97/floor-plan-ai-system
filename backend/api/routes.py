from fastapi import APIRouter, UploadFile, File, HTTPException
from services.ai_service import analyze_floor_plan
from services.image_processor import process_image
from services.model_generator import generate_3d_model, export_to_obj
from utils.file_handler import save_upload_file
import os

router = APIRouter()

@router.post("/analyze", method="post")
async def analyze_floor_plan_endpoint(file: UploadFile = File(...)):
    """
    Analyze uploaded floor plan image and generate 3D model
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(400, "File must be an image")
        
        # Save uploaded file
        file_path = await save_upload_file(file)
        
        # Process image
        # processed_image = await process_image(file_path) # Optional pre-processing
        
        # Analyze with AI
        analysis = await analyze_floor_plan(file_path)
        
        # Generate 3D Model
        model_3d = generate_3d_model(analysis)
        
        # Generate OBJ (optional, could be a separate endpoint)
        obj_data = export_to_obj(model_3d)
        
        return {
            "success": True,
            "analysis": analysis,
            "model_3d": model_3d,
            "obj_data": obj_data,
            "file_path": file_path
        }
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(500, f"Analysis failed: {str(e)}")

@router.get("/status/{task_id}")
async def get_status(task_id: str):
    """
    Get processing status
    """
    # Implement task status tracking
    return {"task_id": task_id, "status": "processing"}
