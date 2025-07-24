import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; // adjust to your project
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // run `npm install bcryptjs`

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setError("Missing or invalid token.");
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from("password_reset_tokens")
        .select("*")
        .eq("token", token)
        .single();

      if (error || !data) {
        setError("Token is invalid or expired.");
      } else if (new Date(data.expires_at) < new Date()) {
        setError("Token has expired.");
      } else {
        setEmail(data.email);
      }
    })();
  }, [token]);

  const handleSetPassword = async () => {
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    setError(null);

    const passwordHash = bcrypt.hashSync(password, 10);

    const { error: updateError } = await supabase
      .from("user")
      .update({ password_hash: passwordHash })
      .eq("email", email!);

    if (updateError) {
      setError(updateError.message);
    } else {
      await supabase.from("password_reset_tokens").delete().eq("token", token!);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2>Set Your Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success ? (
        <p>Password set successfully! Redirecting to login...</p>
      ) : (
        <>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: 20 }}
          />
          <button onClick={handleSetPassword} disabled={loading || !email}>
            {loading ? "Saving..." : "Set Password"}
          </button>
        </>
      )}
    </div>
  );
}
