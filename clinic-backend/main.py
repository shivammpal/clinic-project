# File: clinic-backend/main.py

from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware # <--- IMPORT THIS

# Import your initializers
from core.db import init_db
from core.cloudinary_utils import configure_cloudinary

# Import your API routers
from api.routes import auth_routes, admin_routes, public_routes,user_routes,doctor_routes,websockets,review_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Actions to perform on application startup and shutdown.
    """
    print("Application startup...")
    await init_db()
    configure_cloudinary()
    yield
    print("Application shutdown...")

app = FastAPI(lifespan=lifespan)

# ===================================================================
# CONFIGURE CORS MIDDLEWARE
# ===================================================================
origins = [
    "http://localhost:5173", # The origin of your React frontend
    "http://localhost:3000", # A common alternative port for React dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Allows specific origins to make requests
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# ===================================================================


# Include the API routers
app.include_router(auth_routes.router)
app.include_router(admin_routes.router)
app.include_router(public_routes.router)
app.include_router(user_routes.router)
app.include_router(doctor_routes.router)
app.include_router(websockets.router)
app.include_router(review_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Online Clinic API!"}