# File: clinic-backend/schemas/clinic_schemas.py

from pydantic import BaseModel
from uuid import UUID
from datetime import date
from models.clinic_models import AppointmentStatus
from typing import Optional # <-- THIS IS THE FIX. WE ADD THE IMPORT HERE.

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
    notes: Optional[str] = None # This line will now work correctly
    issued_date: date

    class Config:
        from_attributes = True