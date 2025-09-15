import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import type { NavigateFunction } from '../App';

// The interface now correctly anticipates the patient's name
interface Appointment {
  appointment_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  patient_name: string;
  patient_email?: string;
  patient_phone?: string;
  patient_address?: string;
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
          onClick={() => setActiveTab('history')} 
          className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'history' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}
        >
          History
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
        {activeTab === 'history' && <DoctorHistoryList />}
        {activeTab === 'profile' && <p className="text-dark-subtle">Profile management for doctors will be built here.</p>}
      </div>
    </div>
  );
};

const DoctorAppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // <-- NEW: State for error handling

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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId: string, status: string) => {
    try {
      // The backend expects status as a query parameter, not in the body
      // Fix: Use correct HTTP method and pass status as query param
      await axiosInstance.put(`/doctors/me/appointments/${appointmentId}/status`, null, { params: { status } });
      // Refresh the appointments list after updating status
      fetchAppointments();
    } catch (err) {
      console.error("Failed to update appointment status", err);
      alert("Failed to update appointment status. Please try again.");
    }
  };

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
            <div className="mt-2 text-sm text-dark-subtle">
              <p><strong>Contact Details:</strong></p>
              <p>Name: {app.patient_name}</p>
              <p>Email: {app.patient_email || 'N/A'}</p>
              <p>Phone: {app.patient_phone || 'N/A'}</p>
              <p>Address: {app.patient_address || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="capitalize text-sm font-semibold px-3 py-1 bg-sky-800/50 text-sky-300 rounded-full">{app.status}</span>
            {app.status === "pending" && (
              <>
                <button
                  onClick={() => handleUpdateStatus(app.appointment_id, "confirmed")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(app.appointment_id, "cancelled")}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

};

const DoctorHistoryList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get('/doctors/me/appointments/history');
      setAppointments(response.data);
    } catch (err) {
      console.error("Failed to fetch appointment history", err);
      setError("Could not load appointment history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) return <p className="text-dark-subtle">Loading history...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (appointments.length === 0) return <p className="text-dark-subtle">You have no cancelled appointments in your history.</p>;

  return (
    <div className="space-y-4">
      {appointments.map(app => (
        <div key={app.appointment_id} className="bg-dark-card p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-bold text-dark-text">Appointment with {app.patient_name}</p>
            <p className="text-sm text-dark-subtle">{new Date(app.appointment_date).toDateString()} at {app.appointment_time}</p>
            <div className="mt-2 text-sm text-dark-subtle">
              <p><strong>Contact Details:</strong></p>
              <p>Name: {app.patient_name}</p>
              <p>Email: {app.patient_email || 'N/A'}</p>
              <p>Phone: {app.patient_phone || 'N/A'}</p>
              <p>Address: {app.patient_address || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="capitalize text-sm font-semibold px-3 py-1 bg-red-800/50 text-red-300 rounded-full">{app.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboardPage;
