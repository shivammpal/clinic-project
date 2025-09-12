import pytest
from httpx import AsyncClient
from fastapi import FastAPI
from api.routes.auth_routes import router as auth_router
from api.routes.user_routes import router as user_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(user_router)

@pytest.mark.asyncio
async def test_patient_registration_and_login():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        patient_data = {
            "email": "testpatient@example.com",
            "password": "strongpassword"
        }
        response = await ac.post("/auth/register/patient", json=patient_data)
        assert response.status_code == 201
        assert response.json()["email"] == patient_data["email"]

        login_data = {
            "username": patient_data["email"],
            "password": patient_data["password"]
        }
        response = await ac.post("/auth/login", data=login_data)
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_doctor_registration_and_login():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        photo_path = "tests/sample_photo.jpg"
        degree_path = "tests/sample_degree.pdf"

        with open(photo_path, "rb") as photo_file, open(degree_path, "rb") as degree_file:
            form_data = {
                "email": "testdoctor@example.com",
                "password": "strongpassword",
                "full_name": "Dr. Test Doctor",
                "specialty": "Cardiology",
                "bio": "Experienced cardiologist."
            }
            files = {
                "photo": ("sample_photo.jpg", photo_file, "image/jpeg"),
                "degree": ("sample_degree.pdf", degree_file, "application/pdf")
            }
            response = await ac.post("/auth/register/doctor", data=form_data, files=files)
            assert response.status_code == 201
            assert response.json()["full_name"] == form_data["full_name"]

        login_data = {
            "username": form_data["email"],
            "password": form_data["password"]
        }
        response = await ac.post("/auth/login", data=login_data)
        assert response.status_code == 403
