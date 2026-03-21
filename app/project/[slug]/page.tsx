"use client";

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, ExternalLink, Users, Clock,
  CheckCircle2, Layers, Trophy, AlertCircle, Lightbulb,
  TrendingUp, Code2, ImageIcon,
} from 'lucide-react';
import { PROJECTS } from '../../lib/data';
import { useHasMounted } from '../../lib/hooks';

// ── Accent colour per project index ─────────────────────────
const ACCENTS = [
  { primary: 'text-cyan-400',   border: 'border-cyan-500/40',   bg: 'bg-cyan-500/10',   glow: 'shadow-[0_0_30px_rgba(34,211,238,0.15)]',  gradFrom: 'from-cyan-500',   gradTo: 'to-blue-500'    },
  { primary: 'text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-500/10', glow: 'shadow-[0_0_30px_rgba(99,102,241,0.15)]',  gradFrom: 'from-indigo-500', gradTo: 'to-violet-500'  },
  { primary: 'text-emerald-400',border: 'border-emerald-500/40',bg: 'bg-emerald-500/10',glow: 'shadow-[0_0_30px_rgba(52,211,153,0.15)]',  gradFrom: 'from-emerald-500',gradTo: 'to-cyan-500'    },
  { primary: 'text-pink-400',   border: 'border-pink-500/40',   bg: 'bg-pink-500/10',   glow: 'shadow-[0_0_30px_rgba(244,114,182,0.15)]', gradFrom: 'from-pink-500',   gradTo: 'to-violet-500'  },
];

// ── Section block ────────────────────────────────────────────
const Section = ({ icon: Icon, label, children, accent }: {
  icon: React.ElementType; label: string; children: React.ReactNode;
  accent: typeof ACCENTS[0];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`bg-white/[0.04] backdrop-blur-2xl border ${accent.border} rounded-[2rem] p-8 space-y-4 ${accent.glow}`}
  >
    <div className={`flex items-center gap-3 ${accent.primary}`}>
      <Icon size={20} />
      <h3 className="text-sm font-black uppercase tracking-[0.3em]">{label}</h3>
    </div>
    <div>{children}</div>
  </motion.div>
);

