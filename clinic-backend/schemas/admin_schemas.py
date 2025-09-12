from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

# Import the DoctorStatus Enum from your models
from models.user_models import DoctorStatus

# ADD THIS CLASS
# This schema is used for the request body when updating a doctor's status
class DoctorStatusUpdate(BaseModel):
    status: DoctorStatus # Will accept 'verified' or 'rejected'


# YOUR EXISTING CLASS (NO CHANGES NEEDED)
class DoctorAdminOut(BaseModel):
    """
    Schema for returning a doctor's full profile details to an admin.
    """
    doctor_id: UUID
    email: EmailStr 
    full_name: str
    specialty: str
    status: DoctorStatus
    photo_url: Optional[str] = None
    degree_url: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True