"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Flame, Sparkles, CheckCircle2, ShieldCheck, ExternalLink, Star } from 'lucide-react';
import { useScrollDirection } from '../lib/useScrollDirection';

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS BADGES DATA (SUPPORTS CUSTOM IMAGES + AUTHENTIC PLACEHOLDERS)
───────────────────────────────────────────────────────────── */
export interface BadgeItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Hackathon' | 'Certification' | 'Award';
  badgeStyle: 'clutch-hex' | 'tech-hex' | 'agency-banner' | 'seal-orange' | 'crest-shield' | 'gold-medal';
  image?: string; // If you have an actual badge photo/PNG, put the path here (e.g. /badges/ideathon.png)
  highlight: string;
  tags: string[];
}

const BADGES_LIST: BadgeItem[] = [
  {
    id: 'sdg-ideathon',
    title: 'Winner — Sairam SDG Ideathon 3.0',
    issuer: 'Sairam SDG Ideathon',
    year: '2024',
    category: 'Hackathon',
    badgeStyle: 'clutch-hex',
    image: undefined, // Replace with your badge image path when ready
    highlight: 'Secured 1st Place presenting scalable social-impact architecture aligned with UN SDG Goal 1 (No Poverty) to an industry judging panel.',
    tags: ['SDG Goal 1', '1st Prize', 'Flutter', 'Social Impact'],
  },
  {
    id: 'bfb-hackathon',
    title: 'Best Innovative Idea Winner',
    issuer: 'BFB 24-Hour Hackathon',
    year: '2023',
    category: 'Hackathon',
    badgeStyle: 'tech-hex',
    image: undefined,
    highlight: 'GreenWave — Smart Ambulance Traffic System won the Best Innovation Award for automated green corridors and real-time FCM emergency alerts.',
    tags: ['GreenWave', 'Best Innovation', 'Firebase', 'Real-Time IoT'],
  },
  {
    id: 'google-ai',
    title: 'Google AI Essentials Certified',
    issuer: 'Coursera × Google',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'agency-banner',
    image: undefined,
    highlight: 'Certified by Google in foundational AI architectures, prompt engineering, generative AI tools, and production machine learning workflows.',
    tags: ['Google', 'Generative AI', 'ML Workflows', 'Verified'],
  },
  {
    id: 'ey-microsoft',
    title: 'AI Skills Passport Recognition',
    issuer: 'EY & Microsoft',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'seal-orange',
    image: undefined,
    highlight: 'Recognised by Ernst & Young and Microsoft for applied artificial intelligence competence, ethical AI design, and enterprise problem solving.',
    tags: ['Microsoft', 'EY', 'Enterprise AI', 'Skills Passport'],
  },
  {
    id: 'mongodb',
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    year: '2024',
    category: 'Certification',
    badgeStyle: 'crest-shield',
    image: undefined,
    highlight: 'Certified in document data modeling, aggregation pipelines, performance optimization, and high-throughput indexing.',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Aggregation'],
  },
  {
    id: 'google-agents',
    title: 'Google AI Agents Intensive',
    issuer: 'Kaggle × Google',
    year: '2025',
    category: 'Certification',
    badgeStyle: 'gold-medal',
    image: undefined,
    highlight: 'Completed intensive track on autonomous agent architectures, multi-agent systems, tool-calling pipelines, and autonomous workflows.',
    tags: ['Kaggle', 'AI Agents', 'Multi-Agent', 'Advanced'],
  },
];

/* ─────────────────────────────────────────────────────────────
   TAG COLOR STYLING (SOLID MATTE DESIGN SYSTEM)
───────────────────────────────────────────────────────────── */
function getTagStyle(tag: string): string {
  const t = tag.toLowerCase().trim();

  if (t.includes('flutter'))   return 'bg-[#152a3a] text-[#8ec8f6] border-[#22445e]';
  if (t.includes('firebase'))  return 'bg-[#302315] text-[#f2ad55] border-[#4c3620]';
  if (t.includes('google') || t.includes('kaggle')) return 'bg-[#182a32] text-[#71c3d9] border-[#284654]';
  if (t.includes('microsoft') || t.includes('ey'))  return 'bg-[#1c2438] text-[#93abde] border-[#2e3b5a]';
  if (t.includes('mongodb') || t.includes('nosql') || t.includes('database')) return 'bg-[#152e22] text-[#63e2a2] border-[#214936]';
  if (t.includes('ai') || t.includes('agent')) return 'bg-[#291b36] text-[#c086fc] border-[#422b57]';
  if (t.includes('sdg') || t.includes('social')) return 'bg-[#321c1f] text-[#fca5a5] border-[#502c32]';
  if (t.includes('prize') || t.includes('1st') || t.includes('innovation')) return 'bg-[#342713] text-[#f5ca38] border-[#523d1d]';

  return 'bg-[#192433] text-[#86aed6] border-[#2a3c54]';
}

