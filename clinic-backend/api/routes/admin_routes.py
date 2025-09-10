# File: clinic-backend/api/routes/admin_routes.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID

# Import models, schemas, and dependencies
from models.user_models import User, DoctorProfile, DoctorStatus
from schemas.admin_schemas import DoctorAdminOut
from api.dependencies import get_current_admin

router = APIRouter(
    prefix="/admin", 
    tags=["Admin"], 
    dependencies=[Depends(get_current_admin)] # Protects all routes in this file
)

@router.get("/doctors/pending", response_model=List[DoctorAdminOut])
async def get_pending_doctors():
    """
    Get a list of all doctors with 'pending' verification status.
    """
    pending_profiles = await DoctorProfile.find(DoctorProfile.status == DoctorStatus.PENDING).to_list()

    response = []
    for profile in pending_profiles:
        user = await User.find_one(User.user_id == profile.doctor_id)
        if user:
            response.append(
                DoctorAdminOut(
                    doctor_id=profile.doctor_id,
                    email=user.email,
                    full_name=profile.full_name,
                    specialty=profile.specialty,
                    status=profile.status,
                    photo_url=profile.photo_url,
                    degree_url=profile.degree_url,
                    bio=profile.bio
                )
            )
    return response

@router.patch("/doctors/{doctor_id}/verify", response_model=DoctorAdminOut)
async def verify_doctor(doctor_id: UUID):
    """
    Verify a doctor's account by setting their status to 'verified'.
    """
    profile = await DoctorProfile.find_one(DoctorProfile.doctor_id == doctor_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    profile.status = DoctorStatus.VERIFIED
    await profile.save()

    user = await User.find_one(User.user_id == profile.doctor_id)
    # Reconstruct the response object
    return DoctorAdminOut(
        doctor_id=profile.doctor_id,
        email=user.email if user else "N/A",
        **profile.model_dump()
    )

@router.patch("/doctors/{doctor_id}/reject", response_model=DoctorAdminOut)
async def reject_doctor(doctor_id: UUID):
    """
    Reject a doctor's account by setting their status to 'rejected'.
    """
    profile = await DoctorProfile.find_one(DoctorProfile.doctor_id == doctor_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    profile.status = DoctorStatus.REJECTED
    await profile.save()

    user = await User.find_one(User.user_id == profile.doctor_id)
    return DoctorAdminOut(
        doctor_id=profile.doctor_id,
        email=user.email if user else "N/A",
        **profile.model_dump()
    )