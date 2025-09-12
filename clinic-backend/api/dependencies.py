from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from uuid import UUID

from core.auth import decode_access_token
from models.user_models import User, Role

# This tells FastAPI where to look for the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """
    Dependency to get the current user from a token.
    Validates token, decodes it, and fetches the user from the database.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    
    # --- THIS IS THE CORRECTED LINE ---
    user_id = payload.get("user_id") # Use "user_id" instead of "sub"
    # --- END OF CORRECTION ---

    if user_id is None:
        raise credentials_exception

    # This line might fail if the user_id from the token is invalid.
    # Beanie's `get` method expects a valid document ID.
    try:
        user = await User.find_one(User.user_id == UUID(user_id))
    except (ValueError, TypeError):
        # This handles cases where user_id is not a valid UUID string
        raise credentials_exception
        
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency to ensure the current user is an admin.
    Raises an exception if the user's role is not ADMIN.
    """
    if current_user.role != Role.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have clearance to access this resource."
        )
    return current_user