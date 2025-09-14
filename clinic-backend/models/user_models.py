# File: clinic-backend/models/user_models.py

from beanie import Document # We no longer need Indexed directly from beanie
from pydantic import Field, EmailStr
from typing import Optional
from enum import Enum
from uuid import UUID, uuid4
from datetime import datetime, timezone

class Role(str, Enum):
    """
    Enumeration for user roles.
    """
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

class User(Document):
    """
    Represents a user in the database. Shared model for all roles.
    """
    # We use Field to explicitly define properties
    user_id: UUID = Field(default_factory=uuid4, unique=True)
    email: EmailStr = Field(..., indexed=True, unique=True)
    full_name: Optional[str] = None
    hashed_password: str
    role: Role = Field(default=Role.PATIENT)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "users"

class DoctorStatus(str, Enum):
    """
    Enumeration for doctor verification status.
    """
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"

class DoctorProfile(Document):
    """
    Represents a doctor's profile, linked to a User document.
    """
    # CORRECTED LINE: Use Field to make the type clear and add the index
    doctor_id: UUID = Field(..., indexed=True) 
    full_name: str
    specialty: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    degree_url: Optional[str] = None
    status: DoctorStatus = Field(default=DoctorStatus.PENDING)
    
    class Settings:
        name = "doctor_profiles"

