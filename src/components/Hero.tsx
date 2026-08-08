import React from 'react';
import { ThemeConfig, TopicData } from '../types';
import { SceneCanvas } from './3d/SceneCanvas';
import { ArrowRight, Sparkles, Terminal, ShieldCheck } from 'lucide-react';

interface HeroProps {
  theme: ThemeConfig;
  topic: TopicData;
}

export const Hero: React.FC<HeroProps> = ({ theme, topic }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6">
      {/* 3D R3F Canvas Background / Integrated Visual */}
      <SceneCanvas theme={theme} objectType={topic.objectType} />

      {/* Subtle background glow effect */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: theme.accent }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase transition-all shadow-sm"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.border,
              color: theme.badgeText,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{topic.eyebrow}</span>
          </div>

          {/* Huge Topic Headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] transition-all duration-500"
            style={{ color: theme.textPrimary }}
          >
            {topic.headline}
          </h1>

          {/* Supporting Description */}
          <p
            className="text-lg sm:text-xl font-normal leading-relaxed max-w-2xl opacity-90 transition-all duration-500"
            style={{ color: theme.textSecondary }}
          >
            {topic.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#statistics"
              className="px-7 py-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-3 shadow-lg hover:translate-y-[-2px]"
              style={{
                backgroundColor: theme.accent,
                color: '#ffffff',
                boxShadow: `0 10px 25px -5px ${theme.glow}`,
              }}
            >
              <span>{topic.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#features"
              className="px-7 py-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 border flex items-center gap-3 hover:bg-white/5"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <Terminal className="w-4 h-4 opacity-75" />
              <span>{topic.secondaryCtaText}</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex items-center gap-6 border-t" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2 text-xs font-mono opacity-75" style={{ color: theme.textSecondary }}>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Universal Template Ready</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono opacity-75" style={{ color: theme.textSecondary }}>
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>React Three Fiber 3D</span>
            </div>
          </div>
        </div>

        {/* Right side spacer for 3D object composition balance */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none" />
      </div>
    </section>
  );
};
