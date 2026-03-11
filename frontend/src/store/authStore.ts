import { create } from "zustand";
import type { UserRole } from "@/types/api";

interface AuthState {
  clientName: string;
  baseLimit: number;
  role: UserRole;
  token: string;
  setClientName: (name: string) => void;
  setBaseLimit: (limit: number) => void;
  setRole: (role: UserRole) => void;
  setToken: (token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  clientName: "clientA",
  baseLimit: 5,
  role: "FREE",
  token: "",
  setClientName: (clientName) => set({ clientName }),
  setBaseLimit: (baseLimit) => set({ baseLimit }),
  setRole: (role) => set({ role }),
  setToken: (token) => set({ token }),
  clearSession: () =>
    set({
      token: "",
      clientName: "clientA",
      baseLimit: 5,
      role: "FREE",
    }),
}));
