"use client";

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { SOCIAL, EMAIL } from '../lib/data';
import portfolioConfig from '../../portfolio.config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200/80 text-slate-600">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FF7E33] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF7E33] flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <div>
              <p className="font-black text-slate-900 text-base tracking-tight">{portfolioConfig.name}</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">{portfolioConfig.role}</p>
            </div>
          </div>

          {/* Credit */}
          <p className="text-sm font-medium flex items-center gap-1.5 text-slate-500">
            Built with <Heart size={12} className="text-[#FF7E33] fill-[#FF7E33]" /> by Kishor
          </p>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { href: SOCIAL.github,      icon: <Github size={16} />,   label: 'GitHub'   },
              { href: SOCIAL.linkedin,    icon: <Linkedin size={16} />, label: 'LinkedIn' },
              { href: `mailto:${EMAIL}`,  icon: <Mail size={16} />,     label: 'Email'    },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:bg-[#FF7E33] hover:text-white hover:border-[#FF7E33] transition-all duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            © {year} {portfolioConfig.name}. Built with Next.js, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}