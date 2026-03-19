"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Section components
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll to section whenever activeSection changes
  useEffect(() => {
    const el = document.getElementById(activeSection);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30 selection:text-cyan-200 antialiased font-sans">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <Contact />
      </main>

      <Footer />

      {/* Mobile scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 md:hidden text-slate-400"
      >
        <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center pt-3">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
