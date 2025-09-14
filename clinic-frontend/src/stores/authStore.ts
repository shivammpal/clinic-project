// File: clinic-frontend/src/stores/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  role: 'patient' | 'doctor' | 'admin' | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token) => {
        try {
          const decodedToken: { user_id: string, role: User['role'] } = jwtDecode(token);
          const user: User = { id: decodedToken.user_id, role: decodedToken.role };
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          console.error("Failed to decode token:", error);
          set({ token: null, user: null, isAuthenticated: false });
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
