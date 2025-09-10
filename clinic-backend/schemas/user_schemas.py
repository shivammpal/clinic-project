# File: clinic-backend/schemas/user_schemas.py

from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Optional
from models.user_models import Role # Import the Enum from your models

# ==================
# User Schemas
# ==================

class UserCreate(BaseModel):
    """
    Schema for creating a new user (patient or admin).
    """
    email: EmailStr
    password: str = Field(min_length=8)
    role: Optional[Role] = Role.PATIENT

class UserOut(BaseModel):
    """
    Schema for returning user information (without the password).
    """
    user_id: UUID
    email: EmailStr
    role: Role
    is_active: bool

    class Config:
        from_attributes = True # Pydantic V2 replacement for orm_mode

# ==================
# Doctor Schemas
# ==================

class DoctorCreate(BaseModel):
    """
    Schema for doctor registration. Includes user and profile data.
    """
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    specialty: str
    bio: Optional[str] = None
    # In the actual endpoint, we'll handle file uploads separately
    # and get URLs to populate photo_url and degree_url.

class DoctorOut(BaseModel):
    """
    Schema for returning a doctor's public profile.
    """
    doctor_id: UUID
    full_name: str
    specialty: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    
    class Config:
        from_attributes = True
# ==================
# Token Schemas
# ==================

class Token(BaseModel):
    """
    Schema for the access token response.
    """
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """
    Schema for the data encoded within the JWT.
    """
    user_id: Optional[str] = None
