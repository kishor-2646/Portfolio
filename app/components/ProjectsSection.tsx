"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { PROJECTS } from '../lib/data';
import { ease, dur } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────
   PROJECT METADATA
───────────────────────────────────────────────────────────── */
const PROJECT_META: Record<
  string,
  {
    category: string;
    cleanTitle: string;
    cleanDescription: string;
    role: string;
    badge: string;
  }
> = {
  'greenwave': {
    category: 'Emergency Traffic AI',
    cleanTitle: 'GreenWave — Smart Ambulance Traffic System',
    cleanDescription: 'Real-time GPS tracking and automated traffic signal automation system creating green corridors in high-traffic zones.',
    role: 'Role: Sole Developer',
    badge: 'Winner — BFB Hackathon',
  },
  'truck-singh': {
    category: 'Logistics Automation',
    cleanTitle: 'Truck Singh — Logistics Platform',
    cleanDescription: 'Full-stack logistics management platform serving 100+ active users across drivers, agents, and fleet owners.',
    role: 'Role: Team Lead',
    badge: 'UptoSkills Sprint',
  },
  'pcify': {
    category: 'Marketplace Engine',
    cleanTitle: 'PCify — AI-Based PC Builder Marketplace',
    cleanDescription: 'Two-sided marketplace connecting users with expert custom PC builders, powered by an AI recommendation engine.',
    role: 'Role: Full Stack Developer',
    badge: 'In Progress',
  },
  'retailer-sakthi': {
    category: 'Healthcare B2B',
    cleanTitle: 'Retailer Sakthi — B2B Medicine Platform',
    cleanDescription: 'Led a 12-member engineering team to deliver a digital medicine distribution and bulk ordering marketplace MVP in 15 days.',
    role: 'Role: Team Lead (12 Members)',
    badge: 'Hackathon MVP',
  },
};

