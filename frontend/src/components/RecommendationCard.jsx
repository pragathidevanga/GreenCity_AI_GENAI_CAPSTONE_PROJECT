import React from 'react';
import { Sparkles } from 'lucide-react';

const RecommendationCard = ({ category, icon, title, description }) => {
  return (
    <div className="rec-card card-hover">
      <div className="rec-top-stripe" />

      <div className="flex-between">
        <span className="rec-category">
          <span>{icon || '🌱'}</span>
          <span>{category}</span>
        </span>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} /> GenAI
        </span>
      </div>

      <h3 className="rec-title">{title}</h3>
      <p className="rec-desc">{description}</p>
    </div>
  );
};

export default RecommendationCard;
