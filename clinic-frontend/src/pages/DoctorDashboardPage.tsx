// File: clinic-frontend/src/pages/DoctorDashboardPage.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';

// You can reuse the Appointment type from the Patient Dashboard if defined globally
// Or redefine it here for clarity
interface Appointment {
  appointment_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  patient_id: string;
}

const DoctorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const token = useAuthStore((state) => state.token);
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-dark-text mb-8">Doctor Dashboard</h1>
      <div className="flex border-b border-slate-700 mb-8">
        <button onClick={() => setActiveTab('appointments')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'appointments' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>
          My Appointments
        </button>
        <button onClick={() => setActiveTab('profile')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'profile' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>
          My Profile
        </button>
      </div>
      <div>
        {activeTab === 'appointments' && <DoctorAppointmentsList token={token} />}
        {activeTab === 'profile' && <p>Profile management for doctors will be built here.</p>}
      </div>
    </div>
  );
};

const DoctorAppointmentsList = ({ token }: { token: string | null }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) { setIsLoading(false); return; }
      try {
        const response = await axiosInstance.get('/doctors/me/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) { console.error("Failed to fetch appointments", error); }
      finally { setIsLoading(false); }
    };
    fetchAppointments();
  }, [token]);

  if (isLoading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>You have no upcoming appointments.</p>;

  return (
    <div className="space-y-4">
      {appointments.map(app => (
        <div key={app.appointment_id} className="bg-dark-card p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-bold text-dark-text">Appointment with Patient [ID: ...{app.patient_id.slice(-6)}]</p>
            <p className="text-sm text-dark-subtle">{new Date(app.appointment_date).toDateString()} at {app.appointment_time}</p>
          </div>
          <span className="capitalize text-sm font-semibold px-3 py-1 bg-sky-800/50 text-sky-300 rounded-full">{app.status}</span>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboardPage;