import { useState } from "react";
import { resetPassword } from "../../utils/auth";
import NavBar from "../../components/NavBar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <NavBar />
      <h1>Reset Password</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={() => resetPassword(email)}>Send Reset Email</button>
    </div>
  );
}
