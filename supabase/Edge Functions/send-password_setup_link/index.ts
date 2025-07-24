import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Minimal inline UUID v4 generator
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0xf) >> 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const SUPABASE_URL = "https://ioggynmosufvlozhlhta.supabase.co";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
};
// --- Error Logging Service ---
const logWebhookError = async (eventType, email, step, errorMsg) =>
  fetch(`${SUPABASE_URL}/rest/v1/webhook_errors`, {
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

serve(async (req) => {
  const { email } = await req.json();

  // Generate token
  const token = uuidv4();
  const expires_at = new Date(Date.now() + 1000 * 60 * 30).toISOString(); // 30 mins, ISO string for timestamptz
  // Store token using REST API

  // Log every invocation of this function, including token and expires_at
  await logWebhookError(
    "send-password_setup_link success",
    email || "",
    0,
    `send-password_setup_link called. email: ${email}, token: ${token}, expires_at: ${expires_at}`
  );
  if (!email) {
    return new Response(
      JSON.stringify({
        error: "Missing email",
      }),
      {
        status: 400,
      }
    );
  }

  const headers = {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/password_reset_tokens`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: email,
        token: token,
        expires_at: expires_at,
      }),
    });
    const responseText = await res.text();
    await logWebhookError(
      "send-password_setup_link Insert Response",
      email,
      0,
      `Status: ${res.status}, Body: ${responseText}`
    );
    if (!res.ok) throw new Error(responseText);
    return new Response(`https://www.lookthroughprofits.com/set-password?token=${token}`, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (_) {
    await logWebhookError("send-password_setup_link Error", email, 0, _.message);
    return new Response(JSON.stringify({ error: "Could not create password reset token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
