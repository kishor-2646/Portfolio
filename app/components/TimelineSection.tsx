"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { History, AlertCircle, Bug, X, RotateCcw } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { TIMELINE_SPRING_CONFIG } from '../lib/constants';
import { TIMELINE_PATHS, FAILURE_LOGS, TIMELINE_UI } from '../lib/data';

// ── Colour maps (Tailwind needs full strings, not dynamic interpolation) ──
const COLOR = {
  emerald: {
    bg:         'bg-emerald-500/10',
    border:     'border-emerald-500/30',
    borderHover:'group-hover:border-emerald-500/60',
    icon:       'text-emerald-400',
    track:      'bg-emerald-500',
    trackGlow:  'shadow-[0_0_12px_4px_rgba(16,185,129,0.6)]',
    pulse:      'bg-emerald-400',
    pulseGlow:  'shadow-[0_0_20px_8px_rgba(16,185,129,0.9)]',
    nodeBorder: 'border-emerald-500',
    nodeGlow:   'shadow-[0_0_20px_rgba(16,185,129,0.8)]',
    tag:        'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    accent:     'bg-emerald-500',
    accentGlow: 'group-hover:via-emerald-400',
    underline:  'bg-emerald-500/40 group-hover:bg-emerald-400',
    cardGlow:   'bg-emerald-500/10',
    dateBadge:  'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    connector:  'bg-emerald-500',
    connGlow:   'shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]',
  },
  cyan: {
    bg:         'bg-cyan-500/10',
    border:     'border-cyan-500/30',
    borderHover:'group-hover:border-cyan-500/60',
    icon:       'text-cyan-400',
    track:      'bg-cyan-500',
    trackGlow:  'shadow-[0_0_12px_4px_rgba(6,182,212,0.6)]',
    pulse:      'bg-cyan-400',
    pulseGlow:  'shadow-[0_0_20px_8px_rgba(6,182,212,0.9)]',
    nodeBorder: 'border-cyan-500',
    nodeGlow:   'shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    tag:        'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    accent:     'bg-cyan-500',
    accentGlow: 'group-hover:via-cyan-400',
    underline:  'bg-cyan-500/40 group-hover:bg-cyan-400',
    cardGlow:   'bg-cyan-500/10',
    dateBadge:  'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    connector:  'bg-cyan-500',
    connGlow:   'shadow-[0_0_8px_2px_rgba(6,182,212,0.5)]',
  },
  violet: {
    bg:         'bg-violet-500/10',
    border:     'border-violet-500/30',
    borderHover:'group-hover:border-violet-500/60',
    icon:       'text-violet-400',
    track:      'bg-violet-500',
    trackGlow:  'shadow-[0_0_12px_4px_rgba(139,92,246,0.6)]',
    pulse:      'bg-violet-400',
    pulseGlow:  'shadow-[0_0_20px_8px_rgba(139,92,246,0.9)]',
    nodeBorder: 'border-violet-500',
    nodeGlow:   'shadow-[0_0_20px_rgba(139,92,246,0.8)]',
    tag:        'bg-violet-500/15 border-violet-500/40 text-violet-300',
    accent:     'bg-violet-500',
    accentGlow: 'group-hover:via-violet-400',
    underline:  'bg-violet-500/40 group-hover:bg-violet-400',
    cardGlow:   'bg-violet-500/10',
    dateBadge:  'bg-violet-500/15 border-violet-500/40 text-violet-300',
    connector:  'bg-violet-500',
    connGlow:   'shadow-[0_0_8px_2px_rgba(139,92,246,0.5)]',
  },
  indigo: {
    bg:         'bg-indigo-500/10',
    border:     'border-indigo-500/30',
    borderHover:'group-hover:border-indigo-500/60',
    icon:       'text-indigo-400',
    track:      'bg-indigo-500',
    trackGlow:  'shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]',
    pulse:      'bg-indigo-400',
    pulseGlow:  'shadow-[0_0_20px_8px_rgba(99,102,241,0.9)]',
    nodeBorder: 'border-indigo-500',
    nodeGlow:   'shadow-[0_0_20px_rgba(99,102,241,0.8)]',
    tag:        'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
    accent:     'bg-indigo-500',
    accentGlow: 'group-hover:via-indigo-400',
    underline:  'bg-indigo-500/40 group-hover:bg-indigo-400',
    cardGlow:   'bg-indigo-500/10',
    dateBadge:  'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
    connector:  'bg-indigo-500',
    connGlow:   'shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]',
  },
  rose: {
    bg:         'bg-rose-500/10',
    border:     'border-rose-500/30',
    borderHover:'group-hover:border-rose-500/60',
    icon:       'text-rose-400',
    track:      'bg-rose-500',
    trackGlow:  'shadow-[0_0_12px_4px_rgba(244,63,94,0.6)]',
    pulse:      'bg-rose-400',
    pulseGlow:  'shadow-[0_0_20px_8px_rgba(244,63,94,0.9)]',
    nodeBorder: 'border-rose-500',
    nodeGlow:   'shadow-[0_0_20px_rgba(244,63,94,0.8)]',
    tag:        'bg-rose-500/15 border-rose-500/40 text-rose-300',
    accent:     'bg-rose-500',
    accentGlow: 'group-hover:via-rose-400',
    underline:  'bg-rose-500/40 group-hover:bg-rose-400',
    cardGlow:   'bg-rose-500/10',
    dateBadge:  'bg-rose-500/15 border-rose-500/40 text-rose-300',
    connector:  'bg-rose-500',
    connGlow:   'shadow-[0_0_8px_2px_rgba(244,63,94,0.5)]',
  },
} as const;

