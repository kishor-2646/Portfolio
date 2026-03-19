"use client";

import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { BookOpen, ExternalLink, Clock, Tag, FileText, Layers, BookMarked, ArrowRight } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { BLOGS, BLOGS_UI } from '../lib/data';

const TYPE_STYLE: Record<string, { icon: React.ElementType; border: string; bg: string; text: string; glow: string }> = {
  Blog:     { icon: BookOpen,   border: 'border-cyan-500/40',   bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]'   },
  Tutorial: { icon: Layers,     border: 'border-violet-500/40', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]'   },
  Resource: { icon: BookMarked, border: 'border-emerald-500/40',bg: 'bg-emerald-500/10',text: 'text-emerald-400',glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]'   },
  Note:     { icon: FileText,   border: 'border-rose-500/40',   bg: 'bg-rose-500/10',   text: 'text-rose-400',   glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)]'    },
  Thread:   { icon: Tag,        border: 'border-amber-500/40',  bg: 'bg-amber-500/10',  text: 'text-amber-400',  glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'   },
};

const SPRING = { damping: 34, stiffness: 230 };

// CODE_STRINGS come from portfolio.config.ts → blogsSection.codeStreams
// imported via BLOGS_UI.codeStreams

const BlogsSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [hovered, setHovered] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);
  // Unique: dot-matrix pattern revealed on mouse
  const maskImage = useMotionTemplate`radial-gradient(480px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  // ── Unique effect 1: scrolling code text streams ──
  const codeStreams = useMemo(() => [...Array(6)].map((_, i) => ({
    text: BLOGS_UI.codeStreams[i % BLOGS_UI.codeStreams.length],
    y: `${12 + i * 15}%`,
    duration: 18 + i * 3,
    delay: i * 2.5,
    opacity: 0.06 + (i % 3) * 0.03,
  })), []);

  // ── Unique effect 2: diagonal light rays (like sunbeams) ──
  const rays = useMemo(() => [...Array(6)].map((_, i) => ({
    left: `${5 + i * 16}%`,
    width: 1 + (i % 3),
    duration: 4 + i * 0.8,
    delay: i * 0.7,
    color: i % 2 === 0 ? 'rgba(34,211,238,0.15)' : 'rgba(139,92,246,0.12)',
  })), []);

  // ── Unique effect 3: floating book/document icons ──
  const floatingIcons = useMemo(() => [...Array(10)].map((_, i) => ({
    x: `${(i * 9.5) % 88}%`,
    size: 8 + (i % 4) * 4,
    duration: 7 + (i % 5) * 2,
    delay: i * 0.8,
    char: ['📄', '📚', '✏️', '💻', '🔖'][i % 5],
  })), []);

  return (
    <section id="blogs" onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Static: dot matrix pattern */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `radial-gradient(circle, #22d3ee 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

        {/* Mouse reveal: cyan square grid */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.5]"
            style={{ backgroundImage: `linear-gradient(to right,#22d3ee 1px,transparent 1px),linear-gradient(to bottom,#22d3ee 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
        </motion.div>

        {/* Scrolling code text streams */}
        {hasMounted && codeStreams.map((stream, i) => (
          <motion.div key={i}
            className="absolute font-mono text-cyan-400 text-xs font-bold whitespace-nowrap z-[2] select-none"
            style={{ top: stream.y, opacity: stream.opacity }}
            animate={{ x: ['100vw', '-100%'] }}
            transition={{ duration: stream.duration, repeat: Infinity, ease: 'linear', delay: stream.delay }}>
            {'$ ' + stream.text + '  ·  ' + stream.text + '  ·  ' + stream.text}
          </motion.div>
        ))}

        {/* Diagonal light rays */}
        {hasMounted && rays.map((ray, i) => (
          <motion.div key={i}
            className="absolute top-0 bottom-0 z-[1] rounded-full"
            style={{ left: ray.left, width: ray.width, background: `linear-gradient(to bottom, transparent 0%, ${ray.color} 40%, ${ray.color} 60%, transparent 100%)`, transform: 'rotate(12deg) scaleY(1.4)', transformOrigin: 'top center' }}
            animate={{ opacity: [0, 1, 1, 0], scaleX: [0.5, 1.5, 0.5] }}
            transition={{ duration: ray.duration, repeat: Infinity, ease: 'easeInOut', delay: ray.delay }}
          />
        ))}

        {/* Floating emoji icons */}
        {hasMounted && floatingIcons.map((ic, i) => (
          <motion.div key={i}
            className="absolute text-base select-none z-[3]"
            style={{ left: ic.x }}
            animate={{ y: ['105%', '-5%'], opacity: [0, 0.5, 0.5, 0], rotate: [-10, 10, -10] }}
            transition={{ duration: ic.duration, repeat: Infinity, ease: 'easeInOut', delay: ic.delay }}>
            {ic.char}
          </motion.div>
        ))}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Mouse glow — cyan/violet split */}
        <motion.div className="absolute w-[800px] h-[800px] rounded-full blur-[180px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(139,92,246,0.07) 60%, transparent 100%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            <BookOpen className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={20} />
            <h2 className="text-sm font-black text-cyan-400 uppercase tracking-[0.5em]">{BLOGS_UI.sectionLabel}</h2>
            <BookOpen className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={20} />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
{BLOGS_UI.heading}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-violet-400">
              {BLOGS_UI.headingGradient}
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
{BLOGS_UI.subtitle}
          </p>
        </motion.div>

        {/* ── Blog cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {BLOGS.map((blog, i) => {
            const ts = TYPE_STYLE[blog.type] ?? TYPE_STYLE['Blog'];
            const TypeIcon = ts.icon;
            const isHov = hovered === i;
            const isComingSoon = !blog.link;

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className={`group relative bg-white/[0.04] backdrop-blur-3xl border rounded-[2rem] overflow-hidden transition-all duration-150 ${
                  isHov ? `${ts.border} ${ts.glow}` : 'border-white/10'
                }`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-150 ${
                  isHov ? `bg-gradient-to-r from-transparent via-current to-transparent ${ts.text}` : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
                }`} />

                {/* Corner glow */}
                <div className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-150 ${ts.bg} ${isHov ? 'opacity-100' : 'opacity-0'}`} />

                {/* Coming soon overlay badge */}
                {isComingSoon && (
                  <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-black/60 border border-white/20 rounded-full backdrop-blur-md">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Coming Soon</span>
                  </div>
                )}

                <div className="relative z-10 p-8 space-y-5">
                  {/* Type badge + read time */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${ts.border} ${ts.bg}`}>
                      <TypeIcon size={12} className={ts.text} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${ts.text}`}>{blog.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold">
                      <Clock size={11} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-black leading-snug transition-colors duration-150 ${isHov ? ts.text : 'text-white'}`}>
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className={`text-sm leading-relaxed transition-colors duration-150 line-clamp-2 ${isHov ? 'text-slate-300' : 'text-slate-500'}`}>
                    {blog.summary}
                  </p>

                  {/* Divider */}
                  <div className={`h-[1px] transition-all duration-150 ${isHov ? `${ts.bg} border-0` : 'bg-white/[0.07]'}`} style={{ height: 1 }} />

                  {/* Tags + date + CTA row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 bg-white/[0.05] border border-white/10 text-slate-500 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-slate-700 font-bold">{blog.date}</span>
                      {blog.link ? (
                        <a href={blog.link} target="_blank" rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 text-xs font-black transition-all duration-300 ${ts.text} hover:opacity-80`}>
                          Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Drafting...</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 text-center">
          <p className="text-slate-600 text-sm font-bold mb-4 uppercase tracking-widest">More coming as I build & learn</p>
          <div className="flex justify-center gap-2">
{BLOGS_UI.bottomTags.map((t: string, i: number) => (
              <motion.span key={t}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-slate-600 text-xs font-black uppercase tracking-wider hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-default">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogsSection;