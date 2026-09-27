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
  { value: '7', label: 'Environmental Indicators', icon: <Activity className="w-5 h-5 text-emerald-600" /> },
  { value: '100', label: 'Maximum Score', icon: <Award className="w-5 h-5 text-emerald-600" /> },
  { value: 'AI', label: 'Powered Recommendations', icon: <Brain className="w-5 h-5 text-emerald-600" /> },
  { value: '1', label: 'Improvement Report', icon: <FileCheck className="w-5 h-5 text-emerald-600" /> }
];

const Home = () => {
  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <Hero />

      {/* Statistics Strip Section (Prompt #10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-emerald-900/10 custom-shadow grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-4 rounded-2xl bg-[#F7FAF7] border border-emerald-900/5">
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-black text-[#14532D]">
                {stat.value}
              </div>
              <p className="text-xs font-extrabold text-[#66756B] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section (Prompt #11) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
            WORKFLOW OVERVIEW
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17321F]">
            From Data to Sustainable Action
          </h2>
          <p className="text-base text-[#66756B] max-w-2xl mx-auto">
            Green City AI turns simple locality information into understandable sustainability insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Environmental Indicators Section (Prompt #12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
            CORE INDICATORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17321F]">
            What We Analyze
          </h2>
          <p className="text-base text-[#66756B] max-w-2xl mx-auto">
            Seven crucial environmental and urban infrastructure sectors assessed by Green City AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-[#14532D] via-[#1b683a] to-[#2E7D52] rounded-3xl p-10 sm:p-14 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Exploring Now
          </span>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Evaluate Your Locality's Sustainability?
          </h2>

          <p className="text-emerald-100/90 text-base max-w-xl mx-auto font-medium">
            It takes under 2 minutes to assess your locality and generate AI recommendations.
          </p>

          <div className="pt-2">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#14532D] font-extrabold text-base shadow-lg hover:bg-emerald-50 hover:-translate-y-0.5 transition-all"
            >
              <span>Assess Your City</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
