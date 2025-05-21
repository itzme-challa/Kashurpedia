import { useState } from "react";
import { login } from "../../utils/auth";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
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

  const handleLogin = async () => {
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto mt-8">
        <h1>Log in to Kashurpedia</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form className="space-y-4">
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <p className="text-sm">
            <Link href="/auth/reset" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
