#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==========================================${NC}"
echo -e "${BLUE}Starting Floor Plan AI System (Linux/Mac)${NC}"
echo -e "${BLUE}==========================================${NC}"

# Function to kill processes on exit
cleanup() {
    echo -e "\n${BLUE}Shutting down services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT

# Check if directories exist
mkdir -p logs
mkdir -p data/uploads

# Start Backend
echo -e "${GREEN}Starting Backend Server...${NC}"
cd backend
# Check if virtual environment exists and activate it if so
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d "../venv" ]; then
    source ../venv/bin/activate
fi

# Run FastAPI app
# Using python -m uvicorn to ensure we use the python interpreter from the env
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend running (PID: $BACKEND_PID)"
cd ..

# Start Frontend
echo -e "${GREEN}Starting Frontend Server...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend running (PID: $FRONTEND_PID)"
cd ..

echo -e "\n${BLUE}==========================================${NC}"
echo -e "${GREEN}Application Started Successfully!${NC}"
echo -e "${BLUE}==========================================${NC}"
echo -e "Backend:  http://localhost:8000"
echo -e "Frontend: http://localhost:5173"
echo -e "API Docs: http://localhost:8000/docs"
echo -e ""
echo -e "Logs are being written to logs/backend.log and logs/frontend.log"
echo -e "Press Ctrl+C to stop both servers."

# Keep script running to maintain PIDs
wait
