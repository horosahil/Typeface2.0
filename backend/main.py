from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from fastapi import Response


from database import SessionLocal, engine
import models

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload")
async def upload(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Avoid duplicate uploads
    if db.query(models.File).filter_by(filename=file.filename).first():
        raise HTTPException(status_code=400, detail="File already exists")

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    new_file = models.File(filename=file.filename, content_type=file.content_type)
    db.add(new_file)
    db.commit()
    db.refresh(new_file)
    return {"message": "File uploaded successfully", "filename": file.filename}

@app.get("/files")
def list_files(db: Session = Depends(get_db)):
    files = db.query(models.File).all()
    return [
        {
            "id": f.id,
            "filename": f.filename,
            "upload_time": f.upload_time.isoformat(),
            "content_type": f.content_type
        }
        for f in files
    ]

@app.get("/download/{filename}")
def download_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)


@app.get("/view/{filename}")
def view_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

 
    if filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith(".txt"):
        media_type = "text/plain"
    else:
        media_type = "application/octet-stream"  

    return FileResponse(
        path=file_path,
        media_type=media_type,
        filename=filename,
        headers={"Content-Disposition": f'inline; filename="{filename}"'}  
    )