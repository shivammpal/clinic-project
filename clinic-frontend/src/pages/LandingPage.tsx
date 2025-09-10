// File: clinic-frontend/src/pages/LandingPage.tsx

import { motion } from 'framer-motion';
import type { NavigateFunction } from '../App';

// We have removed the auth store import because it is not needed here.

type LandingPageProps = {
  onNavigate: NavigateFunction;
};

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <main className="relative overflow-hidden bg-dark-bg">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-sky-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-text leading-tight tracking-tight"
            >
              Quality Healthcare,
              <br />
              <span className="text-brand-blue">One Click Away.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-md mx-auto md:mx-0 text-lg text-dark-subtle"
            >
              Connect with certified doctors, manage your health records, and get prescriptions online, anytime and anywhere.
            </motion.p>
            
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              {/* --- THIS IS THE ONLY CHANGE --- */}
              {/* This button now directly navigates to the 'doctors' page. No other logic. */}
              <motion.button
                onClick={() => onNavigate('doctors')}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-brand-blue/20"
              >
                Book an Appointment
              </motion.button>
              <motion.button
                onClick={() => onNavigate('about')}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                className="bg-dark-card text-dark-text px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-black/30"
              >
                Learn More
              </motion.button>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
            className="hidden md:block w-full h-96 bg-gradient-to-br from-sky-900 via-slate-800 to-emerald-900 rounded-3xl shadow-2xl flex items-center justify-center border border-slate-700"
          >
            <span className="text-dark-subtle font-bold text-2xl">
              [ 3D Interactive Model Placeholder ]
            </span>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;