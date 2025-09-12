from fastapi import APIRouter, HTTPException
from typing import List
from uuid import UUID

from models.user_models import DoctorProfile, DoctorStatus
from schemas.user_schemas import DoctorOut 

# CORRECTED LINE: Removed the prefix="/public" from here
router = APIRouter(tags=["Public Data"])

@router.get("/doctors", response_model=List[DoctorOut])
async def get_verified_doctors():
    """
    Fetch a list of all doctor profiles that have been verified by an admin.
    This is a public endpoint.
    """
    verified_doctors = await DoctorProfile.find(
        DoctorProfile.status == DoctorStatus.VERIFIED
    ).to_list()

    return verified_doctors

@router.get("/doctors/{doctor_id}", response_model=DoctorOut)
async def get_doctor_by_id(doctor_id: UUID):
    """
    Fetch the public profile of a single verified doctor by their user ID.
    This is a public endpoint.
    """
    doctor_profile = await DoctorProfile.find_one(
        DoctorProfile.doctor_id == doctor_id,
        DoctorProfile.status == DoctorStatus.VERIFIED
    )

    if not doctor_profile:
        raise HTTPException(status_code=404, detail="Verified doctor not found.")

    return doctor_profile