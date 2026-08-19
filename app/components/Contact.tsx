"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Clock, ArrowUpRight, Copy, Check, Sparkles, Send } from 'lucide-react';
import { EMAIL, SOCIAL, LOCATION, RESPONSE_TIME, AVAILABILITY_STATUS, RESUME_URL } from '../lib/data';
import portfolioConfig from '../../portfolio.config';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 md:px-8 text-white overflow-hidden bg-black"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="w-[96%] max-w-5xl mx-auto space-y-14 relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles size={12} className="text-emerald-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
            Let&apos;s build something exceptional.
          </h2>

          <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            {portfolioConfig.contact.subheading}
          </p>
        </motion.div>

        {/* ── Main Contact Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[28px] sm:rounded-[36px] bg-[#0c0c0c] border border-white/12 p-8 sm:p-12 md:p-14 shadow-[0_32px_80px_rgba(0,0,0,0.95)]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{AVAILABILITY_STATUS}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {EMAIL}
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Typical response time: <span className="text-white/80">{RESPONSE_TIME}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
              >
                <Send size={15} />
                <span>Send Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-medium text-sm transition-all"
              >
                {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Info Grid & Socials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 sm:pt-10">
            
            {/* Location */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Location</p>
                <p className="text-sm font-medium text-white/90 mt-0.5">{LOCATION}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Timezone & Hours</p>
                <p className="text-sm font-medium text-white/90 mt-0.5">IST (UTC+5:30) • Flexible</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 sm:justify-end">
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                title="GitHub"
              >
                <Github size={18} />
              </a>

              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-semibold text-white/80 hover:text-white transition-all ml-1"
              >
                <span>Resume</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}