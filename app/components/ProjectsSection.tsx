"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Trophy, Sparkles } from 'lucide-react';
import { PROJECTS } from '../lib/data';

/* ─────────────────────────────────────────────────────────────
   CATEGORY LABELS
───────────────────────────────────────────────────────────── */
const CATEGORY_MAP: Record<string, string> = {
  'greenwave':       'Smart Traffic & Emergency Response',
  'truck-singh':     'Logistics & Fleet Automation',
  'pcify':           'AI Marketplace & Configurator',
  'retailer-sakthi': 'B2B Medicine Distribution',
};

/* ─────────────────────────────────────────────────────────────
   CLEAN MINIMAL STICKY STACK CARD
   Matching reference image:
   - NO card border
   - NO glowing ambient light inside card
   - Clean media showcase on top
   - Editorial headline, description, tags & pill CTA buttons below
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
  const category = CATEGORY_MAP[project.slug] ?? 'Production System';
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
        top: '64px',
        zIndex: 10 + index,
        marginBottom: isLast ? '0px' : 'clamp(460px, 62vh, 720px)',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .stack-card:nth-child(${index + 1}) {
            top: 56px !important;
            margin-bottom: ${isLast ? '0px' : '360px'} !important;
          }
        }
      `}</style>

      {/* Clean Borderless Project Panel Container */}
      <motion.div
        style={{
          scale,
          opacity,
          y: yShift,
          transformOrigin: 'top center',
          filter: useTransform(brightness, b => `brightness(${b})`),
          background: '#000000',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)',
          willChange: 'transform, opacity, filter',
        }}
        onClick={onClick}
        className="
          group relative cursor-pointer
          w-full rounded-[28px] sm:rounded-[36px]
          p-4 sm:p-6 md:p-8 lg:p-10
          overflow-hidden
          transition-all duration-300
        "
      >
        {/* ── TOP SECTION: Large Clean Media Showcase Frame ── */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:aspect-[16/8] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl mb-6 sm:mb-8">
          {hasImage ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5">
              <span className="text-white/30 text-sm font-semibold uppercase tracking-wider">
                Preview Coming Soon
              </span>
            </div>
          )}

          {/* Featured pill badge */}
          {project.isFeatured && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 bg-black/75 border border-white/20 rounded-full backdrop-blur-md">
              <Trophy size={12} className="text-amber-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* ── BOTTOM SECTION: Clean Minimal Editorial Typography & Actions ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2 sm:px-3">
          
          {/* Left Block: Category, Title, Subtitle, Tags */}
          <div className="max-w-3xl space-y-3">
            {/* Category / Brand indicator */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-white/80" />
              <span>{category}</span>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.15] group-hover:text-white transition-colors">
              {project.title}
            </h3>

            {/* Short Impact Description */}
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase font-medium tracking-wide bg-white/[0.08] border border-white/12 text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Block: Clean Pill Action Buttons (Matching Reference) */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all text-white/80 border border-white/25 hover:border-white/50 hover:text-white bg-white/5 backdrop-blur-sm"
                title="View Source Code"
              >
                <Github size={15} /> Code
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all text-white/80 border border-white/25 hover:border-white/50 hover:text-white bg-white/5 backdrop-blur-sm"
                title="View Live Demo"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}

            <button
              onClick={onClick}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all text-black bg-white hover:bg-white/90 shadow-md"
            >
              <span>View Case Study</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

        </div>
      </motion.div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS SECTION
───────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Measure scroll progress through the entire project stacking section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full text-white pt-24 sm:pt-32 pb-20 overflow-visible"
      style={{ background: '#000000' }}
    >
      {/* Section Heading Container */}
      <div className="w-[96%] max-w-[1560px] mx-auto px-3 sm:px-6 md:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles size={13} className="text-white/70" />
            Featured Work
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
            Selected Projects
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-light">
            Production-grade systems, real-time architectures, and hackathon-winning solutions built under real-world constraints.
          </p>
        </motion.div>
      </div>

      {/* Stacking Cards List — Clean & Borderless */}
      <div className="w-[96%] max-w-[1560px] mx-auto px-3 sm:px-6 md:px-8 relative overflow-visible">
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
          style={{ height: 'clamp(320px, 48vh, 560px)' }}
          aria-hidden="true"
        />
      </div>

      {/* View All CTA on GitHub */}
      <div className="w-[96%] max-w-[1560px] mx-auto px-3 sm:px-6 md:px-8 pt-6 pb-16 text-center">
        <motion.a
          href="https://github.com/kishor-2646"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold text-sm bg-white/[0.04] transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/[0.08]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          View all repositories on GitHub <ExternalLink size={15} />
        </motion.a>
      </div>
    </section>
  );
}