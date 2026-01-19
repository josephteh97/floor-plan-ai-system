#!/bin/bash

echo "Stopping Floor Plan AI System..."

# Stop backend
if [ -f logs/backend.pid ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    kill $BACKEND_PID 2>/dev/null
    rm logs/backend.pid
    echo "Backend stopped (PID: $BACKEND_PID)"
fi

# Stop frontend
if [ -f logs/frontend.pid ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    kill $FRONTEND_PID 2>/dev/null
    rm logs/frontend.pid
    echo "Frontend stopped (PID: $FRONTEND_PID)"
fi

echo "Application stopped successfully!"