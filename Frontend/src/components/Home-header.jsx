import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentUser = { name: 'User', email: 'user@email.com', avatar: '/profile-icon.svg' };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="flex items-center justify-between px-4 py-2 md:px-8">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Moon.svg" alt="Moon" className="w-8 h-8" />
            <span className="text-xl font-bold text-blue-700 tracking-wide">DeepShield</span>
          </Link>
        </div>
        <div className={`fixed md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 px-4 md:px-0 py-4 md:py-0 transition-all duration-300 z-40 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <Link to="/" className="text-lg font-medium px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-blue-100">Home</Link>
          <Link to="/detect" className="text-lg font-medium px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-blue-100">Detect</Link>
          <Link to="/features" className="text-lg font-medium px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-blue-100">Features</Link>
        </div>
      </nav>
      {showUserDetails && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center z-50">
          <img src={currentUser.avatar} alt="User Avatar" className="w-12 h-12 rounded-full mb-2" />
          <p className="font-semibold text-blue-700">{currentUser.name}</p>
          <p className="text-gray-600 text-sm">{currentUser.email}</p>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;