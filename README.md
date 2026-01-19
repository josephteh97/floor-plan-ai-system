# Floor Plan AI Processing System

AI-powered floor plan analysis and 3D model generation for the construction industry.

## Features

- **AI Vision Analysis**: 
  - **Qwen3-VL Integration**: For high-level spatial understanding and reasoning.
  - **YOLOv8**: For element detection (Doors, Windows, Furniture).
  - **PaddleOCR**: For reading dimensions and room labels.
  - **OpenCV**: Fallback geometric analysis.
- **3D Generation**: Converts 2D analysis into 3D models.
- **Interactive Viewer**: Web-based 3D visualization using Three.js.
- **Export**: Generates OBJ files for CAD integration.

## Prerequisites

- Python 3.10+
- Node.js 18+
- Git
- (Optional) CUDA for GPU acceleration

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd floor-plan-ai-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   *Note: For Qwen3-VL, you may need to install specific versions of transformers/torch compatible with your GPU.*

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

## Usage

### Windows
Double-click `run.bat` or run it from the command line.

### Linux/Mac
```bash
chmod +x run.sh
./run.sh
```

Access the application:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Architecture

1. **Upload**: User uploads 2D image.
2. **Analysis (`backend/services/ai_service.py`)**:
   - Image is processed by YOLO (detects objects) and OCR (reads text).
   - Qwen3-VL provides semantic understanding (room relationships).
3. **Generation (`backend/services/model_generator.py`)**:
   - 2D detections are extruded into 3D geometry.
4. **Visualization (`frontend/src/components/Viewer3D.jsx`)**:
   - React Three Fiber renders the 3D model in the browser.

## Customization

- **Models**: Place your trained YOLO weights in `backend/` and update `ai_service.py`.
- **Qwen3-VL**: Configure the model path in `ai_service.py` (`get_qwen_model`).

### Run the code
1. install backend dependencies
```bash
cd backend
pip install -r requirments.txt
```

2. Install Frontend dependencies
```bash
cd frontend
npm install
```

## License
Proprietary - MCC Engineering
