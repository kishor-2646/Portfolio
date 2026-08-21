"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Copy, Check, ExternalLink, Github, Sparkles, Terminal, Code2, Layers, Cpu, Play, ArrowUpRight } from 'lucide-react';
import { RESUME_URL, EMAIL, NAME, ROLE, PROFILE_IMAGE, BLOGS_UI } from '../lib/data';
import { ease, dur, cardEntrance } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────
   BLOGS & STUDY NOTES SECTION (MATCHING REFERENCE IMAGE 2)
   - Header: Elegant serif italic title ("Blogs & Study Notes")
   - Bento Grid:
       • Left Column: Large banner article + 2 horizontal compact notes
       • Center Column: Portrait feature card + Quick action bar
       • Right Column: Failure logs card + Engineering takeaways feed
       • Bottom Row: 2 wide horizontal cards side-by-side
───────────────────────────────────────────────────────────── */
export default function BlogsSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL || 'Kishorekumar20002646@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="blogs"
      className="relative w-full py-24 sm:py-32 bg-black text-white overflow-hidden"
    >
      <div className="w-[96%] max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ── Section Header with Masked Title Reveal ── */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: ease.cinematic }}
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight"
            >
              Blogs &amp; Study Notes
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
            className="text-sm sm:text-base text-white/50 mt-2.5 font-light max-w-lg mx-auto leading-relaxed"
          >
            Deep dives, cheat sheets, architecture blueprints, and lessons learned from the trenches.
          </motion.p>
        </div>

        {/* ── Main 3-Column Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          
          {/* ════════ LEFT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 1: Large Featured Article */}
            <motion.div
              {...cardEntrance(0.1, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between
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
                  Building Real-Time Systems with Firebase &amp; Flutter
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  How I built GreenWave's sub-second GPS tracking system — architecture decisions, websocket pitfalls, and lessons learned under hackathon pressure.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>Architecture Deep Dive</span>
                <span>8 min read</span>
              </div>
            </motion.div>

            {/* Card 2: Horizontal Compact Note (DSA) */}
            <motion.div
              {...cardEntrance(0.18, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4
              "
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Code2 size={24} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors">
                  DSA Cheat Sheet — Trees &amp; Graphs
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  Reference notes for BFS/DFS traversals, topological sort, and DP recursion patterns.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Horizontal Compact Note (State Management) */}
            <motion.div
              {...cardEntrance(0.24, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4
              "
            >
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Layers size={24} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors">
                  Flutter Architecture: Riverpod vs Bloc
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  Comparing async state management performance across high-frequency GPS stream updates.
                </p>
              </div>
            </motion.div>

          </div>

          {/* ════════ CENTER COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 4: Center Portrait Feature Showcase */}
            <motion.div
              {...cardEntrance(0.14, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between h-full min-h-[420px] relative
              "
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs text-white/50 mb-4 relative z-10">
                <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider">● Engineering Journal</span>
                <span className="text-white/40 font-mono text-[11px]">2025</span>
              </div>

              {/* Portrait Photo Container */}
              <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] border border-white/10 mb-4 shadow-inner">
                <img
                  src={PROFILE_IMAGE || "/potrait.png"}
                  alt={`${NAME} — ${ROLE}`}
                  className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[0.94] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay */}
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
                  Building production systems, real-time architectures, and scalable mobile apps.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                  <span>Full-Stack &amp; Flutter</span>
                  <span>100+ Live Users</span>
                </div>
              </div>
            </motion.div>


            {/* Card 5: Quick Action Bar */}
            <motion.div
              {...cardEntrance(0.26, 24)}
              className="
                rounded-[20px] p-4 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)]
                flex items-center justify-between gap-3
              "
            >
              <button
                onClick={handleCopyEmail}
                className="
                  flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                  bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                  text-xs font-semibold text-white/90 hover:text-white transition-all active:scale-95
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
                  text-xs font-bold transition-all active:scale-95
                "
              >
                <span>Resume</span>
                <ArrowUpRight size={13} />
              </a>
            </motion.div>

          </div>

          {/* ════════ RIGHT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 6: Failure Logs & War Stories Card */}
            <motion.div
              {...cardEntrance(0.16, 24)}
              whileHover={{ y: -4 }}
              className="
                group rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between
              "
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-4">
                  <Terminal size={14} />
                  <span>WAR ROOM LOGS</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white transition-colors">
                  What Broke in Production (And How I Fixed It)
                </h3>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  Post-mortems from real-time websocket storms, memory leaks in infinite scroll feeds, and racing async states.
                </p>
              </div>

              {/* Code Snippet Accent */}
              <div className="my-5 p-3 rounded-lg bg-black/80 border border-white/8 font-mono text-[11px] text-white/70 space-y-1">
                <p className="text-rose-400/90">&gt; FATAL: StreamSubscription leak</p>
                <p className="text-emerald-400/90">&gt; FIX: autoDispose + debounce</p>
              </div>

              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <span>Debugging &amp; Post-Mortem</span>
                <span>5 min read</span>
              </div>
            </motion.div>

            {/* Card 7: Engineering Takeaways Feed */}
            <motion.div
              {...cardEntrance(0.28, 24)}
              whileHover={{ y: -3 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col gap-3
              "
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Sparkles size={13} className="text-amber-400" />
                <span>Quick Engineering Rules</span>
              </div>

              <ul className="text-xs text-white/60 space-y-2 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-white/30">•</span>
                  <span>Never trust client GPS accuracy without Kalman filtering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/30">•</span>
                  <span>Database indexes matter more than micro-optimizing loops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/30">•</span>
                  <span>Write code for the next engineer who will debug it at 2 AM.</span>
                </li>
              </ul>
            </motion.div>

          </div>

        </div>

        {/* ════════ BOTTOM ROW: 2 WIDE HORIZONTAL CARDS ════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
          
          {/* Bottom Card 1 */}
          <motion.div
            {...cardEntrance(0.32, 24)}
            whileHover={{ y: -3 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex items-center justify-between gap-4
            "
          >
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">System Design</span>
              <h4 className="text-base font-bold text-white mt-1 group-hover:text-white transition-colors">
                Designing Fault-Tolerant IoT Pipelines
              </h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Handling network disconnects, offline queuing, and backpressure.
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all shrink-0">
              <ArrowUpRight size={18} />
            </div>
          </motion.div>

          {/* Bottom Card 2 */}
          <motion.div
            {...cardEntrance(0.36, 24)}
            whileHover={{ y: -3 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex items-center justify-between gap-4
            "
          >
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">Hackathon Playbook</span>
              <h4 className="text-base font-bold text-white mt-1 group-hover:text-white transition-colors">
                How to Win 24-Hour Hackathons
              </h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Team leadership, ruthless scoping, MVP prioritization, and winning pitch decks.
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
