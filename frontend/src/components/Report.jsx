import React from 'react';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import { Printer, Download, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';

const Report = () => {
  const {
    locality,
    overallScore,
    scoreStatus,
    indicators,
    problemAreas,
    aiRecommendations,
    expectedBenefits,
    isFallback
  } = useAssessment();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Action Header Bar */}
      <div className="no-print card flex-between" style={{ padding: '20px 24px' }}>
        <div>
          <span className="badge" style={{ marginBottom: '4px' }}>CAPSTONE REPORT EXPORT</span>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Sustainable City Improvement Report
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Print or export a clean executive summary report for viva presentation.
          </p>
        </div>

        <div className="flex-row gap-3">
          <button onClick={handlePrint} className="btn-primary">
            <Printer size={16} />
            <span>Print Report</span>
          </button>
          
          <button onClick={handlePrint} className="btn-secondary">
            <Download size={16} />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Main Document Paper */}
      <div className="report-paper">
        
        {/* Header */}
        <div className="flex-between" style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '28px' }}>
          <div>
            <div className="flex-row gap-2" style={{ marginBottom: '8px' }}>
              <Leaf size={24} color="var(--primary-green)" />
              <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--primary-green)' }}>Green City AI</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>
              Sustainable City Improvement Report
            </h1>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>
              AI-generated sustainability insights for locality: <strong style={{ color: 'var(--primary-green)', fontSize: '16px' }}>{locality || 'Electronic City'}</strong>
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
              Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • BCA Capstone Project 2026
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--light-green)', padding: '20px', borderRadius: '16px', textAlign: 'center', minWidth: '180px', border: '1px solid #a3d9b1' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Overall Score</p>
            <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0' }}>
              {overallScore} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/ 100</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: scoreStatus.color, backgroundColor: `${scoreStatus.color}20`, padding: '4px 10px', borderRadius: '50px' }}>
              {scoreStatus.label}
            </span>
          </div>
        </div>

        {/* Section 01 */}
        <div className="report-section">
          <div className="flex-row gap-3">
            <span className="section-num">01</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Executive Summary</h2>
          </div>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.05)', fontSize: '14px', lineHeight: 1.6 }}>
            <p>
              This report presents a structured evaluation of environmental and municipal infrastructure indicators for <strong>{locality}</strong>. The locality achieved an overall score of <strong>{overallScore}/100</strong>, indicating a <strong>{scoreStatus.label}</strong> standing.
            </p>
          </div>
        </div>

        {/* Section 02 */}
        <div className="report-section">
          <div className="flex-row gap-3">
            <span className="section-num">02</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Sustainability Score & Indicator Breakdown</h2>
          </div>

          <div className="grid-2">
            {indicatorMeta.map((item) => {
              const val = indicators[item.key] ?? 50;
              return (
                <div key={item.key} className="flex-between" style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #f3f4f6', backgroundColor: '#ffffff' }}>
                  <div className="flex-row gap-3">
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, backgroundColor: 'var(--light-green)', color: 'var(--primary-green)' }}>
                    {val} / 100
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 03 */}
        <div className="report-section">
          <div className="flex-row gap-3">
            <span className="section-num">03</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Major Areas Requiring Attention</h2>
          </div>

          {problemAreas.length > 0 ? (
            <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '16px', border: '1px solid #fde68a', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-row gap-2" style={{ fontSize: '14px', fontWeight: 800, color: '#92400e' }}>
                <AlertTriangle size={18} color="var(--warning-color)" />
                <span>Indicators scoring below optimal threshold (60/100):</span>
              </div>
              <div className="grid-2">
                {problemAreas.map(p => (
                  <div key={p.key} className="flex-between" style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '13px', fontWeight: 700 }}>
                    <span className="flex-row gap-2">
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </span>
                    <span style={{ color: 'var(--warning-color)', fontWeight: 900 }}>{indicators[p.key]}/100</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: 'var(--light-green)', padding: '16px', borderRadius: '12px', color: 'var(--primary-green)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={18} color="var(--success-color)" />
              <span>All indicators in {locality} are currently performing at or above the 60/100 threshold!</span>
            </div>
          )}
        </div>

        {/* Section 04 */}
        <div className="report-section">
          <div className="flex-between">
            <div className="flex-row gap-3">
              <span className="section-num">04</span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>AI-Powered Recommendations</h2>
            </div>
            {isFallback && (
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warning-color)', backgroundColor: '#fffbeb', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fde68a' }}>
                Rule-Based Fallback Active
              </span>
            )}
          </div>

          <div className="grid-2">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="flex-row gap-2">
                  <span style={{ fontSize: '20px' }}>{rec.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-green)' }}>{rec.category}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{rec.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 05 */}
        <div className="report-section">
          <div className="flex-row gap-3">
            <span className="section-num">05</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Expected Sustainability Benefits</h2>
          </div>

          <div style={{ backgroundColor: 'var(--light-green)', padding: '20px', borderRadius: '16px', border: '1px solid #a3d9b1' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
              {expectedBenefits.map((benefit, i) => (
                <li key={i} className="flex-row gap-2" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-green)' }}>
                  <CheckCircle size={16} color="var(--success-color)" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Report;
