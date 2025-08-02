// === SnapTrade Accounts Edge Function ===
// This function receives a POST request with userId and userSecret, fetches all SnapTrade accounts for the user,
// and for each account, fetches holdings and account details. Returns a combined data model.
// Import Deno HTTP server, Supabase client (not used here, but available), and SnapTrade SDK
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Snaptrade } from "npm:snaptrade-typescript-sdk";

serve(async (req) => {
  // === Environment Variables ===
  // These are set in the Supabase Edge Function environment
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const SNAPTRADE_CLIENT_ID = Deno.env.get("SNAPTRADE_CLIENT_ID");
  const SNAPTRADE_CONSUMER_KEY = Deno.env.get("SNAPTRADE_CONSUMER_KEY");

  // === CORS Headers ===
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  };

  // === Handle CORS Preflight ===
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  // === Parse and Validate Request Body ===
  // Expecting a JSON body with userId and userSecret
  let userId, userSecret;
  try {
    const body = await req.json();
    userId = body.userId;
    userSecret = body.userSecret;
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid userId/userSecret in request body" }),
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }

  if (!userId || !userSecret) {
    return new Response(JSON.stringify({ error: "Missing userId or userSecret in request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // === Initialize SnapTrade SDK ===
  const snaptrade = new Snaptrade({
    clientId: SNAPTRADE_CLIENT_ID,
    consumerKey: SNAPTRADE_CONSUMER_KEY,
  });

  try {
    // === Step 1: Get all accounts for the user ===
    const accountsRes = await snaptrade.accountInformation.listUserAccounts({
      userId,
      userSecret,
    });
    const accounts = accountsRes.data;

    // === Step 2: For each account, get holdings and details ===
    const accountsWithData = await Promise.all(
      accounts.map(async (account) => {
        // Fetch holdings and details in parallel
        const [holdingsRes, detailsRes] = await Promise.all([
          snaptrade.accountInformation.getUserHoldings({
            userId,
            userSecret,
            accountId: account.id,
          }),
          snaptrade.accountInformation.getUserAccountDetails({
            userId,
            userSecret,
            accountId: account.id,
          }),
        ]);
        /*
         * Purpose: Build a unified data object for each SnapTrade account.
         *
         * - id: Unique identifier for the account (used for further API calls)
         * - name: Human-readable account name (e.g., "My Brokerage Account")
         * - type: Account type (e.g., "CASH", "MARGIN", etc.)
         * - details: All metadata/details about the account (from getUserAccountDetails)
         * - holdings: Array of all holdings/assets in the account (from getUserHoldings)
         *
         * This structure makes it easy for the frontend to display all relevant account info
         * and holdings in a single, organized object per account.
         */
        return {
          id: account.id,
          name: account.name,
          type: account.type,
          details: detailsRes.data,
          holdings: holdingsRes.data,
        };
      })
    );

    // === Step 3: Return the combined data model ===
    return new Response(JSON.stringify({ accounts: accountsWithData }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    // === Error Handling ===
    return new Response(
      JSON.stringify({ error: err.message || "Failed to fetch SnapTrade account data" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
