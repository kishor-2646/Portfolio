"use client";

import React, { useState } from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { SKILL_CATEGORIES } from '../lib/data';
import type { Skill } from '../types';
import { scrollReveal, ease, dur } from '../lib/motion';

const LOGO_MAP: Record<string, string> = {
  'Java':             'https://cdn.simpleicons.org/java/FF7E33',
  'Dart':             'https://cdn.simpleicons.org/dart/0175C2',
  'JavaScript':       'https://cdn.simpleicons.org/javascript/F7DF1E',
  'TypeScript':       'https://cdn.simpleicons.org/typescript/3178C6',
  'Flutter':          'https://cdn.simpleicons.org/flutter/02569B',
  'Firebase':         'https://cdn.simpleicons.org/firebase/FFCA28',
  'Supabase':         'https://cdn.simpleicons.org/supabase/3ECF8E',
  'MongoDB':          'https://cdn.simpleicons.org/mongodb/47A248',
  'REST APIs':        'https://cdn.simpleicons.org/fastapi/009688',
  'Docker':           'https://cdn.simpleicons.org/docker/2496ED',
  'Git':              'https://cdn.simpleicons.org/git/F05032',
  'GCP':              'https://cdn.simpleicons.org/googlecloud/4285F4',
  'Google Maps API':  'https://cdn.simpleicons.org/googlemaps/4285F4',
  'SQL':              'https://cdn.simpleicons.org/mysql/4479A1',
  'C':                'https://cdn.simpleicons.org/c/A8B9CC',
  'Kubernetes':       'https://cdn.simpleicons.org/kubernetes/326CE5',
  'OneSignal':        'https://cdn.simpleicons.org/onesignal/E54B4D',
  'Real-Time Systems':'https://cdn.simpleicons.org/socketdotio/666666',
};

const LEVEL_LABELS = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

/* ─────────────────────────────────────────────────────────
   SkillRow — hover to highlight; sibling rows dim subtly.
───────────────────────────────────────────────────────── */
const SkillRow = ({
  skill, catHovered, isHovered, onHover, onLeave, delay,
}: {
  skill: Skill;
  catHovered: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}) => {
  const level = Math.max(1, Math.min(5, skill.level));
  const dimmed = catHovered && !isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: dur.normal, delay, ease: ease.out }}
      animate={{ opacity: dimmed ? 0.45 : 1 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-default"
      style={{
        background:   isHovered ? 'rgba(255,126,51,0.08)' : 'rgba(255,255,255,0.025)',
        borderColor:  isHovered ? 'rgba(255,126,51,0.35)' : 'rgba(255,255,255,0.07)',
        transition:   `background ${dur.fast}s, border-color ${dur.fast}s, opacity ${dur.normal}s`,
      }}
    >
      {/* Logo */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {LOGO_MAP[skill.name]
          ? <img src={LOGO_MAP[skill.name]} alt={skill.name} className="w-5 h-5 object-contain" loading="lazy" />
          : <div className="w-5 h-5 rounded-md bg-[#FF7E33]/15 flex items-center justify-center">
              <span className="text-[9px] font-black text-[#FF7E33]">{skill.name[0]}</span>
            </div>
        }
      </div>

      {/* Name */}
      <span className="text-sm font-semibold flex-1 truncate"
        style={{ color: isHovered ? '#FF7E33' : 'rgba(255,255,255,0.85)', transition: `color ${dur.fast}s` }}>
        {skill.name}
      </span>

      {/* Level dots */}
      <div className="flex gap-[3px]">
        {[1,2,3,4,5].map(s => (
          <div key={s} className="h-[5px] w-[9px] rounded-full transition-colors duration-200"
            style={{ backgroundColor: s <= level ? '#FF7E33' : 'rgba(255,255,255,0.12)' }} />
        ))}
      </div>

      {/* Level label */}
      <span className="text-[9px] font-bold w-20 text-right"
        style={{ color: isHovered ? '#FF7E33' : 'rgba(255,255,255,0.40)', transition: `color ${dur.fast}s` }}>
        {LEVEL_LABELS[level - 1]}
      </span>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   SkillCard — category card with stagger child reveal
───────────────────────────────────────────────────────── */
const SkillCard = ({ cat, cardDelay }: { cat: typeof SKILL_CATEGORIES[0]; cardDelay: number }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const catHovered = hoveredSkill !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: dur.reveal, delay: cardDelay, ease: ease.out }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: `border-color ${dur.normal}s, box-shadow ${dur.normal}s`,
      }}
      whileHover={{ borderColor: 'rgba(255,126,51,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      <div className="p-6 space-y-4">
        {/* Card header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/8">
            <cat.icon size={20} className="text-[#FF7E33]" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">{cat.name}</h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
              {cat.skills.length} technologies
            </p>
          </div>
        </div>

        <div className="h-px bg-white/8" />

        {/* Skills */}
        <div className="flex flex-col gap-1.5">
          {cat.skills.map((skill, i) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              catHovered={catHovered}
              isHovered={hoveredSkill === skill.name}
              onHover={() => setHoveredSkill(skill.name)}
              onLeave={() => setHoveredSkill(null)}
              delay={cardDelay + 0.04 + i * 0.03}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface SkillsProps {
  contentOpacity?: MotionValue<number>;
}

export default function SkillsSection({ contentOpacity }: SkillsProps) {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-28 px-6 md:px-10 lg:px-20 text-white overflow-hidden"
      style={{ background: '#000000' }}
    >
      <motion.div className="max-w-7xl mx-auto space-y-14 relative z-10" style={{ opacity: contentOpacity }}>

        {/* Section header */}
        <motion.div {...scrollReveal(0)} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF7E33]/50" />
              <span className="text-xs font-black text-[#FF7E33] uppercase tracking-[0.35em]">Technical Skills</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Stack & Expertise.
            </h2>
            <div className="h-1 w-16 rounded-full bg-[#FF7E33]" />
          </div>
          <p className="max-w-sm text-white/50 text-sm">
            Every tool earned through real production use — not just tutorials.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={i} cat={cat} cardDelay={i * 0.1} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}