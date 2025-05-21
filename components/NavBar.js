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
        />
        <Link href="/">
          <span className="nav-text">Kashurpedia</span>
        </Link>
      </div>
      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link href="/submit">
          <span className="nav-text">Submit Article</span>
        </Link>
        
        {user ? (
          <>
            <span style={{ padding: "1em" }}>Welcome, {user.displayName || user.email}</span>
            <button 
              onClick={() => signOut(auth)}
              style={{ 
                background: "none", 
                border: "none", 
                color: "var(--link-color)",
                padding: "1em",
                textAlign: "left"
              }}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: "0.5em" }}></i>
              <span className="nav-text">Log out</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <span className="nav-text">Log in</span>
            </Link>
            <Link href="/auth/signup">
              <span className="nav-text">Create account</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
