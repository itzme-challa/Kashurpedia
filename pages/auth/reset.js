import { useState } from "react";
import { resetPassword } from "../../utils/auth";
import NavBar from "../../components/NavBar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setSuccess("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container min-h-screen">
      <NavBar />
      <div className="max-w-md mx-auto mt-8">
        <h1>Reset Password</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
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
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
          <p className="text-sm">
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
