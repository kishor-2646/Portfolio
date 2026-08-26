"use client";

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BIO, ABOUT_TAGLINE } from '../lib/data';
import Signature from './Signature';
import CinematicPhotoCarousel from './CinematicPhotoCarousel';
import { useScrollDirection } from '../lib/useScrollDirection';
import { ease } from '../lib/motion';

/* ─────────────────────────────────────────────────────────────
   Main AboutSection Component
───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirection = useScrollDirection();

  // Trigger animation repeatedly when entering viewport from both directions
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.15,
    margin: "-8% 0px -8% 0px",
  });

  // Editorial masked reveal with bidirectional translation based on scroll direction
  const textAnim = (delay: number) => {
    const yOffset = scrollDirection === 'down' ? 24 : -24;

    return {
      initial: prefersReduced
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: yOffset },
      animate: (isInView || prefersReduced)
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: yOffset },
      transition: {
        duration: 0.7,
        delay: prefersReduced ? 0 : delay,
        ease: ease.cinematic,
      },
    };
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden pt-60 pb-48 sm:pt-72 sm:pb-60 md:pt-80 md:pb-72 lg:pt-96 lg:pb-80 px-6 sm:px-10 md:px-16 lg:px-24 border-t border-white/5"
      style={{ background: "#000000" }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left half side container — text, typography & signature */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7 md:space-y-8">

          {/* Text Block 1 — Tagline / Core Statement (delay 0.05s) */}
          <motion.div {...textAnim(0.05)}>
            <p className="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.15rem] font-light text-white leading-[1.32] tracking-tight">
              {ABOUT_TAGLINE}
            </p>
          </motion.div>

          {/* Text Block 2 — Bio Impact & Production Scale (delay 0.20s) */}
          <motion.div {...textAnim(0.20)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              {BIO}
            </p>
          </motion.div>

          {/* Text Block 3 — Engineering Philosophy (delay 0.35s) */}
          <motion.div {...textAnim(0.35)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              {ABOUT_TAGLINE}
            </p>
          </motion.div>

          {/* Text Block 4 — Closing Focus (delay 0.50s) */}
          <motion.div {...textAnim(0.50)}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.38rem] font-light text-white/90 leading-[1.5] tracking-tight">
              That’s exactly what I build.
            </p>
          </motion.div>

          {/* Sequential Signature Component */}
          <motion.div {...textAnim(0.65)} className="pt-2">
            <Signature trigger={isInView} />
          </motion.div>

        </div>

        {/* Right half side container — Layered Cinematic Photo Rotation */}
        <motion.div
          {...textAnim(0.25)}
          className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end"
        >
          <CinematicPhotoCarousel />
        </motion.div>
      </div>
    </section>
  );
}