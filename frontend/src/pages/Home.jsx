import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import IndicatorCard from '../components/IndicatorCard';
import { indicatorMeta } from '../context/AssessmentContext';
import { Sparkles, ArrowRight, Activity, Award, Brain, FileCheck } from 'lucide-react';

const steps = [
  {
    stepNumber: '01',
    title: 'Assess',
    description: 'Enter environmental and infrastructure information about your locality.'
  },
  {
    stepNumber: '02',
    title: 'Analyze',
    description: 'The system calculates the overall prototype sustainability score.'
  },
  {
    stepNumber: '03',
    title: 'Understand',
    description: 'Identify specific areas that require municipal or community attention.'
  },
  {
    stepNumber: '04',
    title: 'Improve',
    description: 'Generative AI provides practical, actionable sustainability recommendations.'
  }
];

const stats = [
  { value: '7', label: 'Environmental Indicators', icon: <Activity size={20} color="var(--primary-green)" /> },
  { value: '100', label: 'Maximum Score', icon: <Award size={20} color="var(--primary-green)" /> },
  { value: 'AI', label: 'Powered Recommendations', icon: <Brain size={20} color="var(--primary-green)" /> },
  { value: '1', label: 'Improvement Report', icon: <FileCheck size={20} color="var(--primary-green)" /> }
];

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* Hero Section */}
      <Hero />

      {/* Stats Strip */}
      <div className="container">
        <div className="stats-strip">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{stat.icon}</div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '8px' }}>WORKFLOW OVERVIEW</span>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
            From Data to Sustainable Action
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            Green City AI turns simple locality information into understandable sustainability insights.
          </p>
        </div>

        <div className="grid-4">
          {steps.map((step, idx) => (
            <FeatureCard
              key={idx}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              isLast={idx === steps.length - 1}
            />
          ))}
        </div>
      </section>

      {/* What We Analyze Section */}
      <section className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '8px' }}>CORE INDICATORS</span>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
            What We Analyze
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            Seven crucial environmental and urban infrastructure sectors assessed by Green City AI.
          </p>
        </div>

        <div className="grid-4">
          {indicatorMeta.map((item) => (
            <IndicatorCard
              key={item.key}
              icon={item.icon}
              title={item.name}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="container" style={{ paddingBottom: '32px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #14532D 0%, #1b683a 50%, #2E7D52 100%)',
            borderRadius: '28px',
            padding: '48px',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
            <Sparkles size={14} /> Start Exploring Now
          </span>

          <h2 style={{ fontSize: '36px', fontWeight: 900, maxWidth: '600px', lineHeight: 1.2 }}>
            Ready to Evaluate Your Locality's Sustainability?
          </h2>

          <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '500px' }}>
            It takes under 2 minutes to assess your locality and generate AI recommendations.
          </p>

          <Link to="/assessment" className="btn-primary" style={{ backgroundColor: '#ffffff', color: 'var(--primary-green)' }}>
            <span>Assess Your City</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
