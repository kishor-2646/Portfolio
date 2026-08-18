"use client";

import React, { useState, useEffect, useRef } from 'react';

import FloatingNavigation  from './components/FloatingNavigation';
import Footer              from './components/Footer';
import Hero                from './components/Hero';
import AboutSection        from './components/AboutSection';
import SkillsSection       from './components/SkillsSection';
import ProjectsSection     from './components/ProjectsSection';
import JourneySection      from './components/JourneySection';
import Contact             from './components/Contact';
import ScrollProgressBar   from './components/ScrollProgressBar';

/* ── Section IDs (for nav + IntersectionObserver) ─────────────────────────── */
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];

export default function App() {
  const [activeSection, setActiveSection]   = useState('hero');
  const [navClickTarget, setNavClickTarget] = useState<string | null>(null);
  const isScrollingRef = useRef(false);

  /* ── Scroll-to-section (from nav clicks) ──────────────────────────────── */
  useEffect(() => {
    if (!navClickTarget) return;
    isScrollingRef.current = true;

    const el = document.getElementById(navClickTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(navClickTarget);
    }

    const t = setTimeout(() => {
      isScrollingRef.current = false;
      setNavClickTarget(null);
    }, 900);
    return () => clearTimeout(t);
  }, [navClickTarget]);

  /* ── IntersectionObserver — keep activeSection in sync ───────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (isScrollingRef.current) return;
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <div className="min-h-screen antialiased font-sans" style={{ background: '#000000' }}>
      <ScrollProgressBar />

      {/* Floating pill navigation — replaces old full-width Navbar */}
      <FloatingNavigation
        activeSection={activeSection}
        setActiveSection={id => setNavClickTarget(id)}
      />

      <main>
        {/* Hero section — cinematic monochrome rebuild */}
        <Hero />

        {/* Remaining sections */}
        <AboutSection />
        <div className="relative" style={{ zIndex: 10 }}>
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}