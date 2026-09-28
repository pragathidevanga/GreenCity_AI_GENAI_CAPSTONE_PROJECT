import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment, indicatorMeta } from '../context/AssessmentContext';
import { CheckCircle2, RotateCcw, MapPin, ArrowRight, Loader2 } from 'lucide-react';

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
    
    await fetchRecommendations();
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Top Heading */}
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <span className="badge" style={{ marginBottom: '12px' }}>
          CITY SUSTAINABILITY ASSESSMENT
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
          How Sustainable Is Your Locality?
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Provide simple information about your locality to generate a sustainability assessment.
        </p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="form-card">
        
        {/* Header Action bar with Demo Data fill button */}
        <div className="flex-between" style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
          <div>
            <h2 className="flex-row gap-2" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              <MapPin size={22} color="var(--primary-green)" />
              <span>Location Information</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Enter the name of your neighborhood, city, or industrial zone.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDemoData}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <RotateCcw size={16} />
            <span>Use Demo Data</span>
          </button>
        </div>

        {/* Locality Input */}
        <div className="form-group">
          <label className="form-label">Locality Name</label>
          <input
            type="text"
            required
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Example: Electronic City"
            className="form-input"
          />
        </div>

        {/* Environmental Indicators Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Environmental Indicators (7)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Adjust the sliders based on your locality's current infrastructure performance.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {indicatorMeta.map((item) => {
              const currentValue = indicators[item.key] ?? 50;

              return (
                <div key={item.key} className="slider-item">
                  <div className="slider-header">
                    <div className="flex-row gap-3">
                      <span className="indicator-icon-box" style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                        {item.icon}
                      </span>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="slider-score-tag">
                      {currentValue} / 100
                    </div>
                  </div>

                  <div style={{ paddingTop: '8px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentValue}
                      onChange={(e) => handleIndicatorChange(item.key, e.target.value)}
                      className="slider-control"
                    />
                    <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingTop: '4px' }}>
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
        <div
          className="flex-between"
          style={{
            backgroundColor: 'var(--light-green)',
            padding: '24px',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(46, 125, 82, 0.2)'
          }}
        >
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Assessment Summary
            </h4>
            <div className="flex-row gap-4" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-green)' }}>
              <span>Indicators completed: <strong>7 / 7</strong></span>
              <span className="flex-row gap-1" style={{ color: 'var(--success-color)' }}>
                <CheckCircle2 size={16} /> Ready to analyze
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '16px' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Sustainability</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AssessmentForm;
