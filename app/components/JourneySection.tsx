"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Sparkles, Truck, HeartPulse, Navigation, Cpu, Award } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE MILESTONES DATA (WITH SHARP CORNERS & ROTATION TILTS)
───────────────────────────────────────────────────────────── */
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  isCurrent?: boolean;
  rotation: string;
  accent: {
    name: string;
    text: string;
    bg: string;
    border: string;
    pillBg: string;
    pillBorder: string;
    dotBg: string;
    dotShadow: string;
    iconBg: string;
    iconBorder: string;
  };
  icon: React.ElementType;
  highlights: { bold: string; text: string }[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'uptoskills',
    role: 'Flutter Developer & Team Lead',
    company: 'UptoSkills Logistics',
    location: 'New Delhi (Remote)',
    date: "Sep '25 - Jan '26",
    isCurrent: true,
    rotation: '-1.8deg',
    accent: {
      name: 'emerald',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      pillBg: 'bg-emerald-500/10',
      pillBorder: 'border-emerald-500/30',
      dotBg: 'bg-emerald-400',
      dotShadow: 'shadow-[0_0_12px_rgba(52,211,153,0.8)]',
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400',
      iconBorder: 'border-emerald-500/30',
    },
    icon: Truck,
    highlights: [
      { bold: 'Led final sprint as Team Lead', text: ' delivering production updates for Truck Singh logistics platform.' },
      { bold: 'Engineered real-time chat', text: ', Google Maps live fleet tracking, and automated OneSignal push alerts.' },
      { bold: 'Reduced manual coordination by ~40%', text: ' across 100+ active users with Supabase backend.' },
    ],
    skills: ['Flutter', 'Supabase', 'Google Maps', 'OneSignal', 'Team Lead'],
  },
  {
    id: 'retailer-sakthi',
    role: 'Engineering Team Lead',
    company: 'Retailer Sakthi',
    location: 'Chennai, TN',
    date: "Hackathon Sprint '25",
    rotation: '2.2deg',
    accent: {
      name: 'cyan',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      pillBg: 'bg-cyan-500/10',
      pillBorder: 'border-cyan-500/30',
      dotBg: 'bg-cyan-400',
      dotShadow: 'shadow-[0_0_12px_rgba(34,211,238,0.8)]',
      iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-400',
      iconBorder: 'border-cyan-500/30',
    },
    icon: HeartPulse,
    highlights: [
      { bold: 'Managed a 12-member engineering team', text: ' to design and deploy a B2B medicine marketplace MVP in 15 days.' },
      { bold: 'Architected role-based auth', text: ' and bulk inventory ordering workflow with Firebase backend.' },
      { bold: 'Structured daily sprint deliverables', text: ' under extreme hackathon deadline pressure.' },
    ],
    skills: ['Flutter', 'Firebase', 'Architecture', 'Team Lead', 'B2B'],
  },
  {
    id: 'greenwave',
    role: 'Solo Full Stack Developer',
    company: 'GreenWave Systems',
    location: 'BFB 24-Hr Hackathon',
    date: '2023 - 2024',
    rotation: '-1.5deg',
    accent: {
      name: 'teal',
      text: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      pillBg: 'bg-teal-500/10',
      pillBorder: 'border-teal-500/30',
      dotBg: 'bg-teal-400',
      dotShadow: 'shadow-[0_0_12px_rgba(45,212,191,0.8)]',
      iconBg: 'bg-gradient-to-br from-teal-500/20 to-emerald-500/10 text-teal-400',
      iconBorder: 'border-teal-500/30',
    },
    icon: Navigation,
    highlights: [
      { bold: 'Won Best Innovative Idea', text: ' at the BFB 24-Hour Hackathon for automated emergency corridor automation.' },
      { bold: 'Built sub-second GPS ambulance tracking', text: ' with Firebase Realtime Database and Google Maps API.' },
      { bold: 'Automated traffic signal switching', text: ' with real-time FCM push alerts to traffic police.' },
    ],
    skills: ['Flutter', 'Firebase', 'Google Maps API', 'FCM', 'Real-Time'],
  },
  {
    id: 'pcify',
    role: 'AI System Architect',
    company: 'PCify Platform',
    location: 'Independent Build',
    date: '2024 - 2025',
    rotation: '1.9deg',
    accent: {
      name: 'indigo',
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      pillBg: 'bg-indigo-500/10',
      pillBorder: 'border-indigo-500/30',
      dotBg: 'bg-indigo-400',
      dotShadow: 'shadow-[0_0_12px_rgba(129,140,248,0.8)]',
      iconBg: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-400',
      iconBorder: 'border-indigo-500/30',
    },
    icon: Cpu,
    highlights: [
      { bold: 'Designed two-sided marketplace', text: ' connecting custom PC enthusiasts with verified expert builders.' },
      { bold: 'Integrated AI recommendation engine', text: ' for personalized hardware configurations based on budget.' },
      { bold: 'Built end-to-end booking calendar', text: ', Supabase Realtime chat, and escrow transaction pipeline.' },
    ],
    skills: ['AI/ML', 'Flutter', 'Supabase', 'Marketplace', 'Full Stack'],
  },
  {
    id: 'ideathon',
    role: '1st Prize Winner',
    company: 'Sairam SDG Ideathon 3.0',
    location: 'Chennai, TN',
    date: '2024',
    rotation: '-2.0deg',
    accent: {
      name: 'amber',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      pillBg: 'bg-amber-500/10',
      pillBorder: 'border-amber-500/30',
      dotBg: 'bg-amber-400',
      dotShadow: 'shadow-[0_0_12px_rgba(251,191,36,0.8)]',
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400',
      iconBorder: 'border-amber-500/30',
    },
    icon: Award,
    highlights: [
      { bold: 'Secured 1st place', text: ' at Sairam SDG Ideathon 3.0 for mobile solution aligned with UN Goal 1.' },
      { bold: 'Presented scalable deployment architecture', text: ' to industry judging panel.' },
      { bold: 'Recognized for technical excellence', text: ' and real-world social impact.' },
    ],
    skills: ['SDG Goal 1', 'Social Impact', 'Dart', 'Firebase', '1st Prize'],
  },
];

