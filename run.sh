#!/bin/bash

echo "=========================================="
echo "Starting Floor Plan AI System"
echo "=========================================="

# Activate conda environment
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate floorplan-ai

# Start backend in background
echo "Starting backend server..."
cd backend
python app.py > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../logs/frontend.pid
cd ..

echo ""
echo "=========================================="
echo "Application Started Successfully!"
echo "=========================================="
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop: ./stop.sh"
echo "Logs: tail -f logs/backend.log logs/frontend.log"
echo ""