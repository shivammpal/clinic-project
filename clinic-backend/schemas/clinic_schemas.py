# File: clinic-backend/schemas/clinic_schemas.py

from pydantic import BaseModel, conint
from uuid import UUID
from datetime import date, datetime
from typing import Optional
from models.clinic_models import AppointmentStatus

class AppointmentCreate(BaseModel):
    doctor_id: UUID
    # --- TYPE CORRECTED ---
    appointment_date: date
    appointment_time: str
    reason: str
    notes: Optional[str] = None

    # --- CONTACT DETAILS ---
    patient_name: Optional[str] = None
    patient_email: Optional[str] = None
    patient_phone: Optional[str] = None
    patient_address: Optional[str] = None

class AppointmentOut(BaseModel):
    appointment_id: UUID
    patient_id: UUID
    doctor_id: UUID
    # --- TYPE CORRECTED ---
    appointment_date: date
    appointment_time: str
    reason: str
    status: AppointmentStatus
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

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
class AppointmentWithDoctorInfo(AppointmentOut):
    """Extends AppointmentOut to include the doctor's full name."""
    doctor_name: str

    class Config:
        from_attributes = True
# Add this new class at the end of the file
class AppointmentWithPatientInfo(AppointmentOut):
    """Extends AppointmentOut to include the patient's full name."""
    patient_name: Optional[str] = None

    class Config:
        from_attributes = True
