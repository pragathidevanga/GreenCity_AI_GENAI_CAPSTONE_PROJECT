import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ stepNumber, title, description, isLast }) => {
  return (
    <div className="feature-card card-hover">
      <div>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <span className="step-number">{stepNumber}</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-green)' }} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      {!isLast && (
        <div className="step-arrow-badge">
          <ArrowRight size={18} />
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
