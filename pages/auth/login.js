import { useState } from "react";
import { login } from "../../utils/auth";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    await login(email, password);
    router.push("/");
  };

  return (
    <div>
      <NavBar />
      <h1>Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <br />
      <a href="/auth/reset">Forgot password?</a>
    </div>
  );
}
