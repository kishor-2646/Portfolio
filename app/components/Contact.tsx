"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Zap, Globe, ArrowRight } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { EMAIL, SOCIAL, CONTACT, LOCATION, RESPONSE_TIME, AVAILABILITY_STATUS, CONTACT_BADGE } from '../lib/data';

const Contact: React.FC = () => {
  const hasMounted = useHasMounted();

  // ── Independent moving elements: shooting stars diagonally ──
  const stars = useMemo(() => [...Array(10)].map((_, i) => ({
    startY: `${5 + i * 9}%`,
    length: 80 + Math.random() * 120,
    duration: 2.5 + Math.random() * 2,
    delay: i * 0.7 + Math.random() * 2,
  })), []);

  // ── Independent moving elements: floating glowing orbs ──
  const orbs = useMemo(() => [...Array(8)].map((_, i) => ({
    x: `${10 + i * 11}%`,
    y: `${15 + (i % 4) * 20}%`,
    size: 4 + Math.random() * 6,
    duration: 4 + i * 0.8,
    delay: i * 0.5,
    color: i % 3 === 0 ? 'bg-indigo-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-emerald-400',
    glow:  i % 3 === 0 ? 'shadow-[0_0_14px_rgba(99,102,241,0.9)]' : i % 3 === 1 ? 'shadow-[0_0_14px_rgba(34,211,238,0.9)]' : 'shadow-[0_0_14px_rgba(52,211,153,0.9)]',
  })), []);

  // ── Independent moving elements: expanding pulse circles ──
  const pulseCircles = useMemo(() => [...Array(4)].map((_, i) => ({
    x: `${20 + i * 20}%`,
    y: `${30 + (i % 2) * 40}%`,
    duration: 4 + i,
    delay: i * 1.2,
  })), []);

  return (
    <section id="contact" className="py-32 px-4 bg-black relative overflow-hidden min-h-[70vh] flex flex-col justify-center">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Static dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        {/* Large ambient glows in corners */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.06] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/[0.04] rounded-full blur-[100px]" />

        {/* Shooting stars (diagonal top-left → bottom-right) */}
        {hasMounted && stars.map((star, i) => (
          <motion.div key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{ top: star.startY, width: star.length, transformOrigin: 'left center', rotate: 30 }}
            animate={{ left: ['-20%', '120%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: 'linear', delay: star.delay }}
          />
        ))}

        {/* Floating glowing orbs */}
        {hasMounted && orbs.map((orb, i) => (
          <motion.div key={i}
            className={`absolute rounded-full ${orb.color} ${orb.glow}`}
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
            animate={{ y: [0, -20, 0, 20, 0], x: [0, 10, 0, -10, 0], opacity: [0.4, 1, 0.7, 1, 0.4], scale: [0.8, 1.3, 1, 1.3, 0.8] }}
            transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          />
        ))}

        {/* Expanding pulse rings */}
        {hasMounted && pulseCircles.map((pc, i) => (
          <motion.div key={i}
            className="absolute border border-white/[0.08] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: pc.x, top: pc.y }}
            animate={{ width: [0, 300], height: [0, 300], opacity: [0.6, 0] }}
            transition={{ duration: pc.duration, repeat: Infinity, ease: 'easeOut', delay: pc.delay }}
          />
        ))}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white/[0.04] backdrop-blur-3xl border border-white/15 rounded-[3.5rem] overflow-hidden shadow-2xl"
        >
          {/* Top rainbow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-emerald-500/[0.05] pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-indigo-400/40 rounded-tl-2xl" />
          <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl" />
          <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-emerald-400/40 rounded-bl-2xl" />
          <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-indigo-400/40 rounded-br-2xl" />

          <div className="relative z-10 p-12 md:p-20 text-center">

            {/* Label */}
            <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8">
              <Zap size={13} className="text-indigo-400" />
              <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Let&apos;s collaborate</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
              {CONTACT.heading}
            </motion.h2>

            {/* Subheading */}
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-slate-300 mb-14 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
              {CONTACT.subheading}
            </motion.p>

            {/* CTA row */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center">

              {/* Email CTA */}
              <a href={`mailto:${EMAIL}`}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-[1.5rem] font-black text-lg shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)] active:scale-95 transition-all duration-300">
                <Mail size={22} />
                {CONTACT.ctaLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Social buttons */}
              <div className="flex gap-3">
                <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-6 py-5 bg-white/[0.05] border border-white/15 rounded-[1.5rem] text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,255,255,0.08)] transition-all duration-300">
                  <Github size={22} />
                  <span className="text-sm font-black uppercase tracking-widest hidden sm:block">GitHub</span>
                </a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-6 py-5 bg-white/[0.05] border border-white/15 rounded-[1.5rem] text-slate-300 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 hover:shadow-[0_0_24px_rgba(10,102,194,0.2)] transition-all duration-300">
                  <Linkedin size={22} />
                  <span className="text-sm font-black uppercase tracking-widest hidden sm:block">LinkedIn</span>
                </a>
              </div>
            </motion.div>

            {/* Bottom status strip */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)] animate-pulse" />
<span className="font-bold text-slate-400">{AVAILABILITY_STATUS}</span>
              </div>
              <span className="hidden sm:block text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-slate-600" />
<span>{LOCATION}</span>
              </div>
              <span className="hidden sm:block text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <Send size={13} className="text-slate-600" />
<span>{RESPONSE_TIME}</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;