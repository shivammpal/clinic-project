import asyncio
import os
import sys
from getpass import getpass
from dotenv import load_dotenv

# Allow script to import from the parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load .env file
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

# These imports MUST come AFTER loading the .env file
from core.db import init_db
from core.auth import get_password_hash
from models.user_models import User, Role

async def main():
    """A command-line utility to reset an admin's password."""
    print("--- Admin Password Reset Script ---")
    
    await init_db()

    # Get the admin's email
    email = input(f"Enter the email of the admin account to reset (e.g., admin@gmail.com): ").strip()
    
    # Find the user in the database
    user = await User.find_one(User.email == email)
    
    # Verify that the user exists and is an admin
    if not user:
        print(f"Error: No user found with the email '{email}'.")
        return
        
    if user.role != Role.ADMIN:
        print(f"Error: The user with email '{email}' is not an admin.")
        return

    print(f"Found admin user: {user.email}")
    
    # Get and confirm the new password
    new_password = getpass("Enter the new password (at least 8 characters): ")
    if len(new_password) < 8:
        print("Error: Password must be at least 8 characters long.")
        return
        
    confirm_password = getpass("Confirm the new password: ")
    if new_password != confirm_password:
        print("Error: Passwords do not match.")
        return
        
    # Hash the new password and update the user document
    user.hashed_password = get_password_hash(new_password)
    await user.save()
    
    print("\n✅ Password for admin has been reset successfully!")

if __name__ == "__main__":
    asyncio.run(main())