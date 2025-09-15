// File: clinic-frontend/src/pages/DoctorsPage.tsx
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import DoctorCard from '../components/DoctorCard';
import type { NavigateFunction } from '../App';

type Doctor = {
  doctor_id: string;
  full_name: string;
  specialty: string;
  photo_url: string | null;
};

// --- FIX: Added props for onNavigate ---
type DoctorsPageProps = {
    onNavigate: NavigateFunction;
};

const DoctorsPage = ({ onNavigate }: DoctorsPageProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axiosInstance.get('/public/doctors');
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="bg-dark-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-dark-text">Meet Our Certified Doctors</h1>
          <p className="mt-4 text-lg text-dark-subtle">Experts dedicated to your health and well-being.</p>
        </div>

        {isLoading && <div className="text-center text-xl text-dark-subtle">Loading doctors...</div>}
        {error && <div className="text-center text-red-400 text-xl">{error}</div>}

        {!isLoading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.doctor_id} doctor={doctor} onNavigate={onNavigate} />
            ))}
          </div>
        )}
         {!isLoading && !error && doctors.length === 0 && (
            <div className="text-center text-xl text-dark-subtle">No verified doctors are available at this moment.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;