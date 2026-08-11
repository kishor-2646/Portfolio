"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { BIO, FEATURED_ACHIEVEMENT, ABOUT_TAGLINE } from '../lib/data';
import { scrollReveal, ease, dur } from '../lib/motion';
import portfolioConfig from '../../portfolio.config';

/* ─────────────────────────────────────────────────────────
   HighlightBio — renders bio text with a few technical
   phrases subtly highlighted in accent on scroll entry.
   Only those specific words animate; everything else is static.
───────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  'production-grade systems',
  '100+ real users',
  'real-time communication',
  'AI & ML',
  'full-stack solutions',
];

function HighlightBio({ text }: { text: string }) {
  // Split bio into parts, tagging which ones should highlight
  const parts: { str: string; highlight: boolean }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestKw = '';

    for (const kw of HIGHLIGHTS) {
      const idx = remaining.indexOf(kw);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        earliestKw = kw;
      }
    }

    if (earliest === -1) {
      parts.push({ str: remaining, highlight: false });
      break;
    }

    if (earliest > 0) {
      parts.push({ str: remaining.slice(0, earliest), highlight: false });
    }
    parts.push({ str: earliestKw, highlight: true });
    remaining = remaining.slice(earliest + earliestKw.length);
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: dur.reveal, ease: ease.out }}
      className="text-base md:text-lg leading-relaxed text-white/55 max-w-4xl"
    >
      {parts.map((part, i) =>
        part.highlight ? (
          <motion.span
            key={i}
            initial={{ color: 'rgba(255,255,255,0.35)' }}
            whileInView={{ color: '#FF7A1A' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.04, ease: ease.out }}
            className="font-semibold"
          >
            {part.str}
          </motion.span>
        ) : (
          <span key={i}>{part.str}</span>
        )
      )}
    </motion.p>
  );
}

const sv = (d: number) => scrollReveal(d, 22);

export default function AboutSection() {
  const bioChips = portfolioConfig.about.bioChips || [];

  return (
    <section
      id="about"
      className="relative text-white py-24 md:py-32 px-6 md:px-10 lg:px-20 overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-16 relative z-30">

        {/* ── Section heading ── */}
        <motion.div {...sv(0)}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#FF7E33]/50" />
            <span className="text-xs font-black text-[#FF7E33] uppercase tracking-[0.35em]">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Overview & <span className="text-[#FF7E33]">Focus.</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-[#FF7E33] mt-4" />
        </motion.div>

        {/* ── Bio card ── */}
        <motion.div {...sv(0.06)}
          className="relative p-8 md:p-12 border border-white/8 rounded-2xl space-y-6"
          style={{ background: 'rgba(255,255,255,0.025)' }}
          whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
          transition={{ duration: dur.normal }}
        >
          {/* Tagline */}
          <motion.p
            {...sv(0.1)}
            className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-white/90"
          >
            {ABOUT_TAGLINE}
          </motion.p>

          {/* Bio with highlighted technical phrases */}
          <HighlightBio text={BIO} />

          {/* Tech chips */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: dur.reveal, delay: 0.18 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {bioChips.map((tag: string, i: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: dur.normal, delay: 0.2 + i * 0.04, ease: ease.out }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 text-white/45 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ borderColor: 'rgba(255,122,26,0.35)', color: '#FF7A1A' }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#skills"
            onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF7E33] pt-2"
            whileHover={{ gap: '12px' }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            View full skill set <ChevronRight size={16} />
          </motion.a>
        </motion.div>

        {/* ── Featured Achievement ── */}
        <motion.div {...sv(0.12)}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 md:p-10 border border-white/8 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.025)' }}
          whileHover={{ borderColor: 'rgba(255,122,26,0.22)' }}
          transition={{ duration: dur.normal }}
        >
          <motion.div
            className="p-4 bg-[#FF7E33]/10 border border-[#FF7E33]/20 rounded-xl shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            <span className="text-3xl">🏆</span>
          </motion.div>
          <div className="flex-1">
            <p className="text-xs font-black text-[#FF7E33] uppercase tracking-wider mb-1">Featured Achievement</p>
            <h3 className="text-xl md:text-2xl font-black text-white">{FEATURED_ACHIEVEMENT.title}</h3>
            <p className="text-white/45 text-sm mt-1">{FEATURED_ACHIEVEMENT.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FEATURED_ACHIEVEMENT.chips.map((chip: string) => (
              <span key={chip} className="px-3 py-1.5 border border-white/10 rounded-lg text-xs font-bold text-white/50">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}