from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID

from models.user_models import User, DoctorProfile, DoctorStatus
from schemas.admin_schemas import DoctorAdminOut, DoctorStatusUpdate
from api.dependencies import get_current_admin

# Note: I removed the prefixes from the router definition. 
# Make sure the prefix is only defined once in your main.py file, like so:
# app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])
router = APIRouter(
    dependencies=[Depends(get_current_admin)]
)

@router.get("/doctors/pending", response_model=List[DoctorAdminOut])
async def get_pending_doctors():
    """
    Get a list of all doctors with 'pending' status.
    (Using a simpler, more stable method).
    """
    pending_profiles = await DoctorProfile.find(DoctorProfile.status == DoctorStatus.PENDING).to_list()
    
    response = []
    for profile in pending_profiles:
        # Fetch the corresponding user for each profile to get the email
        user = await User.find_one(User.user_id == profile.doctor_id)
        if user:
            # Manually construct the response model
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

@router.patch("/doctors/{doctor_id}/status", response_model=DoctorAdminOut)
async def update_doctor_status(doctor_id: UUID, status_update: DoctorStatusUpdate):
    """
    Update a doctor's status to 'verified' or 'rejected'.
    """
    profile = await DoctorProfile.find_one(DoctorProfile.doctor_id == doctor_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Doctor profile not found")

    if profile.status != DoctorStatus.PENDING:
        raise HTTPException(
            status_code=400, 
            detail=f"Doctor is already {profile.status.value}."
        )

    profile.status = status_update.status
    await profile.save()

    user = await User.find_one(User.user_id == profile.doctor_id)
    if not user:
        raise HTTPException(status_code=404, detail="Associated user account not found.")

    response_data = profile.model_dump()
    response_data['email'] = user.email
    response_data['doctor_id'] = profile.doctor_id
    
    return DoctorAdminOut(**response_data)