"use client";

import React, { useState, useEffect, useRef } from 'react';

import FloatingNavigation   from './components/FloatingNavigation';
import Footer               from './components/Footer';
import Hero                 from './components/Hero';
import AboutSection         from './components/AboutSection';
import ProjectsSection      from './components/ProjectsSection';
import JourneySection       from './components/JourneySection';
import AchievementsSection  from './components/AchievementsSection';
import BlogsSection         from './components/BlogsSection';
import Contact              from './components/Contact';
import ScrollProgressBar    from './components/ScrollProgressBar';

/* ── Section IDs (for nav + IntersectionObserver) ─────────────────────────── */
const SECTION_IDS = ['hero', 'about', 'projects', 'journey', 'achievements', 'blogs', 'contact'];

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

  /* ── Dynamic Active Section Scroll Tracker ───────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // Check current scroll position relative to viewport
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      // Find the active section from bottom to top
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
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
        <ProjectsSection />
        <JourneySection />
        <AchievementsSection />
        <BlogsSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}