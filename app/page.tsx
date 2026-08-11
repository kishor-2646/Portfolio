"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import Hero                from './components/Hero';
import AboutSection        from './components/AboutSection';
import SkillsSection       from './components/SkillsSection';
import ProjectsSection     from './components/ProjectsSection';
import JourneySection      from './components/JourneySection';
import Contact             from './components/Contact';
import TransitionSurface, { type CardGeo } from './components/TransitionSurface';
import ScrollProgressBar   from './components/ScrollProgressBar';

// ── Section IDs (for nav + IntersectionObserver) ─────────────────────────
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];

export default function App() {
  const [activeSection, setActiveSection]   = useState('hero');
  const [navClickTarget, setNavClickTarget] = useState<string | null>(null);
  const isScrollingRef = useRef(false);

  // ── Hero card bounding box ─────────────────────────────────────────────
  const cardGeoRef     = useRef<CardGeo | null>(null);
  const [cardGeo, setCardGeo] = useState<CardGeo | null>(null);
  const cardBoxNodeRef = useRef<HTMLDivElement | null>(null);

  const stableCardBoxRef = useCallback((node: HTMLDivElement | null) => {
    cardBoxNodeRef.current = node;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const geo: CardGeo = { top: r.top, left: r.left, width: r.width, height: r.height };
    cardGeoRef.current = geo;
    setCardGeo(geo);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (!cardBoxNodeRef.current) return;
      const r = cardBoxNodeRef.current.getBoundingClientRect();
      const geo: CardGeo = { top: r.top, left: r.left, width: r.width, height: r.height };
      cardGeoRef.current = geo;
      setCardGeo({ ...geo });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // PHASE A SCROLL CONTAINER — Hero (100vh) + About (200vh) = 300vh
  // ═══════════════════════════════════════════════════════════════════════
  const phaseARef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: phaseA } = useScroll({
    target: phaseARef,
    offset: ['start start', 'end start'],
  });

  const heroContentOpacity = useTransform(
    phaseA,
    [0.00, 0.22, 0.35],
    [1.0,  1.0,  0.0 ]
  );

  const heroBgY = useTransform(phaseA, [0, 0.35], ['0px', '60px']);

  // ── Scroll-to-section ──────────────────────────────────────────────────
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

  // ── IntersectionObserver ────────────────────────────────────────────────
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
    <div className="min-h-screen bg-[#0A0A0A] antialiased font-sans">
      <ScrollProgressBar />
      <Navbar activeSection={activeSection} setActiveSection={id => setNavClickTarget(id)} />

      {/* ═══════════════════════════════════════════════════════════════
          TRANSITION SURFACE — position:fixed, z-index:9
      ═══════════════════════════════════════════════════════════════ */}
      {cardGeo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
          className="pointer-events-none hidden lg:block"
          style={{ position: 'fixed', inset: 0, zIndex: 9 }}
        >
          <TransitionSurface
            progress={phaseA}
            cardGeo={cardGeo}
          />
        </motion.div>
      )}

      <main>
        {/* ═══════════════════════════════════════════════════════════
            PHASE A — Hero + About (NO zIndex for proper layering)
        ═══════════════════════════════════════════════════════════ */}
        <div ref={phaseARef}>
          <Hero
            heroBgY={heroBgY}
            cardContentOpacity={heroContentOpacity}
            cardBoxRefCallback={stableCardBoxRef}
          />
          <AboutSection />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            REMAINING SECTIONS — z-index: 10
        ═══════════════════════════════════════════════════════════ */}
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