import React, { useState } from 'react';
import { ThemeMode, TopicCategory } from './types';
import { themes } from './config/themes';
import { topics } from './config/topics';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { Features } from './components/Features';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('obsidian');
  const [topicCategory, setTopicCategory] = useState<TopicCategory>('technology');

  const currentTheme = themes[themeMode];
  const currentTopic = topics[topicCategory];

  return (
    <div
      className="min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden"
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Navigation Header */}
      <Navbar
        currentTheme={currentTheme}
        onSelectTheme={setThemeMode}
        currentTopic={currentTopic}
        onSelectTopic={setTopicCategory}
      />

      {/* Main Content Sections */}
      <main>
        <Hero theme={currentTheme} topic={currentTopic} />
        <Statistics theme={currentTheme} statistics={currentTopic.statistics} />
        <Features theme={currentTheme} features={currentTopic.features} />
        <Timeline theme={currentTheme} timeline={currentTopic.timeline} />
        <Gallery theme={currentTheme} gallery={currentTopic.gallery} />
      </main>

      {/* Footer */}
      <Footer theme={currentTheme} currentTopic={currentTopic} />
    </div>
  );
}
