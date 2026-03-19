"use client";

import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Sparkles, Briefcase, Users, FolderOpen, Zap, Star, ChevronRight } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { ABOUT_SPRING_CONFIG } from '../lib/constants';
import { BIO, STATS, FEATURED_ACHIEVEMENT, ABOUT_TAGLINE, ABOUT_UI } from '../lib/data';

const STAT_ICON_MAP: Record<string, React.ElementType> = {
  Experience:    Briefcase,
  'Live Users':  Users,
  Projects:      FolderOpen,
  Efficiency:    Zap,
  Milestones:    Star,
  'OSS Commits': Star,
};

const AboutSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [activeChip, setActiveChip] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, ABOUT_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, ABOUT_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(450px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const threads = useMemo(() => [...Array(14)].map((_, i) => ({
    isVertical: i % 2 === 0,
    initialPos: Math.random() * 100 + '%',
    path: ['-20%', '120%'],
    duration: 6 + Math.random() * 10,
    delay: i * 0.7,
  })), []);

  const taglineWords  = ABOUT_TAGLINE.split(' ');
  const taglinePre    = taglineWords[0];
  const taglineGrad   = taglineWords.slice(1, 3).join(' ');
  const taglinePost   = taglineWords.slice(3).join(' ');

  return (
    <section id="about" onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#ffffff,#ffffff 1px,transparent 1px,transparent 15px)', backgroundSize: '30px 30px' }} />
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.45]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#10b981,#10b981 1px,transparent 1px,transparent 15px)', backgroundSize: '30px 30px' }} />
        </motion.div>
        <motion.div className="absolute w-[700px] h-[700px] bg-emerald-500/[0.07] rounded-full blur-[140px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }} />
        {hasMounted && (
          <div className="absolute inset-0 overflow-hidden opacity-[0.35] z-0">
            {threads.map((t, i) => (
              <motion.div key={i}
                className="absolute bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)] rounded-full"
                style={{ width: t.isVertical ? '1.5px' : '280px', height: t.isVertical ? '280px' : '1.5px', top: t.isVertical ? 0 : t.initialPos, left: t.isVertical ? t.initialPos : 0 }}
                animate={t.isVertical ? { top: t.path } : { left: t.path }}
                transition={{ duration: t.duration, repeat: Infinity, ease: 'linear', delay: t.delay }}
              />
            ))}
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
          className="absolute top-[-15%] left-[-8%] w-[900px] h-[900px] border border-white/[0.05] rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] border border-emerald-500/[0.05] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* ── Heading ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Sparkles className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" size={22} />
            <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.5em]">{ABOUT_UI.sectionLabel}</h2>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">{ABOUT_UI.sectionHeading}</h2>
        </motion.div>

        {/* ── Bio + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Bio card — wider (3/5) */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 relative p-10 md:p-14 bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-[3rem] space-y-8 flex flex-col justify-between overflow-hidden group hover:border-emerald-500/40 transition-all duration-150 shadow-2xl">
            {/* Top accent bar */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-[80px] group-hover:bg-emerald-500/[0.1] transition-colors duration-700" />

            <div className="relative z-10 space-y-6">
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {taglinePre}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">{taglineGrad}</span>{' '}
                {taglinePost}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">{BIO}</p>
            </div>

            {/* Skill tags row */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {ABOUT_UI.bioChips.map((tag: string, i: number) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  onHoverStart={() => setActiveChip(i)} onHoverEnd={() => setActiveChip(null)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all duration-300 cursor-default ${
                    activeChip === i
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* View more link */}
            <a href="#skills" className="relative z-10 inline-flex items-center gap-2 text-sm font-black text-emerald-400 hover:text-emerald-300 transition-colors group/link">
              View full skill set <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Stats grid — narrower (2/5) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => {
              const Icon = STAT_ICON_MAP[stat.label] ?? Briefcase;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.04 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="relative p-6 bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] transition-all duration-150 overflow-hidden">
                  {/* BG glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="p-3 bg-white/[0.06] rounded-2xl group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.3)] transition-all duration-150">
                      <Icon size={22} className="text-slate-300 group-hover:text-emerald-300 transition-colors" />
                    </div>
                    <div className="text-4xl font-black text-white leading-none">{stat.value}</div>
                    <div className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Featured achievement ── */}
        <div className="space-y-4">

          {/* Section label above the card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {/* Glowing left line */}
            <div className="h-[2px] w-8 bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.8)] rounded-full" />
            <span className="text-xs font-black text-amber-400 uppercase tracking-[0.45em]">
              {ABOUT_UI.achievementLabel}
            </span>
            {/* Pulsing dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,1)] animate-pulse" />
          </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative group p-10 md:p-14 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-3xl border border-white/15 rounded-[3rem] overflow-hidden shadow-2xl hover:border-amber-500/30 transition-all duration-150">
          {/* Animated top rainbow bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-amber-400 to-emerald-400" />
          {/* Right glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/[0.05] blur-[80px] group-hover:bg-amber-500/[0.08] transition-colors duration-700" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-8 text-white">
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all duration-150">
                <Star className="text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" size={36} />
              </motion.div>
              <div className="space-y-1.5">
                <div className="text-xs font-black text-amber-500/70 uppercase tracking-[0.3em]">{ABOUT_UI.achievementCardLabel}</div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">{FEATURED_ACHIEVEMENT.title}</h3>
                <p className="text-slate-300 text-base font-medium">{FEATURED_ACHIEVEMENT.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {FEATURED_ACHIEVEMENT.chips.map((chip, i) => (
                <motion.div key={chip} whileHover={{ scale: 1.08, y: -3 }} transition={{ type: 'spring', stiffness: 400 }}
                  className="px-5 py-2.5 bg-white/[0.06] border border-white/15 rounded-2xl text-white text-sm font-bold backdrop-blur-md hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-amber-300 hover:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-default">
                  {chip}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>{/* end Recent Achievement wrapper */}

      </div>
    </section>
  );
};

export default AboutSection;