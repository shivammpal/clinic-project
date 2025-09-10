// File: clinic-frontend/src/components/Navbar.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import AccountDropdown from './AccountDropdown';
import type { NavigateFunction, Page } from '../App';

type NavbarProps = {
  onNavigate: NavigateFunction;
};

const Navbar = ({ onNavigate }: NavbarProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const Logo = () => ( <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#0ea5e9" /> <path d="M12 12L22 7" stroke="white" strokeWidth="1.5" /> <path d="M12 12V22" stroke="white" strokeWidth="1.5" /> <path d="M12 12L2 7" stroke="white" strokeWidth="1.5" /> <path d="M17 4.5L7 9.5" stroke="white" strokeWidth="1.5" /> </svg> );
  
  const primaryLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Our Doctors", page: "doctors" },
    { label: "About Us", page: "about" },
    { label: "Blog", page: "blog" },
  ];

  const moreLinks: { label: string; page: Page }[] = [
    { label: "Contact Us", page: "contact" },
    { label: "FAQ", page: "faq" },
    { label: "Privacy Policy", page: "privacy" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-dark-card/80 backdrop-blur-lg border-b border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo />
            <span className="text-2xl font-bold text-brand-blue">MediConnect</span>
          </div>

          {/* This new div will group everything on the right */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {primaryLinks.map((link) => (
                <button key={link.label} onClick={() => onNavigate(link.page)} className="text-dark-subtle hover:text-brand-blue font-medium transition-colors duration-300">
                  {link.label}
                </button>
              ))}

              <div className="relative">
                <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="flex items-center gap-1 text-dark-subtle hover:text-brand-blue font-medium transition-colors duration-300">
                  More
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-xl z-20 border border-slate-700"
                    >
                      {moreLinks.map((link) => (
                         <button
                            key={link.label}
                            onClick={() => { onNavigate(link.page); setIsMoreOpen(false); }}
                            className="w-full text-left block px-4 py-2 text-sm text-dark-text hover:bg-slate-700/50"
                          >
                            {link.label}
                          </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <AccountDropdown onNavigate={onNavigate} />
              ) : (
                <>
                  <button onClick={() => onNavigate('login')} className="text-dark-subtle hover:text-brand-blue font-medium transition-colors duration-300">
                    Log In
                  </button>
                  <button onClick={() => onNavigate('register')} className="bg-brand-blue text-white px-4 py-2 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 shadow-sm">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">{/* Mobile Menu Button Placeholder */}</div>
        </div>
      </div>
    </motion.nav>
  );
};
export default Navbar;