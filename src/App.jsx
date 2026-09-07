import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GateReader from './components/GateReader';
import PurposeSection from './components/PurposeSection';
import DataSection from './components/DataSection';
import TechnologySection from './components/TechnologySection';
import ProcessSection from './components/ProcessSection';
import PersonnelSection from './components/PersonnelSection';
import { Sparkles, ArrowUp, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('landing');

  // Scroll handler for smooth section switching
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver to sync current active section in nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['landing', 'purpose', 'data', 'technology', 'process', 'personnel'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">

      {/* Persistent Navigation Bar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Landing Page Gate Reader Terminal */}
        <GateReader onExploreClick={() => scrollToSection('purpose')} />

        {/* Section 1: Purpose */}
        <PurposeSection />

        {/* Section 2: Data */}
        <DataSection />

        {/* Section 3: Technology */}
        <TechnologySection />

        {/* Section 4: Process */}
        <ProcessSection />

        {/* Section 5: Personnel */}
        <PersonnelSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 py-10 px-4 sm:px-6 lg:px-8 mt-16 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-200">
              Information Systems Educational Case Study
            </span>
          </div>

          <p className="text-slate-400">
            5 Components of Information Systems • Hong Kong Octopus Transport Payment System
          </p>

          <button
            onClick={() => scrollToSection('landing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Back to Reader
          </button>
        </div>
      </footer>

    </div>
  );
}
