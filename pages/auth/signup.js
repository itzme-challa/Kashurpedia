import { useState } from "react";
import { register } from "../../utils/auth";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    await register(email, password, username);
    router.push("/");
  };

  return (
    <div>
      <NavBar />
      <h1>Signup</h1>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}
