import { create } from "zustand";

// App-wide store
const useAppStore = create((set) => ({
  brokeragesAndAccounts: [],
  accountHoldings: [],
  setBrokeragesAndAccounts: (data) => set({ brokeragesAndAccounts: data }),
  setAccountHoldings: (holdings) => set({ accountHoldings: holdings }),
}));

// Auth store
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export { useAppStore, useAuthStore };
