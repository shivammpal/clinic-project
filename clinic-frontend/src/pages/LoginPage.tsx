// File: clinic-frontend/src/pages/LoginPage.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios'; // ✅ use direct axios for full control
import type { NavigateFunction } from '../App';

type LoginPageProps = {
  onNavigate: NavigateFunction;
};

const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // ✅ send as form-data, not JSON
    const formData = new URLSearchParams();
    formData.append('username', email); // backend expects "username"
    formData.append('password', password);

    try {
      const response = await axios.post(
        'https://clinic-project-53n7.onrender.com', // ✅ full backend URL
        formData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      const { access_token } = response.data;
      login(access_token);
      alert('Login successful!');
      onNavigate('home');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full space-y-8 bg-dark-card p-10 rounded-2xl shadow-2xl shadow-black/40 border border-slate-700"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-text">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md text-center"
              role="alert"
            >
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-md placeholder-slate-400 text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-blue text-white py-3 rounded-md font-semibold hover:bg-sky-600 transition-colors disabled:bg-sky-800"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
