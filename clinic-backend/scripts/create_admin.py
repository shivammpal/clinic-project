import asyncio
import os
import sys
from getpass import getpass
from dotenv import load_dotenv # NEW: Import the load_dotenv function

# This allows the script to import from the parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# NEW: Find the .env file in the project root and load it
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

# These imports MUST come AFTER loading the .env file
from core.db import init_db
from core.auth import get_password_hash
from models.user_models import User, Role

async def main():
    """
    Main function to create an admin user.
    """
    print("--- Admin User Creation Script ---")

    await init_db()

    existing_admin = await User.find_one(User.role == Role.ADMIN)
    if existing_admin:
        print(f"An admin user already exists with the email: {existing_admin.email}")
        print("Script will now exit.")
        return

    email = input("Enter admin email: ")
    password = getpass("Enter admin password: ")
    confirm_password = getpass("Confirm admin password: ")

    if password != confirm_password:
        print("Passwords do not match. Please try again.")
        return

    hashed_password = get_password_hash(password)

    admin_user = User(
        email=email,
        hashed_password=hashed_password,
        role=Role.ADMIN,
        is_active=True
    )

    await admin_user.insert()

    print("\nAdmin user created successfully!")
    print(f"Email: {admin_user.email}")
    print(f"User ID: {admin_user.user_id}")
    print("---------------------------------")

if __name__ == "__main__":
    asyncio.run(main())