// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import NewsHistory from './pages/NewsHistory';
import Account from './pages/Account';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { NewsProvider } from './contexts/NewsContext';
import { PreferenceProvider } from './contexts/PreferenceContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <PreferenceProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/preferences" element={
                    <ProtectedRoute>
                      <Preferences />
                    </ProtectedRoute>
                  } />
                  <Route path="/history" element={
                    <ProtectedRoute>
                      <NewsHistory />
                    </ProtectedRoute>
                  } />
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </PreferenceProvider>
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

// Protected route component to handle authentication
function ProtectedRoute({ children }) {
  const { currentUser } = useState({ currentUser: JSON.parse(localStorage.getItem('user')) }); // Simplified auth check
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Admin route component to handle admin authentication
function AdminRoute({ children }) {
  const { currentUser } = useState({ currentUser: JSON.parse(localStorage.getItem('user')) }); // Simplified auth check
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default App;