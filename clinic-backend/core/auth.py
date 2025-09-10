# File: clinic-backend/core/auth.py

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import HTTPException  # <-- Make sure this import is present

from .config import settings
from schemas.user_schemas import TokenData

# Setup for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hashes a plain password."""
    return pwd_context.hash(password)

# --- UPDATED FUNCTION ---
# Simplified for clarity and to match our login endpoint's usage.
def create_access_token(data: dict):
    """Creates a new JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# --- UPDATED FUNCTION ---
def decode_access_token(token: str) -> dict:
    """
    Decodes the access token and extracts user_id and role.

    Returns:
        dict: The payload containing user_id and role.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        role: str = payload.get("role") # <-- NEW: Extract the role

        # Check if both user_id and role are in the token
        if user_id is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
            
        return {"user_id": user_id, "role": role} # <-- NEW: Return both values

    except JWTError:
        raise HTTPException(
            status_code=401, 
            detail="Could not validate credentials", 
            headers={"WWW-Authenticate": "Bearer"}
        )