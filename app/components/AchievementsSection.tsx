"use client";

import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Trophy, Award, Star, Sparkles, ExternalLink } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { ACHIEVEMENTS, ACHIEVEMENTS_UI } from '../lib/data';

const CATEGORY_STYLE: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  Hackathon:    { border: 'border-amber-500/40',   bg: 'bg-amber-500/10',   text: 'text-amber-400',   glow: 'shadow-[0_0_16px_rgba(245,158,11,0.3)]'   },
  Certification:{ border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-[0_0_16px_rgba(52,211,153,0.3)]'   },
  Award:        { border: 'border-violet-500/40',  bg: 'bg-violet-500/10',  text: 'text-violet-400',  glow: 'shadow-[0_0_16px_rgba(139,92,246,0.3)]'   },
};

const SPRING = { damping: 32, stiffness: 220 };

const AchievementsSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [hovered, setHovered] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);
  // Unique pattern: diagonal crosshatch revealed on mouse
  const maskImage = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  // ── Unique effect 1: vertical laser beams sweeping section ──
  const lasers = useMemo(() => [...Array(8)].map((_, i) => ({
    x: `${8 + i * 12}%`,
    duration: 3 + i * 0.6,
    delay: i * 0.5,
    height: 60 + Math.random() * 120,
    color: i % 3 === 0 ? 'rgba(245,158,11,0.7)' : i % 3 === 1 ? 'rgba(139,92,246,0.7)' : 'rgba(52,211,153,0.6)',
  })), []);

  // ── Unique effect 2: floating emoji/star particles ──
  const particles = useMemo(() => [...Array(14)].map((_, i) => ({
    x: `${(i * 7.3) % 90}%`,
    size: 10 + (i % 5) * 5,
    duration: 6 + (i % 4) * 2,
    delay: i * 0.6,
    symbol: ['★', '✦', '◆', '✧', '⬡'][i % 5],
    color: ['text-amber-400/40', 'text-violet-400/40', 'text-emerald-400/40', 'text-white/20', 'text-cyan-400/30'][i % 5],
  })), []);

  // ── Unique effect 3: concentric glow rings from centre ──
  const rings = useMemo(() => [...Array(4)].map((_, i) => ({
    size: 200 + i * 180,
    duration: 5 + i * 1.5,
    delay: i * 1.2,
  })), []);

  return (
    <section id="achievements" onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Static: crosshatch diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `repeating-linear-gradient(60deg,#f59e0b,#f59e0b 1px,transparent 1px,transparent 30px),repeating-linear-gradient(-60deg,#8b5cf6,#8b5cf6 1px,transparent 1px,transparent 30px)`, backgroundSize: '60px 60px' }} />

        {/* Mouse-reveal: amber hex grid */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.55]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2 L58 17 L58 47 L30 62 L2 47 L2 17 Z' fill='none' stroke='%23f59e0b' stroke-width='0.8'/%3E%3Cpath d='M30 62 L58 77 L58 107 L30 122 L2 107 L2 77 Z' fill='none' stroke='%23f59e0b' stroke-width='0.8'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 104px' }} />
        </motion.div>

        {/* Vertical laser beams */}
        {hasMounted && lasers.map((laser, i) => (
          <motion.div key={i}
            className="absolute w-[1.5px] rounded-full z-[2]"
            style={{ left: laser.x, height: laser.height, background: `linear-gradient(to bottom, transparent, ${laser.color}, transparent)`, boxShadow: `0 0 8px ${laser.color}` }}
            animate={{ top: ['-15%', '115%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: laser.duration, repeat: Infinity, ease: 'linear', delay: laser.delay }}
          />
        ))}

        {/* Floating symbol particles */}
        {hasMounted && particles.map((p, i) => (
          <motion.div key={i}
            className={`absolute font-black select-none z-[3] ${p.color}`}
            style={{ left: p.x, fontSize: p.size }}
            animate={{ y: ['100%', '-10%'], opacity: [0, 0.8, 0.8, 0], rotate: [0, 180, 360] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
          >
            {p.symbol}
          </motion.div>
        ))}

        {/* Concentric glow rings from centre */}
        {hasMounted && rings.map((ring, i) => (
          <motion.div key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/[0.08] z-[1]"
            style={{ width: ring.size, height: ring.size }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'easeInOut', delay: ring.delay }}
          />
        ))}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Mouse glow orb — amber/violet split */}
        <motion.div className="absolute w-[800px] h-[800px] rounded-full blur-[180px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(139,92,246,0.08) 60%, transparent 100%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            <Trophy className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" size={20} />
            <h2 className="text-sm font-black text-amber-400 uppercase tracking-[0.5em]">{ACHIEVEMENTS_UI.sectionLabel}</h2>
            <Trophy className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" size={20} />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300">
              Achievements.
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
{ACHIEVEMENTS_UI.subtitle}
          </p>
        </motion.div>

        {/* ── Achievement grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const style = CATEGORY_STYLE[a.category] ?? CATEGORY_STYLE['Certification'];
            const isHov = hovered === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white/[0.04] backdrop-blur-3xl border rounded-[2rem] p-7 overflow-hidden transition-all duration-150 cursor-default ${
                  isHov ? `${style.border} ${style.glow}` : 'border-white/10'
                }`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${isHov ? `via-current ${style.text}` : 'via-white/10'} to-transparent transition-all duration-150`} />

                {/* Corner glow */}
                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-150 ${style.bg} ${isHov ? 'opacity-100' : 'opacity-0'}`} />

                {/* Year watermark */}
                <div className="absolute bottom-4 right-6 text-[48px] font-black text-white/[0.04] leading-none select-none">{a.year}</div>

                <div className="relative z-10 space-y-5">
                  {/* Icon + category row */}
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-3xl"
                      animate={isHov ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {a.icon}
                    </motion.span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border ${style.border} ${style.bg} ${style.text}`}>
                      {a.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-black leading-snug transition-colors duration-150 ${isHov ? style.text : 'text-white'}`}>
                    {a.title}
                  </h3>

                  {/* Event + year */}
                  <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-widest">
                    <Award size={12} />
                    <span>{a.event}</span>
                    <span className="text-slate-700">·</span>
                    <span>{a.year}</span>
                  </div>

                  {/* Divider */}
                  <div className={`h-[1px] transition-all duration-150 ${isHov ? `bg-gradient-to-r from-transparent ${style.text} via-current to-transparent` : 'bg-white/[0.07]'}`} />

                  {/* Highlight */}
                  <p className={`text-sm leading-relaxed transition-colors duration-150 ${isHov ? 'text-slate-200' : 'text-slate-500'}`}>
                    {a.highlight}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AchievementsSection;