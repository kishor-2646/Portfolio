"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import Hero                from './components/Hero';
import AboutSection        from './components/AboutSection';
import SkillsSection       from './components/SkillsSection';
import ProjectsSection     from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import BlogsSection        from './components/BlogsSection';
import TimelineSection     from './components/TimelineSection';
import Contact             from './components/Contact';

// All section IDs in order
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'achievements', 'blogs', 'timeline', 'contact'];

export default function App() {
  const [activeSection, setActiveSection]   = useState('hero');
  const [navClickTarget, setNavClickTarget] = useState<string | null>(null);
  const isScrollingRef = useRef(false);

  // ── Scroll-to-section when user clicks navbar ──────────────
  useEffect(() => {
    if (!navClickTarget) return;
    isScrollingRef.current = true;
    const el = document.getElementById(navClickTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(navClickTarget);
    }
    // Re-enable IntersectionObserver after scroll settles (~800ms)
    const t = setTimeout(() => {
      isScrollingRef.current = false;
      setNavClickTarget(null);
    }, 900);
    return () => clearTimeout(t);
  }, [navClickTarget]);

  // ── IntersectionObserver — updates active section on scroll ─
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          // Only update if user is scrolling (not clicking nav)
          if (isScrollingRef.current) return;
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          // Trigger when 40% of the section is visible
          threshold: 0.4,
          rootMargin: '-80px 0px 0px 0px', // offset for fixed navbar height
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = (id: string) => {
    setNavClickTarget(id);
  };

  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30 selection:text-cyan-200 antialiased font-sans">
      <Navbar activeSection={activeSection} setActiveSection={handleNavClick} />

      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <BlogsSection />
        <TimelineSection />
        <Contact />
      </main>

      <Footer />

      {/* Mobile scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 md:hidden text-slate-400 z-40">
        <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center pt-3">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}