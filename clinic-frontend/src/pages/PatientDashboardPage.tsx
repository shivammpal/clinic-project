// File: clinic-frontend/src/pages/PatientDashboardPage.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import type { NavigateFunction } from '../App';// <-- NEW IMPORT

// --- Your existing type definitions (unchanged) ---
interface Appointment {
  appointment_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctor_id: string; 
  doctor_name: string;
}

interface Prescription {
  prescription_id: string;
  medication: string;
  dosage: string;
  issued_date: string;
}

type Tab = 'appointments' | 'prescriptions' | 'history' | 'profile';

// --- NEW: Define props to accept the navigation function ---
type PatientDashboardPageProps = {
    onNavigate: NavigateFunction;
}

// --- UPDATE: Component now accepts props ---
const PatientDashboardPage = ({ onNavigate }: PatientDashboardPageProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('appointments');
  const token = useAuthStore((state) => state.token);

  const renderContent = () => {
    switch(activeTab) {
      case 'appointments':
        return <AppointmentsList token={token} onUndo={handleUndo} refreshFlag={refreshFlag} />;
      case 'prescriptions':
        return <PrescriptionsList token={token} />;
      case 'history':
        return <HistoryList token={token} />;
      case 'profile':
        return <div className="text-dark-subtle">Profile management will be built here.</div>;
      default:
        return null;
    }
  };

  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleUndo = async (appointmentId: string) => {
    try {
      await axiosInstance.delete(`/users/me/appointments/${appointmentId}`);
      alert("Appointment application undone successfully.");
      // Trigger refresh of appointments list
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error("Failed to undo appointment", error);
      alert("Failed to undo appointment. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* --- NEW: Header with the Start Call button --- */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-dark-text">My Dashboard</h1>
        <button 
            onClick={() => onNavigate('videoCall')}
            className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors shadow-md"
        >
            Start Test Call
        </button>
      </div>
      
      {/* Your existing tabs and content (unchanged) */}
      <div className="flex border-b border-slate-700 mb-8">
        <button onClick={() => setActiveTab('appointments')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'appointments' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>Appointments</button>
        <button onClick={() => setActiveTab('prescriptions')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'prescriptions' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>Prescriptions</button>
        <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'history' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>History</button>
        <button onClick={() => setActiveTab('profile')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'profile' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>Profile</button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

// --- Your existing sub-components (unchanged) ---
const AppointmentsList = ({ token, onUndo, refreshFlag }: { token: string | null; onUndo: (appointmentId: string) => Promise<void>; refreshFlag: boolean }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!token) { setIsLoading(false); return; }
    try {
      const response = await axiosInstance.get('/users/me/appointments');
      setAppointments(response.data);
    } catch (error) { console.error("Failed to fetch appointments", error); }
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token, refreshFlag]);

  if (isLoading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>You have no scheduled appointments.</p>;

  return (
    <div className="space-y-4">
      {appointments.map(app => (
        <div key={app.appointment_id} className="bg-dark-card p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-bold text-dark-text">Appointment with Dr.{app.doctor_name}</p>
            <p className="text-sm text-dark-subtle">{new Date(app.appointment_date).toDateString()} at {app.appointment_time}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="capitalize text-sm font-semibold px-3 py-1 bg-sky-800/50 text-sky-300 rounded-full">{app.status}</span>
            {app.status === "pending" && (
              <button
                onClick={() => onUndo(app.appointment_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Undo
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const PrescriptionsList = ({ token }: { token: string | null }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  useEffect(() => {
    const fetchPrescriptions = async () => {
       if (!token) return;
        try {
            const response = await axiosInstance.get('/users/me/prescriptions');
            setPrescriptions(response.data);
        } catch (error) { console.error("Failed to fetch prescriptions", error); }
    };
    fetchPrescriptions();
  }, [token]);

  if (prescriptions.length === 0) return <p>You have no prescriptions on record.</p>;

  return (
    <div className="space-y-4">
      {prescriptions.map(pr => (
        <div key={pr.prescription_id} className="bg-dark-card p-4 rounded-lg">
          <p className="font-bold text-dark-text">{pr.medication}</p>
          <p className="text-sm text-dark-subtle">Dosage: {pr.dosage}</p>
          <p className="text-xs text-slate-500 mt-2">Issued: {new Date(pr.issued_date).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

const HistoryList = ({ token }: { token: string | null }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    if (!token) { setIsLoading(false); return; }
    try {
      const response = await axiosInstance.get('/users/me/appointments/history');
      setAppointments(response.data);
    } catch (error) { console.error("Failed to fetch appointment history", error); }
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    fetchHistory();
  }, [token]);

  if (isLoading) return <p>Loading history...</p>;
  if (appointments.length === 0) return <p>You have no cancelled appointments in your history.</p>;

  return (
    <div className="space-y-4">
      {appointments.map(app => (
        <div key={app.appointment_id} className="bg-dark-card p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-bold text-dark-text">Appointment with Dr.{app.doctor_name}</p>
            <p className="text-sm text-dark-subtle">{new Date(app.appointment_date).toDateString()} at {app.appointment_time}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="capitalize text-sm font-semibold px-3 py-1 bg-red-800/50 text-red-300 rounded-full">{app.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientDashboardPage;
