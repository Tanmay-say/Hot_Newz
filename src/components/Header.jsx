// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold">AI News Agent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <Link to="/preferences" className="hover:text-blue-200">Preferences</Link>
                <Link to="/history" className="hover:text-blue-200">History</Link>
                <Link to="/account" className="hover:text-blue-200">Account</Link>
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md">Register</Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-3">
            <Link to="/" className="block hover:text-blue-200" onClick={toggleMenu}>Home</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block hover:text-blue-200" onClick={toggleMenu}>Dashboard</Link>
                <Link to="/preferences" className="block hover:text-blue-200" onClick={toggleMenu}>Preferences</Link>
                <Link to="/history" className="block hover:text-blue-200" onClick={toggleMenu}>History</Link>
                <Link to="/account" className="block hover:text-blue-200" onClick={toggleMenu}>Account</Link>
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="block hover:text-blue-200" onClick={toggleMenu}>Admin</Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block hover:text-blue-200" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="block px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md" onClick={toggleMenu}>Register</Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;