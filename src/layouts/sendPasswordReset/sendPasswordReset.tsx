import { useState } from "react";
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY!;
const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};
const logo = "/logos/logo_image.png";

export default function SendPasswordReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    // Simple regex for email validation
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSend = async () => {
    setError(null);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-password-reset-link-email`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || `Supabase error: ${res.status}`);
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Network error. Please try again later." + err);
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#27ae60",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <img
          src={logo}
          alt="LookThroughProfits Logo"
          style={{
            maxWidth: 300,
            height: "auto",
            border: "2px solid #eee",
            background: "#fff",
            borderRadius: 8,
            display: "inline-block",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/180x50?text=Logo+Not+Found";
          }}
        />
      </div>
      <div
        style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <h2 style={{ fontWeight: "bold", color: "#344767", marginBottom: 16 }}>
          Request a Password Reset
        </h2>
        <div style={{ fontSize: 15, color: "#344767", marginBottom: 18, textAlign: "left" }}>
          Enter your email address below. If your account exists, you will receive an email with a
          link to reset your password. Please check your inbox and follow the instructions in the
          email.
          <br />
          <br />
          If you are setting your password for the first time, use the same process. If you need
          help, contact our support team at <b>support@lookthroughprofits.com</b>.
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            marginBottom: 12,
            fontSize: 15,
          }}
        />
        {error && (
          <div style={{ color: "#d32f2f", marginBottom: 12, textAlign: "left", fontSize: 14 }}>
            {error}
          </div>
        )}
        {success ? (
          <div style={{ color: "#388e3c", marginBottom: 12, textAlign: "left", fontSize: 14 }}>
            If your email is registered, a password reset link has been sent. Please check your
            inbox.
          </div>
        ) : (
          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              background: "#5e72e4",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Password Reset"}
          </button>
        )}
      </div>
    </div>
  );
}
