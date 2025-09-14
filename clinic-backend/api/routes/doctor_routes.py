# File: clinic-backend/api/routes/doctor_routes.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from beanie.operators import In
from datetime import datetime

# --- FIX 1: Import Role and User from user_models ---
from models.user_models import User, Role
from models.clinic_models import Appointment
from schemas.clinic_schemas import AppointmentWithPatientInfo
from api.dependencies import get_current_user

# --- FIX 2: Create a dependency to require a doctor role ---
def require_doctor(current_user: User = Depends(get_current_user)):
    """Dependency that checks if the current user is a doctor."""
    if current_user.role != Role.DOCTOR:
        raise HTTPException(
            status_code=403, 
            detail="Access forbidden: Requires doctor role."
        )
    return current_user

# --- Use the new require_doctor dependency for the whole router ---
router = APIRouter(
    tags=["Doctor Data"],
    dependencies=[Depends(require_doctor)]
)

@router.get("/me/appointments", response_model=List[AppointmentWithPatientInfo])
# --- FIX 3: Use the correct dependency and variable name ---
async def get_doctor_appointments(current_user: User = Depends(get_current_user)):
    """
    Fetch all appointments for the currently logged-in doctor.
    Exclude cancelled appointments.
    """
    from models.clinic_models import AppointmentStatus
    # 1. Fetch all appointments for the doctor excluding cancelled
    appointments = await Appointment.find(
        Appointment.doctor_id == current_user.user_id,
        Appointment.status != AppointmentStatus.CANCELLED
    ).to_list()

    if not appointments:
        return []

    # 2. Get unique patient IDs
    patient_ids = {app.patient_id for app in appointments}

    # 3. Fetch the corresponding patient user documents
    patients = await User.find(In(User.user_id, patient_ids)).to_list()
    patient_name_map = {patient.user_id: patient.full_name or "Unknown Patient" for patient in patients}

    # 4. Combine data for the response
    response_data = []
    for app in appointments:
        app_data = app.model_dump()
        app_data['patient_name'] = app.patient_name or patient_name_map.get(app.patient_id, "Unknown Patient")
        response_data.append(app_data)

    return response_data

@router.put("/me/appointments/{appointment_id}/status")
async def update_appointment_status(appointment_id: str, status: str, current_user: User = Depends(get_current_user)):
    """
    Update the status of an appointment (confirm or decline) for the currently logged-in doctor.
    """
    from uuid import UUID
    from models.clinic_models import AppointmentStatus

    if status not in ["confirmed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status. Must be 'confirmed' or 'cancelled'")

    # Convert string id to UUID
    try:
        app_id = UUID(appointment_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid appointment ID format")

    appointment = await Appointment.find_one(Appointment.appointment_id == app_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if appointment.doctor_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this appointment")

    if appointment.status != AppointmentStatus.PENDING:
        raise HTTPException(status_code=400, detail="Can only update pending appointments")

    appointment.status = AppointmentStatus.CONFIRMED if status == "confirmed" else AppointmentStatus.CANCELLED
    appointment.updated_at = datetime.utcnow()
    await appointment.save()

    return {"message": f"Appointment {status} successfully"}

@router.get("/me/appointments/history", response_model=List[AppointmentWithPatientInfo])
async def get_doctor_appointment_history(current_user: User = Depends(get_current_user)):
    """
    Fetch all cancelled appointments for the currently logged-in doctor.
    """
    from models.clinic_models import AppointmentStatus

    # 1. Fetch all cancelled appointments for the doctor
    cancelled_appointments = await Appointment.find(
        Appointment.doctor_id == current_user.user_id,
        Appointment.status == AppointmentStatus.CANCELLED
    ).to_list()

    if not cancelled_appointments:
        return []

    # 2. Get unique patient IDs
    patient_ids = {app.patient_id for app in cancelled_appointments}

    # 3. Fetch the corresponding patient user documents
    patients = await User.find(In(User.user_id, patient_ids)).to_list()
    patient_name_map = {patient.user_id: patient.full_name or "Unknown Patient" for patient in patients}

    # 4. Combine data for the response
    response_data = []
    for app in cancelled_appointments:
        app_data = app.model_dump()
        app_data['patient_name'] = app.patient_name or patient_name_map.get(app.patient_id, "Unknown Patient")
        response_data.append(app_data)

    return response_data
