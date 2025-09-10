// File: clinic-frontend/src/pages/RegisterPage.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';

const RegisterPage = ({ onNavigate }: { onNavigate: (page: string) => void; }) => {
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');

  // --- YOUR PATIENT FORM LOGIC (UNCHANGED) ---
  const PatientForm = ({ onNavigate }: { onNavigate: (page: string) => void; }) => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      try {
        const response = await axiosInstance.post('/auth/register/patient', {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
        alert('Patient registration successful!');
        onNavigate('login');
      } catch (error: any) {
        alert(`Registration failed: ${error.response?.data?.detail || 'Server error'}`);
      }
    };

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-md font-semibold hover:bg-sky-600 transition-colors">Create Patient Account</button>
      </form>
    );
  };

  // --- YOUR DOCTOR FORM LOGIC (UNCHANGED) ---
  const DoctorForm = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Doctor registration form submitted! API connection for this form will be implemented later.");
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
          <input type="text" placeholder="Specialty (e.g., Cardiologist)" required className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        </div>
        <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <input type="password" placeholder="Password" required className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <textarea placeholder="Short Bio" className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue h-24" />
        <div>
          <label className="block text-sm font-medium text-dark-subtle mb-1">Your Photo</label>
          <input type="file" required className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-dark-text hover:file:bg-slate-600"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-subtle mb-1">Degree Certificate</label>
          <input type="file" required className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-dark-text hover:file:bg-slate-600"/>
        </div>
        <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-md font-semibold hover:bg-sky-600 transition-colors">Create Doctor Account</button>
      </form>
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full space-y-8 bg-dark-card p-10 rounded-2xl shadow-2xl shadow-black/40 border border-slate-700"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-text">
            Create an account
          </h2>
        </div>
        <div className="flex justify-center border-b border-slate-700">
          <button onClick={() => setActiveTab('patient')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'patient' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>
            I am a Patient
          </button>
          <button onClick={() => setActiveTab('doctor')} className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'doctor' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-dark-subtle'}`}>
            I am a Doctor
          </button>
        </div>
        <div className="mt-8">
          {activeTab === 'patient' ? <PatientForm onNavigate={onNavigate} /> : <DoctorForm />}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;