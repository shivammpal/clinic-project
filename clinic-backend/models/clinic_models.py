# File: clinic-backend/models/clinic_models.py

from beanie import Document
from pydantic import Field
from uuid import UUID, uuid4
from datetime import datetime, date
from typing import Optional
from enum import Enum
from pydantic import BaseModel, conint

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
    status: AppointmentStatus = AppointmentStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)

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
    # conint(ge=1, le=5) ensures the rating is an integer between 1 and 5
    rating: conint(ge=1, le=5) 
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "reviews"
class ReviewCreate(BaseModel):
    """Schema for a patient creating a new review."""
    rating: conint(ge=1, le=5)
    comment: Optional[str] = None

class ReviewOut(BaseModel):
    """Schema for displaying a review publicly."""
    review_id: UUID
    patient_id: UUID # For now, we only expose the ID for keying on the frontend
    rating: int
    comment: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True