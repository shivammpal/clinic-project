# File: clinic-backend/api/routes/user_routes.py

from fastapi import APIRouter, Depends
from typing import List

from models.user_models import User
from models.clinic_models import Appointment, Prescription
from schemas.clinic_schemas import AppointmentOut, PrescriptionOut
from api.dependencies import get_current_user

router = APIRouter(
    prefix="/users", 
    tags=["User Data"],
    dependencies=[Depends(get_current_user)] # Protects all routes in this file
)

@router.get("/me/appointments", response_model=List[AppointmentOut])
async def get_my_appointments(current_user: User = Depends(get_current_user)):
    """
    Fetch all appointments for the currently logged-in user.
    """
    appointments = await Appointment.find(
        Appointment.patient_id == current_user.user_id
    ).to_list()
    return appointments

@router.get("/me/prescriptions", response_model=List[PrescriptionOut])
async def get_my_prescriptions(current_user: User = Depends(get_current_user)):
    """
    Fetch all prescriptions for the currently logged-in user.
    """
    prescriptions = await Prescription.find(
        Prescription.patient_id == current_user.user_id
    ).to_list()
    return prescriptions