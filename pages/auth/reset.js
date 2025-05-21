import { useState } from "react";
import { resetPassword } from "../../utils/auth";
import Layout from "../../components/Layout";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Reset your password</h1>
        {message && <div className="success-message" style={{color: 'green'}}>{message}</div>}
        {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleSubmit} className="wiki-form">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send reset email</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <p><a href="/auth/login">Return to login</a></p>
        </div>
      </div>
    </Layout>
  );
}
