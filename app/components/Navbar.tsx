"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavbarProps, NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'about',    label: 'About',        icon: <></> },
  { id: 'skills',   label: 'Skills',       icon: <></> },
  { id: 'projects', label: 'Projects',     icon: <></> },
  { id: 'journey',  label: 'Journey',      icon: <></> },
  { id: 'contact',  label: 'Contact',      icon: <></> },
];

/* Sections that render on a white/light background */
const LIGHT_SECTIONS = new Set(['skills', 'projects', 'journey', 'blogs']);

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isLight = LIGHT_SECTIONS.has(activeSection);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? (isLight ? 'rgba(255,255,255,0.92)' : 'rgba(15,15,17,0.85)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? (isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)')
          : 'none',
        boxShadow: scrolled && isLight ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => setActiveSection('hero')}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Scroll to top"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg transition-shadow duration-300"
              style={{
                background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)',
                boxShadow: '0 0 20px rgba(255,122,26,0.45)',
              }}
            >
              K
            </div>
            <span className={`text-xl font-black tracking-tight hidden sm:block transition-colors duration-200 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Kishor
            </span>
          </button>

          {/* ── Center pill nav ── */}
          <div
            className="hidden md:flex items-center"
            style={{
              background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(14px)',
              border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: '6px 8px',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="relative text-sm font-semibold transition-all duration-200"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 999,
                    color: isActive
                      ? (isLight ? '#FF7A1A' : '#fff')
                      : (isLight ? '#475569' : '#B8B8B8'),
                    background: isActive
                      ? (isLight ? 'rgba(255,122,26,0.12)' : 'rgba(255,255,255,0.10)')
                      : 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: isLight ? 'rgba(255,122,26,0.12)' : 'rgba(255,255,255,0.08)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Right: Hire Me ── */}
          <button
            onClick={() => setActiveSection('contact')}
            className="hidden md:flex items-center font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
            style={{
              height: 44,
              padding: '0 24px',
              borderRadius: 999,
              fontSize: 14,
              background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)',
              boxShadow: '0 8px 24px rgba(255,122,26,0.3)',
            }}
          >
            Hire Me
          </button>

          {/* ── Mobile hamburger ── */}
          <button
            className={`md:hidden p-2 transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-white/8 p-6 flex flex-col gap-2"
            style={{ background: 'rgba(15,15,17,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {NAV_ITEMS.map(item => (
              <button key={item.id}
                onClick={() => { setActiveSection(item.id); setOpen(false); }}
                className="text-left py-3 px-4 rounded-2xl font-semibold transition-all"
                style={{
                  color: activeSection === item.id ? '#FF7A1A' : '#B8B8B8',
                  background: activeSection === item.id ? 'rgba(255,122,26,0.08)' : 'transparent',
                }}>
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setActiveSection('contact'); setOpen(false); }}
              className="mt-2 py-3 rounded-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)' }}>
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;