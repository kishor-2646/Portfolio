"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Code2, Coffee, Sparkles, ArrowUpRight, Network, Github, Clock, BookOpen } from 'lucide-react';
import { RESUME_URL, EMAIL, NAME, ROLE, PROFILE_IMAGE, BLOGS_UI } from '../lib/data';
import { directionalCardEntrance } from '../lib/motion';
import { useScrollDirection, type ScrollDirection } from '../lib/useScrollDirection';

import AnimatedSectionHeader from './AnimatedSectionHeader';

/* ─────────────────────────────────────────────────────────────
   BLOGS & STUDY NOTES SECTION
   - 3-Column Bento Grid with Auto-Balancing Geometry:
       • Left Column: Large banner article + 2 horizontal compact notes
       • Center Column: Portrait feature card + Quick action bar
       • Right Column: Failure logs card + Engineering rules + System protocol note
       • Bottom Row: wide horizontal cards (2 or 3 per row, auto-balanced)
   - Auto-arranges evenly across columns with zero empty voids
   - Every blog item takes an optional `href` from portfolio.config.ts.
     Items without a resource render greyed-out with a "Coming soon" pill.
───────────────────────────────────────────────────────────── */

const CARD_BASE =
  'group relative block rounded-[20px] bg-[#0b0b0b] border shadow-[0_16px_40px_rgba(0,0,0,0.85)] transition-all duration-300';

/** Pill shown on cards whose resource has not been added yet */
function ComingSoonPill() {
  return (
    <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-medium text-white/45 tracking-wide">
      <Clock size={10} />
      Coming soon
    </span>
  );
}

/** Small corner hint on live cards — GitHub icon for repos, arrow for articles */
function ResourceHint({ href }: { href: string }) {
  const isRepo = href.includes('github.com');
  return (
    <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-[10px] font-medium text-emerald-400/90 tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
      {isRepo ? <Github size={10} /> : <BookOpen size={10} />}
      {isRepo ? 'Repo' : 'Read'}
    </span>
  );
}

interface BlogCardProps {
  id: string;
  href?: string;
  className?: string;
  delay: number;
  hoverY?: number;
  scrollDirection: ScrollDirection;
  /** Hide the corner badge (used when the card already shows its own CTA) */
  hideBadge?: boolean;
  children: React.ReactNode;
}

/**
 * Card shell that resolves availability from `href`:
 *   • href present → clickable link (internal via Next Link, external in new tab)
 *   • href empty   → greyscale, non-interactive, "Coming soon"
 */
