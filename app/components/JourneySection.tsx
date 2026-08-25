"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { MapPin, ImageIcon } from 'lucide-react';
import { useScrollDirection } from '../lib/useScrollDirection';
import SpecularRimBeam from './SpecularRimBeam';

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE MILESTONES DATA (REFRACTIVE GLASS + MATTE SOLID TAGS)
───────────────────────────────────────────────────────────── */
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  isCurrent?: boolean;
  rotation: string;
  logo?: string; // Image path for company logo (e.g. /experience/uptoskills.png)
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
    highlights: [
      { bold: 'Led final sprint as Team Lead', text: ' delivering production updates for Truck Singh platform.' },
      { bold: 'Engineered real-time chat', text: ', Google Maps live fleet tracking, and automated OneSignal alerts.' },
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
    highlights: [
      { bold: 'Managed a 12-member engineering team', text: ' to deploy a B2B medicine marketplace MVP in 15 days.' },
      { bold: 'Architected role-based auth', text: ' and bulk inventory ordering workflow with Firebase.' },
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
    highlights: [
      { bold: 'Won Best Innovative Idea', text: ' at BFB 24-Hr Hackathon for automated emergency corridors.' },
      { bold: 'Built sub-second GPS ambulance tracking', text: ' with Firebase Realtime Database & Maps API.' },
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
    highlights: [
      { bold: 'Designed two-sided marketplace', text: ' connecting PC enthusiasts with verified expert builders.' },
      { bold: 'Integrated AI recommendation engine', text: ' for personalized hardware configurations.' },
      { bold: 'Built booking calendar', text: ', Supabase Realtime chat, and escrow transaction pipeline.' },
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
    highlights: [
      { bold: 'Secured 1st place', text: ' at Sairam SDG Ideathon 3.0 for mobile solution aligned with UN Goal 1.' },
      { bold: 'Presented scalable deployment architecture', text: ' to industry judging panel.' },
      { bold: 'Recognized for technical excellence', text: ' and real-world social impact.' },
    ],
    skills: ['SDG Goal 1', 'Social Impact', 'Dart', 'Firebase', '1st Prize'],
  },
];

/* ─────────────────────────────────────────────────────────────
   TAG COLOR STYLING (SIMPLE SOLID / MATTE TONES - NOT OVERLY BRIGHT)
───────────────────────────────────────────────────────────── */
function getTagStyle(tag: string): string {
  const t = tag.toLowerCase().trim();

  if (t.includes('flutter')) {
    return 'bg-[#152a3a] text-[#8ec8f6] border-[#22445e]';
  }
  if (t.includes('firebase')) {
    return 'bg-[#302315] text-[#f2ad55] border-[#4c3620]';
  }
  if (t.includes('supabase')) {
    return 'bg-[#152e22] text-[#63e2a2] border-[#214936]';
  }
  if (t.includes('maps')) {
    return 'bg-[#172d24] text-[#6bd4a5] border-[#254b3c]';
  }
  if (t.includes('onesignal')) {
    return 'bg-[#331b1b] text-[#f67c7c] border-[#4f2828]';
  }
  if (t.includes('lead')) {
    return 'bg-[#251f38] text-[#bca5f8] border-[#3e325c]';
  }
  if (t.includes('architecture')) {
    return 'bg-[#1c2438] text-[#93abde] border-[#2e3b5a]';
  }
  if (t.includes('b2b') || t.includes('marketplace')) {
    return 'bg-[#2e2417] text-[#deb478] border-[#483925]';
  }
  if (t.includes('fcm')) {
    return 'bg-[#2d1b28] text-[#df8cb8] border-[#492b41]';
  }
  if (t.includes('real-time') || t.includes('full stack')) {
    return 'bg-[#162a33] text-[#71c3d9] border-[#254352]';
  }
  if (t.includes('ai') || t.includes('ml')) {
    return 'bg-[#291b36] text-[#c086fc] border-[#422b57]';
  }
  if (t.includes('dart')) {
    return 'bg-[#152838] text-[#62aaff] border-[#22415c]';
  }
  if (t.includes('sdg') || t.includes('social')) {
    return 'bg-[#321c1f] text-[#fca5a5] border-[#502c32]';
  }
  if (t.includes('prize') || t.includes('award')) {
    return 'bg-[#342713] text-[#f5ca38] border-[#523d1d]';
  }

  const fallbackPalette = [
    'bg-[#192433] text-[#86aed6] border-[#2a3c54]',
    'bg-[#2c2017] text-[#d4a877] border-[#463324]',
    'bg-[#172c23] text-[#6fc99f] border-[#254638]',
    'bg-[#281c30] text-[#ba8ce3] border-[#3f2c4c]',
    'bg-[#2e1d20] text-[#e38d94] border-[#492e33]',
  ];

  let hash = 0;
  for (let i = 0; i < t.length; i++) {
    hash = (hash << 5) - hash + t.charCodeAt(i);
  }
  return fallbackPalette[Math.abs(hash) % fallbackPalette.length];
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED JOURNEY TITLE (HERO CHARACTER-BY-CHARACTER STAGGER)
───────────────────────────────────────────────────────────── */
function AnimatedJourneyTitle({ inView, isMobile = false }: { inView: boolean; isMobile?: boolean }) {
  const prefersReduced = useReducedMotion();
  const titleText = "The Journey so far";
  const words = titleText.split(" ");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (inView) {
      setAnimKey(prev => prev + 1);
    }
  }, [inView]);

  if (prefersReduced) {
    return (
      <h2
        className={
          isMobile
            ? "font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-tight leading-tight"
            : "font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] my-0.5"
        }
        style={{
          fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
        }}
      >
        {titleText}
      </h2>
    );
  }

  return (
    <div className="overflow-visible select-none">
      <h2
        key={animKey}
        className={
          isMobile
            ? "font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-tight leading-tight"
            : "font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] my-0.5"
        }
        style={{
          fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
        }}
      >
        {words.map((word, wordIdx) => {
          const prevCharsCount = words
            .slice(0, wordIdx)
            .reduce((acc, w) => acc + w.length + 1, 0);

          return (
            <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, charIdx) => {
                const globalIdx = prevCharsCount + charIdx;
                return (
                  <span
                    key={charIdx}
                    className="char"
                    style={{
                      animation: "enterChar 0.65s cubic-bezier(0.16, 1.0, 0.3, 1.0) forwards",
                      animationDelay: `${0.1 + globalIdx * 0.055}s`,
                      fontStyle: "italic",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIdx < words.length - 1 && (
                <span
                  className="char"
                  style={{
                    animation: "enterChar 0.65s cubic-bezier(0.16, 1.0, 0.3, 1.0) forwards",
                    animationDelay: `${0.1 + (prevCharsCount + word.length) * 0.055}s`,
                  }}
                >
                  {"\u00A0"}
                </span>
              )}
            </span>
          );
        })}
      </h2>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLASS EXPERIENCE CARD (COMPACT SLEEK PROPORTIONS - ZERO CLIPPING)
───────────────────────────────────────────────────────────── */
function GlassExperienceCard({
  exp,
  isAbove,
  cardDelay,
  isInView,
  prefersReduced,
}: {
  exp: ExperienceItem;
  isAbove: boolean;
  cardDelay: number;
  isInView: boolean;
  prefersReduced: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rotationDeg = parseFloat(exp.rotation);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={
        prefersReduced
          ? { opacity: 1, y: 0, scale: 1, rotate: rotationDeg }
          : { opacity: 0, y: isAbove ? 18 : -18, scale: 0.94, rotate: 0 }
      }
      animate={
        isInView || prefersReduced
          ? {
              opacity: 1,
              y: 0,
              scale: isHovered ? 1.02 : 1,
              rotate: isHovered ? 0 : rotationDeg,
            }
          : {
              opacity: 0,
              y: isAbove ? 18 : -18,
              scale: 0.94,
              rotate: 0,
            }
      }
      transition={
        isHovered
          ? { duration: 0.25, ease: [0.22, 1.0, 0.36, 1.0] }
          : {
              rotate: { duration: 0.3, ease: [0.22, 1.0, 0.36, 1.0] },
              scale: { duration: 0.3, ease: [0.22, 1.0, 0.36, 1.0] },
              opacity: { duration: 0.75, delay: prefersReduced ? 0 : cardDelay + 0.08, ease: [0.16, 1.0, 0.3, 1] },
              y: { duration: 0.75, delay: prefersReduced ? 0 : cardDelay + 0.08, ease: [0.16, 1.0, 0.3, 1] },
            }
      }
      style={{
        transformOrigin: isAbove ? 'bottom center' : 'top center',
        background: 'linear-gradient(180deg, rgba(38, 38, 38, 0.48) 0%, rgba(14, 14, 14, 0.38) 100%)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        boxShadow: isHovered
          ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.32), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 24px 50px rgba(0, 0, 0, 0.95)'
          : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.20), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 45px rgba(0, 0, 0, 0.85)',
      }}
      className={`
        group/card w-full rounded-[4px] overflow-hidden
        border transition-colors duration-300 cursor-default
        ${isHovered ? 'border-white/35' : 'border-white/[0.14]'}
      `}
    >
      {/* Card Top Header Bar */}
      <div className="flex items-center justify-between gap-2.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Sharp Logo Box / Image Placeholder */}
          <div
            className={`
              w-8 h-8 rounded-[4px] border flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 overflow-hidden
              ${isHovered ? 'border-white/30 bg-white/[0.09]' : 'border-white/15 bg-white/[0.05]'}
            `}
          >
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-contain p-1"
              />
            ) : (
              <div className={`flex flex-col items-center justify-center transition-colors ${isHovered ? 'text-white/70' : 'text-white/35'}`}>
                <ImageIcon size={15} strokeWidth={1.5} />
              </div>
            )}
          </div>

          {/* Title & Company */}
          <div className="min-w-0">
            <h3 className="text-[13px] sm:text-[13.5px] font-bold text-white leading-tight truncate">
              {exp.role}
            </h3>
            <p className="text-[11px] text-white/50 font-medium mt-0.5 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Location Pin */}
        <div className="flex items-center gap-1 text-[10.5px] text-white/45 shrink-0 pl-1">
          <MapPin size={10.5} className="text-white/40" />
          <span>{exp.location}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-3.5 bg-black/20">
        <ul className="space-y-1.5 mb-2.5">
          {exp.highlights.map((h, bIdx) => (
            <li
              key={bIdx}
              className="text-[11.5px] text-white/75 leading-snug list-disc list-inside marker:text-white/40"
            >
              <strong className="text-white/95 font-semibold">{h.bold}</strong>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>

        {/* Solid Matte Distinct Color Skill Tags (Mid / Center Aligned) */}
        <div className="flex flex-wrap items-center justify-center gap-1 pt-2 border-t border-white/[0.08]">
          {exp.skills.map(s => (
            <span
              key={s}
              className={`text-[9.5px] px-2 py-0.5 rounded-[3px] font-medium border text-center ${getTagStyle(s)}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PINNED HORIZONTAL TIMELINE EXPERIENCE SECTION
   - Natural card flow above and below central timeline
   - Dynamic track width measurement: all 5 cards scroll to dead center
   - Precision geometry: zero cropping on all screen resolutions
   - Glassmorphic cards matching the floating navbar
   - Cards smoothly straighten on hover and return instantly when mouse leaves
   - Distinct solid matte color tags centered neatly at the bottom
   - Sequential cinematic entrance
───────────────────────────────────────────────────────────── */
export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollDirection = useScrollDirection();
  const prefersReduced = useReducedMotion();

  // Robust in-view detection across the entire journey section
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.02,
  });

  // Measure vertical scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Compute exact horizontal scrollable distance to guarantee all cards scroll through center
  useEffect(() => {
    const updateMaxScroll = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxScroll(Math.max(0, trackWidth - viewportWidth));
      }
    };

    updateMaxScroll();
    const timer1 = setTimeout(updateMaxScroll, 100);
    const timer2 = setTimeout(updateMaxScroll, 500);
    window.addEventListener('resize', updateMaxScroll);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateMaxScroll);
    };
  }, []);

  // Translate horizontal track smoothly from start (0px) to exact end (-maxScroll)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // Base delay: cards only start emerging after "The Journey so far" completes
  const CARDS_START_DELAY = 1.48;

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full text-white bg-black overflow-visible"
      style={{
        height: '480vh',
      }}
    >
      {/* ── DESKTOP & TABLET: Pinned Sticky Viewport ── */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Viewport Content Wrapper */}
        <div className="relative w-full h-full flex flex-col justify-between pt-6 pb-4 px-6 lg:px-12 select-none">
          
          {/* Compact Section Header */}
          <div className="max-w-3xl mx-auto text-center z-20 shrink-0">
            <motion.p
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 10 : -10 }}
              animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 10 : -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-white uppercase mb-1"
            >
              EXPERIENCE
            </motion.p>

            <AnimatedJourneyTitle inView={isInView} />

            <motion.p
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 12 : -12 }}
              animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === 'down' ? 12 : -12 }}
              transition={{ duration: 0.7, delay: prefersReduced ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs text-white/50 font-light mt-1 max-w-lg mx-auto leading-relaxed"
            >
              From hackathon wins to production logistics systems — engineering roles and milestones across my journey.
            </motion.p>
          </div>

          {/* Horizontal Timeline Track Canvas with Vignette Edge Fades */}
          <div className="relative w-full flex-1 flex items-center my-auto overflow-hidden">
            
            {/* Left Vignette Fade Overlay */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-56 bg-gradient-to-r from-black via-black/85 to-transparent z-30" />
            
            {/* Right Vignette Fade Overlay */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-56 bg-gradient-to-l from-black via-black/85 to-transparent z-30" />

            {/* Central Horizontal Timeline Line */}
            <motion.div
              initial={prefersReduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              animate={isInView || prefersReduced ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1.0, delay: prefersReduced ? 0 : 1.35, ease: [0.16, 1.0, 0.3, 1] }}
              style={{ width: '400vw', transformOrigin: 'left center' }}
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/15 pointer-events-none z-0"
            />

            {/* Moving Track */}
            <motion.div
              ref={trackRef}
              style={{ x, willChange: 'transform' }}
              className="flex items-center gap-12 lg:gap-16 pl-[calc(50vw-160px)] sm:pl-[calc(50vw-180px)] md:pl-[calc(50vw-190px)] pr-[calc(50vw-160px)] sm:pr-[calc(50vw-180px)] md:pr-[calc(50vw-190px)] relative z-10 h-full w-max"
            >
              {EXPERIENCES.map((exp, index) => {
                const isAbove = index % 2 === 0;
                const cardDelay = CARDS_START_DELAY + index * 0.15;

                return (
                  <div
                    key={exp.id}
                    className="group/item relative shrink-0 flex flex-col items-center justify-center h-full"
                    style={{ width: 'clamp(320px, 24vw, 380px)' }}
                  >
                    {/* Central Timeline Node — Anchored at exact vertical center (50%) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                      <motion.div
                        initial={prefersReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        animate={isInView || prefersReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: prefersReduced ? 0 : cardDelay,
                          ease: [0.34, 1.3, 0.64, 1],
                        }}
                        className="relative flex items-center justify-center"
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full border-2 border-black bg-zinc-500 group-hover/item:bg-white group-hover/item:shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover/item:scale-125 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    {/* ── CARD ABOVE TIMELINE (Anchored above 50%) ── */}
                    {isAbove && (
                      <>
                        {/* Top Card + Connector Stem */}
                        <div className="absolute bottom-[calc(50%+7px)] left-0 right-0 flex flex-col items-center z-10">
                          <GlassExperienceCard
                            exp={exp}
                            isAbove={true}
                            cardDelay={cardDelay}
                            isInView={isInView}
                            prefersReduced={prefersReduced}
                          />

                          {/* Vertical Connector Line */}
                          <motion.div
                            initial={prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            animate={isInView || prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            transition={{
                              duration: 0.55,
                              delay: prefersReduced ? 0 : cardDelay + 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                              transformOrigin: 'bottom center',
                            }}
                            className="w-[2px] h-5 lg:h-6 bg-white/20 group-hover/item:bg-white/40 transition-colors duration-300"
                          />
                        </div>

                        {/* Date Pill Badge (Positioned below dot) */}
                        <motion.div
                          initial={prefersReduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -6 }}
                          animate={isInView || prefersReduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -6 }}
                          transition={{
                            duration: 0.6,
                            delay: prefersReduced ? 0 : cardDelay + 0.08,
                            ease: [0.16, 1.0, 0.3, 1],
                          }}
                          className="absolute top-[calc(50%+14px)] left-1/2 -translate-x-1/2 z-10 whitespace-nowrap"
                        >
                          <div
                            className="
                              relative inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium tracking-wide
                              border border-white/10 bg-white/[0.03] text-zinc-400
                              group-hover/item:border-white/30 group-hover/item:bg-white/[0.08] group-hover/item:text-white group-hover/item:shadow-[0_0_18px_rgba(255,255,255,0.22)]
                              transition-all duration-300 select-none overflow-hidden
                            "
                          >
                            {/* Specular Rim Light Beam on Hover */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <SpecularRimBeam radius={14} duration={3.8} beamLength={48} borderWidth={1.2} />
                            </div>

                            {exp.isCurrent && (
                              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.6)] group-hover/item:bg-white group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all" />
                            )}
                            <span className="relative z-10">{exp.date}</span>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {/* ── CARD BELOW TIMELINE (Anchored below 50%) ── */}
                    {!isAbove && (
                      <>
                        {/* Date Pill Badge (Positioned above dot) */}
                        <motion.div
                          initial={prefersReduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 6 }}
                          animate={isInView || prefersReduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 6 }}
                          transition={{
                            duration: 0.6,
                            delay: prefersReduced ? 0 : cardDelay + 0.08,
                            ease: [0.16, 1.0, 0.3, 1],
                          }}
                          className="absolute bottom-[calc(50%+14px)] left-1/2 -translate-x-1/2 z-10 whitespace-nowrap"
                        >
                          <div
                            className="
                              relative inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium tracking-wide
                              border border-white/10 bg-white/[0.03] text-zinc-400
                              group-hover/item:border-white/30 group-hover/item:bg-white/[0.08] group-hover/item:text-white group-hover/item:shadow-[0_0_18px_rgba(255,255,255,0.22)]
                              transition-all duration-300 select-none overflow-hidden
                            "
                          >
                            {/* Specular Rim Light Beam on Hover */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <SpecularRimBeam radius={14} duration={3.8} beamLength={48} borderWidth={1.2} />
                            </div>

                            {exp.isCurrent && (
                              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.6)] group-hover/item:bg-white group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all" />
                            )}
                            <span className="relative z-10">{exp.date}</span>
                          </div>
                        </motion.div>

                        {/* Bottom Connector Stem + Card */}
                        <div className="absolute top-[calc(50%+7px)] left-0 right-0 flex flex-col items-center z-10">
                          {/* Vertical Connector Line */}
                          <motion.div
                            initial={prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            animate={isInView || prefersReduced ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                            transition={{
                              duration: 0.55,
                              delay: prefersReduced ? 0 : cardDelay + 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                              transformOrigin: 'top center',
                            }}
                            className="w-[2px] h-5 lg:h-6 bg-white/20 group-hover/item:bg-white/40 transition-colors duration-300"
                          />

                          <GlassExperienceCard
                            exp={exp}
                            isAbove={false}
                            cardDelay={cardDelay}
                            isInView={isInView}
                            prefersReduced={prefersReduced}
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* Bottom subtle indicator */}
          <div className="text-center text-[11px] text-white/30 font-light z-20 shrink-0">
            <span>Scroll vertically to explore the timeline →</span>
          </div>

        </div>
      </div>

      {/* ── MOBILE FALLBACK: Clean Vertical Timeline ── */}
      <div className="block md:hidden px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-white uppercase mb-2">
            EXPERIENCE
          </p>
          <AnimatedJourneyTitle inView={isInView} isMobile={true} />
          <p className="text-sm text-white/50 mt-2">
            Engineering roles, hackathons, and systems built across my journey.
          </p>
        </div>

        {/* Vertical Timeline Stack */}
        <div className="relative border-l-2 border-white/15 ml-4 space-y-10 pl-6">
          {EXPERIENCES.map((exp, expIdx) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: scrollDirection === 'down' ? 20 : -20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, delay: 1.45 + expIdx * 0.12, ease: [0.16, 1.0, 0.3, 1] }}
                className="group/mobile-item relative"
              >
                {/* Node */}
                <div
                  className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-black bg-zinc-600 shadow-[0_0_4px_rgba(255,255,255,0.2)] group-hover/mobile-item:bg-white group-hover/mobile-item:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"
                />

                {/* Date Badge with SpecularRimBeam */}
                <div className="mb-3">
                  <div
                    className="
                      relative inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium
                      border border-white/10 bg-white/[0.03] text-zinc-400
                      group-hover/mobile-item:border-white/35 group-hover/mobile-item:bg-white/[0.08] group-hover/mobile-item:text-white group-hover/mobile-item:shadow-[0_0_14px_rgba(255,255,255,0.2)]
                      transition-all duration-300 overflow-hidden
                    "
                  >
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover/mobile-item:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <SpecularRimBeam radius={14} duration={3.8} beamLength={48} borderWidth={1.2} />
                    </div>

                    {exp.isCurrent && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                    )}
                    <span className="relative z-10">{exp.date}</span>
                  </div>
                </div>

                {/* Card with Glassmorphic Finish */}
                <div
                  style={{
                    background: 'linear-gradient(180deg, rgba(38, 38, 38, 0.48) 0%, rgba(14, 14, 14, 0.38) 100%)',
                    backdropFilter: 'blur(28px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.20), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 20px 48px rgba(0, 0, 0, 0.85)',
                  }}
                  className="rounded-[4px] overflow-hidden border border-white/[0.14] shadow-xl hover:border-white/30 transition-all"
                >
                  <div className="flex items-center justify-between p-4 bg-white/[0.04] border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      {/* Logo placeholder */}
                      <div className="w-8 h-8 rounded-[4px] border border-white/15 bg-white/[0.05] flex items-center justify-center shrink-0 text-white/35 overflow-hidden">
                        {exp.logo ? (
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1" />
                        ) : (
                          <ImageIcon size={15} strokeWidth={1.5} />
                        )}
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

                  <div className="p-4 bg-black/20">
                    <ul className="space-y-2 mb-3.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-white/75 leading-relaxed list-disc list-inside marker:text-white/40">
                          <strong className="text-white/95 font-semibold">{h.bold}</strong>
                          <span>{h.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Solid Distinct Color Skill Tags (Mid / Center Aligned) */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-white/[0.08]">
                      {exp.skills.map(s => (
                        <span
                          key={s}
                          className={`text-[10.5px] px-2.5 py-0.5 rounded-[3px] font-medium border text-center ${getTagStyle(s)}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
