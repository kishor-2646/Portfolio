"use client";

import React from 'react';
import portfolioConfig from '../../portfolio.config';

/* ─────────────────────────────────────────────────────────────
   MINIMALIST CLASSIC FOOTER (MATCHING REFERENCE IMAGE)
   - "Vibe-coded this website with [Tools]"
   - "Copyright © 2026 Kishor Kumar S. All Rights Reserved."
───────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-12 pb-16 bg-black text-white/50 text-center select-none border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        
        {/* Vibe-coded statement with subtle tech badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-[13px] text-white/55 font-light">
          <span>Vibe-coded this website with</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/85 shadow-sm">
            <span className="text-xs font-semibold text-white">▲ Next.js</span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-semibold text-cyan-400">Tailwind</span>
            <span className="text-white/30">•</span>
            <span className="text-xs font-semibold text-purple-400">Motion</span>
          </div>
        </div>

        {/* Minimal Copyright Notice */}
        <p className="text-[11.5px] sm:text-xs text-white/35 font-light tracking-wide">
          Copyright © {year} {portfolioConfig.name}. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}