/* ─────────────────────────────────────────────────────────────
   AUTHENTIC VECTOR BADGE GRAPHIC PLACEHOLDERS (MATCHING IMAGE 2)
───────────────────────────────────────────────────────────── */
function BadgeGraphic({ badge }: { badge: BadgeItem }) {
  // If user provided a real badge photo/image file, render it directly
  if (badge.image) {
    return (
      <div className="w-full h-full p-2 flex items-center justify-center">
        <img
          src={badge.image}
          alt={badge.title}
          className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter"
        />
      </div>
    );
  }

  // 1. CLUTCH-STYLE HEXAGONAL BADGE (Sairam SDG Ideathon)
  if (badge.badgeStyle === 'clutch-hex') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2229" />
              <stop offset="100%" stopColor="#0c0e12" />
            </linearGradient>
            <linearGradient id="hexBorder1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          {/* Hexagon Outer Frame */}
          <polygon
            points="60,4 114,34 114,106 60,136 6,106 6,34"
            fill="url(#hexGrad1)"
            stroke="url(#hexBorder1)"
            strokeWidth="3.5"
          />
          {/* Inner Hexagon Ring */}
          <polygon
            points="60,11 107,37 107,103 60,129 13,103 13,37"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          {/* Top Label */}
          <text x="60" y="32" textAnchor="middle" fill="#9ca3af" fontSize="7.5" fontWeight="700" letterSpacing="0.8">
            WINNER
          </text>
          <line x1="28" y1="36" x2="92" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          
          {/* Center Title */}
          <rect x="20" y="44" width="80" height="28" rx="2" fill="#182736" stroke="#3b82f6" strokeWidth="0.8" />
          <text x="60" y="56" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="0.5">
            SAIRAM SDG
          </text>
          <text x="60" y="66" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="700">
            IDEATHON 3.0
          </text>

          {/* Stars */}
          <g fill="#fbbf24" transform="translate(36, 78) scale(0.6)">
            <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
            <polygon points="24,1 26,7 32,7 27,11 29,17 24,13 19,17 21,11 16,7 22,7" />
            <polygon points="38,1 40,7 46,7 41,11 43,17 38,13 33,17 35,11 30,7 36,7" />
            <polygon points="52,1 54,7 60,7 55,11 57,17 52,13 47,17 49,11 44,7 50,7" />
            <polygon points="66,1 68,7 74,7 69,11 71,17 66,13 61,17 63,11 58,7 64,7" />
          </g>

          {/* Bottom Badge Info */}
          <line x1="28" y1="96" x2="92" y2="96" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <text x="60" y="107" textAnchor="middle" fill="#d1d5db" fontSize="7" fontWeight="700" letterSpacing="0.5">
            1ST PRIZE
          </text>
          <text x="60" y="118" textAnchor="middle" fill="#9ca3af" fontSize="6.5" fontWeight="600">
            2024
          </text>
        </svg>
      </div>
    );
  }

  // 2. HEXAGONAL TECH INNOVATION BADGE (BFB Hackathon)
  if (badge.badgeStyle === 'tech-hex') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="hexGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111c19" />
              <stop offset="100%" stopColor="#080e0c" />
            </linearGradient>
            <linearGradient id="hexBorder2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <polygon
            points="60,4 114,34 114,106 60,136 6,106 6,34"
            fill="url(#hexGrad2)"
            stroke="url(#hexBorder2)"
            strokeWidth="3.5"
          />
          <polygon
            points="60,11 107,37 107,103 60,129 13,103 13,37"
            fill="none"
            stroke="rgba(52,211,153,0.3)"
            strokeWidth="1.2"
          />
          <text x="60" y="32" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="700" letterSpacing="0.8">
            BEST INNOVATION
          </text>
          <line x1="28" y1="36" x2="92" y2="36" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8" />
          
          <rect x="20" y="44" width="80" height="28" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" />
          <text x="60" y="56" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.5">
            GreenWave
          </text>
          <text x="60" y="66" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontWeight="600">
            AMBULANCE IOT
          </text>

          {/* Flame Icon */}
          <g fill="#10b981" transform="translate(53, 76) scale(0.7)">
            <path d="M8.5 14.5A6 6 0 0 0 14.5 8.5C14.5 4.5 11 1 8.5 0C6 1 2.5 4.5 2.5 8.5a6 6 0 0 0 6 6z" />
          </g>

          <line x1="28" y1="96" x2="92" y2="96" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8" />
          <text x="60" y="107" textAnchor="middle" fill="#d1fae5" fontSize="7" fontWeight="700">
            BFB HACKATHON
          </text>
          <text x="60" y="118" textAnchor="middle" fill="#6ee7b7" fontSize="6.5" fontWeight="600">
            2023
          </text>
        </svg>
      </div>
    );
  }

  // 3. DESIGNRUSH / ACCREDITED RECTANGULAR BANNER (Google AI Essentials)
  if (badge.badgeStyle === 'agency-banner') {
    return (
      <div className="relative w-32 h-24 sm:w-36 sm:h-28 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bannerBorder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="132" height="92" rx="4" fill="#0c1929" stroke="url(#bannerBorder)" strokeWidth="2.5" />
          
          {/* Top Google Blue Header */}
          <rect x="4" y="4" width="132" height="24" rx="3" fill="#0284c7" />
          <text x="70" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.8">
            GOOGLE CERTIFIED
          </text>
          
          {/* Inner Content */}
          <text x="70" y="45" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="700" letterSpacing="0.5">
            AI ESSENTIALS
          </text>
          <text x="70" y="58" textAnchor="middle" fill="#e2e8f0" fontSize="7.5" fontWeight="600">
            FOUNDATIONAL ML
          </text>
          <line x1="20" y1="66" x2="120" y2="66" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
          
          {/* Bottom Bar */}
          <text x="70" y="80" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontWeight="600" letterSpacing="0.4">
            COURSERA × GOOGLE • 2024
          </text>
        </svg>
      </div>
    );
  }

  // 4. UPCITY SERRATED CIRCULAR SEAL (EY & Microsoft)
  if (badge.badgeStyle === 'seal-orange') {
    return (
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          {/* Serrated Sunburst Edge */}
          <g fill="url(#sealGrad)">
            {[...Array(24)].map((_, i) => (
              <polygon
                key={i}
                points="60,4 64,12 56,12"
                transform={`rotate(${i * 15} 60 60)`}
              />
            ))}
          </g>
          {/* Inner Dark Core */}
          <circle cx="60" cy="60" r="48" fill="#1c1917" stroke="#fb923c" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(251,146,60,0.4)" strokeWidth="1" strokeDasharray="3 2" />
          
          {/* Text Elements */}
          <text x="60" y="38" textAnchor="middle" fill="#fdba74" fontSize="6" fontWeight="700" letterSpacing="0.8">
            EY & MICROSOFT
          </text>
          <line x1="32" y1="43" x2="88" y2="43" stroke="#ea580c" strokeWidth="1.2" />
          
          <rect x="22" y="47" width="76" height="18" rx="2" fill="#ea580c" />
          <text x="60" y="59.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800" letterSpacing="0.4">
            AI PASSPORT
          </text>

          <text x="60" y="78" textAnchor="middle" fill="#fdba74" fontSize="6.5" fontWeight="700">
            RECOGNIZED
          </text>
          <text x="60" y="89" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
            2024
          </text>
        </svg>
      </div>
    );
  }

  // 5. TECHREVIEWER CREST / SHIELD (MongoDB University)
  if (badge.badgeStyle === 'crest-shield') {
    return (
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 flex flex-col items-center justify-center select-none">
        <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          {/* Shield Contour */}
          <path
            d="M10 10 L110 10 L110 80 Q110 125 60 138 Q10 125 10 80 Z"
            fill="#091813"
            stroke="url(#shieldBorder)"
            strokeWidth="3.5"
          />
          
          {/* Top Star */}
          <g fill="#34d399" transform="translate(54, 18) scale(0.6)">
            <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
          </g>

          <text x="60" y="38" textAnchor="middle" fill="#6ee7b7" fontSize="6" fontWeight="700" letterSpacing="0.8">
            MONGODB UNIV
          </text>

          <rect x="18" y="44" width="84" height="26" rx="2" fill="#065f46" stroke="#34d399" strokeWidth="0.8" />
          <text x="60" y="55" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
            CERTIFIED
          </text>
          <text x="60" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="700">
            DEVELOPER
          </text>

          {/* Chevrons */}
          <g stroke="#34d399" strokeWidth="2.5" fill="none">
            <path d="M30 82 L60 94 L90 82" />
            <path d="M30 92 L60 104 L90 92" />
            <path d="M30 102 L60 114 L90 102" />
          </g>

          <text x="60" y="126" textAnchor="middle" fill="#d1fae5" fontSize="7" fontWeight="700">
            2024
          </text>
        </svg>
      </div>
    );
  }

  // 6. GOLD CHOICE MEDAL OF EXCELLENCE (Google × Kaggle)
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center select-none">
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
        <defs>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
        </defs>
        {/* Outer Golden Ring */}
        <circle cx="60" cy="60" r="54" fill="#241b0b" stroke="url(#goldRing)" strokeWidth="4.5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 2" />

        {/* Top & Bottom Arcs */}
        <text x="60" y="24" textAnchor="middle" fill="#fde047" fontSize="6.5" fontWeight="800" letterSpacing="0.8">
          TOP CHOICE AWARD
        </text>

        {/* Big Golden Checkmark / Emblem */}
        <g stroke="#facc15" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M42 62 L54 74 L78 46" />
        </g>

        {/* Laurel Sprigs */}
        <g fill="#ca8a04">
          <circle cx="32" cy="60" r="2.5" />
          <circle cx="35" cy="70" r="2.5" />
          <circle cx="88" cy="60" r="2.5" />
          <circle cx="85" cy="70" r="2.5" />
        </g>

        <text x="60" y="90" textAnchor="middle" fill="#fef08a" fontSize="6" fontWeight="700" letterSpacing="0.5">
          AI AGENTS • 2025
        </text>
        <text x="60" y="101" textAnchor="middle" fill="#fde047" fontSize="6" fontWeight="800" letterSpacing="0.6">
          MARK OF EXCELLENCE
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENTS & BADGES SHOWCASE SECTION (MATCHING REFERENCE IMAGE 2)
───────────────────────────────────────────────────────────── */
export default function AchievementsSection() {
  const scrollDirection = useScrollDirection();
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem>(BADGES_LIST[0]);

  return (
    <section
      id="achievements"
      className="relative w-full py-36 sm:py-48 bg-black text-white overflow-hidden border-t border-white/5"
    >
      {/* ── Background Vignette & Ambient Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* ── Section Header (Exact Image 2 Typography & Hierarchy) ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: scrollDirection === 'down' ? 16 : -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Main Huge Section Title */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-sans tracking-tight font-extrabold text-white mb-3"
            style={{
              letterSpacing: '-0.03em',
            }}
          >
            Achievements
          </h2>

          {/* Editorial Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-medium tracking-tight mb-4">
            Hackathon Winner & Certified Full-Stack Engineer
          </p>

          {/* Editorial Paragraph */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/50 font-light leading-relaxed">
            Proven engineering milestones, hackathon podium victories, and accredited industry credentials earned through competitive real-world evaluation.
          </p>
        </motion.div>
      </div>

      {/* ── Badges Row / Showcase (Exact Horizontal Row Alignment like Image 2) ── */}
      <motion.div
        initial={{ opacity: 0, y: scrollDirection === 'down' ? 24 : -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6 sm:px-8 mb-12"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {BADGES_LIST.map((badge) => {
            const isSelected = selectedBadge.id === badge.id;

            return (
              <motion.button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                whileHover={{ y: -8, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1.0, 0.36, 1.0] }}
                className={`
                  relative group flex flex-col items-center cursor-pointer p-2 rounded-2xl transition-all duration-300
                  ${isSelected ? 'bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.12)] ring-1 ring-white/30' : 'hover:bg-white/[0.03]'}
                `}
                aria-label={`View ${badge.title}`}
              >
                {/* Active Indicator Glow */}
                {isSelected && (
                  <motion.div
                    layoutId="active-badge-indicator"
                    className="absolute -top-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
                  />
                )}

                {/* Badge Emblem Graphic */}
                <BadgeGraphic badge={badge} />

                {/* Micro Label Under Badge */}
                <span className="mt-2 text-[11px] font-semibold text-white/50 group-hover:text-white/90 transition-colors text-center max-w-[110px] truncate">
                  {badge.issuer}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Active Badge Details Drawer (Frosted Glass Panel) ── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBadge.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1.0, 0.36, 1.0] }}
            style={{
              background: 'linear-gradient(180deg, rgba(38, 38, 38, 0.48) 0%, rgba(14, 14, 14, 0.38) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.20), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 48px rgba(0, 0, 0, 0.85)',
            }}
            className="rounded-2xl p-6 sm:p-7 border border-white/[0.14] text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span className="text-[10.5px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/[0.08] text-white/90 border border-white/15">
                    {selectedBadge.category}
                  </span>
                  <span className="text-xs font-semibold text-white/40 font-mono">
                    {selectedBadge.year}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 font-medium mt-0.5">
                  Awarded by {selectedBadge.issuer}
                </p>
              </div>

              {/* Verified Icon */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium shrink-0">
                <CheckCircle2 size={14} />
                <span>Verified Credential</span>
              </div>
            </div>

            {/* Description / Proof */}
            <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed my-4">
              {selectedBadge.highlight}
            </p>

            {/* Solid Matte Tag Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-3 border-t border-white/[0.08]">
              {selectedBadge.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10.5px] px-2.5 py-0.5 rounded-[3px] font-medium border text-center ${getTagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
