from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
import os
import shutil
import uuid

app = FastAPI()

@app.post("/generate")
async def generate(
    name: str = Form(...),
    job_title: str = Form(...),
    include_photo: bool = Form(False),
    photo: UploadFile = None
):
    output_dir = f"temp_{uuid.uuid4()}"
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, "cv.txt"), "w") as f:
        f.write(f"Name: {name}\nJob Title: {job_title}")
    if include_photo and photo:
        photo_path = os.path.join(output_dir, photo.filename)
        with open(photo_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
    shutil.make_archive(output_dir, 'zip', output_dir)
    shutil.rmtree(output_dir)
    return FileResponse(f"{output_dir}.zip", filename="cv_package.zip")