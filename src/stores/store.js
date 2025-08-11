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
      accountHoldingsByAccount: {},
      setBrokeragesAndAccounts: (data) => set({ brokeragesAndAccounts: data }),
      addBrokeragesAndAccounts: (items) =>
        set((state) => ({
          brokeragesAndAccounts: [
            ...(Array.isArray(state.brokeragesAndAccounts) ? state.brokeragesAndAccounts : []),
            ...items,
          ],
        })),
      // New: upsert a single brokerage account (stores holdings on the element itself)
      upsertBrokerageAccount: (item) =>
        set((state) => {
          const list = Array.isArray(state.brokeragesAndAccounts)
            ? [...state.brokeragesAndAccounts]
            : [];
          const accountKey = String(item.Account || item.id || "");
          const idx = list.findIndex((x) => String(x.Account || x.id || "") === accountKey);
          const mergeHoldings = (target, src) => {
            const accountHoldings = Array.isArray(src?.accountHoldings)
              ? src.accountHoldings
              : Array.isArray(src?.holdings)
              ? src.holdings
              : undefined;
            if (accountHoldings) {
              return { ...target, accountHoldings, holdings: accountHoldings };
            }
            return target;
          };
          if (idx >= 0) {
            let updated = { ...list[idx], ...item };
            updated = mergeHoldings(updated, item);
            list[idx] = updated;
          } else {
            const base = { ...item };
            const withHoldings = mergeHoldings(base, item);
            // ensure both props exist at least as arrays
            if (!Array.isArray(withHoldings.accountHoldings)) withHoldings.accountHoldings = [];
            if (!Array.isArray(withHoldings.holdings))
              withHoldings.holdings = withHoldings.accountHoldings;
            list.push(withHoldings);
          }
          return { brokeragesAndAccounts: list };
        }),
      setAccountHoldings: (holdings) => set({ accountHoldings: holdings }),
      setAccountHoldingsForAccount: (accountId, holdings) =>
        set((state) => {
          const byAccount = {
            ...(state.accountHoldingsByAccount || {}),
            [accountId]: holdings,
          };
          // Also persist holdings within the brokeragesAndAccounts array element (both keys)
          const list = Array.isArray(state.brokeragesAndAccounts)
            ? state.brokeragesAndAccounts.map((x) => {
                const key = String(x.Account || x.id || "");
                if (key === String(accountId)) {
                  return { ...x, accountHoldings: holdings, holdings };
                }
                return x;
              })
            : [];
          return { accountHoldingsByAccount: byAccount, brokeragesAndAccounts: list };
        }),

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
          accountHoldingsByAccount: {},
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
          accountHoldingsByAccount: {},
          brokeragesAndAccounts: [],
          snapTradeAccounts: [],
          snapTradeHoldings: [],
        });
      },

      // Remove all data for a given brokerage name (manual and connected)
      unlinkBrokerage: (brokerageName) =>
        set((state) => {
          const norm = (s) =>
            String(s || "")
              .trim()
              .toLowerCase();
          const target = norm(brokerageName);

          // Determine which manual accounts (by Account string) will be removed
          const originalManual = Array.isArray(state.brokeragesAndAccounts)
            ? state.brokeragesAndAccounts
            : [];
          const removedAccountIds = new Set(
            originalManual
              .filter((item) => {
                const accountRaw = String(item.Account || "");
                const [namePart] = accountRaw.split(" - ");
                return norm(namePart) === target;
              })
              .map((item) => String(item.Account || item.id || ""))
          );

          // Filter brokeragesAndAccounts
          const brokeragesAndAccounts = originalManual.filter((item) => {
            const accountRaw = String(item.Account || "");
            const [namePart] = accountRaw.split(" - ");
            return norm(namePart) !== target;
          });

          // Remove per-account holdings for removed accounts
          const accountHoldingsByAccount = Object.fromEntries(
            Object.entries(state.accountHoldingsByAccount || {}).filter(
              ([accountId]) => !removedAccountIds.has(String(accountId))
            )
          );

          // Remove any generic accounts and SnapTrade accounts for this brokerage
          const accounts = (state.accounts || []).filter((a) => norm(a.brokerageName) !== target);
          const snapTradeAccounts = (state.snapTradeAccounts || []).filter(
            (a) => norm(a.brokerageName) !== target
          );

          // If we removed anything, clear legacy flat holdings
          const accountHoldings =
            Array.isArray(brokeragesAndAccounts) && brokeragesAndAccounts.length > 0
              ? state.accountHoldings
              : [];

          return {
            brokeragesAndAccounts,
            accountHoldingsByAccount,
            accounts,
            snapTradeAccounts,
            accountHoldings,
          };
        }),
    }),
    {
      name: "app-storage", // name of the item in storage
      getStorage: () => localStorage,
      partialize: (state) => ({
        brokeragesAndAccounts: state.brokeragesAndAccounts,
        accountHoldings: state.accountHoldings,
        accountHoldingsByAccount: state.accountHoldingsByAccount,
        accounts: state.accounts,
        snapTradeAccounts: state.snapTradeAccounts,
        snapTradeHoldings: state.snapTradeHoldings,
      }),
    }
  )
);
