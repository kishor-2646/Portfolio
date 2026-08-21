"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, MapPin, FileText } from 'lucide-react';
import { EMAIL, SOCIAL, LOCATION, RESUME_URL } from '../lib/data';
import portfolioConfig from '../../portfolio.config';
import { ease } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────
   ULTRA-MINIMALIST MONOCHROME CONTACT SECTION
   - Matching reference image style:
     • Prominent Serif Italic Heading
     • Clean, spacious, pitch-black background
     • Very minimal greyish links & metadata (no heavy cards or colors)
───────────────────────────────────────────────────────────── */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-32 sm:py-44 px-4 sm:px-6 md:px-8 text-white bg-black select-none overflow-hidden"
    >
      <div className="w-[96%] max-w-4xl mx-auto text-center space-y-12 sm:space-y-16">
        
        {/* ── Heading matching Reference Style ("Contributed with Impact") ── */}
        <div className="space-y-4">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "115%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: ease.cinematic }}
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white/95 font-normal tracking-tight leading-tight"
            >
              Let&apos;s build something exceptional.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
            className="text-white/45 text-sm sm:text-base md:text-lg max-w-lg mx-auto font-light leading-relaxed tracking-wide"
          >
            {portfolioConfig.contact?.subheading || "Open to full-time engineering roles, internships, and high-impact systems."}
          </motion.p>
        </div>

        {/* ── Primary Email Link (Muted Greyish Typography) ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25, ease: ease.out }}
          className="space-y-3"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/75 hover:text-white transition-colors duration-300 tracking-tight"
            >
              {EMAIL}
            </a>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/40 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-white/90" />
                  <span className="text-white/90">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ── Greyish Minimalist Navigation / Links Grid (Matching Reference Logo Grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: ease.out }}
          className="pt-6 sm:pt-10 border-t border-white/[0.08] max-w-2xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 text-xs sm:text-[13px] tracking-wider uppercase font-medium text-white/45">
            
            {/* GitHub */}
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300"
            >
              <Github size={15} className="opacity-70" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300"
            >
              <Linkedin size={15} className="opacity-70" />
              <span>LinkedIn</span>
            </a>

            {/* Resume */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors duration-300"
            >
              <FileText size={15} className="opacity-70" />
              <span>Resume</span>
              <ArrowUpRight size={13} className="opacity-60" />
            </a>

            {/* Location */}
            <div className="inline-flex items-center gap-1.5 text-white/35">
              <MapPin size={14} className="opacity-60" />
              <span>{LOCATION || "Tamil Nadu, India"}</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}