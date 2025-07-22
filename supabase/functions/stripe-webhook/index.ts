import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";
// --- Config ---
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-08-16",
});
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
// --- Step 1: Fetch User by Email ---
const fetchUser = async (email) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}`, {
    method: "GET",
    headers,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Error fetching user: ${res.status} ${text}`);
  }
  try {
    return text ? JSON.parse(text)[0] || null : null;
  } catch (err) {
    throw new Error(`Failed to parse fetchUser response: ${text}`);
  }
};
// --- Step 2: Create User ---
const createUser = async (email) => {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: crypto.randomUUID(),
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Error creating auth user: ${res.status} ${text}`);
  }
  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    throw new Error(`Failed to parse createUser response: ${text}`);
  }
};
// --- Step 3: Update User Subscription ---
const updateSubscription = async (userId, interval, phone) => {
  const payload = {
    is_subscribed: true,
    phone: phone,
    subscription_interval: interval,
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Error updating user subscription: ${res.status} ${text}`);
  }
  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    throw new Error(`Failed to parse updateSubscription response: ${text}`);
  }
};
// --- Stripe Webhook Handler ---
async function processSubscription(event) {
  var interval = "";
  var fallbackInterval = "";
  var email = "";
  var phone = "";
  await logWebhookError(event.type, "", 0, JSON.stringify(event));
  if (event.type !== "invoice.payment_succeeded") return;
  const subscription = event.data.object;
  email = event.data.object.customer_email;
  phone = event.data.object.customer_phone;
  interval = event.data.object.lines.data[0].plan.interval;
  if (!email) {
    await logWebhookError(event.type, "", 0, "No clientEmail found in session object.");
    console.log("No clientEmail found in session object.");
    return;
  }
  let user = null;
  try {
    user = await fetchUser(email);
  } catch (err) {
    await logWebhookError(event.type, email, 1, err.message);
    return;
  }
  if (!user) {
    try {
      await createUser(email);
      user = await fetchUser(email);
    } catch (err) {
      await logWebhookError(event.type, email, 2, err.message);
      return;
    }
  }
  if (user) {
    try {
      await logWebhookError(event.type, interval, 0, "Interval");
      await updateSubscription(user.id, interval, phone);
    } catch (err) {
      await logWebhookError(event.type, email, 3, err.message);
    }
  }
}
// --- Entry Point ---
serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  try {
    const event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")
    );
    await processSubscription(event);
    return new Response("Webhook received", {
      status: 200,
    });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
});
