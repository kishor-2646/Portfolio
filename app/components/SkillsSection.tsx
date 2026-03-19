"use client";

import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useHasMounted } from '../lib/hooks';
import { SPRING_CONFIG } from '../lib/constants';
import { SKILL_CATEGORIES, SKILLS_SECTION_UI } from '../lib/data';
import type { Skill } from '../types';

// ── Simple Icons CDN logo map ────────────────────────────────
const LOGO_MAP: Record<string, { src: string; color: string }> = {
  'Java':             { src: 'https://cdn.simpleicons.org/java/f89820',          color: '#f89820' },
  'Dart':             { src: 'https://cdn.simpleicons.org/dart/0175C2',           color: '#0175C2' },
  'JavaScript':       { src: 'https://cdn.simpleicons.org/javascript/F7DF1E',     color: '#F7DF1E' },
  'C':                { src: 'https://cdn.simpleicons.org/c/A8B9CC',              color: '#A8B9CC' },
  'SQL':              { src: 'https://cdn.simpleicons.org/mysql/4479A1',          color: '#4479A1' },
  'Flutter':          { src: 'https://cdn.simpleicons.org/flutter/02569B',        color: '#02569B' },
  'Supabase':         { src: 'https://cdn.simpleicons.org/supabase/3ECF8E',       color: '#3ECF8E' },
  'Firebase':         { src: 'https://cdn.simpleicons.org/firebase/FFCA28',       color: '#FFCA28' },
  'MongoDB':          { src: 'https://cdn.simpleicons.org/mongodb/47A248',        color: '#47A248' },
  'REST APIs':        { src: 'https://cdn.simpleicons.org/fastapi/009688',        color: '#009688' },
  'Real-Time Systems':{ src: 'https://cdn.simpleicons.org/socketdotio/ffffff',    color: '#ffffff' },
  'Python':           { src: 'https://cdn.simpleicons.org/python/3776AB',         color: '#3776AB' },
  'Node.js':          { src: 'https://cdn.simpleicons.org/nodedotjs/339933',      color: '#339933' },
  'GraphQL':          { src: 'https://cdn.simpleicons.org/graphql/E10098',        color: '#E10098' },
  'PostgreSQL':       { src: 'https://cdn.simpleicons.org/postgresql/4169E1',     color: '#4169E1' },
  'Git':              { src: 'https://cdn.simpleicons.org/git/F05032',            color: '#F05032' },
  'Docker':           { src: 'https://cdn.simpleicons.org/docker/2496ED',         color: '#2496ED' },
  'Kubernetes':       { src: 'https://cdn.simpleicons.org/kubernetes/326CE5',     color: '#326CE5' },
  'GCP':              { src: 'https://cdn.simpleicons.org/googlecloud/4285F4',    color: '#4285F4' },
  'Google Maps API':  { src: 'https://cdn.simpleicons.org/googlemaps/4285F4',    color: '#4285F4' },
  'OneSignal':        { src: 'https://cdn.simpleicons.org/onesignal/E54B4D',      color: '#E54B4D' },
  'AWS':              { src: 'https://cdn.simpleicons.org/amazonaws/FF9900',      color: '#FF9900' },
  'Vercel':           { src: 'https://cdn.simpleicons.org/vercel/ffffff',         color: '#ffffff' },
  'Git/GitHub':       { src: 'https://cdn.simpleicons.org/github/ffffff',         color: '#ffffff' },
  'Redis':            { src: 'https://cdn.simpleicons.org/redis/FF4438',          color: '#FF4438' },
  'TypeScript':       { src: 'https://cdn.simpleicons.org/typescript/3178C6',     color: '#3178C6' },
  'React 19':         { src: 'https://cdn.simpleicons.org/react/61DAFB',          color: '#61DAFB' },
  'Next.js 15':       { src: 'https://cdn.simpleicons.org/nextdotjs/ffffff',      color: '#ffffff' },
  'Tailwind CSS':     { src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',    color: '#06B6D4' },
  'Framer Motion':    { src: 'https://cdn.simpleicons.org/framer/ffffff',         color: '#ffffff' },
  'GSAP':             { src: 'https://cdn.simpleicons.org/greensock/88CE02',      color: '#88CE02' },
};

// Level metadata
const LEVEL_META = [
  { label: 'Beginner',     short: 'BEG', color: 'bg-slate-500',   glow: 'shadow-[0_0_8px_rgba(100,116,139,0.6)]',  text: 'text-slate-400'   },
  { label: 'Basic',        short: 'BSC', color: 'bg-blue-500',    glow: 'shadow-[0_0_8px_rgba(59,130,246,0.7)]',   text: 'text-blue-400'    },
  { label: 'Intermediate', short: 'INT', color: 'bg-cyan-500',    glow: 'shadow-[0_0_8px_rgba(6,182,212,0.7)]',    text: 'text-cyan-400'    },
  { label: 'Advanced',     short: 'ADV', color: 'bg-indigo-500',  glow: 'shadow-[0_0_8px_rgba(99,102,241,0.7)]',   text: 'text-indigo-400'  },
  { label: 'Expert',       short: 'EXP', color: 'bg-violet-500',  glow: 'shadow-[0_0_8px_rgba(139,92,246,0.8)]',   text: 'text-violet-400'  },
];

// ── Single skill row: logo + name + level bar ────────────────
const SkillRow = ({ skill, isHovered, onHover, onLeave }: {
  skill: Skill;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const logo = LOGO_MAP[skill.name];
  const level = Math.max(1, Math.min(5, skill.level));
  const meta = LEVEL_META[level - 1];
  const fillPct = (level / 5) * 100;

  return (
    <motion.div
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group/skill flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-150 cursor-default ${
        isHovered
          ? 'bg-indigo-500/10 border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
          : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]'
      }`}
    >
      {/* Logo */}
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        {logo ? (
          <img
            src={logo.src}
            alt={skill.name}
            width={24}
            height={24}
            className="w-6 h-6 object-contain transition-all duration-150"
            style={{ filter: isHovered ? `drop-shadow(0 0 6px ${logo.color}bb)` : 'brightness(0.75)' }}
          />
        ) : (
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
            <span className="text-[9px] font-black text-indigo-300">{skill.name[0]}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`text-sm font-bold flex-1 min-w-0 truncate transition-colors duration-150 ${
        isHovered ? 'text-white' : 'text-slate-400'
      }`}>
        {skill.name}
      </span>

      {/* Level bar + label */}
      <div className="flex items-center gap-2 shrink-0">
        {/* 5 segment bar */}
        <div className="flex gap-[3px] items-center">
          {[1, 2, 3, 4, 5].map((seg) => (
            <motion.div
              key={seg}
              className={`h-[6px] w-[10px] rounded-full transition-all duration-150 ${
                seg <= level
                  ? `${meta.color} ${isHovered ? meta.glow : ''}`
                  : 'bg-white/[0.08]'
              }`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: seg * 0.06, duration: 0.3, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Level label */}
        <span className={`text-[9px] font-black uppercase tracking-widest w-8 text-right transition-colors duration-150 ${
          isHovered ? meta.text : 'text-slate-700'
        }`}>
          {meta.short}
        </span>
      </div>
    </motion.div>
  );
};

// ── Legend shown once below the cards ───────────────────────
const LevelLegend = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
  >
    <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Proficiency</span>
    {LEVEL_META.map((m, i) => (
      <div key={m.label} className="flex items-center gap-2">
        <div className="flex gap-[3px]">
          {[1,2,3,4,5].map(seg => (
            <div key={seg} className={`h-[5px] w-[8px] rounded-full ${seg <= i + 1 ? m.color : 'bg-white/[0.07]'}`} />
          ))}
        </div>
        <span className={`text-[10px] font-bold ${m.text}`}>{m.label}</span>
      </div>
    ))}
  </motion.div>
);

// ── Main section ─────────────────────────────────────────────
const SkillsSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const highlightMask = useMotionTemplate`radial-gradient(550px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const dots = useMemo(() => [...Array(20)].map(() => ({
    path: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
    duration: 10 + Math.random() * 10,
    size: 4 + Math.random() * 6,
  })), []);

  const scanLines = useMemo(() => [...Array(5)].map((_, i) => ({
    delay: i * 1.2,
    duration: 4 + i * 0.5,
  })), []);

  return (
    <section id="skills" onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L90 10 L90 90 L10 90 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='10' cy='10' r='1.5' fill='white'/%3E%3Ccircle cx='90' cy='10' r='1.5' fill='white'/%3E%3Ccircle cx='90' cy='90' r='1.5' fill='white'/%3E%3Ccircle cx='10' cy='90' r='1.5' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px' }} />
        <motion.div className="absolute inset-0 z-10" style={{ maskImage: highlightMask, WebkitMaskImage: highlightMask }}>
          <div className="absolute inset-0 opacity-[0.5]"
            style={{ backgroundImage: `linear-gradient(to right,#6366f1 1.5px,transparent 1.5px),linear-gradient(to bottom,#6366f1 1.5px,transparent 1.5px)`, backgroundSize: '60px 60px' }} />
        </motion.div>
        {hasMounted && scanLines.map((sl, i) => (
          <motion.div key={i}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent z-[2]"
            animate={{ top: ['-5%', '105%'] }}
            transition={{ duration: sl.duration, repeat: Infinity, ease: 'linear', delay: sl.delay }} />
        ))}
        {hasMounted && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {dots.map((dot, i) => (
              <motion.div key={i}
                className="absolute rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]"
                style={{ width: dot.size, height: dot.size }}
                animate={{ left: dot.path, top: dot.path.slice().reverse(), opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: 'linear' }} />
            ))}
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-30 pointer-events-none" />
        <motion.div className="absolute w-[900px] h-[900px] bg-indigo-600/[0.18] rounded-full blur-[180px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em]">{SKILLS_SECTION_UI.sectionLabel}</h2>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
{SKILLS_SECTION_UI.heading.split("&")[0]}<span className="text-white/10">&amp;</span>{SKILLS_SECTION_UI.heading.split("&")[1] ?? " Expertise."}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
{SKILLS_SECTION_UI.subtitle}
          </p>
        </motion.div>

        {/* ── Category cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] hover:border-indigo-500/40 hover:shadow-[0_0_60px_rgba(99,102,241,0.08)] transition-all duration-150 overflow-hidden">

              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              {/* Corner glow */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              {/* Watermark */}
              <div className="absolute top-6 right-8 text-[80px] font-black text-white/[0.03] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 p-8 flex flex-col gap-6">
                {/* Card header */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-white/[0.06] border border-white/10 rounded-2xl group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-150">
                    <cat.icon size={28} className="text-slate-300 group-hover:text-indigo-200 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{cat.name}</h3>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{cat.skills.length} tools</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gradient-to-r from-white/10 via-indigo-500/20 to-transparent" />

                {/* Skill rows */}
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      isHovered={hoveredSkill === skill.name}
                      onHover={() => setHoveredSkill(skill.name)}
                      onLeave={() => setHoveredSkill(null)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Level legend */}
        <LevelLegend />

      </div>
    </section>
  );
};

export default SkillsSection;