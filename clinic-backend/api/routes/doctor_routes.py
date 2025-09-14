# File: clinic-backend/api/routes/doctor_routes.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from beanie.operators import In

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
    """
    # 1. Fetch all appointments for the doctor
    appointments = await Appointment.find(
        Appointment.doctor_id == current_user.user_id
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
        app_data['patient_name'] = patient_name_map.get(app.patient_id, "Unknown Patient")
        response_data.append(app_data)

    return response_data