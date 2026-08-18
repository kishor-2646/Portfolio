"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavbarProps, NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'about',    label: 'About',    icon: <></> },
  { id: 'skills',   label: 'Work',     icon: <></> },
  { id: 'projects', label: 'Skills',   icon: <></> },
  { id: 'journey',  label: 'Journey',  icon: <></> },
  { id: 'contact',  label: 'Contact',  icon: <></> },
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
      className="fixed top-0 left-0 w-full z-50"
      style={{ pointerEvents: 'none' }}
    >
      {/* ── Single centered pill — logo + nav items + resume ── */}
      <div
        className="hidden md:flex items-center justify-center pt-5"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1"
          style={{
            pointerEvents: 'auto',
            background: scrolled
              ? (isLight ? 'rgba(255,255,255,0.92)' : 'rgba(18,18,20,0.88)')
              : (isLight ? 'rgba(255,255,255,0.85)' : 'rgba(18,18,20,0.72)'),
            backdropFilter: 'blur(20px)',
            border: isLight
              ? '1px solid rgba(0,0,0,0.10)'
              : '1px solid rgba(255,255,255,0.10)',
            borderRadius: 999,
            padding: '5px 5px',
            gap: 2,
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.24)' : 'none',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Logo K pill — left inside the nav bar */}
          <button
            onClick={() => setActiveSection('hero')}
            aria-label="Scroll to top"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 15,
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0,
              border: 'none',
              marginRight: 4,
            }}
          >
            K
          </button>

          {/* Nav items */}
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="relative text-sm font-semibold transition-all duration-200"
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  color: isActive
                    ? (isLight ? '#111' : '#fff')
                    : (isLight ? '#555' : 'rgba(255,255,255,0.60)'),
                  background: isActive
                    ? (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.14)')
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s, background 0.2s',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.12)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}

          {/* Resume button */}
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
              border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.12)',
              color: isLight ? '#333' : 'rgba(255,255,255,0.70)',
              fontSize: 13.5,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              marginLeft: 4,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                isLight ? 'rgba(0,0,0,0.11)' : 'rgba(255,255,255,0.14)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
            }}
          >
            Resume
          </button>
        </motion.div>
      </div>

      {/* ── Mobile: top bar ── */}
      <div
        className="md:hidden flex items-center justify-between px-5 h-16"
        style={{
          pointerEvents: 'auto',
          background: scrolled ? 'rgba(15,15,17,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.3s',
        }}
      >
        <button
          onClick={() => setActiveSection('hero')}
          aria-label="Home"
          style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 15, color: '#fff', border: 'none', cursor: 'pointer',
          }}
        >
          K
        </button>
        <button
          className="p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ pointerEvents: 'auto' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-white/8 p-6 flex flex-col gap-2"
            style={{ pointerEvents: 'auto', background: 'rgba(15,15,17,0.97)', backdropFilter: 'blur(20px)' }}
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
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="mt-2 py-3 rounded-2xl font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;