"use client";

import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Github, ExternalLink, Layers3, ChevronRight, Trophy, Star } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { PROJECT_SPRING_CONFIG } from '../lib/constants';
import { PROJECTS, PROJECTS_SECTION_UI } from '../lib/data';

// ─────────────────────────────────────────────────────────────
//  PROJECT THUMBNAIL — same component on every card
//  Each card gets its own colour accent based on its index.
// ─────────────────────────────────────────────────────────────
const ACCENTS = [
  { grid: '#22d3ee', dot: 'bg-cyan-400',    ring: 'border-cyan-500/40',    glow: 'from-cyan-500/15 to-indigo-500/10',    shadow: 'shadow-[0_0_10px_rgba(34,211,238,0.7)]'   },
  { grid: '#818cf8', dot: 'bg-indigo-400',  ring: 'border-indigo-500/40',  glow: 'from-indigo-500/15 to-violet-500/10',  shadow: 'shadow-[0_0_10px_rgba(129,140,248,0.7)]'  },
  { grid: '#34d399', dot: 'bg-emerald-400', ring: 'border-emerald-500/40', glow: 'from-emerald-500/15 to-cyan-500/10',   shadow: 'shadow-[0_0_10px_rgba(52,211,153,0.7)]'   },
  { grid: '#f472b6', dot: 'bg-pink-400',    ring: 'border-pink-500/40',    glow: 'from-pink-500/15 to-violet-500/10',    shadow: 'shadow-[0_0_10px_rgba(244,114,182,0.7)]'  },
];

