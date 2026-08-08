import React from 'react';
import { ThemeConfig, FeatureCardItem } from '../types';
import { Cpu, Network, Shield, Radio, Sparkles, Globe, Leaf, Waves, Sprout, Camera, BookOpen, Compass, DollarSign, TrendingUp, PieChart, Brain, Beaker, Users, Palette, Volume2, Languages, Scale, HeartHandshake, Zap, Atom, Rocket, Sun, Infinity, Eye } from 'lucide-react';

interface FeaturesProps {
  theme: ThemeConfig;
  features: FeatureCardItem[];
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Network,
  Shield,
  Radio,
  Sparkles,
  Globe,
  Leaf,
  Waves,
  Sprout,
  Camera,
  BookOpen,
  Compass,
  DollarSign,
  TrendingUp,
  PieChart,
  Brain,
  Beaker,
  Users,
  Palette,
  Volume2,
  Languages,
  Scale,
  HeartHandshake,
  Zap,
  Atom,
  Rocket,
  Sun,
  Infinity,
  Eye,
};

export const Features: React.FC<FeaturesProps> = ({ theme, features }) => {
  return (
    <section id="features" className="py-24 px-6 relative z-10 border-t" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span
              className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.border,
                color: theme.badgeText,
              }}
            >
              System Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2" style={{ color: theme.textPrimary }}>
              Core Capabilities & Features
            </h2>
          </div>
          <p className="text-sm font-normal max-w-md mt-4 md:mt-0 opacity-80" style={{ color: theme.textSecondary }}>
            Modular, high-performance building blocks designed for seamless universal adaptation across any domain or topic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComponent = iconMap[feat.iconName] || Cpu;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                  boxShadow: `0 20px 40px -15px ${theme.glow}`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                        color: theme.accent,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {feat.metric && (
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: theme.badgeBg,
                          borderColor: theme.border,
                          color: theme.badgeText,
                        }}
                      >
                        {feat.metric}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest opacity-60 block mb-1" style={{ color: theme.textSecondary }}>
                    {feat.subtitle}
                  </span>

                  <h3 className="text-xl font-bold mb-3" style={{ color: theme.textPrimary }}>
                    {feat.title}
                  </h3>

                  <p className="text-sm leading-relaxed opacity-80" style={{ color: theme.textSecondary }}>
                    {feat.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: theme.border, color: theme.textSecondary }}>
                  <span>Architecture Module 0{idx + 1}</span>
                  <span style={{ color: theme.accent }}>Active State</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
