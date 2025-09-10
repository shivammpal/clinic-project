// File: clinic-frontend/src/stores/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  // We can add more user details here later, like email or role
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  // The 'persist' middleware automatically saves the store's state to localStorage
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token) => {
        try {
          const decodedToken: { sub: string } = jwtDecode(token);
          const user: User = { id: decodedToken.sub };
          set({ token, user, isAuthenticated: true });
        } catch (error) {
          console.error("Failed to decode token:", error);
          // Handle invalid token case
          set({ token: null, user: null, isAuthenticated: false });
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // The key to use for storing in localStorage
    }
  )
);