# File: clinic-backend/schemas/admin_schemas.py

from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional
from models.user_models import DoctorStatus

class DoctorAdminOut(BaseModel):
    """
    Schema for returning a doctor's full profile details to an admin.
    """
    doctor_id: UUID
    email: EmailStr # We'll need to fetch this from the User model
    full_name: str
    specialty: str
    status: DoctorStatus
    photo_url: Optional[str] = None
    degree_url: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True