import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ stepNumber, title, description, isLast }) => {
  return (
    <div className="relative flex-1 bg-white p-6 rounded-2xl border border-emerald-900/10 custom-shadow card-hover flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-black text-[#72B87A]">
            {stepNumber}
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-[#14532D]" />
        </div>
        <h3 className="text-xl font-bold text-[#17321F] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#66756B] leading-relaxed">
          {description}
        </p>
      </div>

      {!isLast && (
        <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#EAF6EC] border-2 border-emerald-300 text-[#14532D] items-center justify-center shadow-md">
          <ArrowRight className="w-4 h-4 text-[#14532D] stroke-[2.5]" />
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
