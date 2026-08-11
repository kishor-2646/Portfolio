/**
 * motion.ts — Centralized Motion System
 *
 * All animation constants, easing curves, and reusable variants
 * live here. Import from this file — never define ad-hoc durations.
 *
 * BUDGET:
 *   70% static  |  20% subtle  |  10% special interactions
 */

// ─────────────────────────────────────────────────────────
//  EASING CURVES
// ─────────────────────────────────────────────────────────
export const ease = {
  /** Sharp deceleration — feels snappy and confident */
  out:        [0.22, 1.0, 0.36, 1.0] as const,
  /** Symmetric — natural for elements moving through space */
  inOut:      [0.65, 0.0, 0.35, 1.0] as const,
  /** Spring-like entrance with slight overshoot */
  spring:     [0.34, 1.25, 0.64, 1.0] as const,
  /** Linear — only for scroll-driven, never for timed */
  linear:     [0.0,  0.0,  1.0,  1.0] as const,
};

// ─────────────────────────────────────────────────────────
//  DURATION TOKENS (seconds)
// ─────────────────────────────────────────────────────────
export const dur = {
  /** Button press, micro feedback */
  micro:   0.18,
  /** Hover state, tooltip */
  fast:    0.22,
  /** Standard UI element transition */
  normal:  0.35,
  /** Section entrance, content reveal */
  reveal:  0.55,
  /** Hero entrance, major transition */
  hero:    0.70,
};

// ─────────────────────────────────────────────────────────
//  REUSABLE VARIANTS
// ─────────────────────────────────────────────────────────

/** Fade + lift — the default reveal. Use for most content. */
export const fadeUp = (delay = 0, distance = 20) => ({
  initial:    { opacity: 0, y: distance },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: dur.reveal, delay, ease: ease.out },
});

/** Scroll-triggered version (whileInView) */
export const scrollReveal = (delay = 0, distance = 20) => ({
  initial:    { opacity: 0, y: distance },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: dur.reveal, delay, ease: ease.out },
});

/** Staggered container for child reveals */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial:    {},
  whileInView:{},
  viewport:   { once: true, margin: '-60px' },
  transition: { staggerChildren, delayChildren },
});

/** Individual child for stagger — pair with staggerContainer */
export const staggerChild = {
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y: 0 },
  transition: { duration: dur.reveal, ease: ease.out },
};

/** Hover lift — standard button / card hover */
export const hoverLift = {
  whileHover: { y: -3, transition: { duration: dur.fast, ease: ease.out } },
  whileTap:   { y:  0, scale: 0.98, transition: { duration: dur.micro } },
};

/** Subtle hover scale — for icons, social links */
export const hoverScale = {
  whileHover: { scale: 1.08, transition: { duration: dur.fast, ease: ease.out } },
  whileTap:   { scale: 0.95, transition: { duration: dur.micro } },
};
