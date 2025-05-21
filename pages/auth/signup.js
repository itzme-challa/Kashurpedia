import { useState } from "react";
import { register } from "../../utils/auth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="wiki-content">
        <h1>Create a Kashurpedia account</h1>
        {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleSignup} className="wiki-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create account</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <p>Already have an account? <a href="/auth/login">Log in</a></p>
        </div>
      </div>
    </Layout>
  );
}
