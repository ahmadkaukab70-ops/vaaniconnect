import React from 'react';
import { ThemeConfig, TopicData } from '../types';
import { ArrowUpRight, Shield, Terminal, Sparkles } from 'lucide-react';

interface FooterProps {
  theme: ThemeConfig;
  currentTopic: TopicData;
}

export const Footer: React.FC<FooterProps> = ({ theme, currentTopic }) => {
  return (
    <footer className="border-t py-16 px-6 relative z-10 transition-colors duration-300"
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg"
              style={{ backgroundColor: theme.accent, color: '#ffffff' }}
            >
              Ω
            </div>
            <div>
              <span className="font-semibold tracking-wide text-lg" style={{ color: theme.textPrimary }}>
                MANUS
              </span>
              <span className="text-xs block font-mono tracking-widest uppercase opacity-75" style={{ color: theme.textSecondary }}>
                Universal 3D Engine
              </span>
            </div>
          </div>

          <p className="text-sm font-normal max-w-md opacity-80 leading-relaxed" style={{ color: theme.textSecondary }}>
            An award-level universal 3D website engine engineered for extreme speed, cinematic React Three Fiber visuals, and instantaneous topic adaptation.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: theme.textSecondary }}>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production Ready</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Active Topic: {currentTopic.name}</span>
            </span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.textPrimary }}>
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm font-medium" style={{ color: theme.textSecondary }}>
            <li><a href="#hero" className="hover:opacity-100 opacity-80 transition-opacity">Overview</a></li>
            <li><a href="#statistics" className="hover:opacity-100 opacity-80 transition-opacity">Telemetry & Metrics</a></li>
            <li><a href="#features" className="hover:opacity-100 opacity-80 transition-opacity">Architecture</a></li>
            <li><a href="#timeline" className="hover:opacity-100 opacity-80 transition-opacity">Milestones</a></li>
            <li><a href="#gallery" className="hover:opacity-100 opacity-80 transition-opacity">Visual Artifacts</a></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.textPrimary }}>
            Framework Specs
          </h4>
          <ul className="space-y-2.5 text-sm font-medium" style={{ color: theme.textSecondary }}>
            <li className="flex items-center gap-1.5">
              <span>React Three Fiber</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </li>
            <li className="flex items-center gap-1.5">
              <span>Tailwind CSS v4</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </li>
            <li className="flex items-center gap-1.5">
              <span>Vercel Optimized</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-60"
        style={{ borderColor: theme.border, color: theme.textSecondary }}
      >
        <div>© 2026 MANUS Universal Engine. All rights reserved.</div>
        <div>Designed for High-Speed Editorial Competition</div>
      </div>
    </footer>
  );
};
