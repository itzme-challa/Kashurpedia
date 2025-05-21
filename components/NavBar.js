import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { logout } from "../utils/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav>
      <Link href="/">Home</Link>
      {user ? (
        <>
          <span>Welcome, {user.displayName}</span>
          <Link href="/submit">Submit Article</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
