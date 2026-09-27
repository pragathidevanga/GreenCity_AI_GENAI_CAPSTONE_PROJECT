import React from 'react';
import { Sparkles } from 'lucide-react';

const RecommendationCard = ({ category, icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 custom-shadow card-hover flex flex-col justify-between space-y-4 relative overflow-hidden group">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#14532D] via-[#2E7D52] to-[#72B87A]" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-[#14532D] text-xs font-bold uppercase tracking-wider">
            <span>{icon || '🌱'}</span>
            <span>{category}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <Sparkles className="w-3 h-3" /> GenAI
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-[#17321F] group-hover:text-[#14532D] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[#66756B] leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

export default RecommendationCard;
