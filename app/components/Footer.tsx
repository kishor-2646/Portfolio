"use client";

import React from 'react';
import { Code2 } from 'lucide-react';
import { BRAND, SOCIAL } from '../lib/data';

const Footer: React.FC = () => (
  <footer className="py-16 px-4 border-t border-white/10 bg-black text-slate-400">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Brand */}
      <div className="flex items-center gap-3 font-black text-white text-xl tracking-tighter">
        <div className="bg-white/10 p-2 rounded-lg">
          <Code2 size={24} />
        </div>
        {BRAND.footerLogo}
      </div>

      {/* Copyright */}
      <p className="font-bold text-sm">
        {BRAND.copyright}{' '}
        <span className="text-slate-600 mx-2">|</span>
        {BRAND.madeBy}
      </p>

      {/* Links */}
      <div className="flex gap-8 text-sm font-black uppercase tracking-widest">
        <a href="#" className="hover:text-white transition-colors">Source</a>
        <a href="#" className="hover:text-white transition-colors">License</a>
      </div>
    </div>
  </footer>
);

export default Footer;