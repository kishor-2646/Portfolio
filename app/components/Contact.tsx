"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => (
  <section id="contact" className="py-32 px-4 bg-black relative overflow-hidden">
    {/* Top fade */}
    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto bg-gradient-to-br from-white/[0.08] to-transparent border border-white/20 rounded-[4rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden group z-30"
    >
      {/* Top colour bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

      <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">Start a project.</h2>
      <p className="text-slate-100 mb-14 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-medium">
        Currently taking on high-impact full-time roles or innovative contract work. Let&apos;s build the exception.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a
          href="mailto:hello@example.com"
          className="w-full sm:w-auto px-12 py-6 bg-white text-black hover:scale-105 rounded-[2rem] font-black text-xl shadow-[0_20px_60px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3"
        >
          <Mail size={24} /> hello@devport.dev
        </a>
        <div className="flex gap-4">
          <a href="#" className="p-6 bg-white/10 hover:bg-white/20 text-white rounded-[2rem] border border-white/10 transition-all">
            <Github size={32} />
          </a>
          <a href="#" className="p-6 bg-white/10 hover:bg-white/20 text-white rounded-[2rem] border border-white/10 transition-all">
            <Linkedin size={32} />
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

export default Contact;
