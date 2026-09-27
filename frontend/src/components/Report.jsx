import React from 'react';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import { Printer, Download, Sparkles, AlertTriangle, CheckCircle, Leaf, FileText } from 'lucide-react';

const Report = () => {
  const {
    locality,
    overallScore,
    scoreStatus,
    indicators,
    problemAreas,
    performingAreas,
    aiRecommendations,
    expectedBenefits,
    isFallback
  } = useAssessment();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print-area">
      
      {/* Action Header Bar (Hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-emerald-900/10 custom-shadow">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider mb-1">
            CAPSTONE REPORT EXPORT
          </span>
          <h2 className="text-xl font-bold text-[#17321F]">
            Sustainable City Improvement Report
          </h2>
          <p className="text-xs text-[#66756B]">
            Print or export a clean executive summary report for presentation and viva.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14532D] text-white font-bold text-sm shadow-md hover:bg-[#1b683a] transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#14532D] border-2 border-emerald-800/30 font-bold text-sm hover:bg-emerald-50 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-900/10 custom-shadow space-y-10">
        
        {/* Document Title Header */}
        <div className="border-b border-gray-200 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-6 h-6 text-[#14532D]" />
              <span className="text-2xl font-black text-[#14532D] tracking-tight">Green City AI</span>
            </div>
            <h1 className="text-3xl font-black text-[#17321F] tracking-tight">
              Sustainable City Improvement Report
            </h1>
            <p className="text-sm font-semibold text-[#66756B] mt-1">
              AI-generated sustainability insights for locality: <span className="text-[#14532D] font-extrabold text-base underline">{locality || 'Electronic City'}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • BCA Capstone Project 2026
            </p>
          </div>

          {/* Top Score Callout Box */}
          <div className="bg-[#EAF6EC] p-6 rounded-2xl border border-emerald-300 text-center min-w-[200px]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#66756B]">Overall Sustainability</p>
            <div className="text-4xl font-black text-[#17321F] my-1">
              {overallScore} <span className="text-lg font-bold text-[#66756B]">/ 100</span>
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-extrabold mt-1"
              style={{ backgroundColor: `${scoreStatus.color}20`, color: scoreStatus.color }}
            >
              {scoreStatus.label}
            </span>
          </div>
        </div>

        {/* Section 01 — Executive Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
              01
            </span>
            <h2 className="text-xl font-bold text-[#17321F]">Executive Summary</h2>
          </div>
          <div className="bg-[#F7FAF7] p-6 rounded-2xl border border-emerald-900/5 text-sm text-[#17321F] leading-relaxed space-y-2">
            <p>
              This report presents a structured evaluation of environmental and municipal infrastructure indicators for <strong>{locality}</strong>. The locality achieved an overall prototype sustainability score of <strong>{overallScore}/100</strong>, indicating a <strong>{scoreStatus.label}</strong> standing.
            </p>
            <p className="text-[#66756B]">
              The assessment evaluates seven primary sectors: Waste Management, Water Conservation, Electricity Efficiency, Traffic Management, Green Spaces, Public Transportation, and EV Infrastructure. Tailored recommendations have been synthesized to target key challenges.
            </p>
          </div>
        </div>

        {/* Section 02 — Sustainability Score & Indicator Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
              02
            </span>
            <h2 className="text-xl font-bold text-[#17321F]">Sustainability Score & Indicator Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {indicatorMeta.map((item) => {
              const val = indicators[item.key] ?? 50;
              let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              if (val < 40) badgeColor = 'bg-red-100 text-red-800 border-red-300';
              else if (val < 60) badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

              return (
                <div key={item.key} className="p-4 rounded-xl border border-gray-100 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-sm text-[#17321F]">{item.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-lg border text-xs font-extrabold ${badgeColor}`}>
                    {val} / 100
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 03 — Major Areas Requiring Attention */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
              03
            </span>
            <h2 className="text-xl font-bold text-[#17321F]">Major Areas Requiring Attention</h2>
          </div>

          {problemAreas.length > 0 ? (
            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-[#D99A2B]" />
                <span>Indicators scoring below optimal threshold (60/100):</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {problemAreas.map(p => (
                  <li key={p.key} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-2">
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </span>
                    <span className="text-[#D99A2B] font-extrabold">{indicators[p.key]}/100</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-amber-700 italic">
                These indicators have relatively lower assessment values and may benefit from targeted municipal improvement.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>All indicators in {locality} are currently performing at or above the 60/100 threshold!</span>
            </div>
          )}
        </div>

        {/* Section 04 — AI Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
                04
              </span>
              <h2 className="text-xl font-bold text-[#17321F]">AI-Powered Recommendations</h2>
            </div>
            {isFallback && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Rule-Based Fallback Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{rec.icon}</span>
                  <span className="font-bold text-[#14532D] text-sm">{rec.category}</span>
                </div>
                <h3 className="font-extrabold text-[#17321F] text-base">{rec.title}</h3>
                <p className="text-xs text-[#66756B] leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 05 — Expected Benefits */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center font-bold text-sm">
              05
            </span>
            <h2 className="text-xl font-bold text-[#17321F]">Expected Sustainability Benefits</h2>
          </div>

          <div className="bg-[#EAF6EC] p-6 rounded-2xl border border-emerald-200">
            <ul className="space-y-2 text-sm font-semibold text-[#14532D]">
              {expectedBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#3E8E5B] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Report Footer Notice */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#66756B] gap-2">
          <span>Green City AI • Generative AI-Based Sustainable City Planning System</span>
          <span>BCA Capstone Demonstration Prototype</span>
        </div>

      </div>

    </div>
  );
};

export default Report;
