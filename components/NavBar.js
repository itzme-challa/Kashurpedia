import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white border-b border-gray-300 py-2">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Kashurpedia
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {user ? (
            <>
              <Link href="/submit" className="text-blue-600 hover:underline">Submit Article</Link>
              <button
                onClick={() => signOut(auth)}
                className="text-blue-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
              <Link href="/auth/signup" className="text-blue-600 hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
