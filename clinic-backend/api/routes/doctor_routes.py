# File: clinic-backend/api/routes/doctor_routes.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List

from models.user_models import User, Role
from models.clinic_models import Appointment
from schemas.clinic_schemas import AppointmentOut
from api.dependencies import get_current_user

router = APIRouter(
    prefix="/doctors",
    tags=["Doctor Data"],
    dependencies=[Depends(get_current_user)] # Protect all routes
)

def require_doctor(current_user: User):
    """Dependency to ensure the user is a doctor."""
    if current_user.role != Role.DOCTOR:
        raise HTTPException(status_code=403, detail="Access forbidden: requires doctor role.")

@router.get("/me/appointments", response_model=List[AppointmentOut])
async def get_doctor_appointments(current_user: User = Depends(get_current_user)):
    """
    Fetch all appointments assigned to the currently logged-in doctor.
    """
    require_doctor(current_user) # Ensure the user is a doctor
    appointments = await Appointment.find(
        Appointment.doctor_id == current_user.user_id
    ).to_list()
    return appointments