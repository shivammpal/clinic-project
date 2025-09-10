# File: clinic-backend/schemas/clinic_schemas.py

# *** THIS IS THE FIX: Add 'conint' to the import from Pydantic ***
from pydantic import BaseModel, conint
from uuid import UUID
from datetime import date, datetime
from typing import Optional
from models.clinic_models import AppointmentStatus

class AppointmentOut(BaseModel):
    appointment_id: UUID
    patient_id: UUID
    doctor_id: UUID
    appointment_date: date
    appointment_time: str
    status: AppointmentStatus

    class Config:
        from_attributes = True

class PrescriptionOut(BaseModel):
    prescription_id: UUID
    medication: str
    dosage: str
    notes: Optional[str] = None
    issued_date: date

    class Config:
        from_attributes = True

class ReviewCreate(BaseModel):
    """Schema for a patient creating a new review."""
    # This line will now work correctly
    rating: conint(ge=1, le=5) 
    comment: Optional[str] = None

class ReviewOut(BaseModel):
    """Schema for displaying a review publicly."""
    review_id: UUID
    patient_id: UUID
    rating: int
    comment: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True