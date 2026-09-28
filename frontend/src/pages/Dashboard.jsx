import React from 'react';
import { Link } from 'react-router-dom';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import ScoreCard from '../components/ScoreCard';
import ProgressBar from '../components/ProgressBar';
import RecommendationCard from '../components/RecommendationCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Layers } from 'lucide-react';

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

  if (!hasAssessed) {
    return (
      <div className="container" style={{ padding: '64px 20px', maxWidth: '700px' }}>
        <div className="card text-center" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={32} />
          </div>
          
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>No Assessment Yet</h2>
          
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '400px' }}>
            Complete a city sustainability assessment to view your overall score, indicator breakdown, problem areas, and AI recommendations.
          </p>

          <Link to="/assessment" className="btn-primary">
            <span>Start Assessment</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const radarData = indicatorMeta.map((item) => ({
    subject: item.name.replace(' Management', '').replace(' Conservation', '').replace(' Infrastructure', '').replace(' Efficiency', ''),
    score: indicators[item.key] ?? 50,
    fullMark: 100
  }));

  return (
    <div className="container" style={{ padding: '48px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Dashboard Top Header */}
      <div className="flex-between" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
        <div>
          <span className="badge" style={{ marginBottom: '8px' }}>ASSESSMENT COMPLETE</span>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>
            Sustainability Overview
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Showing results for locality: <strong style={{ color: 'var(--primary-green)' }}>{locality}</strong>
          </p>
        </div>

        <div className="flex-row gap-3">
          <Link to="/assessment" className="btn-secondary">
            <RefreshCw size={16} />
            <span>Re-Assess Locality</span>
          </Link>

          <Link to="/report" className="btn-primary">
            <span>View Full Report →</span>
          </Link>
        </div>
      </div>

      {/* Top Grid: Score Card + Radar Chart */}
      <div className="grid-2" style={{ gridTemplateColumns: '1fr 1.4fr', alignItems: 'stretch' }}>
        <ScoreCard
          score={overallScore}
          statusLabel={scoreStatus.label}
          statusColor={scoreStatus.color}
          locality={locality}
        />

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <div>
            <span className="badge" style={{ marginBottom: '8px' }}>INDICATOR RADAR ANALYSIS</span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Locality Performance Distribution
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Visual representation across all 7 environmental indicators.</p>
          </div>

          <div style={{ width: '100%', height: '260px', margin: '12px 0' }}>
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

          <div className="flex-between" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
            <span>Outer perimeter: 100 (Optimal)</span>
            <span style={{ color: 'var(--primary-green)', fontWeight: 800 }}>Inner fill: Locality Profile</span>
          </div>
        </div>
      </div>

      {/* Indicator Breakdown Progress Bars */}
      <div className="card" style={{ padding: '32px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span className="badge" style={{ marginBottom: '8px' }}>INDICATOR BREAKDOWN</span>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>
            Sustainability Breakdown
          </h2>
        </div>

        <div className="grid-2">
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

      {/* Areas Requiring Attention & Performing Areas */}
      <div className="grid-2">
        
        {/* Areas Requiring Attention (<60) */}
        <div className="card" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
          <div className="flex-row gap-3" style={{ marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fef3c7', color: 'var(--warning-color)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#92400e' }}>Areas Requiring Attention</h3>
              <p style={{ fontSize: '12px', color: '#b45309' }}>Indicators scoring below 60/100 threshold</p>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#92400e', marginBottom: '16px' }}>
            These indicators have relatively lower assessment values and may benefit from targeted municipal improvement.
          </p>

          {problemAreas.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {problemAreas.map((item) => (
                <div key={item.key} className="flex-between" style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                  <div className="flex-row gap-3">
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                  </div>
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 900 }}>
                    {indicators[item.key]} / 100
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', color: 'var(--primary-green)', fontWeight: 700, fontSize: '13px' }}>
              ✓ All indicators are performing at 60/100 or higher.
            </div>
          )}
        </div>

        {/* Better Performing Areas (>=60) */}
        <div className="card" style={{ backgroundColor: 'var(--light-green)', borderColor: '#a3d9b1' }}>
          <div className="flex-row gap-3" style={{ marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#ffffff', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Better Performing Areas</h3>
              <p style={{ fontSize: '12px', color: 'var(--secondary-green)' }}>Indicators meeting or exceeding 60/100 threshold</p>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--secondary-green)', marginBottom: '16px' }}>
            These sectors exhibit positive sustainability indicators in {locality}.
          </p>

          {performingAreas.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {performingAreas.map((item) => (
                <div key={item.key} className="flex-between" style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #a3d9b1' }}>
                  <div className="flex-row gap-3">
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                  </div>
                  <span style={{ backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', padding: '2px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 900 }}>
                    {indicators[item.key]} / 100
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', color: '#92400e', fontWeight: 700, fontSize: '13px' }}>
              No indicators currently meet the 60+ threshold. Priority improvement is recommended.
            </div>
          )}
        </div>

      </div>

      {/* AI Recommendations Section */}
      <div className="card" style={{ padding: '36px' }}>
        
        <div className="flex-between" style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <span className="badge" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} />
              <span>GENERATIVE AI ENGINE</span>
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>
              ✨ AI-Powered Recommendations
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Personalized suggestions generated from your sustainability assessment.
            </p>
          </div>

          <button onClick={fetchRecommendations} disabled={isGenerating} className="btn-secondary">
            <RefreshCw size={16} />
            <span>Regenerate Recommendations</span>
          </button>
        </div>

        {isGenerating ? (
          <div className="text-center" style={{ padding: '48px 0' }}>
            <Sparkles size={48} color="var(--primary-green)" style={{ margin: '0 auto 16px auto' }} />
            <p style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {aiStep || '✨ Analyzing sustainability data...'}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Synthesizing practical recommendations for {locality}...
            </p>
          </div>
        ) : (
          <>
            {isFallback && (
              <div style={{ backgroundColor: '#fffbeb', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '13px', color: '#92400e', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{aiMessage || 'AI service is currently unavailable. Showing rule-based recommendations for demonstration.'}</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#fef3c7', fontWeight: 800, fontSize: '10px' }}>Fallback Mode</span>
              </div>
            )}

            <div className="grid-3">
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

        <div className="text-center" style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
          <Link to="/report" className="btn-primary">
            <span>View Full Improvement Report →</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
