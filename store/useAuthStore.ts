import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'ADMIN_GUDANG' | 'ADMIN_CSSD' | 'PERAWAT' | 'MANAJER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  unit: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: Role | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,
      login: (user) => set({ isAuthenticated: true, user, role: user.role }),
      logout: () => set({ isAuthenticated: false, user: null, role: null }),
    }),
    {
      name: 'bekalin-auth',
    }
  )
);
