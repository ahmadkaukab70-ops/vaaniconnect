import React from 'react';
import { ThemeConfig, TimelineItem } from '../types';
import { GitCommit, Sparkles } from 'lucide-react';

interface TimelineProps {
  theme: ThemeConfig;
  timeline: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ theme, timeline }) => {
  return (
    <section id="timeline" className="py-24 px-6 relative z-10 border-t" style={{ borderColor: theme.border, backgroundColor: theme.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.border,
              color: theme.badgeText,
            }}
          >
            Evolutionary Chronology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2" style={{ color: theme.textPrimary }}>
            Milestones & Roadmap
          </h2>
          <p className="text-sm font-normal mt-4 opacity-80" style={{ color: theme.textSecondary }}>
            Tracing the trajectory from foundational inception to advanced autonomous deployment.
          </p>
        </div>

        <div className="relative border-l ml-4 md:ml-auto max-w-4xl pl-6 md:pl-10 space-y-12" style={{ borderColor: theme.border }}>
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div
                className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              </div>

              <div
                className="p-8 rounded-2xl border transition-all duration-300 hover:translate-y-[-2px] backdrop-blur-xl"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                  boxShadow: `0 15px 30px -10px ${theme.glow}`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full border font-semibold"
                    style={{
                      backgroundColor: theme.badgeBg,
                      borderColor: theme.border,
                      color: theme.badgeText,
                    }}
                  >
                    {item.year}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60" style={{ color: theme.textSecondary }}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed opacity-80" style={{ color: theme.textSecondary }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
