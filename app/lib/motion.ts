/**
 * motion.ts — Centralized Motion System & Animation Primitives
 *
 * Cinematic, premium, modern, and minimal motion tokens and reusable variants.
 * Follows the 60fps GPU performance budget: transforms, opacity, and mask reveals.
 */

// ─────────────────────────────────────────────────────────
//  EASING CURVES (CUBIC-BEZIER)
// ─────────────────────────────────────────────────────────
export const ease = {
  /** Ultra-smooth luxury deceleration — best for hero entrances & title reveals */
  cinematic:  [0.16, 1.0, 0.3, 1.0] as const,
  /** Snappy confident deceleration — standard for UI elements & cards */
  out:        [0.22, 1.0, 0.36, 1.0] as const,
  /** Symmetric easing — ideal for scroll-driven position translations */
  inOut:      [0.65, 0.0, 0.35, 1.0] as const,
  /** Organic spring-like overshoot */
  spring:     [0.34, 1.25, 0.64, 1.0] as const,
  /** Linear progression */
  linear:     [0.0,  0.0,  1.0, 1.0] as const,
};

// ─────────────────────────────────────────────────────────
//  DURATION TOKENS (seconds)
// ─────────────────────────────────────────────────────────
export const dur = {
  micro:   0.18, // button press, micro feedback
  fast:    0.24, // hover state, icon transitions
  normal:  0.38, // card hover, pill expansion
  reveal:  0.65, // section entrance, content reveal
  hero:    0.95, // major hero sequence, portrait emergence
};

// ─────────────────────────────────────────────────────────
//  REUSABLE MOTION VARIANTS & REVEAL HELPERS
// ─────────────────────────────────────────────────────────

/** Masked Slide-Up Text Reveal (Requires overflow: hidden on container) */
export const maskedTextReveal = (delay = 0, duration = dur.reveal) => ({
  initial:    { y: "115%", opacity: 0 },
  animate:    { y: "0%",   opacity: 1 },
  transition: { duration, delay, ease: ease.cinematic },
});

/** Scroll-triggered Masked Slide-Up Reveal */
export const scrollMaskReveal = (delay = 0, duration = dur.reveal) => ({
  initial:    { y: "115%", opacity: 0 },
  whileInView:{ y: "0%",   opacity: 1 },
  viewport:   { once: true, margin: "-40px" },
  transition: { duration, delay, ease: ease.cinematic },
});

/** Staggered Container for child reveals */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: { staggerChildren, delayChildren },
  },
  whileInView: {
    transition: { staggerChildren, delayChildren },
  },
  viewport: { once: true, margin: "-50px" },
});

/** Progressive Card Entrance (opacity + subtle translateY + subtle scale) */
export const cardEntrance = (delay = 0, distance = 24) => ({
  initial:    { opacity: 0, y: distance, scale: 0.98 },
  whileInView:{ opacity: 1, y: 0, scale: 1.0 },
  viewport:   { once: true, margin: "-50px" },
  transition: { duration: dur.reveal, delay, ease: ease.out },
});

/** Subtle Hover Lift & Press Interaction */
export const hoverLift = {
  whileHover: { y: -3, scale: 1.01, transition: { duration: dur.fast, ease: ease.out } },
  whileTap:   { y: 0,  scale: 0.98, transition: { duration: dur.micro } },
};

/** Micro Icon Shift (e.g. arrow sliding right on hover) */
export const hoverArrowShift = {
  whileHover: { x: 4, transition: { duration: dur.fast, ease: ease.out } },
};
