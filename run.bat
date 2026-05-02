@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo =======================================
echo     Starting PlantCare AI System
echo =======================================
echo.

:: --- Check for Python ---
python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    pause
    exit /b 1
)

:: --- Folder Validation ---
if not exist "core" (
    echo [ERROR] Could not find 'core' folder at: "%cd%\core"
    pause
    exit /b 1
)

:: --- Dependency Setup & Self-Healing ---
:: This calls the new robust PowerShell setup script
powershell -ExecutionPolicy Bypass -File "%~dp0setup_deps.ps1"
if %errorlevel% neq 0 (
    echo [ERROR] Dependency setup failed.
    pause
    exit /b 1
)
echo.

:: --- GPU Detection and PyTorch Installation ---
echo [INFO] Detecting GPU and checking CUDA status...
python -c "import torch; exit(0 if torch.cuda.is_available() else 1)" >nul 2>&1
set TORCH_CUDA_STATUS=!errorlevel!

if !TORCH_CUDA_STATUS! equ 0 (
    echo [INFO] CUDA is already active and ready. Skipping PyTorch installation.
) else (
    nvidia-smi >nul 2>&1
    if !errorlevel! equ 0 (
        echo [INFO] NVIDIA GPU detected but CUDA is not active. Installing PyTorch with CUDA support...
        python -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
    ) else (
        echo [INFO] No NVIDIA GPU detected. Ensuring standard PyTorch is installed...
        python -m pip install torch torchvision
    )
)

:: --- Install Other Requirements ---
echo [INFO] Checking other dependencies...
python -m pip install --upgrade pip
echo [INFO] Installing core requirements...
pip install -r requirements.txt

:: --- Special handling for AI dependencies ---
echo [INFO] Installing AI enhancement modules...
pip install facexlib gfpgan realesrgan --no-deps

:: --- CUDA Verification ---
echo [INFO] Verifying CUDA availability...
python -c "import torch; print('CUDA Available: ' + str(torch.cuda.is_available()))" | findstr "True" >nul
if !errorlevel! neq 0 (
    nvidia-smi >nul 2>&1
    if !errorlevel! equ 0 (
        echo [WARNING] GPU detected but CUDA is not active.
        echo [TIP] Restart your terminal or PC for the drivers to initialize.
    ) else (
        echo [INFO] Running in CPU mode.
    )
) else (
    echo [SUCCESS] CUDA is active and ready!
)

:: --- Backend Setup ---
echo.
echo [INFO] Starting FastAPI Backend (Port 8000)...
if not exist "core\backend\main.py" (
    echo [ERROR] Missing core\backend\main.py
    pause
    exit /b 1
)
start "PlantCare Backend" cmd /k "cd /d ""%~dp0core\backend"" && python -m uvicorn main:app --port 8000"

echo [INFO] Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul

:: --- Frontend Setup ---
echo [INFO] Starting Vite Frontend...
if not exist "frontend\package.json" (
    echo [ERROR] Missing frontend\package.json.
    pause
    exit /b 1
)

:: Always run install to ensure health (it's fast if already installed)
echo [INFO] Ensuring frontend dependencies are up to date...
cd frontend
call npm install
cd ..

echo [INFO] Launching UI...
:: Run frontend in a new window using the local project environment
start "PlantCare Frontend" cmd /k "cd /d ""%~dp0frontend"" && npm run dev -- --open"

echo.
echo =======================================
echo     PlantCare AI is now running!
echo =======================================
echo [INFO] UI: http://localhost:5173
echo [INFO] API: http://localhost:8000/docs
echo.
echo [IMPORTANT] CLOSE THIS WINDOW OR PRESS ANY KEY 
echo             TO STOP ALL BACKGROUND SERVICES.
echo =======================================
echo.

pause >nul

taskkill /F /FI "WINDOWTITLE eq PlantCare Backend*" /T >nul 2>&1
taskkill /F /IM python.exe /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq PlantCare Frontend*" /T >nul 2>&1

echo [SUCCESS] All services stopped.
timeout /t 2 >nul
exit