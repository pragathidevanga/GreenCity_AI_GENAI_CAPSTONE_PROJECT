import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <header className="navbar">
      <div className="container navbar-inner">
        
        {/* Brand Logo & Subtitle */}
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">
            <Leaf size={24} />
          </div>
          <div>
            <div className="flex-row gap-2">
              <span className="nav-title">Green City AI</span>
              <span className="badge-capstone">BCA Capstone</span>
            </div>
            <p className="nav-subtitle">Generative AI-Based Sustainable City Planning System</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex-row gap-3">
          <Link to="/assessment" className="btn-primary">
            <Sparkles size={16} />
            <span>Start Assessment</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer open">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{ textAlign: 'left', borderRadius: '8px', padding: '12px 16px' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
