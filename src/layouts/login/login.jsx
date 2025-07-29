import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { decrypt } from "../../services/encryptionService";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
const logo = "/logos/logo_image.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Fetch user by email
      const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
      if (error || !data || !data.password_hash) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      // Decrypt password
      let decryptedPassword = "";
      try {
        decryptedPassword = await decrypt(data.password_hash);
      } catch (err) {
        setError("Error decrypting password.");
        setLoading(false);
        return;
      }
      if (decryptedPassword === password) {
        setSuccess(true);
        setUser(data);
        navigate("/brokeragesAndAccounts");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
      <div style={{ marginBottom: 24, textAlign: "center" }}>
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
        <h2
          style={{
            fontWeight: "bold",
            color: "#344767",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Login
        </h2>
        {success ? (
          <div style={{ color: "#388e3c", textAlign: "center" }}>
            Login successful! Redirecting...
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
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
                  required
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e0e0e0",
                  }}
                  required
                />
              </div>
              {error && (
                <div
                  style={{
                    color: "#d32f2f",
                    marginBottom: 12,
                    textAlign: "left",
                    fontSize: 14,
                    whiteSpace: "pre-line",
                  }}
                >
                  {error}
                </div>
              )}
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
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: 18, fontSize: 15 }}>
              <span style={{ color: "#344767" }}>Forgot your password?&nbsp;</span>
              <a
                href="/send-password-reset"
                style={{ color: "#5e72e4", textDecoration: "underline", fontWeight: 500 }}
              >
                Send Password Reset
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
