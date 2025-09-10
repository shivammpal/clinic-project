# File: clinic-backend/api/routes/auth_routes.py

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
from pydantic import EmailStr

# Import models and schemas
from models.user_models import User, DoctorProfile, Role, DoctorStatus
from schemas.user_schemas import UserCreate, UserOut, DoctorOut, Token

# Import auth and cloudinary utilities
from core.auth import get_password_hash, verify_password, create_access_token
from core.cloudinary_utils import upload_file_to_cloudinary

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register/patient", response_model=UserOut, status_code=201)
async def register_patient(user_data: UserCreate):
    # ... (existing code for patient registration - no changes)
    existing_user = await User.find_one(User.email == user_data.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        role=Role.PATIENT
    )
    await new_user.insert()
    return new_user


@router.post("/register/doctor", response_model=DoctorOut, status_code=201)
async def register_doctor(
    email: EmailStr = Form(...),
    password: str = Form(..., min_length=8),
    full_name: str = Form(...),
    specialty: str = Form(...),
    bio: Optional[str] = Form(None),
    photo: UploadFile = File(...),
    degree: UploadFile = File(...)
):
    # ... (existing code for doctor registration - no changes)
    existing_user = await User.find_one(User.email == email)
    if existing_user:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    hashed_password = get_password_hash(password)
    try:
        photo_result = await upload_file_to_cloudinary(photo, "clinic/doctor_photos")
        degree_result = await upload_file_to_cloudinary(degree, "clinic/doctor_degrees")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")
    new_user = User(
        email=email,
        hashed_password=hashed_password,
        role=Role.DOCTOR
    )
    new_doctor_profile = DoctorProfile(
        doctor_id=new_user.user_id,
        full_name=full_name,
        specialty=specialty,
        bio=bio,
        photo_url=photo_result.get("secure_url"),
        degree_url=degree_result.get("secure_url"),
        status=DoctorStatus.PENDING
    )
    await new_user.insert()
    await new_doctor_profile.insert()
    return new_doctor_profile


@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate user and return a JWT access token.
    - Rejects doctors whose accounts are not 'verified'.
    """
    # The form_data.username is the email
    user = await User.find_one(User.email == form_data.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify the password
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Check if the user is a doctor and if they are verified
    if user.role == Role.DOCTOR:
        doctor_profile = await DoctorProfile.find_one(DoctorProfile.doctor_id == user.user_id)
        if not doctor_profile or doctor_profile.status != DoctorStatus.VERIFIED:
            raise HTTPException(
                status_code=403,
                detail="Doctor account not verified. Please wait for admin approval."
            )

    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.user_id)}
    )
    return {"access_token": access_token, "token_type": "bearer"}