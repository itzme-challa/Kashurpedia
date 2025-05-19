import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;
