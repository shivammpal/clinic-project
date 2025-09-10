# File: clinic-backend/core/db.py

import motor.motor_asyncio
from beanie import init_beanie
from .config import settings

# --- Import your document models here ---
from models.user_models import User, DoctorProfile

async def init_db():
    """
    Initializes the database connection and Beanie ODM.
    This function should be called once when the application starts.
    """
    client = motor.motor_asyncio.AsyncIOMotorClient(
        settings.DATABASE_URL
    )

    # Add the document models to this list
    await init_beanie(
        database=client[settings.DATABASE_NAME], 
        document_models=[
            User, 
            DoctorProfile
        ]
    )
    print("Database connection initialized with models...")