function BlogCard({ id, href, className = '', delay, hoverY = -3, scrollDirection, hideBadge, children }: BlogCardProps) {
  const isAvailable = Boolean(href && href.trim());
  const entrance = directionalCardEntrance(scrollDirection, delay, 24);

  if (!isAvailable) {
    return (
      <motion.div
        id={id}
        {...entrance}
        aria-disabled="true"
        title="Resource not added yet"
        className={`${CARD_BASE} border-white/[0.06] cursor-not-allowed select-none grayscale brightness-[0.55] ${className}`}
      >
        {!hideBadge && <ComingSoonPill />}
        {children}
      </motion.div>
    );
  }

  const isExternal = /^https?:\/\//.test(href!);
  const liveClass = `${CARD_BASE} border-white/10 hover:border-white/25 hover:bg-[#0e0e0e] cursor-pointer ${className}`;
  const inner = (
    <>
      {!hideBadge && <ResourceHint href={href!} />}
      {children}
    </>
  );

  return (
    <motion.div {...entrance} whileHover={{ y: hoverY }} className="flex flex-col">
      {isExternal ? (
        <a id={id} href={href} target="_blank" rel="noopener noreferrer" className={`${liveClass} flex-1`}>
          {inner}
        </a>
      ) : (
        <Link id={id} href={href!} className={`${liveClass} flex-1`}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

export default function BlogsSection() {
  const [copied, setCopied] = useState(false);
  const scrollDirection = useScrollDirection();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL || 'Kishorekumar20002646@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featured = BLOGS_UI?.featuredArticle;
  const notes = BLOGS_UI?.compactNotes || [];
  const warRoom = BLOGS_UI?.warRoomLogs;
  const rightNote = BLOGS_UI?.rightCompactNote;
  const bottomCards = BLOGS_UI?.bottomCards || [];

  const noteIcons = [
    { Icon: Code2, tone: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
    { Icon: Coffee, tone: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
  ];
  const bottomAccents = ['text-purple-400', 'text-cyan-400', 'text-amber-400'];
  const bottomGridCols = bottomCards.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <section
      id="blogs"
      className="relative w-full py-52 sm:py-72 lg:py-80 bg-black text-white overflow-hidden border-t border-white/5"
    >
      <div className="w-[96%] max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ── Section Header with Animated Character Reveal ── */}
        <div className="mb-16 sm:mb-24">
          <AnimatedSectionHeader
            kicker="ENGINEERING JOURNAL"
            title={BLOGS_UI?.heading || "Blogs & Study Notes"}
            subtitle={BLOGS_UI?.subtitle || "Deep dives, cheat sheets, architecture blueprints, and lessons learned from the trenches."}
            align="center"
          />
        </div>

        {/* ── Main 3-Column Bento Grid (Auto-Arranged & Balanced) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* ════════ LEFT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5 h-full">
            
            {/* Card 1: Large Featured Article (GreenWave Engineering Blog) */}
            <BlogCard
              id="blog-featured-article"
              href={featured?.href}
              delay={0.1}
              hoverY={-4}
              scrollDirection={scrollDirection}
              hideBadge
              className="overflow-hidden p-6 flex flex-col justify-between flex-1 h-full"
            >
              {/* Graphic Banner */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-tr from-emerald-600/30 via-teal-600/15 to-cyan-600/30 border border-white/10 flex items-center justify-center mb-5">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:16px_16px]" />
                <div className="relative text-center p-4">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wider">
                    &gt;green<span className="text-emerald-400">wave</span>
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-emerald-400/30 text-[10px] font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Featured
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {featured?.title}
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {featured?.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>{featured?.tag}</span>
                {featured?.href ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400/90 group-hover:text-emerald-300 transition-colors">
                    Read blog
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                ) : (
                  <span>{featured?.readTime}</span>
                )}
              </div>
            </BlogCard>

            {/* Cards 2 & 3: Horizontal Compact Notes (DSA / Java prep repos) */}
            {notes.slice(0, 2).map((note, i) => {
              const { Icon, tone } = noteIcons[i % noteIcons.length];
              return (
                <BlogCard
                  key={note.title}
                  id={`blog-note-${i + 1}`}
                  href={note.href}
                  delay={0.18 + i * 0.06}
                  scrollDirection={scrollDirection}
                  className="p-5 pr-14 flex items-center gap-4 shrink-0"
                >
                  <div className={`w-13 h-13 rounded-xl border flex items-center justify-center shrink-0 p-2.5 ${tone}`}>
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{note.category}</span>
                    <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                      {note.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                      {note.description}
                    </p>
                  </div>
                </BlogCard>
              );
            })}

          </div>

          {/* ════════ CENTER COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5 h-full">
            
            {/* Card 4: Center Portrait Feature Showcase */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.14, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between flex-1 relative
              "
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs text-white/50 mb-3 relative z-10">
                <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider">● {BLOGS_UI?.centerCard?.badge || "Engineering Journal"}</span>
                <span className="text-white/40 font-mono text-[11px]">{BLOGS_UI?.centerCard?.year || "2025"}</span>
              </div>

              {/* Portrait Photo Container */}
              <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] border border-white/10 mb-3 shadow-inner">
                <img
                  src={PROFILE_IMAGE || "/potrait.png"}
                  alt={`${NAME} — ${ROLE}`}
                  className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[0.94] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info inside Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/20 mb-1">
                    {ROLE || "Software Engineer"}
                  </span>
                  <p className="text-sm font-bold text-white tracking-tight leading-snug">
                    {NAME || "Kishor Kumar S."}
                  </p>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10">
                <p className="text-xs text-white/60 leading-relaxed">
                  {BLOGS_UI?.centerCard?.description || "Building production systems, real-time architectures, and scalable mobile apps."}
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                  <span>{BLOGS_UI?.centerCard?.tags?.[0] || "Full-Stack & Flutter"}</span>
                  <span>{BLOGS_UI?.centerCard?.tags?.[1] || "100+ Live Users"}</span>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Quick Action Bar */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.26, 24)}
              className="
                rounded-[20px] p-4 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)]
                flex items-center justify-between gap-3 shrink-0
              "
            >
              <button
                id="blogs-copy-email"
                onClick={handleCopyEmail}
                className="
                  flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                  bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                  text-xs font-semibold text-white/90 hover:text-white transition-all active:scale-95 cursor-pointer
                "
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Email!' : 'Copy Email'}</span>
              </button>

              <a
                id="blogs-resume-link"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl
                  bg-white text-black hover:bg-white/90
                  text-xs font-bold transition-all active:scale-95 cursor-pointer
                "
              >
                <span>Resume</span>
                <ArrowUpRight size={13} />
              </a>
            </motion.div>

          </div>

          {/* ════════ RIGHT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5 h-full">
            
            {/* Card 6: Failure Logs & War Stories Card */}
            <BlogCard
              id="blog-war-room"
              href={warRoom?.href}
              delay={0.16}
              hoverY={-4}
              scrollDirection={scrollDirection}
              className="overflow-hidden p-6 flex flex-col justify-between flex-1 h-full"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-3">
                  <Terminal size={14} />
                  <span>{warRoom?.badge || "WAR ROOM LOGS"}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {warRoom?.title}
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {warRoom?.description}
                </p>
              </div>

              {/* Code Snippet Accent */}
              <div className="my-4 p-3 rounded-lg bg-black/80 border border-white/8 font-mono text-[11px] text-white/70 space-y-1">
                <p className="text-rose-400/90">&gt; FATAL: StreamSubscription leak</p>
                <p className="text-emerald-400/90">&gt; FIX: autoDispose + debounce</p>
              </div>

              <div className="pt-2.5 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>Debugging &amp; Post-Mortem</span>
                <span>{warRoom?.readTime || "5 min read"}</span>
              </div>
            </BlogCard>

            {/* Card 7: Engineering Takeaways Feed (static content, not a resource) */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.22, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col gap-2.5 shrink-0
              "
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Sparkles size={13} className="text-amber-400" />
                <span>Quick Engineering Rules</span>
              </div>

              <ul className="text-xs text-white/60 space-y-1.5 font-light">
                {(BLOGS_UI?.quickRules || []).map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-white/30">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 8: System Protocols Note */}
            {rightNote && (
              <BlogCard
                id="blog-right-note"
                href={rightNote.href}
                delay={0.28}
                scrollDirection={scrollDirection}
                className="p-5 pr-14 flex items-center gap-4 shrink-0"
              >
                <div className="w-13 h-13 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 p-2.5">
                  <Network size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{rightNote.category}</span>
                  <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                    {rightNote.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                    {rightNote.description}
                  </p>
                </div>
              </BlogCard>
            )}

          </div>

        </div>

        {/* ════════ BOTTOM ROW: WIDE HORIZONTAL CARDS (auto-balanced) ════════ */}
        {bottomCards.length > 0 && (
          <div className={`grid grid-cols-1 ${bottomGridCols} gap-4 sm:gap-5 mt-4 sm:mt-5`}>
            {bottomCards.map((card, i) => (
              <BlogCard
                key={card.title}
                id={`blog-bottom-${i + 1}`}
                href={card.href}
                delay={0.32 + i * 0.04}
                scrollDirection={scrollDirection}
                className="p-6 pt-9 flex items-center justify-between gap-4 h-full"
              >
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${bottomAccents[i % bottomAccents.length]}`}>
                    {card.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    {card.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </BlogCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
