// File: clinic-frontend/src/components/AccountDropdown.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import type { NavigateFunction, Page } from '../App';
type AccountDropdownProps = {
  onNavigate: NavigateFunction;
};

const AccountDropdown = ({ onNavigate }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // *** THIS IS THE FIX ***
  // We select the specific values we need. This is a more stable way to
  // subscribe and prevents the infinite re-render loop.
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const dashboardPage: Page = user?.role === 'doctor' ? 'doctorDashboard' : 'patientDashboard';
  const dashboardLabel = user?.role === 'doctor' ? 'Doctor Dashboard' : 'My Dashboard';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)} // Close dropdown when it loses focus
        className="flex items-center justify-center w-10 h-10 bg-brand-blue rounded-full text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-blue"
      >
        {user?.role?.charAt(0).toUpperCase() || 'U'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-xl z-20 border border-slate-700 origin-top-right"
          >
            <button
              onMouseDown={() => { onNavigate(dashboardPage); setIsOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-dark-text hover:bg-slate-700/50"
            >
              {dashboardLabel}
            </button>
            <button
              onMouseDown={() => { onNavigate('settings'); setIsOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-dark-text hover:bg-slate-700/50"
            >
              Settings
            </button>
            <div className="border-t border-slate-700"></div>
            <button
              onMouseDown={() => {
                logout();
                setIsOpen(false);
                onNavigate('home');
              }}
              className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;