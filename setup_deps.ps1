# PlantCare AI - Dependency Setup Script
# This script handles submodules, local libraries, and AI model weights.

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   PlantCare AI Dependency Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# --- 1. Real-ESRGAN Check ---
$esrPath = Join-Path $projectRoot "Real-ESRGAN"
if (!(Test-Path "$esrPath\realesrgan")) {
    Write-Host "[INFO] Real-ESRGAN is missing or empty. Restoring..." -ForegroundColor Yellow
    if (Test-Path $esrPath) { Remove-Item -Recurse -Force $esrPath }
    
    # Try Git first
    Write-Host "[INFO] Attempting Git Clone..."
    git clone https://github.com/xinntao/Real-ESRGAN.git $esrPath --quiet
    
    if (!(Test-Path "$esrPath\realesrgan")) {
        Write-Host "[INFO] Git failed. Downloading ZIP from GitHub..." -ForegroundColor Yellow
        $zipUrl = "https://github.com/xinntao/Real-ESRGAN/archive/refs/heads/master.zip"
        $zipFile = Join-Path $projectRoot "realesr_temp.zip"
        $tempDir = Join-Path $projectRoot "realesr_temp_dir"
        
        Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile
        Expand-Archive -Path $zipFile -DestinationPath $tempDir -Force
        
        $extractedFolder = Get-ChildItem $tempDir | Select-Object -First 1
        Move-Item -Path "$($extractedFolder.FullName)\*" -Destination $esrPath -Force
        
        Remove-Item $zipFile, $tempDir -Recurse -Force
    }
}
if (Test-Path "$esrPath\realesrgan") { Write-Host "[SUCCESS] Real-ESRGAN is ready." -ForegroundColor Green }

# --- 2. basicsr Check ---
$bsrPath = Join-Path $projectRoot "core\basicsr"
if (!(Test-Path $bsrPath)) {
    Write-Host "[INFO] Local basicsr library is missing. Restoring..." -ForegroundColor Yellow
    
    # Try Git Checkout first
    Write-Host "[INFO] Attempting Git Restore..."
    git checkout core/basicsr 2>$null
    
    if (!(Test-Path $bsrPath)) {
        Write-Host "[INFO] Git failed. Downloading basicsr from GitHub..." -ForegroundColor Yellow
        $zipUrl = "https://github.com/xinntao/BasicSR/archive/refs/heads/master.zip"
        $zipFile = Join-Path $projectRoot "bsr_temp.zip"
        $tempDir = Join-Path $projectRoot "bsr_temp_dir"
        
        Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile
        Expand-Archive -Path $zipFile -DestinationPath $tempDir -Force
        
        $extractedFolder = Get-ChildItem $tempDir | Select-Object -First 1
        $srcFolder = Join-Path $extractedFolder.FullName "basicsr"
        New-Item -ItemType Directory -Path $bsrPath -Force | Out-Null
        Copy-Item -Path "$srcFolder\*" -Destination $bsrPath -Recurse -Force
        
        Remove-Item $zipFile, $tempDir -Recurse -Force
    }
}

# Always ensure version.py exists (Crucial for Python 3.13)
$versionFile = Join-Path $bsrPath "version.py"
$versionContent = @"
# GENERATED VERSION FILE
__version__ = '1.4.2'
__gitsha__ = 'unknown'
version_info = (1, 4, 2)
"@
$versionContent | Out-File -FilePath $versionFile -Encoding ascii -Force

if (Test-Path $bsrPath) { Write-Host "[SUCCESS] Local basicsr is ready." -ForegroundColor Green }

# --- 3. Model Weights Check ---
$weightPath = Join-Path $projectRoot "Real-ESRGAN\weights\RealESRGAN_x4plus.pth"
if (!(Test-Path $weightPath)) {
    Write-Host "[INFO] Real-ESRGAN weights are missing. Downloading (60MB)..." -ForegroundColor Yellow
    $weightUrl = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth"
    $weightDir = [System.IO.Path]::GetDirectoryName($weightPath)
    if (!(Test-Path $weightDir)) { New-Item -ItemType Directory -Path $weightDir -Force | Out-Null }
    Invoke-WebRequest -Uri $weightUrl -OutFile $weightPath
}
if (Test-Path $weightPath) { Write-Host "[SUCCESS] Model weights are ready." -ForegroundColor Green }

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
