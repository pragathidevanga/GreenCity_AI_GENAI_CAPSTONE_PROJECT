import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, TreePine, BatteryCharging } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Text & CTAs */}
          <div className="hero-content">
            <div className="badge">
              <Sparkles size={14} />
              <span>AI-POWERED SUSTAINABLE CITY PLANNING</span>
            </div>

            <h1 className="hero-title">
              Build a{' '}
              <span className="hero-title-highlight">
                Greener, Smarter
              </span>{' '}
              City
            </h1>

            <p className="hero-desc">
              Understand your locality’s sustainability performance and get AI-powered recommendations for building cleaner, greener and more sustainable communities.
            </p>

            <div className="hero-actions">
              <Link to="/assessment" className="btn-primary">
                <span>Assess Your City</span>
                <ArrowRight size={18} />
              </Link>

              <a href="#how-it-works" className="btn-secondary">
                <span>Explore How It Works</span>
              </a>
            </div>

            <div className="trust-line">
              <ShieldCheck size={18} style={{ color: '#3E8E5B' }} />
              <span>Environmental indicators • AI recommendations • Sustainability insights</span>
            </div>
          </div>

          {/* Right Column: Hero Image with Glow & Floating Badges */}
          <div className="hero-image-container">
            <div className="hero-image-card">
              <img
                src="/hero-smart-city.jpg"
                alt="Sustainable Indian Smart City with Green Infrastructure"
                className="hero-img"
              />
            </div>

            {/* Floating Sample Info Badge 1 */}
            <div className="floating-badge-1">
              <div className="badge-icon">
                <TreePine size={22} />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Green Space
                </p>
                <p style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  72% <span style={{ fontSize: '11px', color: 'var(--primary-green)' }}>(Sample)</span>
                </p>
              </div>
            </div>

            {/* Floating Sample Info Badge 2 */}
            <div className="floating-badge-2">
              <div className="badge-icon">
                <BatteryCharging size={22} />
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  EV Ready
                </p>
                <p style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  64% <span style={{ fontSize: '11px', color: 'var(--primary-green)' }}>(Sample)</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
