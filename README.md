# Floor Plan AI Processing System

AI-powered floor plan analysis and 3D model generation for construction industry.

## Prerequisites

- Ubuntu 20.04 or later
- Conda (Miniconda or Anaconda)
- Git

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd floor-plan-ai
```

2. Run setup:
```bash
chmod +x setup.sh
./setup.sh
```

3. Configure environment:
```bash
nano .env
# Add your ANTHROPIC_API_KEY
```

## Usage

Start the application:
```bash
./run.sh
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

Stop the application:
```bash
./stop.sh
```

## Project Structure

- `backend/` - Python FastAPI backend
- `frontend/` - React frontend
- `data/` - Upload and output storage
- `logs/` - Application logs

## Development

Activate conda environment:
```bash
conda activate floorplan-ai
```

View logs:
```bash
tail -f logs/backend.log
tail -f logs/frontend.log
```

## Troubleshooting

If conda command not found:
```bash
source ~/miniconda3/etc/profile.d/conda.sh
# or
source ~/anaconda3/etc/profile.d/conda.sh
```

## License

Proprietary - MCC Engineering (Singapore) Pte Ltd