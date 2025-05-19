import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import Search from './Search';

function Header() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Kashurpedia</h1>
        </Link>
        <Search />
        <nav>
          {auth.currentUser ? (
            <>
              <Link to="/create">Create</Link>
              <Link to={`/user/${auth.currentUser.uid}`}>My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
