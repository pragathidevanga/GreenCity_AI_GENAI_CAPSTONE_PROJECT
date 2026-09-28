import React from 'react';

const ScoreCard = ({ score, statusLabel, statusColor, locality }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="score-card">
      
      <span className="badge" style={{ marginBottom: '12px' }}>
        PROTOTYPE SUSTAINABILITY SCORE
      </span>

      <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
        Sustainability Assessment for <strong style={{ color: 'var(--text-primary)' }}>{locality}</strong>
      </h3>

      <div className="gauge-wrapper">
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="14"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={statusColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>

        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="gauge-score-num">{score}</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>/ 100</span>
        </div>
      </div>

      <div
        className="status-pill"
        style={{
          backgroundColor: `${statusColor}15`,
          color: statusColor,
          border: `1.5px solid ${statusColor}40`
        }}
      >
        {statusLabel}
      </div>

    </div>
  );
};

export default ScoreCard;
