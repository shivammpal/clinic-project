# File: clinic-backend/api/routes/review_routes.py

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID

from models.user_models import User, Role
from models.clinic_models import Review
from schemas.clinic_schemas import ReviewCreate, ReviewOut
from api.dependencies import get_current_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("/{doctor_id}", response_model=ReviewOut, status_code=201)
async def create_review(
    doctor_id: UUID,
    review_data: ReviewCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a new review for a doctor. Only authenticated patients can do this.
    """
    if current_user.role != Role.PATIENT:
        raise HTTPException(status_code=403, detail="Only patients can leave reviews.")

    # A real app might check if the patient has had a completed appointment with the doctor
    
    new_review = Review(
        doctor_id=doctor_id,
        patient_id=current_user.user_id,
        rating=review_data.rating,
        comment=review_data.comment
    )
    await new_review.insert()
    return new_review

@router.get("/{doctor_id}", response_model=List[ReviewOut])
async def get_reviews_for_doctor(doctor_id: UUID):
    """
    Get all reviews for a specific doctor. This is a public endpoint.
    """
    reviews = await Review.find(Review.doctor_id == doctor_id).to_list()
    return reviews