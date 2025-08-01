import { create } from "zustand";

// Auth store
const useAuthStore = create((set) => ({
  user: null,
  snapUserSecret: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export { useAuthStore };
