import React from 'react';

const ProgressBar = ({ icon, name, score }) => {
  let barColor = 'var(--success-color)';
  let tagBg = 'var(--light-green)';
  let tagColor = 'var(--primary-green)';

  if (score < 40) {
    barColor = 'var(--critical-color)';
    tagBg = '#fee2e2';
    tagColor = '#b91c1c';
  } else if (score < 60) {
    barColor = 'var(--warning-color)';
    tagBg = '#fef3c7';
    tagColor = '#b45309';
  }

  return (
    <div className="progress-item">
      <div className="flex-between">
        <div className="flex-row gap-2">
          <span style={{ fontSize: '20px' }}>{icon}</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{name}</span>
        </div>
        <span
          style={{
            backgroundColor: tagBg,
            color: tagColor,
            padding: '2px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 800
          }}
        >
          {score} / 100
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${score}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
