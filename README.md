# 🌿 PlantCare AI - Disease Detection System

## Overview

PlantCare AI is an advanced, full-stack plant disease detection system powered by artificial intelligence and computer vision. It leverages an optimized **YOLOv11** neural network for disease classification across an expansive knowledge base, and **Real-ESRGAN** for optional AI image enhancement to guarantee the highest detection accuracy even on poor-quality images.

The project features a high-performance **FastAPI** Python backend and a beautiful, modern **React (Vite) + Tailwind CSS** interactive frontend.

### Key Features

- **Massive Knowledge Base**: Identifies 38 plant classifications (Healthy & Diseased) across 14 commercial plant types.
- **AI Image Enhancement**: Optional Real-ESRGAN 4x upscaling module to refine blurry input images before analysis.
- **Instant Analysis**: High-speed REST API backend providing real-time diagnostics and confidence scores.
- **Expert Treatment Plans**: Categorized, step-by-step recommendations (Chemical, Organic, Manual) for each specific disease.
- **Modern UI/UX**: Stunning frontend with drag-and-drop file uploading, dynamic animations, and an interactive enhancement comparison slider.

---

## 📦 Project Structure

```text
PlantCare-AI/
├── core/                     # Core logic, dataset, and models
│   ├── backend/              # FastAPI server (main.py, disease_data.py)
│   └── runs/                 # YOLO weights and training artifacts
├── frontend/                 # React + Vite + Tailwind CSS Frontend
├── Real-ESRGAN/              # Image enhancement submodule
├── requirements.txt          # Combined Python dependencies
├── run.bat                   # 1-Click Launch & Auto-Setup Script
└── setup_deps.ps1            # Automated dependency management
```

---

## 🚀 Quick Start (Windows)

The system is designed for a **1-Click Launch** on Windows, handling all dependencies automatically.

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- **NVIDIA GPU** (Optional, but recommended for faster AI enhancement)

### Automated Launch
Simply double-click **`run.bat`** in the root directory.

The script will automatically:
1. Detect your hardware (GPU vs CPU).
2. Install the correct version of **PyTorch** if needed.
3. Install all Python and Node.js dependencies.
4. Verify and download AI model weights if missing.
5. Start the Backend (Port 8000) and Frontend (Port 5173).
6. Open the application in your browser.

---

## 🛠️ Manual Launch (Linux/macOS)

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   cd frontend && npm install && cd ..
   ```

2. **Run Backend**:
   ```bash
   cd core/backend
   python -m uvicorn main:app --port 8000
   ```

3. **Run Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 💻 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, TanStack Router
- **Backend**: FastAPI, Uvicorn, Python-Multipart
- **Computer Vision**: Ultralytics (YOLOv11m), OpenCV, PyTorch, Pillow
- **Image Enhancement**: Real-ESRGAN, BasicSR, GFPGAN

---

## 🧪 Supported Plants (14 Types)

The AI model covers comprehensive health and disease tracking for the following commercial plants:
- Apple
- Blueberry
- Cherry
- Corn (Maize)
- Grape
- Orange
- Peach
- Pepper (Bell)
- Potato
- Raspberry
- Soybean
- Squash
- Strawberry
- Tomato 

---

## 🛠️ Troubleshooting

### Ports Already in Use
If Vite or FastAPI fails to start because port `5173` or `8000` is in use, terminate any existing Python/Node background processes via Task Manager or update the respective host ports in `run.bat`.

### GPU Detection
If you have an NVIDIA GPU but the system runs in CPU mode, ensure you have the latest NVIDIA drivers installed. The `run.bat` script will attempt to install the CUDA-enabled version of PyTorch automatically.

---

## 📧 Support & Contact

For issues, questions, or support, please contact the authors:

### Authors

**Divyesh Hari**
- 📧 Email: divyesh02208@gmail.com
- 💻 GitHub: [DIVYESH-HARI](https://github.com/DIVYESH-HARI)
- 🛠️ LinkedIn: [DIVYESH HARI](https://www.linkedin.com/in/divyesh-hari-b65877334)

**Vijaya Karthick**
- 📧 Email: vkr3056@gmail.com
- 📸 Instagram: [@karthickxviii](https://instagram.com/karthickxviii)
- 💻 GitHub: [KARTHICK-3056](https://github.com/KARTHICK-3056)
- 🛠️ LinkedIn: [VIJAYA KARTHICK](https://www.linkedin.com/in/vijaya-karthick-raja-u-m-9286b22a5/)

---

## 🙏 Acknowledgments

- **Ultralytics**: For the cutting-edge YOLOv11 framework.
- **Xintao Wang**: For the incredible Real-ESRGAN research.
- **FastAPI / React**: For the powerful full-stack architecture.
