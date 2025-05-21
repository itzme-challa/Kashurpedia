import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav style={{
      background: '#f8f9fa',
      padding: '10px 0',
      borderBottom: '1px solid #a7d7f9',
      marginBottom: '20px'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/" style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Kashurpedia
          </Link>
          <Link href="/submit">Submit Article</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user ? (
            <>
              <span>Welcome, {user.displayName || user.email}</span>
              <button 
                onClick={() => signOut(auth)}
                style={{
                  background: 'transparent',
                  color: '#36c',
                  border: '1px solid #36c',
                  padding: '5px 10px'
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
      </div>
    </nav>
  );
}
