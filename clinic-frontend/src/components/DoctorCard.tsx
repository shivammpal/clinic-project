// File: clinic-frontend/src/components/DoctorCard.tsx

import { motion } from 'framer-motion';
import type { NavigateFunction } from '../App';

type Doctor = {
  doctor_id: string;
  full_name: string;
  specialty: string;
  photo_url: string | null;
};

type DoctorCardProps = {
  doctor: Doctor;
  onNavigate: NavigateFunction;
};

const DoctorCard = ({ doctor, onNavigate }: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-dark-card rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/20"
    >
      <img
        className="w-full h-56 object-cover object-center"
        src={doctor.photo_url || `https://placehold.co/400x300/1e293b/e2e8f0?text=Dr.+${doctor.full_name.split(' ').pop()}`}
        alt={`Photo of Dr. ${doctor.full_name}`}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-text">{doctor.full_name}</h3>
        <p className="text-brand-blue font-semibold mt-1">{doctor.specialty}</p>
        <button 
          onClick={() => onNavigate('doctorProfile', doctor.doctor_id)}
          className="mt-4 w-full bg-brand-blue text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;