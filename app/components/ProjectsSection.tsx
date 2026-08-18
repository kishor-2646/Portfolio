"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Trophy, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../lib/data';
import { scrollReveal, ease, dur } from '../lib/motion';

const CATEGORY_MAP: Record<string, string> = {
  'greenwave':       'Mobile Application',
  'truck-singh':     'Logistics Platform',
  'pcify':           'AI Marketplace',
  'retailer-sakthi': 'B2B Platform',
};

/* ─────────────────────────────────────────────────────────
   ProjectCard — single card with hover reveal interactions.
   When ANY card is hovered, OTHER cards dim slightly.
───────────────────────────────────────────────────────── */
interface CardProps {
  p: typeof PROJECTS[0];
  i: number;
  isActive: boolean;       // this card is hovered
  isDefocused: boolean;    // another card is hovered
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard = ({ p, i, isActive, isDefocused, onHover, onLeave }: CardProps) => {
  const category = CATEGORY_MAP[p.slug] ?? 'Project';
  const hasImage = Boolean(p.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: dur.reveal, delay: i * 0.08, ease: ease.out }}
      animate={{
        opacity: isDefocused ? 0.62 : 1,
        scale:   isDefocused ? 0.985 : 1,
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${isActive ? 'rgba(255,126,51,0.45)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isActive
          ? '0 20px 48px rgba(255,126,51,0.14), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        transition: `border-color ${dur.normal}s, box-shadow ${dur.normal}s`,
        willChange: 'opacity, transform',
      }}
    >
      {/* Image with subtle parallax on hover */}
      <div className="w-full overflow-hidden" style={{ height: hasImage ? 280 : 160 }}>
        {hasImage ? (
          <motion.img
            src={p.image} alt={p.title}
            className="w-full h-full object-cover"
            animate={{ scale: isActive ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: ease.inOut }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <span className="text-white/30 text-sm font-bold uppercase tracking-wider">Screenshot coming soon</span>
          </div>
        )}
      </div>

      {/* Gradient overlay on image */}
      {hasImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      )}

      {/* Featured badge */}
      {p.isFeatured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 border border-[#FF7E33]/40 rounded-full backdrop-blur-md">
          <Trophy size={10} className="text-[#FF7E33]" />
          <span className="text-[10px] font-black text-[#FF7E33] uppercase tracking-widest">Featured</span>
        </div>
      )}

      {/* Card body */}
      <div className={hasImage ? 'absolute bottom-0 left-0 right-0 p-5' : 'p-6'}>
        <div className={hasImage ? 'bg-black/45 backdrop-blur-xl border border-white/12 rounded-2xl p-5' : ''}>
          {/* Category */}
          <span className="text-[10px] font-black uppercase tracking-[0.15em] block mb-1.5 text-[#FF7E33]">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-black leading-snug text-white">
            {p.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mt-2 line-clamp-2 text-white/60">
            {p.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {p.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[9px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider bg-white/5 border border-white/10 text-white/60">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA links — slide up on hover */}
          <AnimatePresence>
            {(isActive || !hasImage) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: dur.fast, ease: ease.out }}
                className="flex gap-2 mt-4"
              >
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors text-white/70 border border-white/15 hover:text-white hover:border-white/35 bg-white/5">
                    <Github size={12} /> Code
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-colors text-white/70 border border-white/15 hover:text-white hover:border-white/35 bg-white/5">
                    <ExternalLink size={12} /> Live Demo
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const router      = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const featured    = PROJECTS.filter(p => p.isFeatured);
  const remaining   = PROJECTS.filter(p => !p.isFeatured);

  const handleGridClick = (e: React.MouseEvent) => {
    const card = (e.target as HTMLElement).closest('[data-slug]');
    if (card) router.push(`/project/${card.getAttribute('data-slug')}`);
  };

  return (
    <section 
      id="projects" 
      className="relative py-24 md:py-28 px-6 md:px-10 lg:px-20 text-white overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* Header */}
        <motion.div {...scrollReveal(0)} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF7E33]/50" />
              <span className="text-xs font-black text-[#FF7E33] uppercase tracking-[0.35em]">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Projects</h2>
            <div className="h-1 w-16 rounded-full bg-[#FF7E33]" />
          </div>
          <p className="text-white/50 text-sm max-w-sm">
            Real systems built under real constraints — hackathons, internships, and independent work.
          </p>
        </motion.div>

        {/* Featured grid */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" onClick={handleGridClick}>
            {featured.map((p, i) => (
              <div key={p.slug} data-slug={p.slug}>
                <ProjectCard
                  p={p} i={i}
                  isActive={hovered === p.slug}
                  isDefocused={hovered !== null && hovered !== p.slug}
                  onHover={() => setHovered(p.slug)}
                  onLeave={() => setHovered(null)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Remaining grid */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" onClick={handleGridClick}>
            {remaining.map((p, i) => (
              <div key={p.slug} data-slug={p.slug}>
                <ProjectCard
                  p={p} i={featured.length + i}
                  isActive={hovered === p.slug}
                  isDefocused={hovered !== null && hovered !== p.slug}
                  onHover={() => setHovered(p.slug)}
                  onLeave={() => setHovered(null)}
                />
              </div>
            ))}
          </div>
        )}

        {/* View all CTA */}
        <motion.div {...scrollReveal(0.15)} className="text-center pt-4">
          <motion.a
            href="https://github.com/kishor-2646" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/70 font-semibold text-sm bg-white/5"
            whileHover={{ borderColor: 'rgba(255,126,51,0.5)', color: '#FF7E33', y: -2, background: 'rgba(255,126,51,0.08)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            View all on GitHub <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}