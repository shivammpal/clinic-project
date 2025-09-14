# Fix Token Comparison and Authentication Issues

## Backend Fixes
- [x] Update `clinic-backend/api/routes/auth_routes.py`: Change token creation to use "user_id" claim instead of "sub"
- [x] Update `clinic-backend/core/auth.py`: Ensure token creation supports "user_id" claim (already flexible)
- [x] Update `clinic-backend/api/dependencies.py`: Ensure get_current_user uses "user_id" from payload (already does, but confirm)
- [x] Fix User model validation: Make full_name optional in User model and UserOut schema
- [x] Fix AppointmentWithPatientInfo schema: Make patient_name optional to handle missing full_name
- [x] Update `clinic-backend/api/routes/doctor_routes.py`: Handle None full_name for patients in appointments

## Frontend Fixes
- [x] Update `clinic-frontend/src/stores/authStore.ts`: Change token decoding to expect "user_id" instead of "sub"

## Testing
- [ ] Test login functionality (fixed model validation error)
- [ ] Test access to protected routes (e.g., user dashboard, admin dashboard, doctor dashboard)
- [ ] Verify token persistence and logout
