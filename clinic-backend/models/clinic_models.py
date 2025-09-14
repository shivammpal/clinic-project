# File: clinic-backend/models/clinic_models.py

from beanie import Document
from pydantic import Field, BaseModel, conint
from uuid import UUID, uuid4
from datetime import datetime, date
from typing import Optional
from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Appointment(Document):
    appointment_id: UUID = Field(default_factory=uuid4, unique=True)
    patient_id: UUID = Field(..., index=True)
    doctor_id: UUID = Field(..., index=True)
    appointment_date: date
    appointment_time: str

    # --- ADDED THESE FIELDS ---
    reason: Optional[str] = None
    notes: Optional[str] = None
    status: AppointmentStatus = Field(default=AppointmentStatus.PENDING)

    # --- CONTACT DETAILS ---
    patient_name: Optional[str] = None
    patient_email: Optional[str] = None
    patient_phone: Optional[str] = None
    patient_address: Optional[str] = None

    # --- CORRECTED STATUS PLACEMENT AND ADDED TIMESTAMPS ---
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "appointments"

class Prescription(Document):
    prescription_id: UUID = Field(default_factory=uuid4, unique=True)
    patient_id: UUID = Field(..., index=True)
    doctor_id: UUID
    medication: str
    dosage: str
    notes: Optional[str] = None
    issued_date: date = Field(default_factory=date.today)

    class Settings:
        name = "prescriptions"

class Review(Document):
    review_id: UUID = Field(default_factory=uuid4, unique=True)
    doctor_id: UUID = Field(..., index=True)
    patient_id: UUID = Field(..., index=True)
    rating: conint(ge=1, le=5) 
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "reviews"

# Note: The two schemas below are duplicates of what's in clinic_schemas.py.
# It's best practice to remove them from this model file to avoid confusion.
class ReviewCreate(BaseModel):
    rating: conint(ge=1, le=5)
    comment: Optional[str] = None

class ReviewOut(BaseModel):
    review_id: UUID
    patient_id: UUID
    rating: int
    comment: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True