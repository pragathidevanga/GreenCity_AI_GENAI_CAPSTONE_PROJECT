import React from 'react';
import { Leaf, Award, Cpu, ShieldCheck, CheckCircle2, Server, Layout, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Top Banner with Capstone Badge */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider border border-emerald-200">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>BCA CAPSTONE PROJECT 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[#17321F] tracking-tight">
          About Green City AI
        </h1>

        <p className="text-lg text-[#66756B] max-w-2xl mx-auto leading-relaxed">
          Green City AI aims to help users understand local sustainability conditions and identify practical, data-driven improvement opportunities for urban communities.
        </p>
      </div>

      {/* Problem & Solution Cards (Prompt #30) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Problem Card */}
        <div className="bg-white p-8 rounded-3xl border border-emerald-900/10 custom-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
            ⚠️
          </div>
          <h2 className="text-2xl font-extrabold text-[#17321F]">
            The Problem
          </h2>
          <p className="text-sm text-[#66756B] leading-relaxed">
            Environmental and municipal infrastructure information can be fragmented, technical, and difficult for citizens and planners to evaluate for localized sustainability decision-making.
          </p>
        </div>

        {/* Solution Card */}
        <div className="bg-white p-8 rounded-3xl border border-emerald-900/10 custom-shadow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold text-xl">
            🌱
          </div>
          <h2 className="text-2xl font-extrabold text-[#17321F]">
            The Solution
          </h2>
          <p className="text-sm text-[#66756B] leading-relaxed">
            Green City AI brings seven key sustainability indicators into a single intuitive assessment system and uses Generative AI to deliver personalized, practical recommendations.
          </p>
        </div>

      </div>

      {/* Technology Stack Section (Prompt #30) */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-emerald-900/10 custom-shadow space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl font-black text-[#17321F] mt-2">
            Technology Stack
          </h2>
          <p className="text-xs text-[#66756B]">Simple, modern full-stack web technologies configured for demonstration.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#17321F]">React</h3>
            <p className="text-xs text-[#66756B]">Frontend SPA with Tailwind CSS styling & Recharts visualization.</p>
          </div>

          <div className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#17321F]">Node.js</h3>
            <p className="text-xs text-[#66756B]">JavaScript runtime handling server processing and routing.</p>
          </div>

          <div className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#17321F]">Express.js</h3>
            <p className="text-xs text-[#66756B]">RESTful API endpoints for recommendations and AI chat.</p>
          </div>

          <div className="bg-[#F7FAF7] p-5 rounded-2xl border border-emerald-900/5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#17321F]">Generative AI</h3>
            <p className="text-xs text-[#66756B]">Gemini API Integration with intelligent rule-based fallback.</p>
          </div>

        </div>
      </div>

      {/* Demonstration Viva Flow Guide */}
      <div className="bg-[#EAF6EC] p-8 sm:p-10 rounded-3xl border border-emerald-200 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-[#14532D]" />
          <div>
            <h2 className="text-xl font-extrabold text-[#17321F]">
              Viva & Progress Demonstration Flow
            </h2>
            <p className="text-xs text-[#2E7D52]">Key methodology points to explain during project presentation</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-[#14532D]">
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>1. Collect 7 environmental indicators via range sliders (0–100)</span>
          </li>
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>2. Calculate overall prototype score: arithmetic mean of indicators</span>
          </li>
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>3. Dynamically filter problem areas (&lt; 60) vs performing areas (≥ 60)</span>
          </li>
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>4. Send JSON payload to Express server `/api/recommendations`</span>
          </li>
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>5. GenAI prompt generates tailored action items with fallback safety</span>
          </li>
          <li className="flex items-center gap-2 bg-white p-3 rounded-xl border border-emerald-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E5B] shrink-0" />
            <span>6. Render executive report with native print/download styling</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default About;
