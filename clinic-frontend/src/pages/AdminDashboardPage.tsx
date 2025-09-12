import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import PageWrapper from '../components/PageWrapper';

interface PendingDoctor {
  doctor_id: string;
  email: string;
  full_name: string;
  specialty: string;
  photo_url?: string;
  degree_url?: string;
}

const AdminDashboardPage = () => {
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  const token = useAuthStore((state) => state.token);

  const fetchPendingDoctors = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      // NOTE: Your backend router for admin routes is at '/admin', 
      // but you included it in main.py with another '/admin' prefix.
      // The final URL is '/admin/admin/doctors/pending'.
      // Make sure your main.py inclusion is correct. If it is, this URL is correct.
      // If you removed the prefix from admin_routes.py, then the URL is '/admin/doctors/pending'.
      // I'll assume the prefix in main.py is the source of truth.
      const response = await axiosInstance.get('/admin/doctors/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch pending doctors", error);
      setMessage("Could not load doctor applications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, [token]);
  
  const handleVerification = async (doctorId: string, newStatus: 'verified' | 'rejected') => {
    try {
        // Updated to call the single PATCH endpoint and send data in the body
        await axiosInstance.patch(
            `/admin/doctors/${doctorId}/status`, 
            { status: newStatus }, // The new status is now sent in the request body
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        setMessage(`Doctor has been successfully ${newStatus}.`);
        setPendingDoctors(prev => prev.filter(doc => doc.doctor_id !== doctorId));
    } catch (error: any) {
        const detail = error.response?.data?.detail || "An error occurred. Please try again.";
        setMessage(`Error: ${detail}`);
        // Clear the message after a few seconds
        setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-dark-text mb-8">Admin Dashboard</h1>
        <h2 className="text-2xl font-semibold text-dark-subtle mb-6">Pending Doctor Verifications</h2>
        
        {message && <p className="text-center text-green-400 mb-4 bg-dark-card p-3 rounded-md">{message}</p>}

        {isLoading ? <p className="text-center text-dark-subtle">Loading applications...</p> : (
          <div className="space-y-4">
            {pendingDoctors.length > 0 ? pendingDoctors.map(doc => (
              <div key={doc.doctor_id} className="bg-dark-card p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-slate-700">
                <div className="flex-grow">
                  <p className="font-bold text-lg text-dark-text">{doc.full_name} <span className="text-sm font-normal text-dark-subtle">- {doc.specialty}</span></p>
                  <p className="text-dark-subtle text-sm">{doc.email}</p>
                  <div className="flex gap-4 mt-2">
                      <a href={doc.photo_url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-semibold">View Photo</a>
                      <a href={doc.degree_url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-semibold">View Degree</a>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleVerification(doc.doctor_id, 'verified')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">Verify</button>
                  <button onClick={() => handleVerification(doc.doctor_id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">Reject</button>
                </div>
              </div>
            )) : <p className="text-dark-subtle text-center py-8">No pending doctor applications.</p>}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
export default AdminDashboardPage;