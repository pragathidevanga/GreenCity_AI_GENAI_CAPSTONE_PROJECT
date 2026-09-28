import React from 'react';
import { Award, Cpu, ShieldCheck, CheckCircle2, Server, Layout, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="container" style={{ padding: '48px 20px', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Top Banner */}
      <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <span className="badge">
            <Award size={14} />
            <span>BCA CAPSTONE PROJECT 2026</span>
          </span>
        </div>

        <h1 style={{ fontSize: '40px', fontWeight: 900, color: 'var(--text-primary)' }}>
          About Green City AI
        </h1>

        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Green City AI aims to help users understand local sustainability conditions and identify practical, data-driven improvement opportunities for urban communities.
        </p>
      </div>

      {/* Problem & Solution Cards */}
      <div className="grid-2">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#fef3c7', fontSize: '24px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
            ⚠️
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>The Problem</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Environmental and municipal infrastructure information can be fragmented, technical, and difficult for citizens and planners to evaluate for localized sustainability decision-making.
          </p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'var(--light-green)', fontSize: '24px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
            🌱
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>The Solution</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Green City AI brings seven key sustainability indicators into a single intuitive assessment system and uses Generative AI to deliver personalized, practical recommendations.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span className="badge" style={{ marginBottom: '8px' }}>SYSTEM ARCHITECTURE</span>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>
            Technology Stack
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Simple, modern full-stack web technologies configured for demonstration.</p>
        </div>

        <div className="grid-4">
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.05)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <Layout size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>React</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Frontend SPA with Pure Custom CSS & Recharts visualization.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.05)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <Server size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Node.js</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>JavaScript runtime handling server processing and routing.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.05)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <Cpu size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Express.js</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>RESTful API endpoints for recommendations and AI chat.</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(20, 83, 45, 0.05)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <Sparkles size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Generative AI</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gemini API Integration with intelligent rule-based fallback.</p>
          </div>
        </div>
      </div>

      {/* Viva Flow Checklist */}
      <div style={{ backgroundColor: 'var(--light-green)', padding: '36px', borderRadius: '28px', border: '1px solid #a3d9b1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="flex-row gap-3">
          <ShieldCheck size={28} color="var(--primary-green)" />
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Viva & Progress Demonstration Flow</h2>
            <p style={{ fontSize: '12px', color: 'var(--secondary-green)' }}>Key methodology points to explain during project presentation</p>
          </div>
        </div>

        <div className="grid-2">
          <div className="flex-row gap-2" style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-green)' }}>
            <CheckCircle2 size={16} color="var(--success-color)" />
            <span>1. Collect 7 environmental indicators via range sliders (0–100)</span>
          </div>
          <div className="flex-row gap-2" style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-green)' }}>
            <CheckCircle2 size={16} color="var(--success-color)" />
            <span>2. Calculate overall prototype score: arithmetic mean of indicators</span>
          </div>
          <div className="flex-row gap-2" style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-green)' }}>
            <CheckCircle2 size={16} color="var(--success-color)" />
            <span>3. Dynamically filter problem areas (&lt; 60) vs performing areas (≥ 60)</span>
          </div>
          <div className="flex-row gap-2" style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--primary-green)' }}>
            <CheckCircle2 size={16} color="var(--success-color)" />
            <span>4. Send JSON payload to Express server `/api/recommendations`</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
