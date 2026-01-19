@echo off
echo ==========================================
echo Starting Floor Plan AI System (Windows)
echo ==========================================

REM Check if logs directory exists
if not exist "logs" mkdir logs
if not exist "data\uploads" mkdir data\uploads

echo Starting Backend Server...
cd backend
start "FloorPlanAI Backend" python app.py
cd ..

echo Starting Frontend Server...
cd frontend
start "FloorPlanAI Frontend" npm run dev
cd ..

echo.
echo ==========================================
echo Application Started!
echo ==========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Logs are being written to console windows.
echo Close the new windows to stop the servers.
pause
