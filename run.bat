@echo off
cd /d %~dp0

echo =======================================
echo     Starting PlantCare AI System
echo =======================================
echo.

echo Starting FastAPI Backend (Port 8000)...
start "PlantCare Backend" cmd /k "cd ""Plant Disease\backend"" && python -m uvicorn main:app --port 8000"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo Starting Vite Frontend and Opening Browser...
cd PlantCare_UI
npm run dev -- --open