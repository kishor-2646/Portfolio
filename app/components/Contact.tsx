"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Clock, Zap } from 'lucide-react';
import { EMAIL, SOCIAL, LOCATION, RESPONSE_TIME, AVAILABILITY_STATUS, RESUME_URL } from '../lib/data';
import { scrollReveal, ease, dur } from '../lib/motion';
import portfolioConfig from '../../portfolio.config';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-28 px-6 md:px-10 lg:px-20 text-white overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">

        {/* Header */}
        <motion.div {...scrollReveal(0)} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#FF7E33]/50" />
            <span className="text-xs font-black text-[#FF7E33] uppercase tracking-[0.35em]">Contact</span>
            <div className="h-px w-12 bg-[#FF7E33]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Let&apos;s work <span className="text-[#FF7E33]">together</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-md mx-auto">
            {portfolioConfig.contact.subheading}
          </p>
        </motion.div>

        {/* Email CTA — primary action with accent sweep */}
        <motion.div {...scrollReveal(0.08)} className="text-center">
          <motion.a
            href={`mailto:${EMAIL}`}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF7A1A, #FF9B52)',
              boxShadow: '0 8px 24px rgba(255,122,26,0.28)',
            }}
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(255,122,26,0.42)' }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            {/* Sheen sweep on hover */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                translateX: '-120%',
              }}
              whileHover={{ translateX: '120%' }}
              transition={{ duration: 0.55, ease: ease.inOut }}
            />
            <Mail size={20} />
            {EMAIL}
          </motion.a>
        </motion.div>

        {/* Info grid */}
        <motion.div {...scrollReveal(0.14)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <MapPin size={18} className="text-[#FF7E33]" />, label: 'Location', value: LOCATION },
            { icon: <Clock  size={18} className="text-[#FF7E33]" />, label: 'Response', value: RESPONSE_TIME },
            { icon: <Zap    size={18} className="text-[#FF7E33]" />, label: 'Status',   value: AVAILABILITY_STATUS },
          ].map(({ icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: dur.normal, delay: 0.16 + i * 0.06, ease: ease.out }}
              className="flex items-center gap-3 p-4 rounded-xl cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', borderColor: 'rgba(255,126,51,0.3)' }}
            >
              <div className="p-2 bg-white/5 rounded-lg border border-white/8 shrink-0">{icon}</div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-white/90">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Socials */}
        <motion.div {...scrollReveal(0.20)} className="flex flex-wrap items-center justify-center gap-4">
          {[
            { href: SOCIAL.github,     icon: <Github size={20} />,   label: 'GitHub'   },
            { href: SOCIAL.linkedin,   icon: <Linkedin size={20} />, label: 'LinkedIn' },
            { href: `mailto:${EMAIL}`, icon: <Mail size={20} />,     label: 'Email'    },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-12 h-12 bg-white/5 border border-white/10 shadow-sm rounded-full flex items-center justify-center text-white/60"
              whileHover={{ backgroundColor: '#FF7E33', color: '#fff', borderColor: '#FF7E33', scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: dur.fast, ease: ease.out }}
            >
              {icon}
            </motion.a>
          ))}
          <motion.a
            href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white/70 font-semibold text-sm bg-white/5"
            whileHover={{ borderColor: 'rgba(255,126,51,0.5)', color: '#FF7E33', y: -2, background: 'rgba(255,126,51,0.08)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Availability badge */}
        <motion.div {...scrollReveal(0.24)} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7E33]/10 border border-[#FF7E33]/25 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#FF7E33] animate-pulse" />
            <span className="text-sm font-bold text-[#FF7E33]">Available for new opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}