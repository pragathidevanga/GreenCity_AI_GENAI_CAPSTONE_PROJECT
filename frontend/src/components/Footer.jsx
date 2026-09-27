import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#17321F] text-white pt-12 pb-8 border-t border-emerald-900/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/40">
          
          {/* Left Column: Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">Green City AI</span>
            </Link>
            <p className="text-emerald-200/80 text-sm max-w-sm leading-relaxed">
              Generative AI-Based Sustainable City Planning System designed to assess urban infrastructure indicators and provide practical environmental insights.
            </p>
          </div>

          {/* Middle Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-emerald-100/90 font-medium">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-emerald-300 transition-colors">Assessment</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-300 transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-emerald-300 transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-emerald-300 transition-colors">Report</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">About Project</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Project Metadata */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Project Specification
            </h4>
            <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-700/40 space-y-1">
              <p className="text-sm font-bold text-white">BCA Capstone Project</p>
              <p className="text-xs text-emerald-300">Generative AI Domain • 2026</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-2 text-center sm:text-left">
          <p>© 2026 Green City AI. Capstone Project. All rights reserved.</p>
          <p>Designed for BCA Capstone Viva & Progress Demonstration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
