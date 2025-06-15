# Typeface Dropbox 🗂️

A fullstack Typeface Dropbox application where users can upload, list, and download files via a sleek web interface. Built with **FastAPI**, **React**, **Material UI**, and **SQLite**.

---

## ✨ Features

- Upload any file (`txt`, `json`, `jpg`, `png`, etc.)
- List all uploaded files with upload timestamp
- Download files instantly
- Clean and modern UI using Material UI
- Persistent file metadata via SQLite
- Local file system storage

---

## 🛠 Tech Stack

### Backend (Python + FastAPI)
- FastAPI (REST API)
- SQLAlchemy + SQLite
- Uvicorn (ASGI server)
- CORS enabled for frontend communication

### Frontend (React)
- React.js (with Hooks)
- Axios (for API calls)
- Material UI (for styling)

---

### 💻 Frontend Setup
```bash
cd frontend
npm install
npm start

```
---

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt

# Run the API
uvicorn main:app --reload
```
---
