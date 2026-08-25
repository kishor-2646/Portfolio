"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Code2, Layers, Cpu, Sparkles, ArrowUpRight, Network } from 'lucide-react';
import { RESUME_URL, EMAIL, NAME, ROLE, PROFILE_IMAGE, BLOGS_UI } from '../lib/data';
import { ease, directionalCardEntrance } from '../lib/motion';
import { useScrollDirection } from '../lib/useScrollDirection';

import AnimatedSectionHeader from './AnimatedSectionHeader';

/* ─────────────────────────────────────────────────────────────
   BLOGS & STUDY NOTES SECTION
   - 3-Column Bento Grid with Auto-Balancing Geometry:
       • Left Column: Large banner article + 2 horizontal compact notes
       • Center Column: Portrait feature card + Quick action bar
       • Right Column: Failure logs card + Engineering rules + System protocol note
       • Bottom Row: 2 wide horizontal cards side-by-side
   - Auto-arranges evenly across columns with zero empty voids
───────────────────────────────────────────────────────────── */
export default function BlogsSection() {
  const [copied, setCopied] = useState(false);
  const scrollDirection = useScrollDirection();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL || 'Kishorekumar20002646@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rightNote = BLOGS_UI?.rightCompactNote || {
    title: "API Protocols: REST vs gRPC & WebSockets",
    description: "Serialization overhead, payload benchmarks, and event-stream latency for real-time mobile apps.",
    category: "Network & Systems",
  };

  return (
    <section
      id="blogs"
      className="relative w-full py-36 sm:py-48 bg-black text-white overflow-hidden border-t border-white/5"
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
            
            {/* Card 1: Large Featured Article */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.1, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between flex-1
              "
            >
              {/* Graphic Banner */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600/30 via-rose-600/20 to-purple-600/30 border border-white/10 flex items-center justify-center mb-5">
                <div className="text-center p-4">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wider">
                    &gt;real-time<sup>2024</sup>
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white transition-colors">
                  {BLOGS_UI?.featuredArticle?.title || "Building Real-Time Systems with Firebase & Flutter"}
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {BLOGS_UI?.featuredArticle?.description || "How I built GreenWave's sub-second GPS tracking system — architecture decisions, websocket pitfalls, and lessons learned under hackathon pressure."}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>{BLOGS_UI?.featuredArticle?.tag || "Architecture Deep Dive"}</span>
                <span>{BLOGS_UI?.featuredArticle?.readTime || "8 min read"}</span>
              </div>
            </motion.div>

            {/* Card 2: Horizontal Compact Note (DSA) */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.18, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4 shrink-0
              "
            >
              <div className="w-13 h-13 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 p-2.5">
                <Code2 size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors">
                  {BLOGS_UI?.compactNotes?.[0]?.title || "DSA Cheat Sheet — Trees & Graphs"}
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  {BLOGS_UI?.compactNotes?.[0]?.description || "Reference notes for BFS/DFS traversals, topological sort, and DP recursion patterns."}
                </p>
              </div>
            </motion.div>

            {/* Card 3: Horizontal Compact Note (State Management) */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.24, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4 shrink-0
              "
            >
              <div className="w-13 h-13 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 p-2.5">
                <Layers size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors">
                  {BLOGS_UI?.compactNotes?.[1]?.title || "Flutter Architecture: Riverpod vs Bloc"}
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  {BLOGS_UI?.compactNotes?.[1]?.description || "Comparing async state management performance across high-frequency GPS stream updates."}
                </p>
              </div>
            </motion.div>

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
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.16, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between flex-1
              "
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-3">
                  <Terminal size={14} />
                  <span>{BLOGS_UI?.warRoomLogs?.badge || "WAR ROOM LOGS"}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white transition-colors">
                  {BLOGS_UI?.warRoomLogs?.title || "What Broke in Production (And How I Fixed It)"}
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {BLOGS_UI?.warRoomLogs?.description || "Post-mortems from real-time websocket storms, memory leaks in infinite scroll feeds, and racing async states."}
                </p>
              </div>

              {/* Code Snippet Accent */}
              <div className="my-4 p-3 rounded-lg bg-black/80 border border-white/8 font-mono text-[11px] text-white/70 space-y-1">
                <p className="text-rose-400/90">&gt; FATAL: StreamSubscription leak</p>
                <p className="text-emerald-400/90">&gt; FIX: autoDispose + debounce</p>
              </div>

              <div className="pt-2.5 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>Debugging &amp; Post-Mortem</span>
                <span>{BLOGS_UI?.warRoomLogs?.readTime || "5 min read"}</span>
              </div>
            </motion.div>

            {/* Card 7: Engineering Takeaways Feed */}
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
                {(BLOGS_UI?.quickRules || [
                  "Never trust client GPS accuracy without Kalman filtering.",
                  "Database indexes matter more than micro-optimizing loops.",
                  "Write code for the next engineer who will debug it at 2 AM.",
                ]).map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-white/30">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 8: System Protocols Note (Fills the Right Column Symmetrically) */}
            <motion.div
              {...directionalCardEntrance(scrollDirection, 0.28, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4 shrink-0
              "
            >
              <div className="w-13 h-13 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 p-2.5">
                <Network size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors">
                  {rightNote.title}
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  {rightNote.description}
                </p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ════════ BOTTOM ROW: 2 WIDE HORIZONTAL CARDS ════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
          
          {/* Bottom Card 1 */}
          <motion.div
            {...directionalCardEntrance(scrollDirection, 0.32, 24)}
            whileHover={{ y: -3 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex items-center justify-between gap-4
            "
          >
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                {BLOGS_UI?.bottomCards?.[0]?.category || "System Design"}
              </span>
              <h4 className="text-base font-bold text-white mt-1 group-hover:text-white transition-colors">
                {BLOGS_UI?.bottomCards?.[0]?.title || "Designing Fault-Tolerant IoT Pipelines"}
              </h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                {BLOGS_UI?.bottomCards?.[0]?.description || "Handling network disconnects, offline queuing, and backpressure."}
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
              <ArrowUpRight size={18} />
            </div>
          </motion.div>

          {/* Bottom Card 2 */}
          <motion.div
            {...directionalCardEntrance(scrollDirection, 0.36, 24)}
            whileHover={{ y: -3 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex items-center justify-between gap-4
            "
          >
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                {BLOGS_UI?.bottomCards?.[1]?.category || "Hackathon Playbook"}
              </span>
              <h4 className="text-base font-bold text-white mt-1 group-hover:text-white transition-colors">
                {BLOGS_UI?.bottomCards?.[1]?.title || "How to Win 24-Hour Hackathons"}
              </h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                {BLOGS_UI?.bottomCards?.[1]?.description || "Team leadership, ruthless scoping, MVP prioritization, and winning pitch decks."}
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
              <ArrowUpRight size={18} />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
