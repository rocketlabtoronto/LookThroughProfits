const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
};

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
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
        "Content-Type": "text/plain",
      },
    });
  }

  await logWebhookError("send-password-reset-link-email called", "", 4, "");

  const { email } = await req.json();
  if (!email) {
    return new Response(JSON.stringify({ error: "Missing email" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  // Get password reset link
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/send_password_setup_link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ email: email }),
  });
  const resetUrl = await resp.text();
  if (!resp.ok || !resetUrl) {
    await logWebhookError(
      "send-password-reset-link-email Error",
      email,
      0,
      `Failed to get reset link: ${resetUrl}`
    );
    return new Response(JSON.stringify({ error: "Failed to get reset link" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  // Send email
  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: "howard@lookthroughprofits.com",
      to: email,
      subject: "Password Reset Request - Look Through Profits",
      html: `
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Password Reset</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f8fa; margin: 0; padding: 0; color: #333; }
              .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); padding: 40px; }
              h1 { color: #1a73e8; font-size: 24px; margin-bottom: 10px; }
              p { font-size: 16px; line-height: 1.6; margin: 20px 0; }
              .button { display: inline-block; padding: 14px 24px; background-color: #1a73e8; color: #fff; text-decoration: none; font-weight: 600; border-radius: 6px; margin-top: 20px; }
              .footer { font-size: 14px; color: #888; margin-top: 40px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset Request</h1>
              <p>Hi,</p>
              <p>
                We received a request to reset your password for your Look Through Profits account.<br>
                To proceed, please click the button below:
              </p>
              <p>
                <a class="button" href="${resetUrl}" target="_blank">Reset My Password</a>
              </p>
              <p>
                If you did not request this, you can safely ignore this email.
              </p>
              <div class="footer">
                For help, contact <a href="mailto:support@lookthroughprofits.com">support@lookthroughprofits.com</a>.<br>
                Thank you for helping us keep your account secure.
              </div>
            </div>
          </body>
        </html>
      `,
    });
    await logWebhookError("password_reset_email_sent", email, 0, `Email sent to ${email}`);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    await logWebhookError("send-password-reset-link-email Error", email, 0, err.message);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
