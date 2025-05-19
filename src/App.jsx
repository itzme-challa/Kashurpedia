import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import UserPage from './pages/UserPage';
import './App.css';

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error" style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error.message}</p>
          <pre>{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <div className="app">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:title" element={<ArticlePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/edit/:title" element={<EditPage />} />
                <Route path="/user/:userId" element={<UserPage />} />
              </Routes>
            </div>
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
