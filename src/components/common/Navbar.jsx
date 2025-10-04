import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Updated quick link menu including Home
const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Facts', path: '/blood-facts' },
  { label: 'Help', path: '/help' },
  { label: 'FAQ', path: '/faq' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userType, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    return userType === 'donor' ? '/donor/dashboard' : '/hospital/dashboard';
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={user ? getDashboardLink() : '/'}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BloodConnect</h1>
              <p className="text-xs text-gray-500">Save Lives Together</p>
            </div>
          </Link>

          {/* Desktop Quick Links */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-gray-700 hover:text-red-600 text-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side (auth actions) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <span className="text-gray-700 font-medium">
                  {userType === 'donor' ? user.name : user.hospitalName}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu content */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4 mb-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-red-600 text-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {user ? (
              <>
                <div className="px-4 py-2 text-gray-700 font-medium border-b border-gray-100">
                  {userType === 'donor' ? user.name : user.hospitalName}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
