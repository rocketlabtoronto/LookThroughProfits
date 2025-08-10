import { create } from "zustand";
import { persist } from "zustand/middleware";

// Dummy data configuration
const USE_DUMMY_DATA = false; // Set to false to use real data

const dummyAccounts = [
  {
    id: "acc_1",
    brokerageName: "Questrade",
    brokerageLogo: "/logos/questrade.png",
    accountType: "TFSA",
    accountNumber: "12345678",
    balance: 15000,
    included: true,
    holdings: [{ symbol: "AAPL", shares: 100, currentPrice: 150.0, marketValue: 15000 }],
  },
  {
    id: "acc_2",
    brokerageName: "Questrade",
    brokerageLogo: "/logos/questrade.png",
    accountType: "RRSP",
    accountNumber: "87654321",
    balance: 24000,
    included: false,
    holdings: [{ symbol: "TSLA", shares: 30, currentPrice: 800.0, marketValue: 24000 }],
  },
  {
    id: "acc_3",
    brokerageName: "Wealthsimple",
    brokerageLogo: "/logos/wealthsimple.png",
    accountType: "Taxable",
    accountNumber: "WS123456",
    balance: 60000,
    included: true,
    holdings: [{ symbol: "SPY", shares: 150, currentPrice: 400.0, marketValue: 60000 }],
  },
  {
    id: "acc_4",
    brokerageName: "TD Direct Investing",
    brokerageLogo: "/logos/TD.png",
    accountType: "TFSA",
    accountNumber: "TD789012",
    balance: 48000,
    included: true,
    holdings: [{ symbol: "SHOP", shares: 80, currentPrice: 600.0, marketValue: 48000 }],
  },
];

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Excel-uploaded data
      brokeragesAndAccounts: [],
      accountHoldings: [],
      setBrokeragesAndAccounts: (data) => set({ brokeragesAndAccounts: data }),
      addBrokeragesAndAccounts: (items) =>
        set((state) => ({
          brokeragesAndAccounts: [
            ...(Array.isArray(state.brokeragesAndAccounts) ? state.brokeragesAndAccounts : []),
            ...items,
          ],
        })),
      setAccountHoldings: (holdings) => set({ accountHoldings: holdings }),

      // Account-based data (similar to SnapTrade structure)
      accounts: USE_DUMMY_DATA ? dummyAccounts : [],
      setAccounts: (accounts) => set({ accounts }),

      // SnapTrade data
      snapTradeAccounts: [],
      snapTradeHoldings: [],
      setSnapTradeAccounts: (accounts) => set({ snapTradeAccounts: accounts }),
      setSnapTradeHoldings: (holdings) => set({ snapTradeHoldings: holdings }),

      // Helper function to populate dummy data
      loadDummyData: () => set({ accounts: dummyAccounts }),

      // Helper function to clear data
      clearData: () =>
        set({
          accounts: [],
          accountHoldings: [],
          brokeragesAndAccounts: [],
          snapTradeAccounts: [],
          snapTradeHoldings: [],
        }),

      // Helper function to reset storage completely
      resetStorage: () => {
        localStorage.removeItem("app-storage");
        set({
          accounts: [],
          accountHoldings: [],
          brokeragesAndAccounts: [],
          snapTradeAccounts: [],
          snapTradeHoldings: [],
        });
      },
    }),
    {
      name: "app-storage", // name of the item in storage
      getStorage: () => localStorage,
      partialize: (state) => ({
        brokeragesAndAccounts: state.brokeragesAndAccounts,
        accountHoldings: state.accountHoldings,
        accounts: state.accounts,
        snapTradeAccounts: state.snapTradeAccounts,
        snapTradeHoldings: state.snapTradeHoldings,
      }),
    }
  )
);
