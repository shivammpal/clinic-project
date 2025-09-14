import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

// The interface now correctly anticipates the patient's name
interface Appointment {
  appointment_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  patient_name: string;
}

const DoctorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-dark-text mb-8">Doctor Dashboard</h1>
      <div className="flex border-b border-slate-700 mb-8">
        <button 
          onClick={() => setActiveTab('appointments')} 
          className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'appointments' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}
        >
          My Appointments
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'profile' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}
        >
          My Profile
        </button>
      </div>
      <div>
        {activeTab === 'appointments' && <DoctorAppointmentsList />}
        {activeTab === 'profile' && <p className="text-dark-subtle">Profile management for doctors will be built here.</p>}
      </div>
    </div>
  );
};

const DoctorAppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // <-- NEW: State for error handling

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // --- This is the API call to the new endpoint ---
        // Note: No need for manual headers; axiosInstance handles it.
        const response = await axiosInstance.get('/doctors/me/appointments');
        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setError("Could not load appointments. Please try again later."); // <-- NEW: Set error message
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (isLoading) return <p className="text-dark-subtle">Loading appointments...</p>;
  if (error) return <p className="text-red-400">{error}</p>; // <-- NEW: Display error message
  if (appointments.length === 0) return <p className="text-dark-subtle">You have no upcoming appointments.</p>;

  return (
    <div className="space-y-4">
      {appointments.map(app => (
        <div key={app.appointment_id} className="bg-dark-card p-4 rounded-lg flex justify-between items-center">
          <div>
            {/* --- THIS IS THE MAIN FIX: Displaying the patient's name --- */}
            <p className="font-bold text-dark-text">Appointment with {app.patient_name}</p>
            <p className="text-sm text-dark-subtle">{new Date(app.appointment_date).toDateString()} at {app.appointment_time}</p>
          </div>
          <span className="capitalize text-sm font-semibold px-3 py-1 bg-sky-800/50 text-sky-300 rounded-full">{app.status}</span>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboardPage;