"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Github, ExternalLink, Users, Clock,
  CheckCircle2, Check, X, Layers, Trophy, AlertCircle, Lightbulb,
  TrendingUp, Code2, ImageIcon, Sparkles, Shield, Cpu, Smartphone,
  Database, Zap, Navigation, MapPin, FileText, Bell, Lock,
  ChevronRight, Volume2, VolumeX, Share2, Printer, Compass,
  Radio, CheckCircle, Award, Target, Activity, DollarSign,
  Briefcase, BarChart3, HelpCircle, Flame, RefreshCw, Send,
} from 'lucide-react';
import { PROJECTS } from '../../lib/data';
import { CASE_STUDIES } from '../../lib/caseStudiesData';

// ── Accent colour system ────────────────────────────────────
const ACCENT_MAP: Record<string, { primary: string; border: string; bg: string; glow: string; gradFrom: string; gradTo: string; ring: string }> = {
  cyan: {
    primary: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.12)]',
    gradFrom: 'from-cyan-500',
    gradTo: 'to-blue-500',
    ring: 'ring-cyan-500/30',
  },
  indigo: {
    primary: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.12)]',
    gradFrom: 'from-indigo-500',
    gradTo: 'to-violet-500',
    ring: 'ring-indigo-500/30',
  },
  emerald: {
    primary: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_40px_rgba(52,211,153,0.12)]',
    gradFrom: 'from-emerald-500',
    gradTo: 'to-cyan-500',
    ring: 'ring-emerald-500/30',
  },
};

const DEFAULT_ACCENT = ACCENT_MAP.cyan;

// ── Realistic Phone Mockup Frame ────────────────────────────
function PhoneMockup({
  children,
  imageSrc,
  videoSrc,
  alt = "App Screen",
  className = "",
  notch = true,
  glow = true,
}: {
  children?: React.ReactNode;
  imageSrc?: string;
  videoSrc?: string;
  alt?: string;
  className?: string;
  notch?: boolean;
  glow?: boolean;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[300px] aspect-[9/19] rounded-[42px] p-3 bg-gradient-to-b from-slate-700/60 via-slate-900 to-black border-[3px] border-slate-700/60 shadow-2xl ${glow ? 'shadow-cyan-500/10' : ''} ${className}`}>
      {/* Outer edge highlights */}
      <div className="absolute inset-0 rounded-[39px] border border-white/10 pointer-events-none" />
      
      {/* Side buttons */}
      <div className="absolute -left-[5px] top-24 w-[3px] h-8 bg-slate-600 rounded-l-sm" />
      <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
      <div className="absolute -right-[5px] top-28 w-[3px] h-14 bg-slate-600 rounded-r-sm" />

      {/* Screen container */}
      <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#0a0a12] text-white flex flex-col border border-white/5">
        {/* Dynamic Island / Notch */}
        {notch && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-3 w-28 h-4 bg-black rounded-full border border-white/10 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/60" />
            </div>
          </div>
        )}

        {videoSrc ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            {/* Subtle bottom home indicator overlay */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 pointer-events-none z-20" />
          </div>
        ) : imageSrc ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            {/* Subtle bottom home indicator overlay */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 pointer-events-none z-20" />
          </div>
        ) : (
          <>
            {/* Status bar */}
            <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[9px] font-semibold text-slate-400 select-none z-20">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Radio size={10} className="text-slate-400" />
                <div className="w-3.5 h-2 rounded-[2px] border border-slate-400 p-[1px] flex items-center">
                  <div className="w-full h-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-3 font-sans text-xs scrollbar-none">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="py-1.5 flex justify-center bg-transparent">
              <div className="w-24 h-1 rounded-full bg-white/30" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Highlight Callout Box (as shown in reference PDF) ───────
function HighlightBox({ children, className = "", accentPrimary = "text-cyan-400" }: { children: React.ReactNode; className?: string; accentPrimary?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-blue-950/20 border border-blue-500/25 rounded-2xl p-5 md:p-6 text-slate-300 space-y-2 backdrop-blur-md ${className}`}
    >
      <div className={`flex items-center gap-2 ${accentPrimary} font-bold text-xs uppercase tracking-wider`}>
        <Zap size={14} className="fill-current" />
        <span>Highlight</span>
      </div>
      <div className="text-xs sm:text-sm leading-relaxed text-slate-300">
        {children}
      </div>
    </motion.div>
  );
}

