// File: clinic-frontend/src/pages/DoctorProfilePage.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Page } from '../App'; // Import the page type

type DoctorProfile = {
  full_name: string;
  specialty: string;
  photo_url: string | null;
  bio: string | null;
};

// Update props to include the navigation function
type DoctorProfilePageProps = {
  doctorId: string;
  onNavigate: (page: Page, data: { doctorId: string, doctorName: string }) => void;
};

const DoctorProfilePage = ({ doctorId, onNavigate }: DoctorProfilePageProps) => {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) return;
    const fetchDoctorProfile = async () => {
      // ... (fetching logic remains the same)
      try {
        setError(null); setIsLoading(true);
        const response = await axiosInstance.get(`/public/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (err) { setError('Could not find the requested doctor profile.');
      } finally { setIsLoading(false); }
    };
    fetchDoctorProfile();
  }, [doctorId]);

  if (isLoading) return <div className="text-center py-20">Loading profile...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
  if (!doctor) return null;

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="bg-dark-card rounded-lg shadow-xl p-8 md:flex gap-8">
            <img 
                src={doctor.photo_url || `https://placehold.co/400x400/1e293b/e2e8f0?text=Dr.+${doctor.full_name.split(' ').pop()}`}
                alt={`Dr. ${doctor.full_name}`}
                className="w-48 h-48 rounded-full mx-auto md:mx-0 flex-shrink-0 object-cover border-4 border-brand-blue"
            />
            <div className="text-center md:text-left mt-6 md:mt-0">
                <h1 className="text-4xl font-bold text-dark-text">{doctor.full_name}</h1>
                <p className="text-2xl text-brand-blue font-semibold mt-1">{doctor.specialty}</p>
                <p className="text-dark-subtle mt-4">{doctor.bio || "Further details about this esteemed doctor will be available soon."}</p>
                {/* UPDATED: Button now calls the onNavigate function */}
                <button 
                  onClick={() => onNavigate('bookAppointment', { doctorId, doctorName: doctor.full_name })}
                  className="mt-6 bg-brand-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    </div>
  );
};

export default DoctorProfilePage;