export default function ProjectDetailPage() {
  const params   = useParams();
  const router   = useRouter();
  const hasMounted = useHasMounted();
  const slug     = params?.slug as string;

  const project  = PROJECTS.find(p => p.slug === slug);
  const idx      = PROJECTS.findIndex(p => p.slug === slug);
  const accent   = ACCENTS[idx % ACCENTS.length];

  // Background particles
  const particles = useMemo(() => [...Array(16)].map((_, i) => ({
    x: `${(i * 6.5) % 92}%`,
    size: 3 + (i % 4) * 2,
    duration: 6 + (i % 5) * 2,
    delay: i * 0.5,
  })), []);

  // 404 state
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500 text-6xl font-black">404</p>
          <p className="text-slate-600">Project not found</p>
          <button onClick={() => router.push('/')}
            className="px-6 py-3 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const d = project.details;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }} />
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${accent.bg} rounded-full blur-[160px] opacity-30`} />
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${accent.bg} rounded-full blur-[120px] opacity-20`} />

        {/* Floating particles */}
        {hasMounted && particles.map((p, i) => (
          <motion.div key={i}
            className={`absolute rounded-full ${accent.bg} border ${accent.border}`}
            style={{ width: p.size, height: p.size, left: p.x }}
            animate={{ y: ['100vh', '-5vh'], opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay }}
          />
        ))}
      </div>

      {/* ── Top navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-150 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-150" />
            <span className="text-sm font-bold">Back</span>
          </button>

          <div className="flex items-center gap-2 font-black text-white tracking-tighter">
            <div className="bg-white text-black p-1 rounded-lg"><Code2 size={18} /></div>
            <span className="text-lg">DEVPORT.26</span>
          </div>

          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border ${accent.border} ${accent.bg} ${accent.primary} hover:opacity-80 transition-all duration-150`}>
                <Github size={13} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white text-black hover:opacity-80 transition-all duration-150">
                <ExternalLink size={13} /> Live
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-24 space-y-10">

        {/* ── Hero block ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="space-y-6">

          {/* Status + featured badge row */}
          <div className="flex flex-wrap items-center gap-3">
            {project.isFeatured && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase tracking-widest">
                <Trophy size={11} /> Featured
              </span>
            )}
            {d?.status && (
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${accent.border} ${accent.bg} ${accent.primary}`}>
                {d.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
            {project.title}
          </h1>

          {/* Gradient underline */}
          <div className={`h-[3px] w-32 rounded-full bg-gradient-to-r ${accent.gradFrom} ${accent.gradTo} shadow-[0_0_16px_rgba(99,102,241,0.5)]`} />

          {/* Meta strip */}
          {d && (
            <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} className={accent.primary} />
                <span className="font-bold">{d.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className={accent.primary} />
                <span className="font-bold">{d.teamSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={14} className={accent.primary} />
                <span className="font-bold">{d.role.split('—')[0].trim()}</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className={`text-[10px] uppercase tracking-[0.15em] font-black px-3 py-1.5 rounded-lg border ${accent.border} ${accent.bg} ${accent.primary}`}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Hero image ── */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className={`w-full aspect-[16/8] rounded-[2rem] overflow-hidden border ${accent.border} bg-slate-950 relative`}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: `linear-gradient(to right,#22d3ee 1px,transparent 1px),linear-gradient(to bottom,#22d3ee 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
              <ImageIcon size={40} className="text-slate-700" />
              <span className="text-slate-700 text-xs font-black uppercase tracking-widest">Screenshot coming soon</span>
            </div>
          )}
        </motion.div>

        {/* ── Detail sections grid ── */}
        {d && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`md:col-span-2 bg-white/[0.04] backdrop-blur-2xl border ${accent.border} rounded-[2rem] p-8 ${accent.glow}`}>
              <div className={`flex items-center gap-3 mb-4 ${accent.primary}`}>
                <Layers size={20} />
                <h3 className="text-sm font-black uppercase tracking-[0.3em]">Overview</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">{d.overview}</p>
            </motion.div>

            {/* Problem */}
            <Section icon={AlertCircle} label="The Problem" accent={accent}>
              <p className="text-slate-300 leading-relaxed">{d.problem}</p>
            </Section>

            {/* Solution */}
            <Section icon={Lightbulb} label="The Solution" accent={accent}>
              <p className="text-slate-300 leading-relaxed">{d.solution}</p>
            </Section>

            {/* Impact */}
            <Section icon={TrendingUp} label="Impact & Results" accent={accent}>
              <p className="text-slate-300 leading-relaxed">{d.impact}</p>
            </Section>

            {/* Role */}
            <Section icon={Users} label="My Role" accent={accent}>
              <p className="text-slate-300 leading-relaxed">{d.role}</p>
            </Section>

            {/* Key highlights — full width */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`md:col-span-2 bg-white/[0.04] backdrop-blur-2xl border ${accent.border} rounded-[2rem] p-8 ${accent.glow}`}>
              <div className={`flex items-center gap-3 mb-6 ${accent.primary}`}>
                <CheckCircle2 size={20} />
                <h3 className="text-sm font-black uppercase tracking-[0.3em]">Key Features & Highlights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {d.highlights.map((hl, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className={`flex items-start gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-150`}>
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${accent.bg} border ${accent.border}`} />
                    <span className="text-slate-300 text-sm font-medium leading-snug">{hl}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Screenshots gallery — only if screenshots provided */}
            {d.screenshots.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`md:col-span-2 bg-white/[0.04] backdrop-blur-2xl border ${accent.border} rounded-[2rem] p-8`}>
                <div className={`flex items-center gap-3 mb-6 ${accent.primary}`}>
                  <ImageIcon size={20} />
                  <h3 className="text-sm font-black uppercase tracking-[0.3em]">Screenshots</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {d.screenshots.map((src, i) => (
                    <div key={i} className={`rounded-2xl overflow-hidden border ${accent.border} aspect-video`}>
                      <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ── Footer CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.08]">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-150 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-150" />
            Back to all projects
          </button>
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border ${accent.border} ${accent.bg} ${accent.primary} font-black text-sm hover:opacity-80 transition-all duration-150`}>
                <Github size={15} /> View on GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-black text-sm hover:opacity-90 transition-all duration-150">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

      </main>
    </div>
  );
}