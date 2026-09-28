import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" className="flex-row gap-2">
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(114, 184, 122, 0.2)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#72B87A' }}>
                <Leaf size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Green City AI</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, maxWidth: '340px' }}>
              Generative AI-Based Sustainable City Planning System designed to assess urban infrastructure indicators and provide practical environmental insights.
            </p>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-green)', letterSpacing: '0.5px' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
              <Link to="/" style={{ color: '#e5e7eb' }}>Home</Link>
              <Link to="/assessment" style={{ color: '#e5e7eb' }}>Assessment</Link>
              <Link to="/dashboard" style={{ color: '#e5e7eb' }}>Dashboard</Link>
              <Link to="/assistant" style={{ color: '#e5e7eb' }}>AI Assistant</Link>
              <Link to="/report" style={{ color: '#e5e7eb' }}>Report</Link>
              <Link to="/about" style={{ color: '#e5e7eb' }}>About Project</Link>
            </div>
          </div>

          {/* Project Tag */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-green)', letterSpacing: '0.5px' }}>
              Project Specification
            </h4>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>BCA Capstone Project</p>
              <p style={{ fontSize: '12px', color: 'var(--accent-green)' }}>Generative AI Domain • 2026</p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Green City AI. Capstone Project. All rights reserved.</p>
          <p>Designed for BCA Capstone Viva & Progress Demonstration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
