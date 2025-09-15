// File: clinic-frontend/src/pages/LandingPage.tsx

import { motion } from 'framer-motion';
import type { NavigateFunction } from '../App';
import RotatingBrain from '../components/RotatingBrain';

// We have removed the auth store import because it is not needed here.

type LandingPageProps = {
  onNavigate: NavigateFunction;
};

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative overflow-hidden bg-dark-bg" style={{ perspective: '1000px' }}>
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
            <iframe
              className="w-full h-full rounded-3xl"
              src="https://www.youtube.com/embed/6S_z6NEQ4y8?si=O94Z3QTX9iE0jviO"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* New Content Section: Image and Text Side by Side */}
      <section className="py-16 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Medical consultation"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-6">
                Expert Medical Care at Your Fingertips
              </h2>
              <p className="text-lg text-dark-subtle mb-8 leading-relaxed">
                Our team of certified healthcare professionals is dedicated to providing you with the highest quality medical care. From routine check-ups to specialized treatments, we're here to support your health journey.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full font-semibold">
                  24/7 Support
                </div>
                <div className="bg-sky-400/10 text-sky-400 px-4 py-2 rounded-full font-semibold">
                  Certified Doctors
                </div>
                <div className="bg-emerald-400/10 text-emerald-400 px-4 py-2 rounded-full font-semibold">
                  Secure & Private
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section with Image Background and Text Overlay */}
      <section className="relative py-32 bg-gradient-to-r from-brand-blue to-sky-600 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Health, Our Priority
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience healthcare that puts you first. With our comprehensive services and compassionate care, we're committed to helping you achieve optimal health and wellness.
            </p>
            <motion.button
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-blue px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Styled Text Sections for Clinic Features */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
              Why Choose Our Clinic?
            </h2>
            <p className="text-lg text-dark-subtle max-w-2xl mx-auto">
              Discover the advantages that make us the preferred choice for healthcare services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-700"
            >
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-4 text-center">Fast & Efficient</h3>
              <p className="text-dark-subtle text-center leading-relaxed">
                Quick appointment scheduling and minimal wait times ensure you get the care you need when you need it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-700"
            >
              <div className="w-16 h-16 bg-sky-400/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-4 text-center">Quality Care</h3>
              <p className="text-dark-subtle text-center leading-relaxed">
                Our experienced medical professionals provide comprehensive care with the latest medical technology and treatments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-700"
            >
              <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-4 text-center">Secure & Private</h3>
              <p className="text-dark-subtle text-center leading-relaxed">
                Your health information is protected with state-of-the-art security measures and strict privacy protocols.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Brain Component Section */}
      <section className="py-16 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
              Advanced Neurological Care
            </h2>
            <p className="text-lg text-dark-subtle max-w-2xl mx-auto">
              Experience cutting-edge neurological diagnostics and treatments with our state-of-the-art 3D visualization technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl font-bold text-dark-text mb-6">
                Precision Brain Mapping
              </h3>
              <p className="text-dark-subtle mb-8 leading-relaxed">
                Our advanced 3D brain visualization technology allows for precise mapping and analysis of neurological conditions. This interactive model demonstrates how we approach complex brain-related healthcare challenges.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-purple-400/10 text-purple-400 px-4 py-2 rounded-full font-semibold">
                  3D Visualization
                </div>
                <div className="bg-indigo-400/10 text-indigo-400 px-4 py-2 rounded-full font-semibold">
                  Neurological Care
                </div>
                <div className="bg-pink-400/10 text-pink-400 px-4 py-2 rounded-full font-semibold">
                  Advanced Diagnostics
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <RotatingBrain />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;