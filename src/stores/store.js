import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      // Excel-uploaded data
      brokeragesAndAccounts: [],
      accountHoldings: [],
      setBrokeragesAndAccounts: (data) => set({ brokeragesAndAccounts: data }),
      setAccountHoldings: (holdings) => set({ accountHoldings: holdings }),

      // SnapTrade data
      snapTradeAccounts: [],
      snapTradeHoldings: [],
      setSnapTradeAccounts: (accounts) => set({ snapTradeAccounts: accounts }),
      setSnapTradeHoldings: (holdings) => set({ snapTradeHoldings: holdings }),
    }),
    {
      name: "app-storage", // name of the item in storage
      getStorage: () => localStorage,
      partialize: (state) => ({
        brokeragesAndAccounts: state.brokeragesAndAccounts,
        accountHoldings: state.accountHoldings,
        snapTradeAccounts: state.snapTradeAccounts,
        snapTradeHoldings: state.snapTradeHoldings,
      }),
    }
  )
);
