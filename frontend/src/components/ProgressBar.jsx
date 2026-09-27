import React from 'react';

const ProgressBar = ({ icon, name, score }) => {
  // Determine bar color based on score
  let barColor = 'bg-[#3E8E5B]';
  let badgeColor = 'text-[#14532D] bg-emerald-50 border-emerald-200';

  if (score < 40) {
    barColor = 'bg-[#D95C5C]';
    badgeColor = 'text-[#D95C5C] bg-red-50 border-red-200';
  } else if (score < 60) {
    barColor = 'bg-[#D99A2B]';
    badgeColor = 'text-[#D99A2B] bg-amber-50 border-amber-200';
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-emerald-900/5 hover:border-emerald-200 transition-colors space-y-2">
      <div className="flex items-center justify-between text-sm font-bold">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{icon}</span>
          <span className="text-[#17321F]">{name}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-extrabold ${badgeColor}`}>
          {score} / 100
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
