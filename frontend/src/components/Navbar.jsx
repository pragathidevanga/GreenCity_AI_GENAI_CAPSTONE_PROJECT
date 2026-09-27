import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Assistant', path: '/assistant' },
    { name: 'Report', path: '/report' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#14532D] tracking-tight">Green City AI</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">BCA Capstone</span>
              </div>
              <p className="text-xs text-[#66756B] font-medium hidden sm:block">Generative AI-Based Sustainable City Planning System</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-emerald-50/60 p-1.5 rounded-full border border-emerald-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-[#14532D] text-white shadow-sm'
                    : 'text-[#17321F] hover:text-[#14532D] hover:bg-white/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] text-white font-semibold text-sm shadow-md hover:bg-[#1c6b3c] hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Start Assessment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#17321F] hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3">
          <p className="text-xs text-[#66756B] font-medium px-3 pb-1 border-b border-gray-100">
            Generative AI-Based Sustainable City Planning System
          </p>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-[#14532D] text-white'
                    : 'text-[#17321F] hover:bg-emerald-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14532D] text-white font-semibold shadow-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Start Assessment →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
