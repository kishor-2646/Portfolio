"use client";

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Layers, Database, Smartphone, Zap, ChevronRight, User, Github, Linkedin, Mail, Terminal, Code2, Cpu, GitBranch } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { SPRING_CONFIG } from '../lib/constants';
import { TAGLINE, ROLE, RESUME_URL, NAME, EMAIL, SOCIAL, HERO_SUBTITLE, HERO_UI } from '../lib/data';

const FLOATING_ICONS = [Layers, Database, Smartphone, Zap];

const TypewriterCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity }}
    className="inline-block w-[3px] h-[0.85em] bg-cyan-400 ml-1 align-middle shadow-[0_0_8px_rgba(34,211,238,0.8)]"
  />
);

const OrbitBadge = ({ icon: Icon, label, angle, radius }: {
  icon: React.ElementType; label: string; angle: number; radius: number;
}) => {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  return (
    <motion.div
      className="absolute z-50 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 border border-white/20 backdrop-blur-xl rounded-full text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3 + angle * 0.01, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon size={11} className="text-cyan-400" />
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{label}</span>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const hasMounted = useHasMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const cubes = useMemo(() => [...Array(10)].map(() => ({
    x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
    y: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
    duration: 20 + Math.random() * 20,
    delay: Math.random() * 5,
    size: 10 + Math.random() * 18,
  })), []);

  const taglineWords  = TAGLINE.split(' ');
  const taglinePlain  = taglineWords.slice(0, -3).join(' ');
  const taglineColour = taglineWords.slice(-3).join(' ');

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center px-4 bg-black overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `linear-gradient(to right,#6366f1 1px,transparent 1px),linear-gradient(to bottom,#6366f1 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)`, backgroundSize: '60px 60px' }} />
        </motion.div>
        {hasMounted && (
          <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {cubes.map((cube, i) => (
              <motion.div key={i}
                className="absolute bg-white/[0.12] border border-white/25 rounded-lg backdrop-blur-sm"
                style={{ width: cube.size, height: cube.size }}
                animate={{ left: cube.x, top: cube.y, opacity: [0, 0.7, 0.7, 0], rotate: [0, 180, 360], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: cube.duration, repeat: Infinity, ease: 'linear', delay: cube.delay }}
              />
            ))}
          </div>
        )}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_90%)] z-20 pointer-events-none" />
      </div>

      {/* ── Content — full viewport height, no scroll needed ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-30 w-full pt-20">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-5 text-left order-2 lg:order-1">

          {/* Terminal line */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex items-center gap-2 font-mono text-sm text-slate-500">
            <Terminal size={13} className="text-indigo-400" />
            <span className="text-indigo-400">kishor@devport</span>
            <span className="text-slate-600">:</span>
            <span className="text-cyan-400">~</span>
            <span className="text-slate-600">$</span>
            <span className="text-slate-400 ml-1">./build --passion --scale</span>
            {hasMounted && <TypewriterCursor />}
          </motion.div>

          {/* Main tagline — smaller on mobile to fit screen */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95]">
            {taglinePlain} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300">
              {taglineColour}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
            {ROLE} <span className="text-slate-600 mx-1">—</span> {HERO_SUBTITLE}
          </motion.p>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="flex items-center gap-5 py-3 border-y border-white/[0.06]">
            {HERO_UI.statsStrip.map((s: {val:string;lbl:string}, i: number) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-black text-white">{s.val}</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.lbl}</span>
              </div>
            ))}
            <div className="w-[1px] h-7 bg-white/10 mx-1" />
            <div className="flex gap-1.5 flex-wrap">
              {HERO_UI.techTags.map((t: string) => (
                <span key={t} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-slate-400 uppercase tracking-wider">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="group px-8 py-4 bg-white text-black hover:scale-105 active:scale-95 rounded-2xl font-black text-base shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2 cursor-pointer">
              {HERO_UI.primaryBtn}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all text-base backdrop-blur-md text-center shadow-inner">
              {HERO_UI.secondaryBtn}
            </a>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">

          {/* Floating corner icons */}
          {FLOATING_ICONS.map((Icon, idx) => (
            <motion.div key={idx}
              animate={{ y: [0, idx % 2 === 0 ? -10 : 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 + idx, ease: 'easeInOut', delay: idx * 0.5 }}
              className={`absolute z-40 p-3 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl text-white ${
                idx === 0 ? 'top-2 right-2' : idx === 1 ? 'top-1/3 -left-4' : idx === 2 ? 'bottom-1/3 -right-4' : '-bottom-1 left-6'
              }`}>
              <Icon size={22} className="text-slate-300" />
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="relative flex flex-col items-center gap-4">

            <div className="absolute -inset-12 bg-indigo-500/12 rounded-full blur-[80px] pointer-events-none" />

            {/* Orbit badges */}
            {hasMounted && (
              <>
                <OrbitBadge icon={Code2}     label="Flutter"  angle={-30}  radius={200} />
                <OrbitBadge icon={Cpu}       label="Firebase" angle={200}  radius={200} />
                <OrbitBadge icon={GitBranch} label="Java"     angle={155}  radius={170} />
              </>
            )}

            {/* Photo card — compact size to fit screen */}
            <div className="relative w-60 h-60 md:w-[320px] md:h-[320px] rounded-[2rem] overflow-hidden border border-white/15 bg-black shadow-2xl transition-transform duration-700 hover:rotate-1 hover:scale-[1.02]">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-indigo-400/60 rounded-tl-[2rem] z-10" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60 rounded-br-[2rem] z-10" />
              <div className="absolute inset-0">
                 <img
                    src="/photo.jpeg"
                    alt="Kishor Kumar S"
                    className="w-full h-full object-cover object-top"
                 />
             </div>
              {hasMounted && (
                <motion.div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20 pointer-events-none"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
              )}
            </div>

            {/* Name + social — compact */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-2 w-full">

              <div className="flex items-center gap-3 w-full px-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">{HERO_UI.identityLabel}</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                {NAME}
              </h2>

              <div className="h-[2px] w-2/3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_14px_rgba(99,102,241,0.6)]" />

              {/* Social buttons */}
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="flex items-center gap-2 pt-1">
                <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/25 hover:shadow-[0_0_14px_rgba(255,255,255,0.1)] transition-all duration-200">
                  <Github size={13} /><span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
                </a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 transition-all duration-200">
                  <Linkedin size={13} /><span className="text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
                </a>
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/40 transition-all duration-200">
                  <Mail size={13} /><span className="text-[10px] font-black uppercase tracking-widest">Gmail</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;