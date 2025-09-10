# File: clinic-backend/models/clinic_models.py

from beanie import Document
from pydantic import Field
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