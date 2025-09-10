# File: clinic-backend/core/cloudinary_utils.py

import cloudinary
import cloudinary.uploader
from fastapi import UploadFile
from .config import settings

def configure_cloudinary():
    """
    Configures the Cloudinary client with credentials from settings.
    This should be called once on application startup.
    """
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )
    print("Cloudinary has been configured.")

async def upload_file_to_cloudinary(file: UploadFile, folder: str) -> dict:
    """
    Uploads a file to a specified folder in Cloudinary.

    Args:
        file (UploadFile): The file to upload, coming from a FastAPI endpoint.
        folder (str): The name of the folder in Cloudinary to store the file.

    Returns:
        dict: A dictionary containing the upload result from Cloudinary.
    """
    # The cloudinary library's upload method can handle file-like objects directly
    result = cloudinary.uploader.upload(
        file.file,
        folder=folder,
        resource_type="auto" # Let Cloudinary detect file type
    )
    return result