type ColorKey = keyof typeof COLOR;

// ── Glowing pulse that travels down the chain ────────────────
const TravelingPulse = ({ color, delay }: { color: ColorKey; delay: number }) => {
  const c = COLOR[color];
  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full ${c.pulse} ${c.pulseGlow} z-30`}
      animate={{ top: ['-2%', '102%'] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay }}
    />
  );
};

const TimelineSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [showFailures, setShowFailures] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, TIMELINE_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, TIMELINE_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const ripples = useMemo(() => {
    return [...Array(8)].map(() => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  // Independent moving elements: glowing violet diamonds drifting diagonally
  const diamonds = useMemo(() => [...Array(12)].map((_, i) => ({
    startX: `${(i / 12) * 100 + Math.random() * 6}%`,
    startY: `${Math.random() * 80 + 10}%`,
    size: 8 + Math.random() * 10,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 6,
    drift: Math.random() * 60 - 30,
  })), []);

  // Independent moving elements: horizontal voltage sparks shooting left to right
  const sparks = useMemo(() => [...Array(6)].map((_, i) => ({
    y: `${15 + i * 14}%`,
    duration: 3 + i * 0.6,
    delay: i * 0.9,
    width: 80 + i * 20,
  })), []);

  return (
    <section
      id="timeline"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden group/timeline"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`, backgroundSize: '100px 100%' }} />
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.4]"
            style={{ backgroundImage: `linear-gradient(to right, #8b5cf6 1.5px, transparent 1.5px)`, backgroundSize: '100px 100%' }} />
        </motion.div>
        {hasMounted && (
          <div className="absolute inset-0 z-20">
            {ripples.map((ripple, i) => (
              <motion.div key={i} className="absolute border border-violet-500/40 rounded-full"
                style={{ left: ripple.x, top: ripple.y }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 400, height: 400, opacity: [0, 0.4, 0], scale: [0.5, 1.2] }}
                transition={{ duration: ripple.duration, repeat: Infinity, ease: 'easeOut', delay: ripple.delay }} />
            ))}
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <motion.div className="absolute w-[800px] h-[800px] bg-violet-600/[0.12] rounded-full blur-[200px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }} />

        {/* Drifting violet diamonds */}
        {hasMounted && (
          <div className="absolute inset-0 z-[3] pointer-events-none">
            {diamonds.map((d, i) => (
              <motion.div key={i}
                className="absolute rotate-45 bg-violet-500/20 border border-violet-400/30 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                style={{ width: d.size, height: d.size, left: d.startX, top: d.startY }}
                animate={{
                  x: [0, d.drift, 0, -d.drift, 0],
                  y: [0, -20, -40, -20, 0],
                  opacity: [0, 0.8, 0.9, 0.8, 0],
                  scale: [0.6, 1, 1.2, 1, 0.6],
                }}
                transition={{ duration: d.duration, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
              />
            ))}
          </div>
        )}

        {/* Horizontal voltage sparks */}
        {hasMounted && (
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {sparks.map((spark, i) => (
              <motion.div key={i}
                className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-violet-400/70 to-transparent shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                style={{ top: spark.y, width: spark.width }}
                animate={{ left: ['-15%', '115%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: spark.duration, repeat: Infinity, ease: 'linear', delay: spark.delay }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Failure logs FAB + Modal ── */}
      {hasMounted && (
        <>
          <div className="absolute bottom-12 right-4 md:right-12 z-[100] flex flex-col items-center gap-3">
            <button onClick={() => setShowFailures(true)}
              className="p-5 rounded-full bg-black/80 backdrop-blur-2xl border border-amber-500/30 text-amber-500 shadow-2xl hover:border-amber-500/60 hover:scale-110 transition-all duration-300 relative group">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <AlertCircle size={28} />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
            </button>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              My Failures
            </motion.span>
          </div>

          <AnimatePresence>
            {showFailures && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowFailures(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-lg bg-black/90 border border-amber-500/30 rounded-[3rem] shadow-[0_0_80px_rgba(245,158,11,0.2)] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(245,158,11,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
                  <div className="p-8 md:p-12 relative z-10">
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                          <Bug size={24} className="text-amber-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white uppercase tracking-widest">System_Debug_Logs</h3>
                          <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-tighter">Status: Correction_Active</span>
                        </div>
                      </div>
                      <button onClick={() => setShowFailures(false)}
                        className="p-3 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-8 mb-10">
                      {FAILURE_LOGS.map((log, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black text-slate-600 tracking-widest">{log.code}</span>
                            <span className="text-[9px] font-black text-amber-500/50">{log.year}</span>
                          </div>
                          <h4 className="text-white text-lg font-black tracking-tight mb-2 italic">&quot;{log.title}&quot;</h4>
                          <p className="text-slate-400 text-sm font-medium leading-relaxed border-l-2 border-amber-500/40 pl-5">{log.lesson}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 text-center">
                      <div className="flex items-center justify-center gap-3 text-amber-500 text-xs font-black uppercase tracking-[0.3em]">
                        <RotateCcw size={16} className="animate-spin-slow" />
                        Iterative_Success_Verified
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-32 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <History className="text-violet-400" size={24} />
            <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.5em]">{TIMELINE_UI.sectionLabel}</h2>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
{TIMELINE_UI.heading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">{TIMELINE_UI.headingGradient}</span>
          </h2>
        </div>

        {/* ── Three columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {TIMELINE_PATHS.map((path, pIdx) => {
            const color = (path.color in COLOR ? path.color : 'violet') as ColorKey;
            const c = COLOR[color];

            return (
              <div key={pIdx} className="relative flex flex-col items-center">

                {/* ── Column header icon ── */}
                <div className="text-center mb-16 relative z-20 w-full group">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`mx-auto mb-6 p-6 w-fit rounded-[2.5rem] ${c.bg} border ${c.border} shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-all duration-150`}
                  >
                    <path.icon size={44} className={c.icon} />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest">{path.title}</h3>
                  <div className={`mt-6 mx-auto w-1/3 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${c.icon}`} />
                </div>

                {/* ══════════════════════════════════════════
                    CHAIN + MILESTONES
                    The chain is a continuous vertical track.
                    Each milestone node sits ON the chain,
                    with the date displayed on the side and
                    the card below — like a real path.
                    ══════════════════════════════════════════ */}
                <div className="relative w-full flex flex-col items-center">

                  {/* ── Permanent visible chain (base — always on) ── */}
                  <div
                    className={`absolute top-0 bottom-0 w-[4px] left-1/2 -translate-x-1/2 z-0 rounded-full ${c.track} opacity-30`}
                  />

                  {/* ── Bright glowing overlay chain ── */}
                  <div
                    className={`absolute top-0 bottom-0 w-[4px] left-1/2 -translate-x-1/2 z-0 rounded-full ${c.track} opacity-60 ${c.trackGlow}`}
                  />

                  {/* ── Animated fill that grows down on scroll ── */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: 'easeInOut', delay: pIdx * 0.2 }}
                    className={`absolute top-0 w-[4px] left-1/2 -translate-x-1/2 z-[1] rounded-full overflow-hidden ${c.trackGlow}`}
                  >
                    <div className={`w-full h-full bg-gradient-to-b from-white/80 via-current to-transparent ${c.icon}`} />
                  </motion.div>

                  {/* ── Traveling pulses (always running, very visible) ── */}
                  {hasMounted && (
                    <div className="absolute top-0 bottom-0 w-[4px] left-1/2 -translate-x-1/2 z-[2] overflow-hidden rounded-full">
                      <TravelingPulse color={color} delay={0} />
                      <TravelingPulse color={color} delay={0.8} />
                      <TravelingPulse color={color} delay={1.6} />
                    </div>
                  )}

                  {/* ── Milestone events along the chain ── */}
                  <div className="w-full flex flex-col gap-0 relative z-10">
                    {path.timeline.map((event, eIdx) => (
                      <motion.div
                        key={eIdx}
                        initial={{ opacity: 0, x: eIdx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: pIdx * 0.15 + eIdx * 0.15, duration: 0.5 }}
                        className="group relative flex flex-col items-center"
                      >
                        {/* ── Date label floated to the side ── */}
                        {/* Alternates left/right so it reads like a real path */}
                        <div className={`absolute top-[6px] flex items-center gap-2 z-20 ${
                          eIdx % 2 === 0 ? 'right-[calc(50%+28px)]' : 'left-[calc(50%+28px)]'
                        }`}>
                          {eIdx % 2 !== 0 && (
                            // connector dash before date (right side)
                            <div className={`w-6 h-[2px] ${c.connector} ${c.connGlow} opacity-80`} />
                          )}
                          <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-[0.2em] border ${c.dateBadge}`}>
                            {event.date}
                          </span>
                          {eIdx % 2 === 0 && (
                            // connector dash after date (left side)
                            <div className={`w-6 h-[2px] ${c.connector} ${c.connGlow} opacity-80`} />
                          )}
                        </div>

                        {/* ── Node on the chain ── */}
                        <div className={`
                          w-[26px] h-[26px] rounded-full bg-black
                          border-[3px] ${c.nodeBorder} ${c.nodeGlow}
                          relative z-30
                          group-hover:scale-150 transition-transform duration-300
                          overflow-hidden
                        `}>
                          {/* Inner pulse fill */}
                          <div className={`absolute inset-0 ${c.pulse} opacity-50 animate-pulse`} />
                          {/* Bright centre dot */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.9)]" />
                        </div>

                        {/* ── Event card ── */}
                        <motion.div
                          className="mt-6 mb-16 w-[90%] px-1"
                          whileHover={{ y: -6 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className={`
                            p-8 bg-white/[0.04] backdrop-blur-3xl
                            border border-white/10 ${c.borderHover}
                            rounded-[2rem] shadow-2xl
                            relative overflow-hidden text-center
                            transition-all duration-150
                          `}>
                            {/* Left accent bar */}
                            <div className={`absolute top-0 bottom-0 left-0 w-1 ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-150`} />

                            <div className="relative z-10 space-y-3">
                              {/* Title */}
                              <h4 className="text-xl font-black text-white tracking-tight">
                                {event.label}
                              </h4>

                              {/* Expanding underline */}
                              <div className={`h-[2px] w-10 ${c.underline} mx-auto rounded-full transition-all duration-150 group-hover:w-24`} />

                              {/* Focus text */}
                              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed group-hover:text-slate-200 transition-colors duration-150">
                                {event.focus}
                              </p>
                            </div>

                            {/* Corner glow on hover */}
                            <div className={`absolute -bottom-8 -right-8 w-32 h-32 ${c.cardGlow} blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150`} />
                          </div>
                        </motion.div>

                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* ── End chain ── */}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;