// ── Main Case Study Page Component ──────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const projectIndex = PROJECTS.findIndex(p => p.slug === slug);
  const project = PROJECTS[projectIndex] || PROJECTS.find(p => p.slug === 'greenwave') || PROJECTS[0];
  
  // Custom case study dataset
  const cs = CASE_STUDIES[slug] || CASE_STUDIES['greenwave'];
  const accent = ACCENT_MAP[cs.accent] || DEFAULT_ACCENT;

  const [soundEnabled, setSoundEnabled] = useState(false);

  // Fallback 404
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <p className="text-6xl font-black text-slate-600">404</p>
          <p className="text-slate-400">Case study not found</p>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-white/10 rounded-2xl font-bold hover:bg-white/20">
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-[#09090f] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">

      {/* ── Ambient Background Radiance ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
        <div className={`absolute top-0 right-1/4 w-[700px] h-[700px] ${accent.bg} rounded-full blur-[180px] opacity-40`} />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[170px] opacity-30" />
      </div>

      {/* ── Top Header Navigation Bar (Reference PDF Page 18) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090f]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white group">
            <div className="w-8 h-8 rounded-xl bg-white text-black font-black flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
              K
            </div>
            <span className="text-sm font-semibold tracking-wider text-slate-200">DEVPORT.26</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#projects" className="text-white font-semibold">Work</Link>
            <Link href="/#journey" className="hover:text-white transition-colors">Journey</Link>
            <Link href="/#achievements" className="hover:text-white transition-colors">Achievements</Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume</a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all text-xs flex items-center gap-1.5"
              title="Toggle sound"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {cs.github && (
              <a
                href={cs.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border ${accent.border} ${accent.bg} ${accent.primary} font-bold text-xs hover:opacity-80 transition-all`}
              >
                <Github size={13} />
                <span>GITHUB</span>
              </a>
            )}

            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowLeft size={13} /> Back
            </button>
          </div>

        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32 space-y-24">

        {/* ══════════════════════════════════════════════════════════
            HERO SHOWCASE SECTION (PDF Page 18)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-12">
          
          {/* Big Title & Watermark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 pt-6"
          >
            {/* Status Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-widest">
                <Users size={12} /> {cs.badgeLabel}
              </span>
              <span className={`px-3.5 py-1 rounded-full border ${accent.border} ${accent.bg} ${accent.primary} text-[11px] font-black uppercase tracking-widest`}>
                {cs.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
              {cs.title}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              {cs.description}
            </p>
          </motion.div>

          {/* 3-Phone Showcase Hero Row (PDF Page 18) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative py-8 px-4 rounded-[3rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${accent.bg} via-indigo-500/10 to-transparent blur-3xl pointer-events-none`} />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center justify-center">
              
              {/* Phone 1 */}
              <div className="transform md:-rotate-3 md:translate-y-4 hover:rotate-0 transition-transform duration-300">
                <PhoneMockup imageSrc={cs.mockupImages?.hero1} alt={cs.mockupScreens.hero1.title}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10">
                      <span className={`text-[11px] font-black ${accent.primary}`}>{cs.mockupScreens.hero1.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">{cs.mockupScreens.hero1.tag}</span>
                    </div>

                    <div className="h-28 rounded-2xl bg-slate-900 border border-slate-700/60 p-2.5 relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="flex justify-between items-center z-10">
                        <span className="text-[10px] font-bold text-slate-300">{cs.mockupScreens.hero1.mainBoxTop}</span>
                        <span className={`text-[10px] font-bold ${accent.primary}`}>{cs.mockupScreens.hero1.mainBoxVal}</span>
                      </div>
                      <div className="z-10 bg-slate-950/80 border border-white/10 rounded-xl p-1.5 flex items-center gap-2">
                        <Navigation size={12} className={`${accent.primary} animate-pulse`} />
                        <span className="text-[9px] font-medium text-slate-200">{cs.mockupScreens.hero1.subBox}</span>
                      </div>
                    </div>

                    <button className="w-full py-2 rounded-xl bg-white/10 border border-white/15 text-white text-[10px] font-black tracking-wider flex items-center justify-center gap-1.5">
                      {cs.mockupScreens.hero1.action}
                    </button>
                  </div>
                </PhoneMockup>
              </div>

              {/* Phone 2: Centerpiece */}
              <div className="transform md:-translate-y-3 scale-105 z-20">
                <PhoneMockup imageSrc={cs.mockupImages?.hero2} alt={cs.mockupScreens.hero2.title}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10">
                      <span className="text-[11px] font-black text-white">{cs.mockupScreens.hero2.title}</span>
                      <span className="text-[9px] text-slate-400">{cs.mockupScreens.hero2.badge}</span>
                    </div>

                    {/* Card 1 */}
                    <div className={`p-3 rounded-2xl ${accent.bg} border ${accent.border} space-y-2`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-black ${accent.primary}`}>{cs.mockupScreens.hero2.card1Title}</span>
                        <span className="text-[10px] font-bold text-slate-300">{cs.mockupScreens.hero2.card1Val}</span>
                      </div>
                      <div className="text-[10px] text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={10} className={accent.primary} />
                          <span>{cs.mockupScreens.hero2.card1Route}</span>
                        </div>
                        <div className="text-[9px] text-slate-400">{cs.mockupScreens.hero2.card1Sub}</div>
                      </div>
                      <button className={`w-full py-1.5 rounded-lg bg-white text-black font-black text-[10px] uppercase`}>
                        {cs.mockupScreens.hero2.btn}
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 opacity-80">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-300">{cs.mockupScreens.hero2.card2Title}</span>
                        <span className="text-[10px] font-bold text-slate-400">{cs.mockupScreens.hero2.card2Val}</span>
                      </div>
                    </div>
                  </div>
                </PhoneMockup>
              </div>

              {/* Phone 3 */}
              <div className="transform md:rotate-3 md:translate-y-4 hover:rotate-0 transition-transform duration-300">
                <PhoneMockup imageSrc={cs.mockupImages?.hero3} alt={cs.mockupScreens.hero3.title}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10">
                      <span className={`text-[11px] font-black ${accent.primary}`}>{cs.mockupScreens.hero3.title}</span>
                      <FileText size={12} className={accent.primary} />
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 text-[9px] text-slate-300">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-400">{cs.mockupScreens.hero3.item1Label}</span>
                        <span className="font-bold text-white">{cs.mockupScreens.hero3.item1Val}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{cs.mockupScreens.hero3.item2Label}</span>
                        <span>{cs.mockupScreens.hero3.item2Val}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{cs.mockupScreens.hero3.item3Label}</span>
                        <span className={`font-bold ${accent.primary}`}>{cs.mockupScreens.hero3.item3Val}</span>
                      </div>
                      <p className="text-[8px] text-slate-500 italic">{cs.mockupScreens.hero3.quote}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-[9px] flex items-center justify-center gap-1">
                        <Printer size={10} /> Print
                      </button>
                      <button className={`flex-1 py-1.5 rounded-xl ${accent.bg} border ${accent.border} ${accent.primary} font-bold text-[9px] flex items-center justify-center gap-1`}>
                        <Share2 size={10} /> Share
                      </button>
                    </div>
                  </div>
                </PhoneMockup>
              </div>

            </div>
          </motion.div>

          {/* Meta Information Details Strip (PDF Page 18 Bottom) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.07]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Deliverables</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">{cs.deliverables}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">My Role</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">{cs.role}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Timeline</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">{cs.timeline}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Team Size</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">{cs.teamSize}</p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {cs.tags.map(tag => (
              <span key={tag} className={`text-[11px] font-black tracking-widest px-3.5 py-1.5 rounded-xl border ${accent.border} ${accent.bg} ${accent.primary}`}>
                {tag}
              </span>
            ))}
          </div>

        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 1: THE PROBLEM & WHY SOLVE (PDF Page 17)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">The Problem</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              {cs.problemIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left Card: What is Problem & Why Solve */}
            <div className="space-y-6 p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertCircle size={18} className="text-rose-400" />
                  What is the Problem?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {cs.whatProblem}
                </p>
              </div>

              <div className="h-[1px] bg-white/[0.06]" />

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-400" />
                  Why we need to Solve?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {cs.whySolve}
                </p>
              </div>

            </div>

            {/* Right Card: Stat Graphic */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-black border border-white/[0.08] flex flex-col items-center justify-center text-center space-y-4">
              <div className={`w-32 h-32 rounded-full border-4 ${accent.border} flex flex-col items-center justify-center relative ${accent.glow}`}>
                <span className={`text-xl sm:text-2xl font-black ${accent.primary}`}>{cs.metricBadge.stat}</span>
                <div className="absolute top-1 right-2 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="space-y-1 max-w-xs">
                <p className="text-base font-bold text-white">{cs.metricBadge.title}</p>
                <p className="text-xs text-slate-400">{cs.metricBadge.desc}</p>
              </div>
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 2: APPROACH & PROCESS STEPPER (PDF Page 16)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Engineering Approach</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              To solve this multi-stakeholder challenge, we followed a structured 5-stage engineering lifecycle:
            </p>
          </div>

          {/* Stepper Grid (PDF Page 16) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {cs.stepper.map((s, idx) => (
              <div key={idx} className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center space-y-1.5 relative group hover:${accent.border} transition-all`}>
                <span className={`text-[10px] font-black uppercase tracking-wider ${accent.primary}`}>{s.step}</span>
                <p className="text-xs font-bold text-white">{s.title}</p>
                <p className="text-[10px] text-slate-500">{s.desc}</p>
                {idx < 4 && (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ChevronRight size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <HighlightBox accentPrimary={accent.primary}>
            {cs.approachHighlight}
          </HighlightBox>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 3: UNDERSTANDING THE USER (PDF Page 15)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Understanding the Stakeholders</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A comprehensive inquiry into what each participant in the ecosystem requires:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
            
            {/* Column 1 */}
            <div className="space-y-6 text-sm">
              <div className="space-y-1.5">
                <span className={`text-xs font-bold ${accent.primary}`}>1. Who are the users?</span>
                <p className="text-slate-300">{cs.stakeholders.users}</p>
              </div>

              <div className="space-y-1.5">
                <span className={`text-xs font-bold ${accent.primary}`}>2. What experience do they currently have?</span>
                <p className="text-slate-300">{cs.stakeholders.experience}</p>
              </div>

              <div className="space-y-1.5">
                <span className={`text-xs font-bold ${accent.primary}`}>3. What information do they need live?</span>
                <p className="text-slate-300">{cs.stakeholders.liveInfo}</p>
              </div>

              <div className="space-y-1.5">
                <span className={`text-xs font-bold ${accent.primary}`}>4. How should it work seamlessly?</span>
                <p className="text-slate-300">{cs.stakeholders.seamlessWork}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6 text-sm">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-indigo-400">5. What are their core goals?</span>
                <p className="text-slate-300">{cs.stakeholders.goals}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-indigo-400">6. What technical functions are mandatory?</span>
                <p className="text-slate-300">{cs.stakeholders.functions}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-indigo-400">7. In what format do they access it?</span>
                <p className="text-slate-300">{cs.stakeholders.format}</p>
              </div>
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 4: PROBLEM MIND MAP / CONNECTING DOTS (PDF Page 14)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Connecting the Dots</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Mapping how disparate operational bottlenecks connect back to the core challenge:
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Left Branch */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <p className={`text-xs font-bold ${accent.primary}`}>{cs.mindMap.branch1.title}</p>
                  <p className="text-[11px] text-slate-400">{cs.mindMap.branch1.desc}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <p className={`text-xs font-bold ${accent.primary}`}>{cs.mindMap.branch2.title}</p>
                  <p className="text-[11px] text-slate-400">{cs.mindMap.branch2.desc}</p>
                </div>
              </div>

              {/* Center Node */}
              <div className={`p-6 rounded-full aspect-square max-w-[200px] mx-auto bg-gradient-to-br ${accent.bg} via-indigo-500/20 to-black border-2 ${accent.border} flex flex-col items-center justify-center text-center ${accent.glow}`}>
                <Flame size={28} className={`${accent.primary} mb-1`} />
                <span className="text-xs font-black uppercase text-white">{cs.mindMap.coreProblem}</span>
                <span className="text-[9px] text-slate-300">{cs.mindMap.coreSubtitle}</span>
              </div>

              {/* Right Branch */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <p className="text-xs font-bold text-indigo-300">{cs.mindMap.branch3.title}</p>
                  <p className="text-[11px] text-slate-400">{cs.mindMap.branch3.desc}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <p className="text-xs font-bold text-indigo-300">{cs.mindMap.branch4.title}</p>
                  <p className="text-[11px] text-slate-400">{cs.mindMap.branch4.desc}</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 5: COMPETITIVE ANALYSIS MATRIX (PDF Page 13)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Competitive Analysis</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Comparing standard legacy market approaches against our integrated engineering architecture:
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.04] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="p-4 sm:p-5">Capability / Feature</th>
                  <th className="p-4 text-center">{cs.matrixLabels[0]}</th>
                  <th className="p-4 text-center">{cs.matrixLabels[1]}</th>
                  <th className="p-4 text-center">{cs.matrixLabels[2]}</th>
                  <th className={`p-4 text-center font-black ${accent.primary} ${accent.bg}`}>{cs.matrixLabels[3]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                {cs.matrix.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{row.feat}</td>
                    <td className="p-4 text-center text-slate-600">{row.c1 ? <Check size={16} className="mx-auto text-emerald-400" /> : <X size={16} className="mx-auto text-slate-600" />}</td>
                    <td className="p-4 text-center text-slate-600">{row.c2 ? <Check size={16} className="mx-auto text-emerald-400" /> : <X size={16} className="mx-auto text-slate-600" />}</td>
                    <td className="p-4 text-center text-slate-600">{row.c3 ? <Check size={16} className="mx-auto text-emerald-400" /> : <X size={16} className="mx-auto text-slate-600" />}</td>
                    <td className={`p-4 text-center ${accent.bg} font-bold ${accent.primary}`}>
                      <Check size={18} className={`mx-auto ${accent.primary}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 6: USER RESEARCH & INTERVIEW (PDF Page 12)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">User Research & Insights</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Gathering firsthand operational data from active stakeholders and field operators:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Interview questions */}
            <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">Interview Questions</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                {cs.interviewQuestions.map((q, qIdx) => (
                  <li key={qIdx}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Participants Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-center space-y-6 text-center">
              <div className="space-y-1">
                <span className={`text-3xl font-black ${accent.primary}`}>{cs.participants.count1}</span>
                <p className="text-xs font-bold text-white">{cs.participants.label1}</p>
              </div>
              <div className="h-[1px] bg-white/[0.08]" />
              <div className="space-y-1">
                <span className="text-3xl font-black text-indigo-400">{cs.participants.count2}</span>
                <p className="text-xs font-bold text-white">{cs.participants.label2}</p>
              </div>
            </div>

          </div>

          <HighlightBox accentPrimary={accent.primary}>
            {cs.researchInsights.map((insight, inIdx) => (
              <p key={inIdx} className={inIdx > 0 ? "pt-1" : ""}>
                {inIdx + 1}. {insight}
              </p>
            ))}
          </HighlightBox>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 7: 5W1H FRAMEWORK (PDF Page 11)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">5W1H Framework</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Defining the functional scope through the 5W1H design formulation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cs.fiveWOneH.map((item, i) => (
              <div key={i} className={`p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1.5 hover:${accent.border} transition-all`}>
                <span className={`text-[10px] font-black uppercase tracking-wider ${accent.primary}`}>{item.num}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 8: SYSTEM ARCHITECTURE & DRIVES (PDF Page 10)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">System Architecture & Core Drives</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              The architectural engine that powers real-time updates and resilient data flow:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Drive 1 */}
            <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className={`flex items-center gap-2.5 ${accent.primary}`}>
                <Activity size={20} />
                <h3 className="text-base font-bold text-white">{cs.architecture.drive1.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.architecture.drive1.desc}
              </p>
            </div>

            {/* Drive 2 */}
            <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <Database size={20} />
                <h3 className="text-base font-bold text-white">{cs.architecture.drive2.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cs.architecture.drive2.desc}
              </p>
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 9: HOW MIGHT WE (HMW) (PDF Page 9)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">How Might We (HMW)</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Framing the core design challenges into targeted engineering solutions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cs.hmw.map((hmw, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
                <h4 className="text-sm font-bold text-white leading-snug">{hmw.q}</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  {hmw.pts.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${accent.primary}`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 10: REVENUE & ECOSYSTEM MODEL (PDF Page 8)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Platform Ecosystem & Value Flow</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Sustainable platform incentives for all interconnected participants:
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] relative overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {cs.ecosystem.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <h4 className={`text-xs font-bold ${accent.primary}`}>{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 11: TASK ANALYSIS & FLOWCHART (PDF Page 7)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Task Analysis & User Flow</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Flowchart of the end-to-end operational lifecycle:
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-6">
            {cs.taskFlows.map((flow, fIdx) => (
              <React.Fragment key={fIdx}>
                <div className="space-y-2">
                  <span className={`text-xs font-black uppercase tracking-wider ${accent.primary}`}>{flow.stepName}</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {flow.nodes.map((node, nIdx) => (
                      <React.Fragment key={nIdx}>
                        <span className={`px-3 py-1.5 rounded-xl ${nIdx === flow.nodes.length - 1 ? `${accent.bg} border ${accent.border} ${accent.primary}` : 'bg-white/10 text-white'} font-semibold`}>
                          {node}
                        </span>
                        {nIdx < flow.nodes.length - 1 && <ChevronRight size={14} className="text-slate-500" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {fIdx < cs.taskFlows.length - 1 && <div className="h-[1px] bg-white/[0.06]" />}
              </React.Fragment>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            UI SHOWCASE 1: ROLE ONBOARDING (PDF Page 5 & 6)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Onboarding & Configuration</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A streamlined onboarding flow tailored to each role's requirements:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
            
            {/* Mockup 1: Role Selector */}
            <PhoneMockup imageSrc={cs.mockupImages?.onboard1} alt={cs.mockupScreens.onboard1.roleTitle}>
              <div className="space-y-3">
                <div className="text-center space-y-1 pt-2">
                  <div className={`w-8 h-8 rounded-full ${accent.bg} border ${accent.border} mx-auto flex items-center justify-center ${accent.primary} font-black text-xs`}>
                    GW
                  </div>
                  <h4 className="text-xs font-black text-white">{cs.mockupScreens.onboard1.roleTitle}</h4>
                  <p className="text-[9px] text-slate-400">{cs.mockupScreens.onboard1.roleDesc}</p>
                </div>

                <div className="space-y-2 pt-1">
                  {cs.mockupScreens.onboard1.roles.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className={`p-2.5 rounded-xl border transition-all ${
                        role.active
                          ? `${accent.bg} ${accent.border} ${accent.primary}`
                          : 'bg-white/[0.03] border-white/10 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white">{role.title}</span>
                        {role.active && <CheckCircle size={12} className={accent.primary} />}
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">{role.desc}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-black text-[10px] uppercase">
                  Continue Setup
                </button>
              </div>
            </PhoneMockup>

            {/* Mockup 2: Profile Setup */}
            <PhoneMockup imageSrc={cs.mockupImages?.onboard2} alt={cs.mockupScreens.onboard2.stepTitle}>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-[11px] font-black text-white">{cs.mockupScreens.onboard2.stepTitle}</span>
                  <span className={`text-[9px] ${accent.primary} font-bold`}>Step 2 of 3</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase font-bold">{cs.mockupScreens.onboard2.field1Label}</span>
                    <p className="text-xs font-mono font-bold text-white">{cs.mockupScreens.onboard2.field1Val}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase font-bold">{cs.mockupScreens.onboard2.field2Label}</span>
                    <p className="text-[11px] font-bold text-slate-200">{cs.mockupScreens.onboard2.field2Val}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[9px] text-slate-400 uppercase font-bold">{cs.mockupScreens.onboard2.field3Label}</span>
                    <p className={`text-[11px] font-bold ${accent.primary}`}>{cs.mockupScreens.onboard2.field3Val}</p>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-[10px]">
                  Confirm Details
                </button>
              </div>
            </PhoneMockup>

            {/* Mockup 3: Verification */}
            <PhoneMockup imageSrc={cs.mockupImages?.onboard3} alt={cs.mockupScreens.onboard3.profileTitle}>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-[11px] font-black text-white">{cs.mockupScreens.onboard3.profileTitle}</span>
                  <span className="text-[9px] text-emerald-400 font-bold">{cs.mockupScreens.onboard3.status}</span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-300">
                    <Shield size={18} />
                  </div>
                  <p className="text-[11px] font-bold text-white">{cs.mockupScreens.onboard3.cardMain}</p>
                  <p className="text-[9px] text-slate-400">{cs.mockupScreens.onboard3.cardSub}</p>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.onboard3.item1L}</span>
                    <span className="text-emerald-400 font-bold">{cs.mockupScreens.onboard3.item1R}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.onboard3.item2L}</span>
                    <span className="text-white font-bold">{cs.mockupScreens.onboard3.item2R}</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-black text-[10px]">
                  Open Active Terminal
                </button>
              </div>
            </PhoneMockup>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            UI SHOWCASE 2: INTERACTIVE FLOW & QUESTIONS (PDF Page 4)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Interactive Setup & Flow</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Context-based multi-step configuration flow:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
            
            {/* Step 1 */}
            <PhoneMockup imageSrc={cs.mockupImages?.action1} alt={cs.mockupScreens.action1.q}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className={`text-[9px] ${accent.primary} font-bold uppercase`}>{cs.mockupScreens.action1.step}</span>
                  <h4 className="text-xs font-black text-white">{cs.mockupScreens.action1.q}</h4>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {cs.mockupScreens.action1.options.map((opt, cIdx) => (
                    <div
                      key={cIdx}
                      className={`p-2 rounded-xl border text-[9px] font-bold text-center ${
                        cIdx === 0 ? `${accent.bg} ${accent.border} ${accent.primary}` : 'bg-white/[0.03] border-white/10 text-slate-400'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold">{cs.mockupScreens.action1.bottomLabel}</span>
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className={accent.primary}>{cs.mockupScreens.action1.bottomVal}</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-black text-[10px]">
                  Next Step
                </button>
              </div>
            </PhoneMockup>

            {/* Step 2 */}
            <PhoneMockup imageSrc={cs.mockupImages?.action2} alt={cs.mockupScreens.action2.q}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className={`text-[9px] ${accent.primary} font-bold uppercase`}>{cs.mockupScreens.action2.step}</span>
                  <h4 className="text-xs font-black text-white">{cs.mockupScreens.action2.q}</h4>
                </div>

                <div className="space-y-2 text-[10px]">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <MapPin size={11} /> Origin / Checkpoint
                    </div>
                    <p className="text-[10px] text-slate-200">{cs.mockupScreens.action2.box1Val}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <div className={`flex items-center gap-1 ${accent.primary} font-bold`}>
                      <MapPin size={11} /> Destination / Target
                    </div>
                    <p className="text-[10px] text-slate-200">{cs.mockupScreens.action2.box2Val}</p>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-black text-[10px]">
                  Next: Review & Confirm
                </button>
              </div>
            </PhoneMockup>

            {/* Step 3 */}
            <PhoneMockup imageSrc={cs.mockupImages?.action3} alt={cs.mockupScreens.action3.q}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className={`text-[9px] ${accent.primary} font-bold uppercase`}>{cs.mockupScreens.action3.step}</span>
                  <h4 className="text-xs font-black text-white">{cs.mockupScreens.action3.q}</h4>
                </div>

                <div className={`p-3 rounded-2xl ${accent.bg} border ${accent.border} space-y-2 text-[10px]`}>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.action3.fee1L}</span>
                    <span className="text-white font-bold">{cs.mockupScreens.action3.fee1R}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.action3.fee2L}</span>
                    <span className="text-white font-bold">{cs.mockupScreens.action3.fee2R}</span>
                  </div>
                  <div className="h-[1px] bg-white/10" />
                  <div className="flex justify-between font-bold text-xs">
                    <span className={accent.primary}>{cs.mockupScreens.action3.totalL}</span>
                    <span className={accent.primary}>{cs.mockupScreens.action3.totalR}</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-wider">
                  {cs.mockupScreens.action3.btn}
                </button>
              </div>
            </PhoneMockup>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            UI SHOWCASE 3: LIVE TELEMETRY CENTERPIECE (PDF Page 3 & 22)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Live Execution & Telemetry Engine</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Real-time monitoring, state machine triggers, and sub-second updates:
            </p>
          </div>

          <div className="py-8 flex justify-center">
            <div className={`w-full max-w-md p-6 sm:p-8 rounded-[3rem] bg-gradient-to-b ${accent.bg} via-white/[0.02] to-transparent border ${accent.border} ${accent.glow} relative`}>
              
              <PhoneMockup
                className="max-w-[310px]"
                videoSrc={cs.mockupVideos?.liveTrip || (slug === 'greenwave' ? '/GreenWaveExp.mp4' : undefined)}
                imageSrc={cs.mockupImages?.liveTrip}
                alt={cs.mockupScreens.liveTrip.title}
              >
                <div className="space-y-3">
                  
                  {/* Top Trip Header */}
                  <div className="flex items-center justify-between pb-1 border-b border-white/10">
                    <div>
                      <span className={`text-[11px] font-black ${accent.primary}`}>{cs.mockupScreens.liveTrip.title}</span>
                      <p className="text-[8px] text-slate-400">{cs.mockupScreens.liveTrip.id}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] font-bold">{cs.mockupScreens.liveTrip.status}</span>
                  </div>

                  {/* Simulated Map / Telemetry View */}
                  <div className="h-44 rounded-2xl bg-slate-900 border border-slate-700/60 p-3 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:14px_14px]" />
                    
                    <div className="z-10 flex justify-between items-center text-[9px] font-bold text-slate-300">
                      <span>{cs.mockupScreens.liveTrip.routeName}</span>
                      <span className={accent.primary}>{cs.mockupScreens.liveTrip.eta}</span>
                    </div>

                    <div className="z-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2 flex items-center justify-between text-[9px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-200 font-semibold">{cs.mockupScreens.liveTrip.banner}</span>
                      </div>
                      <span className={`font-bold ${accent.primary}`}>{cs.mockupScreens.liveTrip.speed}</span>
                    </div>
                  </div>

                  {/* Status Checkpoints */}
                  <div className="space-y-1.5 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-[9px]">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>{cs.mockupScreens.liveTrip.check1}</span>
                    </div>
                    <div className={`flex items-center justify-between ${accent.primary} font-bold`}>
                      <span>{cs.mockupScreens.liveTrip.check2}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{cs.mockupScreens.liveTrip.check3}</span>
                    </div>
                  </div>

                </div>
              </PhoneMockup>

            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            UI SHOWCASE 4: OUTCOME & SUCCESS (PDF Page 2)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Outcome & Success Verification</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Verified outcomes, digital reporting, and performance clearance:
            </p>
          </div>

          <div className="py-6 flex justify-center">
            <PhoneMockup className="max-w-[300px]" imageSrc={cs.mockupImages?.podSuccess} alt={cs.mockupScreens.podSuccess.title}>
              <div className="space-y-4 text-center pt-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white">{cs.mockupScreens.podSuccess.title}</h3>
                  <p className="text-[10px] text-slate-400">{cs.mockupScreens.podSuccess.desc}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-left space-y-1.5 text-[9px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.podSuccess.item1L}</span>
                    <span className="text-white font-bold">{cs.mockupScreens.podSuccess.item1R}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.podSuccess.item2L}</span>
                    <span className="text-white font-bold">{cs.mockupScreens.podSuccess.item2R}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{cs.mockupScreens.podSuccess.item3L}</span>
                    <span className="text-amber-400 font-bold">{cs.mockupScreens.podSuccess.item3R}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-white text-black font-black text-[10px] uppercase">
                  {cs.mockupScreens.podSuccess.btn}
                </button>
              </div>
            </PhoneMockup>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 12: KEY HIGHLIGHTS & CHECKLIST
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Key Features & Highlights</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Core technical capabilities delivered across the codebase:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {cs.highlights.map((hl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-start gap-3 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:${accent.border} hover:bg-white/[0.05] transition-all`}
              >
                <CheckCircle2 size={16} className={`${accent.primary} shrink-0 mt-0.5`} />
                <span className="text-slate-300 text-sm font-medium leading-snug">{hl}</span>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 13: USABILITY TESTING & PERFORMANCE (PDF Page 21)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Usability Testing & Performance</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Validating reliability, response times, and real-world system stability:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cs.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-center">
                <span className={`text-3xl font-black ${mIdx === 0 ? accent.primary : mIdx === 1 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                  {metric.value}
                </span>
                <p className="text-xs font-bold text-white">{metric.label}</p>
                <p className="text-[11px] text-slate-400">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════════
            SECTION 14: CONCLUSION & NEXT PROJECT (PDF Page 19)
        ══════════════════════════════════════════════════════════ */}
        <section className="space-y-12 pt-6">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center space-y-6">
            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Conclusion</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {cs.conclusionText}
              </p>
            </div>

            <button
              onClick={() => router.push('/#projects')}
              className="px-8 py-3.5 rounded-full bg-white text-black font-black text-sm hover:bg-slate-200 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Go Back to Portfolio
            </button>
          </div>

          {/* Next Project Preview Card (PDF Page 19) */}
          {nextProject && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Next Project</span>
              <Link
                href={`/project/${nextProject.slug}`}
                className={`group block p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:${accent.border} hover:bg-white/[0.04] transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${accent.primary}`}>{nextProject.category || "Case Study"}</span>
                    <h3 className={`text-xl sm:text-2xl font-bold text-white group-hover:${accent.primary} transition-colors`}>
                      {nextProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
                      {nextProject.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    <span>View Case Study</span>
                    <ArrowRight size={16} className={accent.primary} />
                  </div>
                </div>
              </Link>
            </div>
          )}

        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-600">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kishor Kumar S. All rights reserved.</p>
          <div className="flex gap-4 text-slate-400">
            <a href="https://github.com/kishor-2646" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/kishor-kumar-s" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}