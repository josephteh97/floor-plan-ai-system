import aiofiles
import os
from datetime import datetime
from fastapi import UploadFile

async def save_upload_file(upload_file: UploadFile) -> str:
    """
    Save uploaded file to disk
    """
    upload_dir = os.getenv("UPLOAD_DIR", "data/uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{upload_file.filename}"
    file_path = os.path.join(upload_dir, filename)
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as f:
        content = await upload_file.read()
        await f.write(content)
    
    return file_path