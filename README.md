# 🌿 PlantCare AI - Disease Detection System - v2.0

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
├── Plant Disease/
│   └── backend/              # FastAPI server (main.py, disease_data.py)
├── PlantCare_UI/             # React + Vite Frontend
├── Real-ESRGAN/              # Image enhancement module
├── requirements.txt          # Python dependencies
├── run.bat                   # 1-Click Launch Script
└── README.md                 # This file
```

---

## 🚀 Installation & Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+** (for the React frontend)
- **NVIDIA GPU** (optional, recommended for heavy inference)

### Step 1: Install Python Dependencies (Backend)

Open a terminal in the root `PlantCare-AI` directory and install the required core packages:

```bash
pip install -r requirements.txt
```

### Step 2: Install Node Packages (Frontend)

Navigate to the frontend directory and install the web dependencies:

```bash
cd PlantCare_UI
npm install
cd ..
```

### Step 3: Setup Real-ESRGAN

Navigate to the enhancement module and install the internal hooks:

```bash
cd Real-ESRGAN
python setup.py develop
cd ..
```

### Step 4: 1-Click Launch!

For Windows users, simply double-click the included `run.bat` file in the root directory.

This script will automatically:
1. Start the FastAPI backend server on port `8000`.
2. Start the Vite React development server.
3. Automatically open the local web application in your default browser.

*(If you are on Linux/macOS, you can run the backend with `cd "Plant Disease/backend" && uvicorn main:app --port 8000` and the frontend with `cd PlantCare_UI && npm run dev`)*

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

### Issue 1: Import Error with `rgb_to_grayscale`
**Error**: `ImportError: cannot import name 'rgb_to_grayscale' from 'torchvision.transforms.functional_tensor'`
**Solution**: This is a known API change in `torchvision`. 
1. Navigate to your Python environment's site-packages: `...\Lib\site-packages\basicsr\data\degradations.py`
2. Change the import from `functional_tensor` to `functional`:
   ```python
   from torchvision.transforms.functional import rgb_to_grayscale
   ```

### Issue 2: Ports Already in Use
If Vite or FastAPI fails to start because port `8080` or `8000` is in use, terminate any existing Python/Node background processes via Task Manager or update the respective host ports in `run.bat`.

---

## 📧 Support & Contact

For issues, questions, or support, please contact the authors:

### Authors

**Divyesh Hari**
- 📧 Email: divyesh02208@gmail.com
- 💻 GitHub: [DIVYESH-HARI](https://github.com/DIVYESH-HARI)
- 🛠️ LinkedIn: [@divyesh_hari](www.linkedin.com/in/divyesh-hari-b65877334)

**Vijaya Karthick**
- 📧 Email: vkr3056@gmail.com
- 📸 Instagram: [@karthickxviii](https://instagram.com/karthickxviii)
- 💻 GitHub: [KARTHICK-3056](https://github.com/KARTHICK-3056)

---

## 🙏 Acknowledgments

- **YOLO**: Ultralytics for the object detection framework
- **Real-ESRGAN**: Xintao Wang et al. for image enhancement
- **FastAPI / React**: For the powerful full-stack architecture
