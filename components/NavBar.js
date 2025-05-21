import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/" className="nav-link" data-icon="home" data-tooltip="Home">
          <span className="nav-link-text">Kashurpedia</span>
        </Link>
        <Link href="/submit" className="nav-link" data-icon="add" data-tooltip="Submit Article">
          <span className="nav-link-text">Submit</span>
        </Link>
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.displayName || user.email}</span>
            <button 
              onClick={() => signOut(auth)}
              className="nav-button"
              data-tooltip="Log out"
            >
              <span>Log out</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="nav-link" data-icon="login" data-tooltip="Log in">
              <span className="nav-link-text">Log in</span>
            </Link>
            <Link href="/auth/signup" className="nav-link" data-icon="signup" data-tooltip="Create account">
              <span className="nav-link-text">Create account</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
