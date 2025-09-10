// File: clinic-frontend/src/pages/LandingPage.tsx

import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <main className="relative overflow-hidden">
      {/* Background Gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-emerald-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text Content */}
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
            >
              Quality Healthcare,
              <br />
              <span className="text-sky-500">One Click Away.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-md mx-auto md:mx-0 text-lg text-slate-600"
            >
              Connect with certified doctors, manage your health records, and get prescriptions online, anytime and anywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex justify-center md:justify-start gap-4"
            >
              <a href="#" className="bg-sky-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-sky-600 transition-all duration-300 shadow-lg transform hover:scale-105">
                Book an Appointment
              </a>
              <a href="#" className="bg-white text-slate-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg transform hover:scale-105">
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right Side: 3D Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
            className="hidden md:block w-full h-96 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-3xl shadow-2xl flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">
              [ 3D Interactive Model Placeholder ]
            </span>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;