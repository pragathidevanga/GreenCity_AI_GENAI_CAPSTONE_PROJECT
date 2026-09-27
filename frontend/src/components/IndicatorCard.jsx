import React from 'react';

const IndicatorCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 custom-shadow card-hover flex flex-col items-start gap-4 group">
      <div className="w-14 h-14 rounded-2xl bg-[#EAF6EC] text-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#17321F] mb-1 group-hover:text-[#14532D] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#66756B] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default IndicatorCard;
