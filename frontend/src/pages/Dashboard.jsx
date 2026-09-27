import React from 'react';
import { Link } from 'react-router-dom';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import ScoreCard from '../components/ScoreCard';
import ProgressBar from '../components/ProgressBar';
import RecommendationCard from '../components/RecommendationCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, AlertTriangle, CheckCircle, ArrowRight, Loader2, RefreshCw, Layers } from 'lucide-react';

const Dashboard = () => {
  const {
    locality,
    overallScore,
    scoreStatus,
    indicators,
    problemAreas,
    performingAreas,
    hasAssessed,
    aiRecommendations,
    isGenerating,
    aiStep,
    aiMessage,
    isFallback,
    fetchRecommendations
  } = useAssessment();

  // If user hasn't completed assessment yet, display Empty State
  if (!hasAssessed) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-emerald-900/10 custom-shadow space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl font-black text-[#17321F]">No Assessment Yet</h2>
          
          <p className="text-base text-[#66756B] max-w-md mx-auto leading-relaxed">
            Complete a city sustainability assessment to view your overall score, indicator breakdown, problem areas, and AI recommendations.
          </p>

          <div>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#14532D] text-white font-extrabold text-base shadow-md hover:bg-[#1b683a] transition-all"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format chart data for Radar Chart
  const radarData = indicatorMeta.map((item) => ({
    subject: item.name.replace(' Management', '').replace(' Conservation', '').replace(' Infrastructure', '').replace(' Efficiency', ''),
    score: indicators[item.key] ?? 50,
    fullMark: 100
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/10 pb-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider mb-2">
            ASSESSMENT COMPLETE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17321F] tracking-tight">
            Sustainability Overview
          </h1>
          <p className="text-sm font-semibold text-[#66756B]">
            Showing results for locality: <span className="text-[#14532D] font-extrabold">{locality}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#14532D] border border-emerald-300 font-bold text-sm shadow-xs hover:bg-emerald-50 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-[#2E7D52]" />
            <span>Re-Assess Locality</span>
          </Link>

          <Link
            to="/report"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] text-white font-bold text-sm shadow-md hover:bg-[#1b683a] transition-all"
          >
            <span>View Full Report →</span>
          </Link>
        </div>
      </div>

      {/* Top Grid: Score Card + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Score Gauge Card */}
        <div className="lg:col-span-5 flex">
          <div className="w-full">
            <ScoreCard
              score={overallScore}
              statusLabel={scoreStatus.label}
              statusColor={scoreStatus.color}
              locality={locality}
            />
          </div>
        </div>

        {/* Radar Visual Chart */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 custom-shadow flex flex-col justify-between">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
              INDICATOR RADAR ANALYSIS
            </span>
            <h3 className="text-xl font-extrabold text-[#17321F] mt-2">
              Locality Performance Distribution
            </h3>
            <p className="text-xs text-[#66756B]">Visual representation across all 7 environmental indicators.</p>
          </div>

          <div className="w-full h-[280px] my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#17321F', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" tick={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#14532D"
                  fill="#72B87A"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-[#66756B] border-t border-gray-100 pt-3">
            <span>Outer perimeter: 100 (Optimal)</span>
            <span className="text-[#14532D] font-bold">Inner fill: Locality Profile</span>
          </div>
        </div>

      </div>

      {/* Sustainability Breakdown (Horizontal Progress Bars) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 custom-shadow space-y-6">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
            INDICATOR BREAKDOWN
          </span>
          <h2 className="text-2xl font-black text-[#17321F] mt-2">
            Sustainability Breakdown
          </h2>
          <p className="text-xs text-[#66756B]">Detailed score performance for each environmental indicator.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicatorMeta.map((item) => (
            <ProgressBar
              key={item.key}
              icon={item.icon}
              name={item.name}
              score={indicators[item.key] ?? 50}
            />
          ))}
        </div>
      </div>

      {/* Areas Requiring Attention & Better Performing Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Areas Requiring Attention (<60) */}
        <div className="bg-amber-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80 custom-shadow space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 text-[#D99A2B]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-amber-900">
                Areas Requiring Attention
              </h3>
              <p className="text-xs text-amber-800">Indicators scoring below 60/100 threshold</p>
            </div>
          </div>

          <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
            These indicators have relatively lower assessment values and may benefit from targeted municipal or community improvement.
          </p>

          {problemAreas.length > 0 ? (
            <div className="space-y-3 pt-1">
              {problemAreas.map((item) => (
                <div key={item.key} className="bg-white p-4 rounded-xl border border-amber-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[#17321F]">{item.name}</h4>
                      <p className="text-[11px] text-[#66756B]">{item.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-black shrink-0">
                    {indicators[item.key]} / 100
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-emerald-200 text-xs font-bold text-[#14532D]">
              ✓ Excellent! All indicators are performing at 60/100 or higher.
            </div>
          )}
        </div>

        {/* Better Performing Areas (>=60) */}
        <div className="bg-[#EAF6EC]/80 p-6 sm:p-8 rounded-3xl border border-emerald-200 custom-shadow space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5 text-[#3E8E5B]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#17321F]">
                Better Performing Areas
              </h3>
              <p className="text-xs text-[#2E7D52]">Indicators meeting or exceeding 60/100 threshold</p>
            </div>
          </div>

          <p className="text-xs text-[#2E7D52] leading-relaxed font-medium">
            These sectors exhibit positive sustainability indicators in {locality}.
          </p>

          {performingAreas.length > 0 ? (
            <div className="space-y-3 pt-1">
              {performingAreas.map((item) => (
                <div key={item.key} className="bg-white p-4 rounded-xl border border-emerald-200/60 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[#17321F]">{item.name}</h4>
                      <p className="text-[11px] text-[#66756B]">{item.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-black shrink-0">
                    {indicators[item.key]} / 100
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs font-bold text-amber-800">
              No indicators currently meet the 60+ threshold. Priority improvement is recommended.
            </div>
          )}
        </div>

      </div>

      {/* AI Recommendations Section (Prompt #23, #24) */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-900/10 custom-shadow space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>GENERATIVE AI ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17321F] tracking-tight">
              ✨ AI-Powered Recommendations
            </h2>
            <p className="text-sm text-[#66756B]">
              Personalized suggestions generated from your sustainability assessment.
            </p>
          </div>

          <button
            onClick={fetchRecommendations}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-[#14532D] border border-emerald-200 font-bold text-xs hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Recommendations</span>
          </button>
        </div>

        {/* Loading State Animation (Prompt #24) */}
        {isGenerating ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-[#17321F] animate-pulse">
                {aiStep || '✨ Analyzing sustainability data...'}
              </p>
              <p className="text-xs text-[#66756B]">
                Synthesizing practical recommendations for {locality}...
              </p>
            </div>
            <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-[#14532D] animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {isFallback && (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs font-semibold text-amber-800 flex items-center justify-between">
                <span>{aiMessage || 'AI service is currently unavailable. Showing rule-based recommendations for demonstration.'}</span>
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md font-bold uppercase text-[10px]">Fallback Mode</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiRecommendations.map((rec, idx) => (
                <RecommendationCard
                  key={idx}
                  category={rec.category}
                  icon={rec.icon}
                  title={rec.title}
                  description={rec.description}
                />
              ))}
            </div>
          </>
        )}

        {/* View Full Report CTA */}
        <div className="pt-4 text-center border-t border-gray-100">
          <Link
            to="/report"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#14532D] text-white font-extrabold text-base shadow-md hover:bg-[#1b683a] transition-all"
          >
            <span>View Full Improvement Report →</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
