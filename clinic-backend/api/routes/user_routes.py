# File: clinic-backend/api/routes/user_routes.py
# Add this import at the top
from beanie.operators import In
from fastapi import APIRouter, Depends, HTTPException
from typing import List

from models.user_models import User,DoctorProfile
from models.clinic_models import Appointment, Prescription
from schemas.clinic_schemas import AppointmentCreate, AppointmentOut, PrescriptionOut,AppointmentWithDoctorInfo
from api.dependencies import get_current_user

router = APIRouter( 
    tags=["User Data"],
    dependencies=[Depends(get_current_user)] # Protects all routes in this file
)

@router.post("/me/appointments", response_model=AppointmentOut)
async def create_appointment(appointment_data: AppointmentCreate, current_user: User = Depends(get_current_user)):
    """
    Create a new appointment for the currently logged-in patient.
    """
    appointment = Appointment(
        patient_id=current_user.user_id,
        doctor_id=appointment_data.doctor_id,
        appointment_date=appointment_data.appointment_date,
        appointment_time=appointment_data.appointment_time,
        reason=appointment_data.reason,
        notes=appointment_data.notes
    )
    await appointment.insert()
    return appointment

@router.get("/me/appointments", response_model=List[AppointmentWithDoctorInfo])
async def get_my_appointments(current_user: User = Depends(get_current_user)):
    """
    Fetch all appointments for the currently logged-in user, including doctor's name.
    """
    # 1. Fetch all appointments for the patient
    appointments = await Appointment.find(
        Appointment.patient_id == current_user.user_id
    ).to_list()

    if not appointments:
        return []

    # 2. Get a unique list of all doctor IDs from these appointments
    doctor_ids = {app.doctor_id for app in appointments}

    # 3. Fetch all the required doctor profiles in a single query
    doctor_profiles = await DoctorProfile.find(
    In(DoctorProfile.doctor_id, doctor_ids) # This is the correct syntax
).to_list()

    # 4. Create a quick lookup map of doctor_id -> doctor_name
    doctor_name_map = {profile.doctor_id: profile.full_name for profile in doctor_profiles}

    # 5. Combine the appointment data with the doctor's name
    response_data = []
    for app in appointments:
        appointment_data = app.model_dump()
        appointment_data['doctor_name'] = doctor_name_map.get(app.doctor_id, "Unknown Doctor")
        response_data.append(appointment_data)

    return response_data

@router.get("/me/prescriptions", response_model=List[PrescriptionOut])
async def get_my_prescriptions(current_user: User = Depends(get_current_user)):
    """
    Fetch all prescriptions for the currently logged-in user.
    """
    prescriptions = await Prescription.find(
        Prescription.patient_id == current_user.user_id
    ).to_list()
    return prescriptions