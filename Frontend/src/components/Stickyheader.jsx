import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";

const StickyHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/", color: "from-[#24E37A] to-[#24E37A]" },
    { name: "Detect", path: "/detect", color: "from-[#7C6CF6] to-[#7C6CF6]" },
    { name: "Features", path: "/features", color: "from-[#24E37A] to-[#24E37A]" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#7C6CF6]/20" 
        : "bg-white/90 backdrop-blur-sm shadow-sm"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#24E37A] group-hover:text-[#7C6CF6] transition-colors duration-200" />
            <div className="absolute inset-0 bg-[#7C6CF6]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 scale-110"></div>
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] bg-clip-text text-transparent">
            DeepShield
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map(({ name, path, color }) => (
            <Link
              key={name}
              to={path}
              className={`relative px-6 py-3 font-medium transition-all duration-300 group rounded-full ${
                location.pathname === path
                  ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                  : "text-[#7C6CF6] hover:text-white hover:bg-[#7C6CF6]"
              }`}
            >
              <span className="relative z-10">{name}</span>
              {location.pathname !== path && (
                <div className="absolute inset-0 bg-[#7C6CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2.5 transition-all duration-300 rounded-full ${
            isMobileMenuOpen 
              ? "bg-[#7C6CF6] hover:bg-[#24E37A] text-white shadow-lg" 
              : "bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] hover:from-[#7C6CF6] hover:to-[#24E37A] text-white shadow-md hover:shadow-lg"
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-[#7C6CF6]/20 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(({ name, path, color }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium transition-all duration-300 rounded-full ${
                  location.pathname === path
                    ? `bg-gradient-to-r ${color} text-white shadow-md`
                    : "text-[#7C6CF6] hover:text-white hover:bg-[#7C6CF6]"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
