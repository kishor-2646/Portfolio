"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, Binary, Rocket, Download } from 'lucide-react';
import { TIMELINE_PATHS, ACHIEVEMENTS, RESUME_URL } from '../lib/data';
import { scrollReveal, ease, dur } from '../lib/motion';

const TRACK_ICONS: Record<string, React.ElementType> = {
  'Learning Path':    BookOpen,
  'DSA Path':         Binary,
  'Development Path': Rocket,
};

/* ─────────────────────────────────────────────────────────
   ScrollDrawLine — a timeline track whose vertical line
   progressively reveals as the user scrolls into it.
───────────────────────────────────────────────────────── */
const ScrollDrawLine = ({
  path, pIdx,
}: {
  path: typeof TIMELINE_PATHS[0];
  pIdx: number;
}) => {
  const Icon    = TRACK_ICONS[path.title] ?? BookOpen;
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 90%', 'end 40%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      ref={trackRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: dur.reveal, delay: pIdx * 0.12, ease: ease.out }}
      className="flex flex-col"
    >
      {/* Track header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-orange-50 rounded-xl border border-[#FF7E33]/15">
          <Icon size={18} className="text-[#FF7E33]" />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900">{path.title}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {path.timeline.length} milestones
          </p>
        </div>
      </div>

      {/* Milestones with scroll-drawn line */}
      <div className="relative pl-6 space-y-6">

        {/* Track: full height background */}
        <div className="absolute top-2 bottom-2 left-[7px] w-[2px] bg-slate-100 rounded-full overflow-hidden">
          {/* Drawn line — grows as user scrolls through */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF7E33] to-[#FFB36A] rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        {path.timeline.map((event, eIdx) => (
          <motion.div
            key={eIdx}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: dur.normal, delay: pIdx * 0.1 + eIdx * 0.1, ease: ease.out }}
            className="relative group"
          >
            {/* Dot — activates on scroll entry */}
            <motion.div
              initial={{ scale: 0.5, backgroundColor: '#E2E8F0' }}
              whileInView={{ scale: 1, backgroundColor: '#FF7E33' }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: dur.normal, delay: pIdx * 0.1 + eIdx * 0.12, ease: ease.spring }}
              className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
            />

            <div>
              <span className="text-[10px] font-black text-[#FF7E33] uppercase tracking-wider">{event.date}</span>
              <h5 className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-[#FF7E33] transition-colors duration-200">
                {event.label}
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">{event.focus}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const sv = (d: number) => scrollReveal(d, 22);

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-24 md:py-28 px-6 md:px-10 lg:px-20 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">

        {/* ── Header ── */}
        <motion.div {...sv(0)} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF7E33]/50" />
              <span className="text-xs font-black text-[#FF7E33] uppercase tracking-[0.35em]">Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Experience & <span className="text-[#FF7E33]">Growth</span>
            </h2>
            <div className="h-1 w-16 rounded-full bg-[#FF7E33]" />
          </div>
          <motion.a
            href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#FF7E33] shadow-md"
            whileHover={{ y: -2, boxShadow: '0 12px 28px rgba(255,126,51,0.35)' }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            <Download size={15} /> Download Resume
          </motion.a>
        </motion.div>

        {/* ── Achievements ── */}
        <div className="space-y-8">
          <motion.div {...sv(0.05)}>
            <h3 className="text-2xl font-black text-slate-900">Achievements & Certifications</h3>
            <p className="text-slate-500 text-sm mt-1">Hackathon wins, certifications, and professional milestones.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group p-6 border border-slate-200/80 rounded-2xl cursor-default"
                style={{ background: '#fafafa' }}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(255,126,51,0.3)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
                  background: '#fff',
                }}
                transition={{
                  // entry reveal
                  opacity:    { duration: dur.reveal, delay: i * 0.07, ease: ease.out },
                  y:          { duration: dur.normal, ease: ease.out },
                  // hover transitions
                  borderColor:{ duration: dur.normal },
                  boxShadow:  { duration: dur.normal },
                  background: { duration: dur.normal },
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.span
                    className="text-2xl shrink-0"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ duration: dur.fast, ease: ease.spring }}
                  >
                    {a.icon}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500">
                        {a.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{a.year}</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-[#FF7E33] transition-colors duration-200">
                      {a.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Award size={10} className="text-[#FF7E33]" />
                      {a.event}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{a.highlight}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="space-y-8">
          <motion.div {...sv(0.1)}>
            <h3 className="text-2xl font-black text-slate-900">Learning Timeline</h3>
            <p className="text-slate-500 text-sm mt-1">How I've grown from fundamentals to production systems.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIMELINE_PATHS.map((path, pIdx) => (
              <ScrollDrawLine key={pIdx} path={path} pIdx={pIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
