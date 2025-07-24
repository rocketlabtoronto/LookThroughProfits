import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";
import { Resend } from "https://esm.sh/resend";
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
// Send email functionality
const sendEmail = async (to, interval) => {
  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
  await logWebhookError("sendEmail - RESEND_API_KEY", to, 3, "RESEND_API_KEY used");

  // Call the send-password_setup_link edge function to get the password setup link
  let activationUrl = "";
  try {
    const resp = await fetch(
      `https://ioggynmosufvlozhlhta.supabase.co/functions/v1/send_password_setup_link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          apikey: SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ email: to }),
      }
    );
    if (!resp.ok) {
      throw new Error(`send_password_setup_link failed: ${resp.status}`);
    }
    activationUrl = await resp.text();
    if (!activationUrl) throw new Error("No activation link returned");
  } catch (err) {
    await logWebhookError(
      "sendEmail Error:",
      to,
      0,
      `Failed to get activation link: ${err.message}`
    );
    throw new Error(`Failed to get activation link: ${err.message}`);
  }

  try {
    const result = await resend.emails.send({
      from: "howard@lookthroughprofits.com",
      to,
      subject: "Look Through Profits Subscription Confirmation",
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Welcome to LookThroughProfits!</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #f5f8fa;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.05);
              padding: 40px;
            }
            h1 {
              color: #1a73e8;
              font-size: 28px;
              margin-bottom: 10px;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 14px 24px;
              background-color: #1a73e8;
              color: #ffffff;
              text-decoration: none;
              font-weight: 600;
              border-radius: 6px;
              margin-top: 20px;
            }
            .footer {
              font-size: 14px;
              color: #888;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to LookThroughProfits!</h1>
            <p>Hi there,</p>
            <p>
              We're thrilled to have you onboard! You've successfully signed up for the <strong>${interval}</strong> subscription.
            </p>
            <p>
              To get started, please confirm and activate your subscription using the link below:
            </p>
            <p>
              <a class="button" href="${activationUrl}" target="_blank">Activate My Subscription</a>
            </p>
            <p>
              If you ever have questions or just want to say hello, don’t hesitate to reach out. We’re building this with you in mind—and we're excited to help you see your investments more clearly.
            </p>
            <p>
              Warm regards,<br><br>
              <strong>Howard Lin</strong><br/>
              Founder
            </p>
            <div class="footer">
              You're receiving this email because you signed up for LookThroughProfits.<br>
              If this wasn’t you, please ignore this email.
            </div>
          </div>
        </body>
      </html>
      `,
    });
    // Log all enumerable fields of result for debugging
    let resultLog;
    try {
      resultLog = JSON.stringify(result);
    } catch (e) {
      resultLog = "Could not stringify result";
    }
    await logWebhookError("email_sent", to, 0, `Email send result: ${resultLog}`);
    return result;
  } catch (err) {
    await logWebhookError("sendEmail Error:", to, 0, err.message);
    throw new Error(`Failed to send email: ${err.message}`);
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
      await updateSubscription(user.id, interval, phone);
      // Send Emails
      await sendEmail(email, interval); // Send email after subscription update
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
