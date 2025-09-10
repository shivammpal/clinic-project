# File: clinic-backend/scripts/create_admin.py

import asyncio
import os
import sys
from getpass import getpass

# This is a bit of a hack to allow the script to import from the parent directory
# where all your application modules (core, models, etc.) are.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.db import init_db
from core.auth import get_password_hash
from models.user_models import User, Role

async def main():
    """
    Main function to create an admin user.
    """
    print("--- Admin User Creation Script ---")

    # We must initialize the database connection first
    await init_db()

    # Check if an admin user already exists
    existing_admin = await User.find_one(User.role == Role.ADMIN)
    if existing_admin:
        print(f"An admin user already exists with the email: {existing_admin.email}")
        print("Script will now exit.")
        return

    # Get user input
    email = input("Enter admin email: ")
    password = getpass("Enter admin password: ")
    confirm_password = getpass("Confirm admin password: ")

    if password != confirm_password:
        print("Passwords do not match. Please try again.")
        return

    # Hash the password
    hashed_password = get_password_hash(password)

    # Create the new admin user
    admin_user = User(
        email=email,
        hashed_password=hashed_password,
        role=Role.ADMIN,
        is_active=True # Admins should be active by default
    )

    # Insert into the database
    await admin_user.insert()

    print("\nAdmin user created successfully!")
    print(f"Email: {admin_user.email}")
    print(f"User ID: {admin_user.user_id}")
    print("---------------------------------")


if __name__ == "__main__":
    # The script is designed to be run from the command line.
    # It uses asyncio.run() to execute the async main function.
    asyncio.run(main())