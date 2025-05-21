import { useState } from "react";
import { register } from "../../utils/auth";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      await register(email, password, username);
      router.push("/");
    } catch (err) {
      setError("Failed to register. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto mt-8">
        <h1>Create a Kashurpedia Account</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              aria-required="true"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