const ProjectThumbnail = ({
  index,
  isHovered,
  image,
}: {
  index: number;
  isHovered: boolean;
  image?: string;   // real screenshot — pass from portfolio.config.ts
}) => {
  const hasMounted = useHasMounted();
  const a = ACCENTS[index % ACCENTS.length];

  return (
    /* Fixed aspect ratio so every card thumbnail is identical height */
    <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-white/[0.05]">

      {/* Fine colour grid */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right,${a.grid} 1px,transparent 1px),linear-gradient(to bottom,${a.grid} 1px,transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />

      {/* Corner bracket accents */}
      <div className={`absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 ${a.ring} rounded-tl-lg`} />
      <div className={`absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 ${a.ring} rounded-tr-lg`} />
      <div className={`absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 ${a.ring} rounded-bl-lg`} />
      <div className={`absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 ${a.ring} rounded-br-lg`} />

      {/* Hover colour wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${a.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-150`} />

      {/* Drifting blur orbs */}
      {hasMounted && (
        <>
          <motion.div
            className={`absolute w-20 h-20 ${a.dot} rounded-full blur-[36px] opacity-[0.18]`}
            animate={{ x: [-16, 16, -16], y: [-8, 12, -8] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '18%', left: '12%' }}
          />
          <motion.div
            className={`absolute w-14 h-14 ${a.dot} rounded-full blur-[28px] opacity-[0.14]`}
            animate={{ x: [12, -12, 12], y: [8, -8, 8] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ bottom: '18%', right: '12%' }}
          />
        </>
      )}

      {/* Scan line — visible on hover only */}
      {hasMounted && isHovered && (
        <motion.div
          className={`absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-current to-transparent z-20 ${a.dot} opacity-60`}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* ── Real screenshot if provided, else animated placeholder ── */}
      {image ? (
        // Real project screenshot — covers the whole thumbnail area
        <img
          src={image}
          alt="Project screenshot"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      ) : (
        // Placeholder shown until you add a real screenshot
        <div className="relative z-10 text-center space-y-2 px-6 select-none pointer-events-none">
          <div className="text-slate-700 font-black text-[10px] uppercase tracking-[0.4em]">
            Module_V{String(index + 1).padStart(2, '0')}
          </div>
          {hasMounted && (
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-[9px] font-mono text-slate-700 tracking-widest"
            >
              Rendering_Binary_Data...
            </motion.div>
          )}
          <div className="flex justify-center pt-1">
            <motion.div
              className={`w-2 h-2 rounded-full ${a.dot} ${a.shadow}`}
              animate={{ scale: [1, 1.7, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, PROJECT_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, PROJECT_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Rising binary fragments
  const fragments = useMemo(() => [...Array(16)].map((_, i) => ({
    x: `${(i / 16) * 100 + Math.random() * 4}%`,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * 10,
    code: ['10', '01', '11', '00'][Math.floor(Math.random() * 4)],
    size: 10 + Math.random() * 12,
  })), []);

  // Floating hollow rings
  const rings = useMemo(() => [...Array(6)].map((_, i) => ({
    x: `${8 + i * 15}%`,
    y: `${20 + (i % 3) * 25}%`,
    size: 60 + i * 40,
    duration: 6 + i * 1.5,
    delay: i * 0.8,
  })), []);

  return (
    <section id="projects" onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 140px' }} />

        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.65]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z' fill='none' stroke='%2322d3ee' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 140px' }} />
        </motion.div>

        {hasMounted && (
          <>
            {/* ── Rising binary fragments — bright, large, very visible ── */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
              {fragments.map((frag, i) => (
                <motion.div key={i}
                  className="absolute bg-cyan-400/30 border border-cyan-300/60 rounded-sm flex items-center justify-center shadow-[0_0_14px_rgba(34,211,238,0.7)]"
                  style={{ width: frag.size, height: frag.size, left: frag.x }}
                  initial={{ y: '108%' }}
                  animate={{ y: '-8%', rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: frag.duration, repeat: Infinity, ease: 'linear', delay: frag.delay }}>
                  <span className="text-[6px] font-black text-cyan-200/90">{frag.code}</span>
                </motion.div>
              ))}
            </div>

            {/* ── Floating hollow rings — brighter, thicker border ── */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
              {rings.map((ring, i) => (
                <motion.div key={i}
                  className="absolute border-2 border-cyan-400/35 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  style={{ width: ring.size, height: ring.size, left: ring.x, top: ring.y }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4], rotate: [0, 180, 360] }}
                  transition={{ duration: ring.duration, repeat: Infinity, ease: 'easeInOut', delay: ring.delay }}
                />
              ))}
            </div>

            {/* ── Floating glowing dots — scattered across section ── */}
            <div className="absolute inset-0 z-[3] pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div key={i}
                  className="absolute rounded-full bg-cyan-300 shadow-[0_0_12px_6px_rgba(34,211,238,0.6)]"
                  style={{
                    width: 4 + (i % 4),
                    height: 4 + (i % 4),
                    left: `${(i * 5.2) % 95}%`,
                    top: `${(i * 7.3) % 90}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.8, 0.5],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 2.5 + (i % 5) * 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.35,
                  }}
                />
              ))}
            </div>

            {/* ── Horizontal streak lines — fast cross-section sweeps ── */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i}
                  className="absolute h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  style={{ top: `${18 + i * 16}%`, width: `${100 + i * 40}px` }}
                  animate={{ left: ['-20%', '120%'], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 1.1,
                  }}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <motion.div className="absolute w-[900px] h-[900px] bg-cyan-600/[0.1] rounded-full blur-[200px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Layers3 className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" size={22} />
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.5em]">{PROJECTS_SECTION_UI.sectionLabel}</h2>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Featured <br />
<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{PROJECTS_SECTION_UI.headingGradient}</span>
            </h2>
<p className="text-slate-500 text-base max-w-md">{PROJECTS_SECTION_UI.subtitle}</p>
          </div>
          <button className="self-start px-8 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-white font-bold text-base hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-3 backdrop-blur-md group">
{PROJECTS_SECTION_UI.archiveBtnLabel} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* ─────────────────────────────────────────────────────
            UNIFIED GRID — all projects, same card size
            2 columns on md+, 1 column on mobile
        ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              className="group relative bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-cyan-500/45 hover:shadow-[0_0_40px_rgba(34,211,238,0.09)] transition-all duration-150 flex flex-col"
            >
              {/* Top colour bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 z-10" />

              {/* Featured badge — only on featured projects */}
              {p.isFeatured && (
                <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/70 border border-cyan-500/40 rounded-full backdrop-blur-md">
                  <Trophy size={11} className="text-cyan-400" />
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Featured</span>
                </div>
              )}

              {/* Number watermark */}
              <div className="absolute bottom-3 right-4 text-[48px] font-black text-white/[0.025] leading-none select-none z-0 pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* ── Thumbnail (identical aspect ratio on every card) ── */}
              <ProjectThumbnail index={i} isHovered={hoveredIdx === i} image={p.image} />

              {/* ── Card body ── */}
              <div className="flex flex-col flex-1 p-5 space-y-4 relative z-10">

                {/* Title + links row */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors duration-150 leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-white/[0.05] border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        <Github size={14} />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-cyan-500 rounded-xl text-black hover:bg-cyan-400 hover:scale-110 transition-all shadow-[0_0_14px_rgba(34,211,238,0.4)]">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description — fixed 3-line clamp so all cards same height */}
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map(tag => (
                    <span key={tag}
                      className="text-[10px] uppercase tracking-[0.15em] font-black px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;