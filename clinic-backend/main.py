# File: clinic-backend/main.py

from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# Import your initializers
from core.db import init_db
from core.cloudinary_utils import configure_cloudinary

# Import your API routers
from api.routes import auth_routes, admin_routes, public_routes, user_routes, doctor_routes, websockets, review_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    """ Actions to perform on application startup and shutdown. """
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
    "https://clinic-project-ebon.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # restrict later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================================================================
# Include the API routers (with prefixes where needed)
# ===================================================================
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])
app.include_router(public_routes.router, prefix="/public", tags=["Public"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(doctor_routes.router, prefix="/doctors", tags=["Doctors"])
app.include_router(websockets.router, prefix="/ws", tags=["Websockets"])
app.include_router(review_routes.router, prefix="/reviews", tags=["Reviews"])

# Root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Online Clinic API!"}
