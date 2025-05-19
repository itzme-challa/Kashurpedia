import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, prompt('Email:'), prompt('Password:'));
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/">Kashurpedia</Link>
      <nav>
        <Link to="/create">Create Article</Link>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
