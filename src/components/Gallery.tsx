import React from 'react';
import { ThemeConfig, GalleryItem } from '../types';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface GalleryProps {
  theme: ThemeConfig;
  gallery: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ theme, gallery }) => {
  return (
    <section id="gallery" className="py-24 px-6 relative z-10 border-t" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
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
              Visual Artifacts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2" style={{ color: theme.textPrimary }}>
              Editorial Imagery & Schematics
            </h2>
          </div>
          <p className="text-sm font-normal max-w-md mt-4 md:mt-0 opacity-80" style={{ color: theme.textSecondary }}>
            Curated visual documentation capturing high-fidelity operational environments and physical twins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border overflow-hidden group transition-all duration-500 hover:translate-y-[-4px] backdrop-blur-xl"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                boxShadow: `0 20px 40px -15px ${theme.glow}`,
              }}
            >
              <div className="relative h-72 sm:h-96 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full border backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderColor: theme.border,
                      color: '#ffffff',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
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
