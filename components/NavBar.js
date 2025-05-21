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
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <button 
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
        <Link href="/">Kashurpedia</Link>
      </div>
      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link href="/submit">Submit Article</Link>
        
        {user ? (
          <>
            <span>Welcome, {user.displayName || user.email}</span>
            <button 
              onClick={() => signOut(auth)}
              style={{ 
                background: "none", 
                border: "none", 
                color: "var(--link-color)",
                cursor: "pointer"
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Log in</Link>
            <Link href="/auth/signup">Create account</Link>
          </>
        )}
      </div>
    </nav>
  );
}
