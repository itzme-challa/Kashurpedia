import Link from "next/link";
import { useState } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <button 
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
        <Link href="/" className="nav-logo">Kashurpedia</Link>
      </div>
      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link href="/submit" className="nav-link">Submit Article</Link>
        
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.displayName || user.email}</span>
            <button 
              onClick={() => signOut(auth)}
              className="nav-button"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="nav-link">Log in</Link>
            <Link href="/auth/signup" className="nav-link">Create account</Link>
          </>
        )}
      </div>
    </nav>
  );
}
