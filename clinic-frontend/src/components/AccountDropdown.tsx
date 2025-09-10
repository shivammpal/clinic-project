// File: clinic-frontend/src/components/AccountDropdown.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Page } from '../App'; // Import the Page type

// Define props to accept the navigation function
type AccountDropdownProps = {
  onNavigate: (page: Page) => void;
};

const AccountDropdown = ({ onNavigate }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-brand-blue rounded-full text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-blue"
      >
        A
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-xl z-20 border border-slate-700"
          >
            <button
              onClick={() => { onNavigate('myProfile'); setIsOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-dark-text hover:bg-slate-700/50"
            >
              My Profile
            </button>
            <button
              onClick={() => { onNavigate('settings'); setIsOpen(false); }}
              className="w-full text-left block px-4 py-2 text-sm text-dark-text hover:bg-slate-700/50"
            >
              Settings
            </button>
            <div className="border-t border-slate-700"></div>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
                onNavigate('home'); // Go to home page after logout
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