/* ─────────────────────────────────────────────────────────────
   MINIMAL CLASSIC STACK CARD (MATCHING REFERENCE IMAGE)
───────────────────────────────────────────────────────────── */
interface StackCardProps {
  project: typeof PROJECTS[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  onClick: () => void;
}

function StackCard({
  project,
  index,
  total,
  progress,
  onClick,
}: StackCardProps) {
  const meta = PROJECT_META[project.slug] ?? {
    category: 'Production System',
    cleanTitle: project.title,
    cleanDescription: project.description,
    role: 'Role: Developer',
    badge: 'Completed',
  };

  const hasImage = Boolean(project.image);
  const isLast = index === total - 1;

  // Normalized scroll progression
  const step = 1 / total;
  const cardActiveStart = index * step;
  const startReceding = (index + 0.45) * step;
  const nextFullyActive = (index + 1.0) * step;
  const twoAheadActive = Math.min(1, (index + 1.75) * step);

  // 1. Scale down: stays 1.0 while being read, then scales smoothly to 0.95 as next card covers it
  const scale = useTransform(
    progress,
    [cardActiveStart, startReceding, nextFullyActive, Math.min(1, (index + 2) * step)],
    [1.0, 1.0, 0.95, 0.90]
  );

  // 2. Opacity: stays 1.0, dims to 0.75 when next card arrives, cleanly fades out when 2 cards ahead
  const opacity = useTransform(
    progress,
    [cardActiveStart, startReceding, nextFullyActive, twoAheadActive],
    [1.0, 1.0, 0.75, 0.0]
  );

  // 3. Subtle upward shift into background
  const yShift = useTransform(
    progress,
    [cardActiveStart, startReceding, nextFullyActive, Math.min(1, (index + 2) * step)],
    [0, 0, -10, -20]
  );

  // 4. Subtle brightness shift
  const brightness = useTransform(
    progress,
    [cardActiveStart, startReceding, nextFullyActive],
    [1.0, 1.0, 0.85]
  );

  return (
    <article
      className="stack-card relative w-full"
      style={{
        position: 'sticky',
        top: '76px',
        zIndex: 10 + index,
        marginBottom: isLast ? '0px' : 'clamp(460px, 62vh, 720px)',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .stack-card:nth-child(${index + 1}) {
            top: 70px !important;
            margin-bottom: ${isLast ? '0px' : '360px'} !important;
          }
        }
      `}</style>

      {/* Clean Borderless Project Panel — Exact #000000 matching page */}
      <motion.div
        style={{
          scale,
          opacity,
          y: yShift,
          transformOrigin: 'top center',
          filter: useTransform(brightness, b => `brightness(${b})`),
          background: '#000000',
          willChange: 'transform, opacity, filter',
        }}
        onClick={onClick}
        className="
          group relative cursor-pointer
          w-full rounded-[28px] sm:rounded-[36px] md:rounded-[42px]
          p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14
          overflow-hidden
          transition-all duration-300
        "
      >
        {/* 2-Column Split Grid: Left Details (5 cols) | Right Media (7 cols) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-end">
          
          {/* ── LEFT COLUMN: Minimal Classic Typography (Aligned to Bottom) ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-end space-y-4 pb-1 sm:pb-2">
            
            {/* 1. Category / Brand line */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-white/70 font-medium tracking-wide">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80" />
              <span>{meta.category}</span>
            </div>

            {/* 2. Main Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-[2.05rem] lg:text-[2.15rem] font-semibold text-white tracking-[-0.02em] leading-[1.18] group-hover:text-white transition-colors">
              {meta.cleanTitle}
            </h3>

            {/* 3. Concise 2-Line Description */}
            <p className="text-sm sm:text-[15px] text-white/65 font-normal leading-relaxed max-w-lg">
              {meta.cleanDescription}
            </p>

            {/* 4. Meta Row: Role & Pill Badge */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <span className="text-[13px] text-white/50 font-normal">
                {meta.role}
              </span>
              <span className="text-[11px] px-3 py-0.5 rounded-full bg-white/[0.08] text-white/85 border border-white/12 font-medium">
                {meta.badge}
              </span>
            </div>

            {/* 5. Clean Pill Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={onClick}
                className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-medium px-5 py-2 rounded-full transition-all text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 active:scale-95"
              >
                <span>View case study</span>
              </button>

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-medium px-5 py-2 rounded-full transition-all text-white/85 border border-white/20 hover:border-white/40 hover:text-white bg-transparent active:scale-95"
                  title="Try Live Demo"
                >
                  <span>Try Demo</span>
                  <ArrowUpRight size={14} />
                </a>
              ) : project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-medium px-5 py-2 rounded-full transition-all text-white/85 border border-white/20 hover:border-white/40 hover:text-white bg-transparent active:scale-95"
                  title="View Source Code"
                >
                  <Github size={14} />
                  <span>Code</span>
                </a>
              ) : null}
            </div>

          </div>

          {/* ── RIGHT COLUMN: Clean Media Preview (~25% Larger) ── */}
          <div className="lg:col-span-7 xl:col-span-7 w-full flex items-center justify-center">
            <div className="relative w-full aspect-[1.32] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black/60 min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]">
              {project.video || project.slug === 'greenwave' ? (
                <video
                  src={project.video || "/perfect_but_also_show_that_o.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
              ) : hasImage ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <span className="text-white/30 text-sm font-semibold uppercase tracking-wider">
                    Preview Coming Soon
                  </span>
                </div>
              )}
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </motion.div>
    </article>
  );
}

import { useScrollDirection } from '../lib/useScrollDirection';

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS SECTION
───────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirection = useScrollDirection();

  // Measure scroll progress through the entire project stacking section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Simultaneous smooth exit transition: when the last card completes scrolling,
  // all cards on screen fade out together seamlessly into the next section
  const stackExitOpacity = useTransform(scrollYProgress, [0.86, 0.96], [1, 0]);
  const stackExitScale = useTransform(scrollYProgress, [0.86, 0.96], [1, 0.97]);
  const stackExitY = useTransform(scrollYProgress, [0.86, 0.96], [0, -18]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full text-white pt-24 sm:pt-32 pb-20 overflow-visible"
      style={{ background: '#000000' }}
    >
      {/* Section Heading Container with Masked Title Reveal */}
      <div className="w-[96%] max-w-[1680px] mx-auto px-3 sm:px-6 md:px-8 mb-12 sm:mb-16">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: scrollDirection === 'down' ? 10 : -10 }}
            whileInView={{ opacity: 1, scale: 1.0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: ease.out }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-bold tracking-[0.2em] uppercase"
          >
            <Sparkles size={13} className="text-white/70" />
            Featured Work
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: scrollDirection === 'down' ? "100%" : "-100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.08, ease: ease.cinematic }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight"
            >
              Selected Projects
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: scrollDirection === 'down' ? 16 : -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: ease.out }}
            className="max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-light"
          >
            Production-grade systems, real-time architectures, and hackathon-winning solutions built under real-world constraints.
          </motion.p>
        </div>
      </div>

      {/* Stacking Cards List — Simultaneous Smooth Fade-Out Exit */}
      <motion.div
        style={{
          opacity: stackExitOpacity,
          scale: stackExitScale,
          y: stackExitY,
          transformOrigin: 'center top',
          willChange: 'opacity, transform',
        }}
        className="w-[96%] max-w-[1680px] mx-auto px-3 sm:px-6 md:px-8 relative overflow-visible"
      >
        {PROJECTS.map((project, index) => (
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
            onClick={() => router.push(`/project/${project.slug}`)}
          />
        ))}

        {/* Bottom Runway Spacer */}
        <div
          className="w-full pointer-events-none"
          style={{ height: 'clamp(340px, 50vh, 580px)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── FUN AND LEARNING PROJECTS (Matching Reference Image) ── */}
      <div className="w-[96%] max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
        {/* Section Header with Masked Title Reveal */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: scrollDirection === 'down' ? "100%" : "-100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, ease: ease.cinematic }}
              className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight"
            >
              Fun and Learning Projects
            </motion.h3>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: scrollDirection === 'down' ? 12 : -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
            className="text-sm sm:text-base text-white/50 mt-2.5 font-light"
          >
            Projects created out of curiosity
          </motion.p>
        </div>

        {/* 2-Card Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Cargo Flow */}
          <motion.div
            initial={{ opacity: 0, y: scrollDirection === 'down' ? 24 : -24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: ease.out }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-[22px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
                <img
                  src="/projects/greenwave.png"
                  alt="Cargo Flow"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-white mt-5 tracking-tight group-hover:text-white transition-colors">
                Cargo Flow
              </h4>
              <p className="text-sm sm:text-[15px] text-white/60 mt-1.5 leading-relaxed">
                An AI driven Cargo web app to manage shipments and communication
              </p>
            </div>
            <div className="mt-4">
              <button className="inline-flex items-center text-xs sm:text-sm font-medium px-5 py-2 rounded-full border border-white/20 text-white/80 bg-white/5 hover:border-white/40 hover:text-white transition-all active:scale-95">
                View case study
              </button>
            </div>
          </motion.div>

          {/* Card 2: PCify Learning */}
          <motion.div
            initial={{ opacity: 0, y: scrollDirection === 'down' ? 24 : -24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.22, ease: ease.out }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-[22px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
                <img
                  src="/projects/pcify.png"
                  alt="PCify Architecture"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-white mt-5 tracking-tight group-hover:text-white transition-colors">
                PCify Architecture Lab
              </h4>
              <p className="text-sm sm:text-[15px] text-white/60 mt-1.5 leading-relaxed">
                Experimental AI component compatibility engine and automated benchmark evaluator
              </p>
            </div>
            <div className="mt-4">
              <button className="inline-flex items-center text-xs sm:text-sm font-medium px-5 py-2 rounded-full border border-white/20 text-white/80 bg-white/5 hover:border-white/40 hover:text-white transition-all active:scale-95">
                View case study
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}