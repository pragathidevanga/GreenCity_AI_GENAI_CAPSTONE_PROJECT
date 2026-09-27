import React from 'react';

const ScoreCard = ({ score, statusLabel, statusColor, locality }) => {
  // Calculate SVG circle progress stroke offset
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-8 rounded-3xl border border-emerald-900/10 custom-shadow text-center flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Small top pill badge */}
      <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider mb-4">
        PROTOTYPE SUSTAINABILITY SCORE
      </span>

      {/* Locality Subheading */}
      <h3 className="text-[#66756B] text-sm font-semibold mb-6">
        Sustainability Assessment for <span className="text-[#17321F] font-extrabold">{locality}</span>
      </h3>

      {/* Circular Animated Progress Gauge */}
      <div className="relative w-48 h-48 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-gray-100"
            strokeWidth="14"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Animated score circle */}
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
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-[#17321F] tracking-tight">
            {score}
          </span>
          <span className="text-sm font-bold text-[#66756B]">/ 100</span>
        </div>
      </div>

      {/* Status Banner Pill */}
      <div
        className="mt-6 px-6 py-2.5 rounded-full text-base font-extrabold shadow-xs"
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
