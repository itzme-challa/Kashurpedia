import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import EditorPage from './components/ArticleEditor.jsx';

console.log('App.jsx: Loaded');

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('ErrorBoundary:', error);
  }

  render() {
    if (this.state.error) {
      return <div className="error">Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('App.jsx: Setting up auth listener');
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('App.jsx: User state updated', user ? user.uid : 'none');
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:title" element={<ArticlePage user={user} />} />
          <Route path="/create" element={<EditorPage user={user} mode="create" />} />
          <Route path="/edit/:title" element={<EditorPage user={user} mode="edit" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
