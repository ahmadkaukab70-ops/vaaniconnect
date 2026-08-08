import React from 'react';
import { ThemeConfig, StatisticItem } from '../types';
import { TrendingUp, Activity, Shield, Zap } from 'lucide-react';

interface StatisticsProps {
  theme: ThemeConfig;
  statistics: StatisticItem[];
}

export const Statistics: React.FC<StatisticsProps> = ({ theme, statistics }) => {
  const icons = [Activity, TrendingUp, Shield, Zap];

  return (
    <section id="statistics" className="py-24 px-6 relative z-10 border-t" style={{ borderColor: theme.border, backgroundColor: theme.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.border,
                color: theme.badgeText,
              }}
            >
              Performance Telemetry
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2" style={{ color: theme.textPrimary }}>
              Quantifiable Impact & Scale
            </h2>
          </div>
          <p className="text-sm font-normal max-w-md mt-4 md:mt-0 opacity-80" style={{ color: theme.textSecondary }}>
            Real-time verified benchmarks demonstrating exceptional throughput, security hardening, and resource efficiency across distributed networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden backdrop-blur-xl"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                  boxShadow: `0 20px 40px -15px ${theme.glow}`,
                }}
              >
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
                  {stat.change && (
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: theme.badgeBg,
                        borderColor: theme.border,
                        color: theme.badgeText,
                      }}
                    >
                      {stat.change}
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: theme.textPrimary }}>
                  {stat.value}
                </div>

                <div className="text-sm font-semibold mb-2" style={{ color: theme.textPrimary }}>
                  {stat.label}
                </div>

                <p className="text-xs leading-relaxed opacity-75" style={{ color: theme.textSecondary }}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