/* ─────────────────────────────────────────────────────────────
   PINNED HORIZONTAL TIMELINE EXPERIENCE SECTION
   - Sharp corners (rounded-[2px] instead of smooth rounded-2xl)
   - Natural card rotation tilts (e.g. -1.8deg, +2.2deg)
   - 2-tier card structure with styled logo box
───────────────────────────────────────────────────────────── */
export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Measure vertical scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate horizontal track from 2% to -68% as scroll progress goes 0 -> 1
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-68%']);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full text-white bg-black overflow-visible"
      style={{
        height: '420vh',
      }}
    >
      {/* ── DESKTOP & TABLET: Pinned Sticky Viewport ── */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Viewport Content Wrapper */}
        <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-12 px-6 lg:px-12 select-none">
          
          {/* Section Header with Masked Title Reveal */}
          <div className="max-w-4xl mx-auto text-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            >
              <span className="text-cyan-400">✦</span>
              <span>EXPERIENCE</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "115%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1.0, 0.3, 1] }}
                className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              >
                the journey so far
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm lg:text-base text-white/50 font-light mt-2 max-w-xl mx-auto leading-relaxed"
            >
              From hackathon wins to production logistics systems — engineering roles and milestones across my journey.
            </motion.p>
          </div>

          {/* Horizontal Timeline Track Canvas */}
          <div className="relative w-full flex-1 flex items-center my-auto overflow-visible">
            
            {/* Central Horizontal Timeline Line */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/15 pointer-events-none z-0"
              style={{ width: '300vw' }}
            />

            {/* Moving Track */}
            <motion.div
              style={{ x, willChange: 'transform' }}
              className="flex items-center gap-12 lg:gap-16 pl-12 pr-48 relative z-10"
            >
              {EXPERIENCES.map((exp, index) => {
                const isAbove = index % 2 === 0;
                const IconComponent = exp.icon;

                return (
                  <div
                    key={exp.id}
                    className="relative shrink-0 flex flex-col items-center"
                    style={{ width: 'clamp(360px, 27vw, 430px)' }}
                  >
                    {/* ── CARD ABOVE TIMELINE ── */}
                    {isAbove && (
                      <div className="flex flex-col items-center mb-0">
                        {/* Date Pill Badge (Top) */}
                        <div className="mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${exp.accent.pillBg} ${exp.accent.pillBorder} ${exp.accent.text}`}
                          >
                            {exp.isCurrent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            )}
                            {exp.date}
                          </span>
                        </div>

                        {/* Experience Card (Sharp Corners & Rotation Tilt) */}
                        <div
                          style={{
                            transform: `rotate(${exp.rotation})`,
                            transformOrigin: 'bottom center',
                          }}
                          className="
                            group/card w-full rounded-[3px] overflow-hidden bg-[#0d0d0d] border border-white/12
                            shadow-[0_24px_60px_rgba(0,0,0,0.92),0_8px_20px_rgba(0,0,0,0.8)]
                            hover:border-white/30 hover:rotate-0 hover:scale-[1.02]
                            transition-all duration-300 cursor-default
                          "
                        >
                          
                          {/* Card Top Header Bar */}
                          <div className="flex items-center justify-between gap-3 px-5 py-4 bg-white/[0.03] border-b border-white/8">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Sharp Logo Box */}
                              <div
                                className={`w-10 h-10 rounded-[4px] border flex items-center justify-center shrink-0 shadow-md ${exp.accent.iconBg} ${exp.accent.iconBorder}`}
                              >
                                <IconComponent size={20} />
                              </div>

                              {/* Title & Company */}
                              <div className="min-w-0">
                                <h3 className="text-sm sm:text-[15px] font-bold text-white leading-tight truncate">
                                  {exp.role}
                                </h3>
                                <p className="text-xs text-white/50 font-medium mt-0.5 truncate">
                                  {exp.company}
                                </p>
                              </div>
                            </div>

                            {/* Location Pin on Right */}
                            <div className="flex items-center gap-1 text-[11.5px] text-white/45 shrink-0 pl-2">
                              <MapPin size={12} className="text-white/40" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 sm:p-6 bg-black/40">
                            {/* Bullet Points with Bold Keywords */}
                            <ul className="space-y-2.5 mb-4">
                              {exp.highlights.map((h, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="text-xs sm:text-[13px] text-white/70 leading-relaxed list-disc list-inside marker:text-white/40"
                                >
                                  <strong className="text-white/95 font-semibold">{h.bold}</strong>
                                  <span>{h.text}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Skill Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/8">
                              {exp.skills.map(s => (
                                <span
                                  key={s}
                                  className="text-[10.5px] px-2.5 py-0.5 rounded-[2px] bg-white/[0.05] text-white/60 border border-white/10 font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Vertical Connector Line */}
                        <div className="w-[2px] h-10 bg-white/25" />
                        
                        {/* Circular Timeline Node */}
                        <div className="relative">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-black ${exp.accent.dotBg} ${exp.accent.dotShadow}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* ── CARD BELOW TIMELINE ── */}
                    {!isAbove && (
                      <div className="flex flex-col items-center mt-0">
                        {/* Circular Timeline Node */}
                        <div className="relative">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-black ${exp.accent.dotBg} ${exp.accent.dotShadow}`}
                          />
                        </div>

                        {/* Vertical Connector Line */}
                        <div className="w-[2px] h-10 bg-white/25" />

                        {/* Date Pill Badge (Above Card) */}
                        <div className="mb-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${exp.accent.pillBg} ${exp.accent.pillBorder} ${exp.accent.text}`}
                          >
                            {exp.isCurrent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            )}
                            {exp.date}
                          </span>
                        </div>

                        {/* Experience Card (Sharp Corners & Rotation Tilt) */}
                        <div
                          style={{
                            transform: `rotate(${exp.rotation})`,
                            transformOrigin: 'top center',
                          }}
                          className="
                            group/card w-full rounded-[3px] overflow-hidden bg-[#0d0d0d] border border-white/12
                            shadow-[0_24px_60px_rgba(0,0,0,0.92),0_8px_20px_rgba(0,0,0,0.8)]
                            hover:border-white/30 hover:rotate-0 hover:scale-[1.02]
                            transition-all duration-300 cursor-default
                          "
                        >
                          
                          {/* Card Top Header Bar */}
                          <div className="flex items-center justify-between gap-3 px-5 py-4 bg-white/[0.03] border-b border-white/8">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Sharp Logo Box */}
                              <div
                                className={`w-10 h-10 rounded-[4px] border flex items-center justify-center shrink-0 shadow-md ${exp.accent.iconBg} ${exp.accent.iconBorder}`}
                              >
                                <IconComponent size={20} />
                              </div>

                              {/* Title & Company */}
                              <div className="min-w-0">
                                <h3 className="text-sm sm:text-[15px] font-bold text-white leading-tight truncate">
                                  {exp.role}
                                </h3>
                                <p className="text-xs text-white/50 font-medium mt-0.5 truncate">
                                  {exp.company}
                                </p>
                              </div>
                            </div>

                            {/* Location Pin on Right */}
                            <div className="flex items-center gap-1 text-[11.5px] text-white/45 shrink-0 pl-2">
                              <MapPin size={12} className="text-white/40" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 sm:p-6 bg-black/40">
                            {/* Bullet Points with Bold Keywords */}
                            <ul className="space-y-2.5 mb-4">
                              {exp.highlights.map((h, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="text-xs sm:text-[13px] text-white/70 leading-relaxed list-disc list-inside marker:text-white/40"
                                >
                                  <strong className="text-white/95 font-semibold">{h.bold}</strong>
                                  <span>{h.text}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Skill Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/8">
                              {exp.skills.map(s => (
                                <span
                                  key={s}
                                  className="text-[10.5px] px-2.5 py-0.5 rounded-[2px] bg-white/[0.05] text-white/60 border border-white/10 font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* Bottom subtle indicator */}
          <div className="text-center text-xs text-white/30 font-light z-20">
            <span>Scroll vertically to explore the timeline →</span>
          </div>

        </div>
      </div>

      {/* ── MOBILE FALLBACK: Clean Vertical Timeline ── */}
      <div className="block md:hidden px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <span className="text-cyan-400">✦</span>
            <span>EXPERIENCE</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">the journey so far</h2>
          <p className="text-sm text-white/50 mt-2">
            Engineering roles, hackathons, and systems built across my journey.
          </p>
        </div>

        {/* Vertical Timeline Stack */}
        <div className="relative border-l-2 border-white/15 ml-4 space-y-10 pl-6">
          {EXPERIENCES.map(exp => {
            const IconComponent = exp.icon;

            return (
              <div key={exp.id} className="relative">
                {/* Node */}
                <div
                  className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-black ${exp.accent.dotBg} ${exp.accent.dotShadow}`}
                />

                {/* Date Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${exp.accent.pillBg} ${exp.accent.pillBorder} ${exp.accent.text}`}
                  >
                    {exp.date}
                  </span>
                </div>

                {/* Card with Sharp Corners */}
                <div className="rounded-[3px] overflow-hidden bg-[#0e0e0e] border border-white/12 shadow-xl">
                  <div className="flex items-center justify-between p-4 bg-white/[0.03] border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-[4px] border flex items-center justify-center shrink-0 ${exp.accent.iconBg} ${exp.accent.iconBorder}`}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">{exp.role}</h3>
                        <p className="text-xs text-white/50">{exp.company}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-white/40 flex items-center gap-1">
                      <MapPin size={11} /> {exp.location}
                    </span>
                  </div>

                  <div className="p-4 bg-black/40">
                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-white/70 leading-relaxed list-disc list-inside">
                          <strong className="text-white/90">{h.bold}</strong>
                          <span>{h.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
