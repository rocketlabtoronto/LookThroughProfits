import React, { useEffect } from "react";
import { useAuthStore } from "stores/useAuthStore";
import { useAppStore } from "stores/store";
import supabaseService from "services/supabaseService";

const SUPABASE_URL = "https://ioggynmosufvlozhlhta.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZ2d5bm1vc3VmdmxvemhsaHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NjAwNjYsImV4cCI6MjA2ODAzNjA2Nn0.GAeN2VyPAMWaB3GzDswQ2CH2YPpFP2KizRpRNBQbiEE";

async function fetchSnapTradeAccounts(userId, userSecret) {
  // Call a new Supabase Edge Function (to be implemented) that fetches accounts, holdings, and details
  const res = await fetch(`${SUPABASE_URL}/functions/v1/snaptrade-accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ userId, userSecret }),
  });
  if (!res.ok) {
    throw new Error(`SnapTrade accounts fetch error: ${res.status}`);
  }
  return await res.json();
}

export default function SnapTradeRedirect() {
  const user = useAuthStore((state) => state.user);
  const userSecret = useAuthStore((state) => state.snapUserSecret);

  const setSnapTradeAccounts = useAppStore((state) => state.setSnapTradeAccounts);
  const setSnapTradeHoldings = useAppStore((state) => state.setSnapTradeHoldings);

  useEffect(() => {
    async function load() {
      try {
        if (!user?.email || !userSecret) {
          throw new Error("Missing user or SnapTrade secret");
        }
        const result = await fetchSnapTradeAccounts(user.email, userSecret);
        // Save accounts and all holdings to Zustand store (persisted)
        setSnapTradeAccounts(result.accounts);
        // Flatten all holdings from all accounts into a single array
        const allHoldings = result.accounts.flatMap((acct) => acct.holdings || []);
        setSnapTradeHoldings(allHoldings);
      } catch (e) {
        // Optionally handle error (e.g., log or redirect)
      }
    }
    load();
  }, [user, userSecret, setSnapTradeAccounts, setSnapTradeHoldings]);

  // No visible output; only business logic is executed.
  return null;
}
