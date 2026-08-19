"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Sparkles, ExternalLink, ShieldCheck, GraduationCap, Flame, Bot } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS & CERTIFICATIONS DATA
───────────────────────────────────────────────────────────── */
interface AchievementCard {
  id: string;
  title: string;
  event: string;
  year: string;
  category: 'Hackathon' | 'Certification' | 'Award';
  icon: React.ElementType;
  accent: {
    color: string;
    border: string;
    bg: string;
    pillBg: string;
    badgeText: string;
  };
  highlight: string;
  tags: string[];
}

const ACHIEVEMENTS_LIST: AchievementCard[] = [
  {
    id: 'sdg-ideathon',
    title: 'Winner — Sairam SDG Ideathon 3.0',
    event: 'Sairam SDG Ideathon',
    year: '2024',
    category: 'Hackathon',
    icon: Trophy,
    accent: {
      color: '#F59E0B',
      border: 'rgba(245, 158, 11, 0.3)',
      bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(245, 158, 11, 0.15)',
      badgeText: 'text-amber-400',
    },
    highlight: 'Built social-impact solution aligned with UN SDG Goal 1 (No Poverty) presenting to industry leaders.',
    tags: ['SDG Goal 1', 'Social Impact', 'Flutter', '1st Prize'],
  },
  {
    id: 'bfb-hackathon',
    title: 'Best Innovative Idea Winner',
    event: 'BFB 24-Hour Hackathon',
    year: '2023',
    category: 'Hackathon',
    icon: Flame,
    accent: {
      color: '#10B981',
      border: 'rgba(16, 185, 129, 0.3)',
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(16, 185, 129, 0.15)',
      badgeText: 'text-emerald-400',
    },
    highlight: 'GreenWave — Smart Ambulance Traffic System won best innovation award for automated green corridors.',
    tags: ['GreenWave', 'Real-Time IoT', 'Firebase', 'Emergency AI'],
  },
  {
    id: 'google-ai',
    title: 'Google AI Essentials Certified',
    event: 'Coursera × Google',
    year: '2024',
    category: 'Certification',
    icon: GraduationCap,
    accent: {
      color: '#06B6D4',
      border: 'rgba(6, 182, 212, 0.3)',
      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(6, 182, 212, 0.15)',
      badgeText: 'text-cyan-400',
    },
    highlight: 'Certified in foundational AI architectures, prompt engineering, and production ML workflows.',
    tags: ['Google', 'Generative AI', 'ML Workflows', 'Verified'],
  },
  {
    id: 'ey-microsoft',
    title: 'AI Skills Passport Recognition',
    event: 'EY & Microsoft',
    year: '2024',
    category: 'Certification',
    icon: ShieldCheck,
    accent: {
      color: '#818CF8',
      border: 'rgba(129, 140, 248, 0.3)',
      bg: 'linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(129, 140, 248, 0.15)',
      badgeText: 'text-indigo-400',
    },
    highlight: 'Recognised for applied artificial intelligence skills, ethical AI design, and enterprise problem solving.',
    tags: ['Microsoft', 'EY', 'Enterprise AI', 'Skills Passport'],
  },
  {
    id: 'mongodb',
    title: 'MongoDB Certified Developer',
    event: 'MongoDB University',
    year: '2024',
    category: 'Certification',
    icon: Award,
    accent: {
      color: '#34D399',
      border: 'rgba(52, 211, 153, 0.3)',
      bg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(52, 211, 153, 0.15)',
      badgeText: 'text-emerald-400',
    },
    highlight: 'Certified in CRUD operations, data modeling, aggregation pipelines, and high-performance indexing.',
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'Database'],
  },
  {
    id: 'google-agents',
    title: 'Google AI Agents Intensive',
    event: 'Kaggle × Google',
    year: '2025',
    category: 'Certification',
    icon: Bot,
    accent: {
      color: '#F43F5E',
      border: 'rgba(244, 63, 94, 0.3)',
      bg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12), rgba(0, 0, 0, 0.8))',
      pillBg: 'rgba(244, 63, 94, 0.15)',
      badgeText: 'text-rose-400',
    },
    highlight: 'Completed intensive programme on building multi-agent systems, tool-calling pipelines, and autonomous workflows.',
    tags: ['Kaggle', 'AI Agents', 'Multi-Agent', 'Advanced'],
  },
];

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS & CERTIFICATIONS SECTION
   - Seamless continuous loop / marquee scrolling from Right → Left
   - High visual fidelity matching reference image 1
───────────────────────────────────────────────────────────── */
export default function AchievementsSection() {
  // Duplicate array for seamless infinite marquee loop
  const loopCards = [...ACHIEVEMENTS_LIST, ...ACHIEVEMENTS_LIST, ...ACHIEVEMENTS_LIST];

  return (
    <section
      id="achievements"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-black text-white"
    >
      <style>{`
        @keyframes achievements-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-achievements-loop {
          display: flex;
          width: max-content;
          animation: achievements-marquee 32s linear infinite;
        }
        .animate-achievements-loop:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="w-[96%] max-w-6xl mx-auto px-4 sm:px-6 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles size={12} className="text-amber-400" />
            <span>Honors & Certifications</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Achievements & Certifications
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/55 font-light leading-relaxed">
            Hackathon podiums, industry certifications, and validated engineering credentials earned under real evaluation.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Rolling Loop Track (Right → Left) */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Gradient Fade Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Wrapper */}
        <div className="animate-achievements-loop gap-6 sm:gap-8 px-4">
          {loopCards.map((item, index) => {
            const IconComp = item.icon;

            return (
              <div
                key={`${item.id}-${index}`}
                className="
                  group relative shrink-0 w-[340px] sm:w-[390px] rounded-2xl overflow-hidden
                  border border-white/12 bg-[#0b0b0b]
                  shadow-[0_16px_40px_rgba(0,0,0,0.85)]
                  hover:border-white/30 hover:scale-[1.02]
                  transition-all duration-300 cursor-default flex flex-col justify-between
                "
                style={{
                  background: item.accent.bg,
                  borderColor: item.accent.border,
                }}
              >
                {/* Card Top Banner with Visual Showcase */}
                <div className="p-6 sm:p-7">
                  
                  {/* Category Pill & Year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-white/10 ${item.accent.badgeText}`}
                      style={{ background: item.accent.pillBg }}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-white/40">
                      {item.year}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-lg"
                      style={{
                        background: item.accent.pillBg,
                        borderColor: item.accent.border,
                        color: item.accent.color,
                      }}
                    >
                      <IconComp size={22} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/50 font-medium mt-0.5">
                        {item.event}
                      </p>
                    </div>
                  </div>

                  {/* Highlight sentence */}
                  <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed mt-3">
                    {item.highlight}
                  </p>
                </div>

                {/* Card Bottom Tag Bar */}
                <div className="px-6 py-3.5 bg-black/60 border-t border-white/8 flex flex-wrap items-center gap-1.5">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
