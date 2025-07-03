import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const StickyHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Detect", path: "/detect" },
    { name: "Features", path: "/features" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xl border-b border-cyan-400/20 backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 dark:border-cyan-400/10 transition-all">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="/Moon.svg"
            alt="DeepShield Logo"
            className="w-10 h-10 logo-glow"
          />
          <span className="text-2xl font-extrabold tracking-wide text-[#1A237E]">
            DeepShield
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                location.pathname === path
                  ? "nav-link-active text-white scale-105"
                  : "text-gray-800 dark:text-gray-200 hover:text-cyan-500"
              }`}
            >
              <span className="relative z-10">{name}</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-cyan-600 text-white shadow-lg hover:shadow-xl transition"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/90 dark:bg-zinc-800/90 shadow-lg border-t border-cyan-400/20">
          <div className="flex flex-col items-center space-y-4 p-4">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === path
                    ? "nav-link-active text-white"
                    : "text-gray-800 dark:text-gray-200 hover:text-cyan-500"
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
