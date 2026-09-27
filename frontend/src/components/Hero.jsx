import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, TreePine, BatteryCharging } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF6EC]/60 via-[#F7FAF7] to-white py-16 lg:py-24">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/60 text-[#14532D] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>AI-POWERED SUSTAINABLE CITY PLANNING</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17321F] tracking-tight leading-tight">
              Build a{' '}
              <span className="bg-gradient-to-r from-[#14532D] via-[#2E7D52] to-[#72B87A] bg-clip-text text-transparent">
                Greener, Smarter
              </span>{' '}
              City
            </h1>

            <p className="text-lg sm:text-xl text-[#66756B] leading-relaxed max-w-2xl font-normal">
              Understand your locality’s sustainability performance and get AI-powered recommendations for building cleaner, greener and more sustainable communities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#14532D] text-white font-bold text-base shadow-lg hover:bg-[#1b683a] hover:-translate-y-0.5 transition-all group"
              >
                <span>Assess Your City</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#14532D] font-bold text-base border-2 border-emerald-800/30 hover:bg-emerald-50 shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <span>Explore How It Works</span>
              </a>
            </div>

            {/* Trust badge line */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#66756B] pt-4">
              <ShieldCheck className="w-4 h-4 text-[#3E8E5B]" />
              <span>Environmental indicators • AI recommendations • Sustainability insights</span>
            </div>

          </div>

          {/* Right Column: Hero Image with Soft Glow & Floating Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white hero-glow group">
              <img
                src="/hero-smart-city.jpg"
                alt="Sustainable Indian Smart City with Green Infrastructure"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Sample Info Badge 1 */}
            <div className="absolute -top-4 -left-4 sm:top-6 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl custom-shadow border border-emerald-100 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold text-lg">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#66756B]">Green Space</p>
                <p className="text-base font-extrabold text-[#17321F]">72% <span className="text-xs text-emerald-600 font-medium">(Sample)</span></p>
              </div>
            </div>

            {/* Floating Sample Info Badge 2 */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl custom-shadow border border-emerald-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold text-lg">
                <BatteryCharging className="w-5 h-5 text-[#2E7D52]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#66756B]">EV Ready</p>
                <p className="text-base font-extrabold text-[#17321F]">64% <span className="text-xs text-emerald-600 font-medium">(Sample)</span></p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
