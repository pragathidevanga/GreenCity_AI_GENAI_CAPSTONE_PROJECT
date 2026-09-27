import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import { Sparkles, CheckCircle2, RotateCcw, MapPin, ArrowRight, Loader2 } from 'lucide-react';

const AssessmentForm = () => {
  const {
    locality,
    setLocality,
    indicators,
    handleIndicatorChange,
    loadDemoData,
    setHasAssessed,
    fetchRecommendations
  } = useAssessment();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locality.trim()) {
      alert('Please enter a valid locality name before analyzing.');
      return;
    }

    setIsSubmitting(true);
    setHasAssessed(true);
    
    // Trigger AI recommendations calculation and navigate
    await fetchRecommendations();
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Top Heading */}
      <div className="text-center mb-10 space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
          CITY SUSTAINABILITY ASSESSMENT
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17321F]">
          How Sustainable Is Your Locality?
        </h1>
        <p className="text-base text-[#66756B] max-w-xl mx-auto">
          Provide simple information about your locality to generate a comprehensive sustainability assessment and AI recommendations.
        </p>
      </div>

      {/* Main Card Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 custom-shadow space-y-8">
        
        {/* Header Action bar with Demo Data fill button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#17321F] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#14532D]" />
              <span>Location Information</span>
            </h2>
            <p className="text-xs text-[#66756B]">Enter the name of your neighborhood, city, or industrial zone.</p>
          </div>

          <button
            type="button"
            onClick={loadDemoData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-[#14532D] border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span>Use Demo Data</span>
          </button>
        </div>

        {/* Locality Input */}
        <div>
          <label className="block text-sm font-bold text-[#17321F] mb-2">
            Locality Name
          </label>
          <input
            type="text"
            required
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Example: Electronic City"
            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#14532D] focus:ring-3 focus:ring-emerald-200 outline-hidden transition-all text-[#17321F] font-semibold text-base"
          />
        </div>

        {/* Environmental Indicators Sliders */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-[#17321F]">
              Environmental Indicators (7)
            </h3>
            <p className="text-xs text-[#66756B]">Adjust the sliders based on your locality's current infrastructure performance.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {indicatorMeta.map((item) => {
              const currentValue = indicators[item.key] ?? 50;

              return (
                <div key={item.key} className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-white rounded-xl shadow-xs border border-emerald-100">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-[#17321F] text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#66756B]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-3 py-1 bg-[#14532D] text-white rounded-xl font-extrabold text-sm whitespace-nowrap shadow-xs">
                      {currentValue} / 100
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="pt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentValue}
                      onChange={(e) => handleIndicatorChange(item.key, e.target.value)}
                      className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#14532D]"
                    />
                    <div className="flex justify-between text-[11px] font-semibold text-[#66756B] pt-1">
                      <span>0 (Critical)</span>
                      <span>50 (Moderate)</span>
                      <span>100 (Optimal)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Summary Section */}
        <div className="bg-[#EAF6EC] p-6 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-[#17321F] text-base">Assessment Summary</h4>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-[#14532D]">
              <span>Indicators completed: <strong className="text-[#17321F]">7 / 7</strong></span>
              <span className="flex items-center gap-1 text-[#3E8E5B]">
                <CheckCircle2 className="w-4 h-4" /> Ready to analyze
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#14532D] text-white font-extrabold text-base shadow-lg hover:bg-[#1b683a] hover:-translate-y-0.5 transition-all disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Sustainability...</span>
              </>
            ) : (
              <>
                <span>Analyze Sustainability</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AssessmentForm;
