import { create } from "zustand";

const useAppStore = create((set) => ({
  brokeragesAndAccounts: [],
  accountHoldings: [],
  setBrokeragesAndAccounts: (data) => set({ brokeragesAndAccounts: data }),
  setAccountHoldings: (holdings) => set({ accountHoldings: holdings }),
}));

export { useAppStore };
