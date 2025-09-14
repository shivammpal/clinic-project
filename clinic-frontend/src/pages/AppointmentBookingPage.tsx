// File: clinic-frontend/src/pages/AppointmentBookingPage.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import type { NavigateFunction } from '../App';
// Mock data for available time slots. In the future, this will come from the backend.
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
];



// Define props to receive doctor info and navigation function
type AppointmentBookingPageProps = {
  doctorId: string;
  doctorName: string; // We'll pass the doctor's name for a better UX
  onNavigate: NavigateFunction;
};

const AppointmentBookingPage = ({ doctorId, doctorName, onNavigate }: AppointmentBookingPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };
  
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    try {
      const response = await axiosInstance.post('/users/me/appointments', {
        doctor_id: doctorId,
        appointment_date: selectedDate.toISOString(),
        appointment_time: selectedTime,
        reason: "General Consultation", // Could be extended to a form input
        notes: ""
      });
      alert(`Booking confirmed for Dr. ${doctorName} on ${selectedDate.toDateString()} at ${selectedTime}.`);
    } catch (error) {
      console.error("Failed to book appointment", error);
      alert("Failed to book appointment. Please try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-dark-text">Book an Appointment</h1>
          <p className="mt-2 text-lg text-dark-subtle">
            You are booking a session with <span className="text-brand-blue font-bold">{doctorName}</span>.
          </p>
        </div>

        <div className="mt-12 bg-dark-card p-8 rounded-2xl shadow-xl border border-slate-700 grid md:grid-cols-2 gap-12">
          {/* Left Side: Date Picker */}
          <div>
            <h2 className="text-2xl font-bold text-dark-text">1. Select a Date</h2>
            <div className="mt-4">
              <input
                type="date"
                onChange={handleDateChange}
                // Sets the minimum date to today
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          {/* Right Side: Time Slot Picker */}
          <div>
            <h2 className="text-2xl font-bold text-dark-text">2. Choose a Time Slot</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-center font-semibold transition-colors
                    ${selectedTime === time 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-slate-700/50 hover:bg-slate-600'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className="bg-brand-blue text-white font-bold py-4 px-12 text-lg rounded-lg shadow-lg hover:bg-sky-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentBookingPage;