"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar
 *
 * A 2px accent line at the very top of the viewport showing
 * how far through the page the user has scrolled.
 * Extremely thin — communicates progress without demanding attention.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position:    'fixed',
        top:         0,
        left:        0,
        right:       0,
        height:      2,
        background:  'linear-gradient(90deg, #FF7A1A, #FFB36A)',
        transformOrigin: 'left center',
        zIndex:      100,
        pointerEvents: 'none',
      }}
    />
  );
}
