import React, { useState } from 'react';
import { ThemeConfig, ThemeMode, TopicCategory, TopicData } from '../types';
import { themes } from '../config/themes';
import { topics } from '../config/topics';
import { Palette, Globe, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (mode: ThemeMode) => void;
  currentTopic: TopicData;
  onSelectTopic: (category: TopicCategory) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onSelectTheme,
  currentTopic,
  onSelectTopic,
}) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [topicMenuOpen, setTopicMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: `${currentTheme.bg}cc`,
        borderColor: currentTheme.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: currentTheme.accent, color: '#ffffff' }}
          >
            Ω
          </div>
          <div>
            <span className="font-semibold tracking-wide text-lg" style={{ color: currentTheme.textPrimary }}>
              MANUS
            </span>
            <span className="text-xs block font-mono tracking-widest uppercase opacity-75" style={{ color: currentTheme.textSecondary }}>
              Universal 3D Engine
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium transition-colors hover:opacity-100 opacity-80" style={{ color: currentTheme.textPrimary }}>
            Overview
          </a>
          <a href="#statistics" className="text-sm font-medium transition-colors hover:opacity-100 opacity-80" style={{ color: currentTheme.textPrimary }}>
            Metrics
          </a>
          <a href="#features" className="text-sm font-medium transition-colors hover:opacity-100 opacity-80" style={{ color: currentTheme.textPrimary }}>
            Architecture
          </a>
          <a href="#timeline" className="text-sm font-medium transition-colors hover:opacity-100 opacity-80" style={{ color: currentTheme.textPrimary }}>
            Milestones
          </a>
          <a href="#gallery" className="text-sm font-medium transition-colors hover:opacity-100 opacity-80" style={{ color: currentTheme.textPrimary }}>
            Visuals
          </a>
        </nav>

        {/* Actions: Topic Switcher & Theme Selector */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Topic Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setTopicMenuOpen(!topicMenuOpen);
                setThemeMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
                color: currentTheme.textPrimary,
              }}
            >
              <Globe className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span>Topic: {currentTopic.name}</span>
            </button>

            {topicMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl p-2 shadow-2xl border backdrop-blur-xl z-50 max-h-96 overflow-y-auto"
                style={{
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                }}
              >
                <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider opacity-60 border-b mb-1" style={{ borderColor: currentTheme.border, color: currentTheme.textSecondary }}>
                  Select Universal Topic
                </div>
                {Object.values(topics).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTopic(t.id as TopicCategory);
                      setTopicMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      currentTopic.id === t.id ? 'font-semibold' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: currentTopic.id === t.id ? currentTheme.badgeBg : 'transparent',
                      color: currentTopic.id === t.id ? currentTheme.badgeText : currentTheme.textPrimary,
                    }}
                  >
                    <span>{t.name}</span>
                    {currentTopic.id === t.id && <Sparkles className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeMenuOpen(!themeMenuOpen);
                setTopicMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
                color: currentTheme.textPrimary,
              }}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span>Theme: {currentTheme.name}</span>
            </button>

            {themeMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl p-2 shadow-2xl border backdrop-blur-xl z-50"
                style={{
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                }}
              >
                <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider opacity-60 border-b mb-1" style={{ borderColor: currentTheme.border, color: currentTheme.textSecondary }}>
                  Select Theme Mode
                </div>
                {Object.values(themes).map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      onSelectTheme(th.id);
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      currentTheme.id === th.id ? 'font-semibold' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: currentTheme.id === th.id ? currentTheme.badgeBg : 'transparent',
                      color: currentTheme.id === th.id ? currentTheme.badgeText : currentTheme.textPrimary,
                    }}
                  >
                    <span>{th.name}</span>
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: th.accent, borderColor: th.border }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border"
            style={{
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              color: currentTheme.textPrimary,
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-6 py-6 space-y-4 backdrop-blur-2xl"
          style={{
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
          }}
        >
          <div className="text-xs font-mono uppercase tracking-wider opacity-60" style={{ color: currentTheme.textSecondary }}>
            Topics
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(topics).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTopic(t.id as TopicCategory);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-medium border"
                style={{
                  backgroundColor: currentTopic.id === t.id ? currentTheme.badgeBg : currentTheme.bg,
                  borderColor: currentTheme.border,
                  color: currentTopic.id === t.id ? currentTheme.badgeText : currentTheme.textPrimary,
                }}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono uppercase tracking-wider opacity-60 pt-2 border-t" style={{ borderColor: currentTheme.border, color: currentTheme.textSecondary }}>
            Themes
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(themes).map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  onSelectTheme(th.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between"
                style={{
                  backgroundColor: currentTheme.id === th.id ? currentTheme.badgeBg : currentTheme.bg,
                  borderColor: currentTheme.border,
                  color: currentTheme.id === th.id ? currentTheme.badgeText : currentTheme.textPrimary,
                }}
              >
                <span>{th.name}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.accent }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
