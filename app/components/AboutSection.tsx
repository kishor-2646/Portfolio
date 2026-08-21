"use client";

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BIO, ABOUT_TAGLINE } from '../lib/data';
import Signature from './Signature';
import CinematicPhotoCarousel from './CinematicPhotoCarousel';

/* ─────────────────────────────────────────────────────────────
   Main AboutSection Component
───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Trigger animation once when 25% of the section enters the viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  // Editorial masked reveal with subtle translation and cinematic deceleration
  const textAnim = (delay: number) => ({
    initial: prefersReduced
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 16 },
    animate: (isInView || prefersReduced)
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 16 },
    transition: {
      duration: 0.8,
      delay: prefersReduced ? 0 : delay,
      ease: [0.16, 1.0, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden pt-44 pb-24 sm:pt-56 sm:pb-32 md:pt-64 md:pb-36 lg:pt-72 lg:pb-40 px-6 sm:px-10 md:px-16 lg:px-24"
      style={{ background: "#000000" }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left half side container — 100% UNCHANGED text, typography & signature */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7 md:space-y-8">

          {/* Text Block 1 — Tagline / Core Statement (delay 0.05s) */}
          <motion.div {...textAnim(0.05)}>
            <p className="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.15rem] font-light text-white leading-[1.32] tracking-tight">
              {ABOUT_TAGLINE}
            </p>
          </motion.div>

          {/* Text Block 2 — Bio Impact & Production Scale (delay 0.40s) */}
          <motion.div {...textAnim(0.40)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              {BIO}
            </p>
          </motion.div>

          {/* Text Block 3 — Engineering Philosophy (delay 0.75s) */}
          <motion.div {...textAnim(0.75)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              {ABOUT_TAGLINE}
            </p>
          </motion.div>

          {/* Text Block 4 — Closing Focus (delay 1.10s) */}
          <motion.div {...textAnim(1.10)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              That’s exactly what I build.
            </p>
          </motion.div>


          {/* 8-Stroke Sequential Signature Component */}
          <motion.div {...textAnim(1.45)} className="pt-2">
            <Signature trigger={isInView} />
          </motion.div>

        </div>

        {/* Right half side container — Layered Cinematic Auto-Playing Photo Rotation */}
        <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end">
          <CinematicPhotoCarousel />
        </div>
      </div>
    </section>
  );
}