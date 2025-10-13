
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-gray-300 hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
    {children}
  </Link>
);

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-accent text-2xl font-bold">
              AdPlaza
            </Link>
            <nav className="hidden md:flex ml-10 space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/messages">Messages</NavLink>
            </nav>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
             {/* A placeholder for a future search component */}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/sell"
                  className="bg-accent text-primary-dark font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm"
                >
                  + SELL
                </Link>
                <div className="relative">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 focus:outline-none">
                    <img src={user.profilePicture} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-white text-sm">{user.name.split(' ')[0]}</span>
                    <svg className={`w-4 h-4 text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                      <Link to="/profile#my-ads" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>My Ads</Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm">
                Login
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
