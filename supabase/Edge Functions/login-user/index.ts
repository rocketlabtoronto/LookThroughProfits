import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Snaptrade } from "npm:snaptrade-typescript-sdk";

serve(async (req) => {
  // === ENVIRONMENT VARIABLES ===
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const SNAPTRADE_CLIENT_ID = Deno.env.get("SNAPTRADE_CLIENT_ID");
  const SNAPTRADE_CONSUMER_KEY = Deno.env.get("SNAPTRADE_CONSUMER_KEY");

  // === HEADERS FOR SUPABASE REST API ===
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  };

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  /**
   * LoginUserStep: Enumerates steps for login-user Edge Function error logging.
   * 90s are reserved for login-user steps.
   */
  enum LoginUserStep {
    ENTRYPOINT = 90,
    MISSING_USERID = 91,
    ENV_CHECK = 92,
    FETCH_USER_SECRET = 93,
    PRE_REGISTER = 94,
    PRE_LOGIN = 95,
    POST_LOGIN = 96,
    SNAPTRADE_LOGIN_API = 97,
    MISSING_USERSECRET = 98,
  }

  // --- Error Logging Service ---
  const logWebhookError = async (
    eventType: string,
    email: string,
    step: number,
    errorMsg: string
  ) => {
    const headers = {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/webhook_errors`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event_type: eventType,
        email,
        timestamp: new Date().toISOString(),
        error_message: errorMsg,
        step,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Webhook logging failed", res.status, text);
    }
  };

  // === CALL LOGGING IMMEDIATELY ON ENTRY ===
  try {
    const url = new URL(req.url);
    await logWebhookError(
      "login-user",
      "unknown",
      LoginUserStep.ENTRYPOINT,
      `Method: ${req.method}, Path: ${url.pathname}`
    );
  } catch (e) {
    console.error("Failed to log entrypoint event", e);
  }

  // === HANDLE CORS ===
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  let userId = undefined;
  let userSecret = undefined;
  try {
    const body = await req.json();
    userId = body.userId;
    userSecret = body.userSecret;
  } catch (e) {
    // If parsing fails, log and return error
    await logWebhookError(
      "login-user",
      "unknown",
      LoginUserStep.MISSING_USERID,
      "Failed to parse JSON body or missing userId"
    );
    return new Response(JSON.stringify({ error: "Missing or invalid userId in request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // === VALIDATE USER ID ===
  if (!userId) {
    await logWebhookError(
      "login-user",
      "unknown",
      LoginUserStep.MISSING_USERID,
      "userId not found in request body"
    );
    return new Response(JSON.stringify({ error: "Missing userId in request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // === USERSECRET CHECK ===
  if (!userId) {
    await logWebhookError(
      "login-user",
      "unknown",
      LoginUserStep.MISSING_USERSECRET,
      "userId not found in request body"
    );
    return new Response(JSON.stringify({ error: "Missing userSecret in request body" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // === ENV CHECK ===
  await logWebhookError(
    "login-user",
    userId,
    LoginUserStep.ENV_CHECK,
    `SNAPTRADE_CLIENT_ID: ${SNAPTRADE_CLIENT_ID}, SNAPTRADE_CONSUMER_KEY: ${SNAPTRADE_CONSUMER_KEY}`
  );
  const snaptrade = new Snaptrade({
    clientId: SNAPTRADE_CLIENT_ID,
    consumerKey: SNAPTRADE_CONSUMER_KEY,
  });

  // === GET USER SECRET ===
  const { data, error } = await supabase
    .from("users")
    .select("snapusersecret")
    .eq("email", userId)
    .single();

  if (error || !data?.snapusersecret) {
    await logWebhookError(
      "login-user",
      userId,
      LoginUserStep.FETCH_USER_SECRET,
      error?.message || "User secret not found"
    );
    return new Response(JSON.stringify({ error: "User secret not found" }), {
      status: 404,
      headers: corsHeaders,
    });
  }

  let secret = data.snapusersecret;
  // Validate all required fields for SnapTrade login
  if (!userId || !secret) {
    await logWebhookError(
      "login-user",
      userId || "unknown",
      LoginUserStep.SNAPTRADE_LOGIN_API,
      `Missing required login fields: userId: ${userId}, userSecret: ${secret}`
    );
    return new Response(
      JSON.stringify({
        error: `Missing required login fields. userId: ${userId}, userSecret: ${secret}`,
        status: 400,
      }),
      { status: 400, headers: corsHeaders }
    );
  }
  // Validate broker, connectionType, connectionPortalVersion, customRedirectUrl
  const broker = "ALPACA";
  const connectionType = "read-only";
  const connectionPortalVersion = "v4";
  const customRedirectUrl = "https://lookthroughprofits.com/snaptrade-redirect";
  if (!broker || !connectionType || !connectionPortalVersion || !customRedirectUrl) {
    await logWebhookError(
      "login-user",
      userId,
      LoginUserStep.SNAPTRADE_LOGIN_API,
      `Missing required static login fields: broker: ${broker}, connectionType: ${connectionType}, connectionPortalVersion: ${connectionPortalVersion}, customRedirectUrl: ${customRedirectUrl}`
    );
    return new Response(
      JSON.stringify({
        error: `Missing required static login fields.`,
        status: 400,
      }),
      { status: 400, headers: corsHeaders }
    );
  }
  try {
    const login = await snaptrade.authentication.loginSnapTradeUser({
      userId: userId,
      userSecret: secret,
    });

    await logWebhookError(
      "login-user",
      userId,
      LoginUserStep.PRE_LOGIN,
      "snaptrade.authentication.registerSnapTradeUser called"
    );

    return new Response(JSON.stringify(login.data), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err: any) {
    const msg = err?.response?.data || err?.message || "Unknown error";
    await logWebhookError("login-user", userId, LoginUserStep.SNAPTRADE_LOGIN_API, msg);

    return new Response(
      JSON.stringify({
        error: `Failed to get login link. userId: ${userId}, userSecret: ${secret}`,
        status: err?.response?.status || 500,
        snaptradeError: JSON.stringify(msg),
      }),
      {
        status: err?.response?.status || 500,
        headers: corsHeaders,
      }
    );
  }
});
