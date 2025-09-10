// File: clinic-frontend/src/components/Footer.tsx

import type { NavigateFunction } from '../App';

type FooterProps = {
  onNavigate: NavigateFunction;
};

const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-dark-card text-dark-subtle pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-dark-text mb-4">MediConnect</h3>
          <p className="text-sm">Your trusted partner in digital healthcare.</p>
        </div>
        <div>
          <h4 className="font-semibold text-dark-text mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-blue transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-brand-blue transition-colors">Services</button></li>
            <li><button onClick={() => onNavigate('doctors')} className="hover:text-brand-blue transition-colors">Our Doctors</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-blue transition-colors">Contact</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-dark-text mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-brand-blue transition-colors">Privacy Policy</button></li>
            <li><button className="hover:text-brand-blue transition-colors">Terms of Service</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-dark-text mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('faq')} className="hover:text-brand-blue transition-colors">FAQ</button></li>
            <li><button onClick={() => onNavigate('emergency')} className="hover:text-brand-blue transition-colors">Emergency</button></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;