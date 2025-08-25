import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/useAuthStore";
import { useAppStore } from "stores/store";
import supabaseService from "services/supabaseService";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

async function fetchSnapTradeAccounts(userId, userSecret) {
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
    console.error("SnapTrade API call failed with status:", res.status);
    throw new Error(`SnapTrade accounts fetch error: ${res.status}`);
  }

  return await res.json();
}

export default function SnapTradeRedirect() {
  const navigate = useNavigate();
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

        setSnapTradeAccounts(result.accounts);

        const allHoldings = result.accounts.flatMap((acct) => acct.holdings || []);
        setSnapTradeHoldings(allHoldings);

        navigate("/brokeragesAndAccounts");
      } catch (e) {
        console.error("SnapTradeRedirect error:", e);
      }
    }
    load();
  }, [user, userSecret, setSnapTradeAccounts, setSnapTradeHoldings]);

  return null;
}
