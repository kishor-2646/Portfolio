"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Copy, Check, ExternalLink, Github, Sparkles, Terminal, Code2, Layers, Cpu, Play } from 'lucide-react';
import { RESUME_URL } from '../lib/data';

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
    navigator.clipboard.writeText('Kishorekumar20002646@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="blogs"
      className="relative w-full py-24 sm:py-32 bg-black text-white overflow-hidden"
    >
      <div className="w-[96%] max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ── Section Header (Matching Reference Image 2) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-18"
        >
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
            Blogs & Study Notes
          </h2>
          <p className="text-sm sm:text-base text-white/50 mt-2.5 font-light max-w-lg mx-auto leading-relaxed">
            Deep dives, cheat sheets, architecture blueprints, and lessons learned from the trenches.
          </p>
        </motion.div>

        {/* ── Main 3-Column Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          
          {/* ════════ LEFT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 1: Large Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
                  Building Real-Time Systems with Firebase & Flutter
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
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
                <h4 className="text-sm font-bold text-white leading-tight">
                  DSA Cheat Sheet — Trees & Graphs
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  Reference notes for BFS/DFS traversals, topological sort, and DP recursion patterns.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Horizontal Compact Note (State Management) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                <h4 className="text-sm font-bold text-white leading-tight">
                  Flutter State Management: Riverpod
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  Practical evolution from setState to Riverpod handling real-time logistics feeds.
                </p>
              </div>
            </motion.div>

          </div>

          {/* ════════ CENTER COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 4: Hero Feature Card (Matching Reference Center Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="
                group flex-1 rounded-[20px] overflow-hidden p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between text-center
              "
            >
              {/* Portrait Hero Media Frame */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 mb-6">
                <img
                  src="/potrait-clean.png"
                  alt="Kishor Kumar S"
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src = '/photo.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent pointer-events-none" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Kishor Kumar S
                </h3>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                  Software Engineer & Architect
                </p>
                <p className="text-xs text-white/60 font-light mt-3 leading-relaxed max-w-xs mx-auto">
                  Documenting system architectures, real-time mobile engineering patterns, and lessons from building production platforms.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-center gap-2 text-xs text-white/40 font-mono">
                <span>kishorkumar.dev/notes</span>
              </div>
            </motion.div>

            {/* Card 5: Quick Action Pills Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="
                rounded-[20px] p-3.5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex items-center justify-center gap-3
              "
            >
              <button
                onClick={handleCopyEmail}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-xs font-medium text-white transition-all"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
              </button>

              <a
                href="https://github.com/kishor-2646"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-xs font-medium text-white transition-all"
              >
                <Github size={13} />
                <span>GitHub Repos</span>
              </a>
            </motion.div>

          </div>

          {/* ════════ RIGHT COLUMN (lg:col-span-4) ════════ */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            
            {/* Card 6: Compact Card (Failure Logs) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="
                group rounded-[20px] p-5 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex items-center gap-4
              "
            >
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Terminal size={24} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white leading-tight">
                  Architecture Failure Logs
                </h4>
                <p className="text-xs text-white/50 mt-1 leading-snug line-clamp-2">
                  Documenting memory leaks, race conditions, and how I fixed them in production.
                </p>
              </div>
            </motion.div>

            {/* Card 7: Engineering Principles & Takeaways Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="
                flex-1 rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
                shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
                flex flex-col justify-between
              "
            >
              <div>
                <h4 className="text-base font-bold text-white leading-snug mb-4">
                  Engineering Principles & Takeaways
                </h4>

                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-bold text-white/90">Sub-Second Latency</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Prefer push listeners over periodic polling for battery and network efficiency.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-[11px] font-bold text-white/90">State Minimalism</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Single source of truth prevents 90% of concurrency and UI desync bugs.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[11px] font-bold text-white/90">Sprint Discipline</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Shipping a solid MVP in 15 days requires ruthless scope containment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 text-[11px] text-white/40">
                <span>Curated engineering notes</span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ── Bottom Row (2 Wide Horizontal Cards Side-by-Side) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5">
          
          {/* Card 8: Open Source & Blueprints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex flex-col sm:flex-row items-center gap-5
            "
          >
            <div className="w-full sm:w-40 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-white/10 flex items-center justify-center shrink-0">
              <Cpu size={36} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white leading-snug">
                Open Source & System Blueprints
              </h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Reusable Flutter boilerplates, clean architecture templates, and Supabase edge function scaffolding open for developers.
              </p>
            </div>
          </motion.div>

          {/* Card 9: Hackathon Playbook & Sprints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="
              group rounded-[20px] p-6 bg-[#0b0b0b] border border-white/10
              shadow-[0_16px_40px_rgba(0,0,0,0.85)] hover:border-white/25 transition-all
              flex flex-col sm:flex-row items-center gap-5
            "
          >
            <div className="w-full sm:w-40 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-rose-600/20 border border-white/10 flex items-center justify-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-rose-500/30 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-lg">
                <Play size={20} className="fill-rose-400 ml-0.5" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white leading-snug">
                Hackathon Sprint Playbook
              </h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Framework for architecting, building, and pitching award-winning software MVPs in 24–48 hours under pressure.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
