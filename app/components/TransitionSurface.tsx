"use client";

/**
 * TransitionSurface
 *
 * A continuous white geometric surface (position: fixed, z-index: 9) that smoothly transforms:
 *
 * 1. HERO CARD → THIN LINE (progress 0.00 → 0.40):
 *    Full Hero card geometry → thin 4px vertical line on right side as Hero scrolls out.
 *
 * 2. ABOUT LINE HOLD (progress 0.40 → 0.72):
 *    Holds as a thin 4px vertical line while scrolling through the black About section.
 *
 * 3. SKILLS FILL EXPANSION (progress 0.72 → 0.95):
 *    Expands leftward from thin line to fill the viewport with pure white,
 *    seamlessly merging into the white background of SkillsSection.
 */

import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

export interface CardGeo {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  progress: MotionValue<number>; // phaseA (0 → 1 tracking Hero + About)
  cardGeo: CardGeo;
}

// Ultra-smooth cubic easing helpers
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const LINE_W = 4; // thin line width in px
const LINE_R = 2; // corner radius in line state

export default function TransitionSurface({ progress, cardGeo }: Props) {
  // lineX: horizontal center of thin line (= card center X, fixed)
  const lineX = cardGeo.left + cardGeo.width / 2;

  // ── LEFT edge ────────────────────────────────────────────────────────────
  const surfLeft = useTransform(progress, (p) => {
    if (p <= 0.40) {
      // Phase 1: Card left → (lineX - LINE_W/2)
      const t = easeInOutCubic(clamp01(p / 0.40));
      return lerp(cardGeo.left, lineX - LINE_W / 2, t);
    } else if (p <= 0.72) {
      // Phase 2: Hold thin line position through About section
      return lineX - LINE_W / 2;
    } else {
      // Phase 3: Expand leftward to cover screen (-50px overscan)
      const t = easeInOutCubic(clamp01((p - 0.72) / 0.23));
      return lerp(lineX - LINE_W / 2, -50, t);
    }
  });

  // ── TOP edge ─────────────────────────────────────────────────────────────
  const surfTop = useTransform(progress, (p) => {
    if (p <= 0.40) {
      // Phase 1: Card top → 0 (viewport top)
      const t = easeInOutCubic(clamp01(p / 0.40));
      return lerp(cardGeo.top, 0, t);
    } else {
      // Phase 2 & 3: Stays at 0
      return 0;
    }
  });

  // ── WIDTH ────────────────────────────────────────────────────────────────
  const surfWidth = useTransform(progress, (p) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    if (p <= 0.40) {
      // Phase 1: Card width → LINE_W
      const t = easeInOutCubic(clamp01(p / 0.40));
      return lerp(cardGeo.width, LINE_W, t);
    } else if (p <= 0.72) {
      // Phase 2: Hold thin line width
      return LINE_W;
    } else {
      // Phase 3: Expand width to cover viewport + overscan
      const t = easeInOutCubic(clamp01((p - 0.72) / 0.23));
      return lerp(LINE_W, vw + 100, t);
    }
  });

  // ── HEIGHT ───────────────────────────────────────────────────────────────
  const surfHeight = useTransform(progress, (p) => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    if (p <= 0.40) {
      // Phase 1: Card height → full viewport height (vh)
      const t = easeInOutCubic(clamp01(p / 0.40));
      return lerp(cardGeo.height, vh, t);
    } else {
      // Phase 2 & 3: Stays full viewport height
      return vh;
    }
  });

  // ── BORDER RADIUS ────────────────────────────────────────────────────────
  const surfRadius = useTransform(progress, (p) => {
    if (p <= 0.40) {
      // Phase 1: 40px → LINE_R
      const t = easeInOutCubic(clamp01(p / 0.40));
      return lerp(40, LINE_R, t);
    } else if (p <= 0.72) {
      // Phase 2: Hold LINE_R
      return LINE_R;
    } else {
      // Phase 3: LINE_R → 0 (flat rectangle fill)
      const t = easeInOutCubic(clamp01((p - 0.72) / 0.23));
      return lerp(LINE_R, 0, t);
    }
  });

  // ── OPACITY ──────────────────────────────────────────────────────────────
  const surfOpacity = useTransform(progress, [0.0, 0.95, 1.0], [1.0, 1.0, 0.0]);

  return (
    <motion.div
      className="pointer-events-none"
      style={{
        position:     'fixed',
        top:          surfTop,
        left:         surfLeft,
        width:        surfWidth,
        height:       surfHeight,
        borderRadius: surfRadius,
        background:   '#FFFFFF',
        opacity:      surfOpacity,
        zIndex:       9,
        willChange:   'transform, width, height, border-radius',
      }}
    />
  );
}
