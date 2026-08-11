"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { NAME, ROLE, RESUME_URL, EMAIL, SOCIAL } from '../lib/data';
import { ease, dur } from '../lib/motion';
import portfolioConfig from '../../portfolio.config';

/* ── identity ── */
const firstName = NAME.split(' ')[0];
const lastName  = NAME.split(' ').slice(1).join(' ');

/* ── entrance sequence helpers ── */
const enter = (delay: number) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: dur.reveal, delay, ease: ease.out },
});

/* ── props ── */
interface HeroProps {
  heroBgY?:            MotionValue<string>;
  cardContentOpacity?: MotionValue<number>;
  cardBoxRefCallback?: (node: HTMLDivElement | null) => void;
}

export default function Hero({ heroBgY, cardContentOpacity, cardBoxRefCallback }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const panelRef       = useRef<HTMLDivElement>(null);

  /* ── Pointer parallax state (desktop only) ── */
  const [panelOffset, setPanelOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      // Normalised -1 → 1
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      // Max 6px horizontal, 4px vertical — extremely subtle
      targetX = nx * 6;
      targetY = ny * 4;
    };

    const loop = () => {
      // Lerp toward target — smooth follow (0.06 = slow, silky)
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setPanelOffset({ x: currentX, y: currentY });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{
        overflow: 'visible',
        background: `
          radial-gradient(circle at 8% 20%,  rgba(255,122,26,0.10) 0%, transparent 32%),
          radial-gradient(circle at 90% 80%, rgba(255,122,26,0.07) 0%, transparent 30%),
          #0F0F11
        `,
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 flex flex-col" style={{ paddingTop: 96, overflow: 'visible' }}>
        <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-6 md:px-10 lg:px-20 pb-8">

          {/* ══ LEFT — Text ══ */}
          <div className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1">

            {/* Availability badge */}
            <motion.div {...enter(0.05)}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/50">
                <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse" />
                {portfolioConfig.availableForWork ? 'Available for opportunities' : ROLE}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...enter(0.14)} className="flex flex-col gap-1" style={{ lineHeight: 0.95 }}>
              <h1 className="font-extrabold tracking-tight" style={{ fontSize: 'clamp(40px,5.5vw,76px)' }}>
                <span style={{
                  background: 'linear-gradient(90deg,#FF7A1A,#FFB36A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {firstName}
                </span>
                <br />
                <span className="text-white">{lastName}</span>
              </h1>
              <h2 className="font-bold text-white/55 mt-1" style={{ fontSize: 'clamp(22px,3vw,42px)' }}>
                {ROLE}
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p {...enter(0.24)} className="text-[#888] leading-relaxed"
              style={{ maxWidth: 520, fontSize: 'clamp(14px,1.1vw,17px)' }}>
              {portfolioConfig.heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div {...enter(0.32)} className="flex flex-wrap gap-3 items-center">
              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center font-bold text-white"
                style={{
                  height: 52, padding: '0 28px', gap: 10,
                  borderRadius: 14, fontSize: 15,
                  background: 'linear-gradient(135deg,#FF7A1A,#FF9B52)',
                  boxShadow: '0 8px 24px rgba(255,122,26,0.28)',
                  transition: `box-shadow ${dur.normal}s, transform ${dur.fast}s`,
                }}
                whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(255,122,26,0.42)' }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={{ duration: dur.fast, ease: ease.out }}
              >
                View Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center font-semibold text-white/60"
                style={{
                  height: 52, padding: '0 28px',
                  borderRadius: 14, fontSize: 15,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                whileHover={{ color: 'rgba(255,255,255,0.95)', borderColor: 'rgba(255,255,255,0.28)', y: -2 }}
                whileTap={{ y: 0, scale: 0.97 }}
                transition={{ duration: dur.fast, ease: ease.out }}
              >
                Get Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div {...enter(0.40)} className="flex gap-5 items-center">
              {[
                { href: SOCIAL.github,     icon: <Github size={15} />,   label: 'GitHub'   },
                { href: SOCIAL.linkedin,   icon: <Linkedin size={15} />, label: 'LinkedIn' },
                { href: `mailto:${EMAIL}`, icon: <Mail size={15} />,     label: 'Email'    },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium"
                  style={{ color: '#666', fontSize: 13 }}
                  whileHover={{ color: '#FF7A1A', x: 2 }}
                  transition={{ duration: dur.fast, ease: ease.out }}
                >
                  {icon} {label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT — Profile panel with pointer parallax ══ */}
          <div
            className="relative flex items-center justify-center order-1 lg:order-2"
            style={{ overflow: 'visible' }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: 'radial-gradient(circle at 55% 50%, rgba(255,122,26,0.18) 0%, transparent 65%)',
                transform: 'scale(1.15)',
              }}
            />

            {/* ── CARD BOUNDING BOX (measured for TransitionSurface) ── */}
            <div
              ref={cardBoxRefCallback}
              className="relative w-full max-w-md lg:max-w-lg"
              style={{ aspectRatio: '4 / 4.4', overflow: 'visible' }}
            >
              {/*
               * Parallax wrapper — only active on lg+ (pointer-based).
               * translateX/Y respond to mouse via JS lerp above.
               * Text stays perfectly stable — only the panel moves.
               */}
              <div
                ref={panelRef}
                style={{
                  width: '100%', height: '100%',
                  transform: `translate(${prefersReduced ? 0 : panelOffset.x}px, ${prefersReduced ? 0 : panelOffset.y}px)`,
                  willChange: 'transform',
                  transition: 'transform 0ms linear', // handled by rAF lerp
                }}
              >
                <motion.div
                  style={{ opacity: cardContentOpacity }}
                  className="relative z-20 w-full h-full rounded-[32px] overflow-hidden pointer-events-auto"
                >
                  {/* Orange semicircle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2, y: 40 }}
                    animate={{ opacity: 1, scale: 1,   y: 0  }}
                    transition={{ duration: 0.75, delay: 0.5, ease: ease.spring }}
                    className="absolute bottom-0 left-0 right-0 origin-bottom"
                    style={{ height: '60%' }}
                  >
                    <div style={{
                      width: '90%', margin: '0 auto', height: '100%',
                      borderRadius: '50% 50% 0 0',
                      background: 'linear-gradient(180deg, #FF7A1A 0%, #FF9B52 100%)',
                    }} />
                  </motion.div>

                  {/* Photo */}
                  <motion.img
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    transition={{ duration: dur.hero, delay: 0.65, ease: ease.out }}
                    src="/photo.jpeg"
                    alt={`${NAME} — ${ROLE}`}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 object-cover object-top"
                    style={{ width: '82%', height: '92%', borderRadius: '32px 32px 0 0' }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services strip ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: dur.normal, delay: 0.55 }}
        className="relative z-10"
        style={{ background: 'rgba(255,255,255,0.022)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 md:px-10 lg:px-20 py-4">
          <span className="font-black uppercase shrink-0" style={{ fontSize: 10, color: '#3a3a3a', letterSpacing: '0.32em' }}>
            Services
          </span>
          <div className="flex flex-wrap gap-2">
            {['Flutter Dev', 'Backend Systems', 'API Integration', 'Real-time Apps', 'Mobile Development'].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur.normal, delay: 0.6 + i * 0.05, ease: ease.out }}
                className="text-xs py-1 px-3 rounded-full border cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#555' }}
                whileHover={{ color: '#FF7A1A', borderColor: 'rgba(255,122,26,0.3)' }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}