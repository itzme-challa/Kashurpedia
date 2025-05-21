import { useState } from "react";
import { login } from "../../utils/auth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Log in to Kashurpedia</h1>
        {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleLogin} className="wiki-form">
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
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <p>Don't have an account? <a href="/auth/signup">Create one</a></p>
          <p><a href="/auth/reset">Forgot your password?</a></p>
        </div>
      </div>
    </Layout>
  );
}
