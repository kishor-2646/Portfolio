"use client";

/**
 * Hero.tsx — Cinematic monochrome hero.
 *
 * Fixes applied:
 *   1. Portrait — taller container (85vh), object-contain, mask starts at 78%
 *   2. Rotating tagline — slide-up/out infinite loop
 *   3. Cursor-reactive soft white radial light (rAF lerp, CSS custom props)
 *   4. Subtle cursor-based portrait parallax (rAF lerp, refs only)
 *   5. Hero min-height 100svh, section overflow:visible so next section enters cleanly
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { NAME, ROLE, EMAIL, SOCIAL } from "../lib/data";
import { ease } from "../lib/motion";

/* ── Bezier tuple type (Framer Motion requirement) ─────── */
type Bezier = [number, number, number, number];
const easeOut: Bezier   = ease.out as unknown as Bezier;
const easeStd: Bezier   = [0.4, 0, 0.2, 1];
const easeSnap: Bezier  = [0.76, 0, 0.24, 1];

/* ── Identity ───────────────────────────────────────────── */
const firstName = NAME.split(" ")[0]; // "Kishor"

/* ── Rotating taglines ──────────────────────────────────── */
const TAGLINES = [
  ROLE,                          // "Software Engineer"
  "Full-Stack Developer",
  "Mobile App Developer",
  "Problem Solver",
];

/* ── Entrance timing (seconds) ──────────────────────────── */
const T = {
  greeting: 0.25,
  role:     0.50,
  portrait: 0.75,
  glow:     1.10,
  cta:      1.30,
  social:   1.50,
};

/* ── Reusable animation helpers ─────────────────────────── */
const fadeUp = (delay: number, distance = 14) => ({
  initial:    { opacity: 0, y: distance },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: easeOut },
});

const fadeIn = (delay: number, duration = 0.8) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration, delay, ease: easeStd },
});

/* ── Props ───────────────────────────────────────────────── */
export interface HeroProps {
  cardBoxRefCallback?: (node: HTMLDivElement | null) => void;
}

/* ════════════════════════════════════════════════════════════
   ROTATING TAGLINE — fixed-height clipping viewport
   Current text slides up + fades out; next slides up + fades in.
════════════════════════════════════════════════════════════ */
function RotatingTagline() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % TAGLINES.length);
    }, 3200); // visible pause ≈ 3.2s (transition = 0.6s, so total ≈ 3.8s per cycle)
    return () => clearInterval(id);
  }, [prefersReduced]);

  const label = TAGLINES[index];
  // Split: all words before last = regular, last word = italic
  const words = label.split(" ");
  const body  = words.slice(0, -1).join(" ");
  const last  = words[words.length - 1];

  return (
    /* Fixed-height clipping viewport — overflow hidden hides entering/leaving text */
    <div
      style={{
        /* Match the h1 line-height so only one line shows at a time */
        overflow:   "hidden",
        /* Precise height: fontSize * lineHeight. We use a generous value
           that still clips. The fontSize for this element is ~clamp(28px,4.6vw,62px).
           At 1.15 lineHeight, max ≈ 72px. We give a bit of room. */
        height:     "clamp(36px, 5.6vw, 76px)",
        display:    "flex",
        alignItems: "flex-end",   /* text sits at the bottom baseline of the viewport */
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={index}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReduced    ? { opacity: 0 } : { opacity: 0, y: -32 }}
          transition={{
            duration: 0.6,
            ease: easeSnap,
          }}
          style={{
            margin:        0,
            padding:       0,
            fontSize:      "clamp(28px, 4.6vw, 62px)",
            fontWeight:    400,
            letterSpacing: "-0.025em",
            color:         "rgba(255,255,255,0.88)",
            lineHeight:    1.1,
            whiteSpace:    "nowrap",
            willChange:    "transform, opacity",
          }}
        >
          {body && <>{body}{" "}</>}
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>{last}</em>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
════════════════════════════════════════════════════════════ */
export default function Hero({ cardBoxRefCallback }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  /* ── Refs (no React state for perf-critical values) ─────── */
  const sectionRef      = useRef<HTMLElement>(null);
  /* backdropGlowRef — sits BEHIND the portrait image, anchored at upper-right */
  const backdropGlowRef = useRef<HTMLDivElement>(null);
  const portraitRef     = useRef<HTMLDivElement>(null);
  const arcRef          = useRef<HTMLDivElement>(null);
  const halftoneRef     = useRef<HTMLDivElement>(null);
  const streakRef       = useRef<HTMLDivElement>(null);

  /* Lerped mouse state — fully managed by rAF, never triggers re-render */
  const mouse = useRef({ tx: 0.5, ty: 0.5, cx: 0.5, cy: 0.5 });
  const rafId = useRef<number>(0);
  const insideHero = useRef(false);

  /* ── Mount readiness (SSR-safe) ─────────────────────────── */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ── rAF loop — cursor light + parallax ─────────────────── */
  useEffect(() => {
    if (prefersReduced) return;

    const LERP = 0.055; // smoothing factor — lower = more inertia

    const tick = () => {
      const m = mouse.current;
      // Smooth interpolation toward target
      m.cx += (m.tx - m.cx) * LERP;
      m.cy += (m.ty - m.cy) * LERP;

      /* ── 1. Backdrop portrait glow — fixed position, opacity driven by hover ── */
      if (backdropGlowRef.current) {
        // Intensity: fades in when inside hero, fades out when mouse leaves
        // Small proximity boost when cursor is near the right half (where the glow lives)
        const proximityBoost = Math.max(0, (m.cx - 0.3) * 0.4); // stronger on right side
        const targetOpacity = insideHero.current
          ? Math.min(1, 0.55 + proximityBoost)
          : 0.18; // dims but never fully disappears — always atmospheric
        const currentOpacity = parseFloat(backdropGlowRef.current.style.opacity || "0.18");
        const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * LERP;
        backdropGlowRef.current.style.opacity = String(nextOpacity);
      }

      /* ── 2. Portrait parallax ──────────────────────── */
      // Offset from center: range -1..1
      const dx = (m.cx - 0.5) * 2;
      const dy = (m.cy - 0.5) * 2;

      if (portraitRef.current) {
        // Portrait: up to ±10px horizontal, ±5px vertical
        portraitRef.current.style.transform =
          `translate(${dx * 10}px, ${dy * 5}px)`;
      }
      if (arcRef.current) {
        // Arc: opposite direction, smaller — gives depth
        arcRef.current.style.transform =
          `translate(${dx * -7}px, ${dy * -4}px)`;
      }
      if (halftoneRef.current) {
        // Halftone: lazy, same direction as portrait but slower
        halftoneRef.current.style.transform =
          `translate(${dx * 5}px, ${dy * 3}px)`;
      }
      if (streakRef.current) {
        // Streak: different axis emphasis
        streakRef.current.style.transform =
          `translate(${dx * -4}px, ${dy * 6}px)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [prefersReduced]);

  /* ── Mouse tracking — only inside hero ──────────────────── */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouse.current.tx = (e.clientX - rect.left) / rect.width;
    mouse.current.ty = (e.clientY - rect.top)  / rect.height;
  }, []);

  const onMouseEnter = useCallback(() => { insideHero.current = true;  }, []);
  const onMouseLeave = useCallback(() => {
    insideHero.current = false;
    // Reset target to center so light fades back
    mouse.current.tx = 0.5;
    mouse.current.ty = 0.5;
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position:      "relative",
        width:         "100%",
        minHeight:     "100svh",
        /* overflow visible — next section enters naturally without clipping portrait */
        overflow:      "hidden",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        background:    "#080808",
      }}
    >

      {/* ── Subtle edge vignette ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          zIndex:        0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%,   transparent 40%, rgba(0,0,0,0.5) 100%),
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(0,0,0,0.85) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Backdrop portrait glow — anchored at upper-right of portrait, BEHIND photo ── */}
      {/* This is the "light source" that bleeds around the portrait edges */}
      {/* Positioned at ~60% from left (right side), ~28% from top (head level) */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          /* Upper-right quadrant of the hero — aligns with portrait head/arc position */
          top:           "18%",
          left:          "50%",          /* starts at center */
          transform:     "translateX(8%)", /* shifted right to match arc side */
          width:         "clamp(280px, 45vw, 580px)",
          height:        "clamp(280px, 45vw, 580px)",
          borderRadius:  "50%",
          /* Multi-stop: very bright white core → soft falloff */
          background:    `radial-gradient(
            circle,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.12) 20%,
            rgba(255,255,255,0.05) 45%,
            rgba(255,255,255,0.01) 65%,
            transparent 80%
          )`,
          pointerEvents: "none",
          zIndex:        2,             /* above vignette but below portrait */
          opacity:       0.18,          /* always slightly visible — atmospheric */
          filter:        "blur(32px)",
          willChange:    "opacity",
          transition:    "opacity 1.2s ease",
        }}
        ref={backdropGlowRef}
      />

      {/* ══════════════════════════════════════════════════════
          HERO CONTENT — centered column
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position:      "relative",
          zIndex:        2,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          width:         "100%",
          minHeight:     "100svh",
        }}
      >

        {/* ── TYPOGRAPHY BLOCK ─────────────────────────────── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            textAlign:     "center",
            paddingTop:    "clamp(96px, 12vh, 130px)",
            gap:           0,
            position:      "relative",
            zIndex:        4,
          }}
        >
          {/* Greeting — "Hi, I'm Kishor" */}
          <motion.div
            {...(ready && !prefersReduced ? fadeUp(T.greeting) : {})}
            style={{ lineHeight: 1.1 }}
          >
            <h1
              style={{
                margin:        0,
                fontSize:      "clamp(38px, 6.5vw, 88px)",
                fontWeight:    300,
                letterSpacing: "-0.03em",
                color:         "rgba(255,255,255,0.92)",
                lineHeight:    1.05,
              }}
            >
              <span style={{ fontWeight: 300 }}>Hi, I&apos;m </span>
              <span style={{ fontWeight: 700 }}>{firstName}</span>
            </h1>
          </motion.div>

          {/* Role — rotating tagline with slide-up transitions */}
          <motion.div
            {...(ready && !prefersReduced ? fadeUp(T.role) : {})}
            style={{ marginTop: "clamp(4px, 0.8vh, 10px)" }}
          >
            <RotatingTagline />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PORTRAIT CONTAINER
            bottom:0 anchors to hero bottom.
            Height: 85vh — enough to show head + shoulders + torso.
            Width: generous, portrait uses object-contain so full
            body is never cropped by the container edges.
        ══════════════════════════════════════════════════════ */}
        <div
          style={{
            position:      "absolute",
            bottom:        0,
            left:          "50%",
            transform:     "translateX(-50%)",
            /* Wide enough that object-contain doesn't squeeze the image */
            width:         "clamp(300px, 58vw, 700px)",
            /* Tall enough to show head + full torso down to feet */
            height:        "clamp(460px, 85vh, 980px)",
            zIndex:        3,
            pointerEvents: "none",
          }}
          ref={cardBoxRefCallback}
        >
          {/* Portrait entrance — rises from below, fades in */}
          <motion.div
            {...(ready && !prefersReduced
              ? {
                  initial:    { opacity: 0, y: 50 },
                  animate:    { opacity: 1, y: 0  },
                  transition: { duration: 1.2, delay: T.portrait, ease: [0.16, 1, 0.3, 1] as Bezier },
                }
              : {}
            )}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* ── Parallax wrapper for portrait image ───────── */}
            <div
              ref={portraitRef}
              style={{
                width:      "100%",
                height:     "100%",
                willChange: "transform",
                position:   "relative",
              }}
            >
              {/* Portrait image — B&W, no border, no card.
                  object-fit: contain ensures the full figure is visible.
                  The container width/height dictates the visible portion.
                  Mask starts at 80% so only the very bottom blends. */}
              <img
                src="/photo.jpeg"
                alt={`${NAME} — ${ROLE}`}
                style={{
                  width:          "100%",
                  height:         "100%",
                  /* contain = full figure visible, no cropping by box edges */
                  objectFit:      "contain",
                  objectPosition: "center bottom",
                  filter:         "grayscale(100%) contrast(1.10) brightness(0.90)",
                  display:        "block",
                  userSelect:     "none",
                  /* Bottom fade — starts very late so body remains visible */
                  WebkitMaskImage: `linear-gradient(
                    to bottom,
                    black 0%,
                    black 72%,
                    rgba(0,0,0,0.6) 85%,
                    transparent 100%
                  )`,
                  maskImage: `linear-gradient(
                    to bottom,
                    black 0%,
                    black 72%,
                    rgba(0,0,0,0.6) 85%,
                    transparent 100%
                  )`,
                }}
                draggable={false}
              />
            </div>

            {/* ── White arc glow + sparkles — top-right of head ── */}
            {/* Matches reference: bright bloomed arc + star cluster */}
            <div
              ref={arcRef}
              style={{
                position:   "absolute",
                /* Positioned so arc wraps upper-right of the head */
                top:        "-2%",
                right:      "2%",
                width:      "clamp(80px, 18vw, 220px)",
                height:     "clamp(80px, 18vw, 220px)",
                willChange: "transform",
                overflow:   "visible",
              }}
            >
              <motion.div
                {...(ready && !prefersReduced ? fadeIn(T.glow, 0.9) : {})}
                style={{ width: "100%", height: "100%", overflow: "visible" }}
              >
                <svg
                  viewBox="0 0 220 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "100%", overflow: "visible" }}
                >
                  <defs>
                    {/* Heavy bloom blur for the outer glow halo */}
                    <filter id="arcBloom" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                      </feMerge>
                    </filter>
                    {/* Medium blur for mid glow */}
                    <filter id="arcMid" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                    {/* Soft sparkle blur */}
                    <filter id="sparkleBlur">
                      <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                  </defs>

                  {/* Layer 1: Outermost wide bloom halo — very soft, wide */}
                  <circle
                    cx="110" cy="110" r="94"
                    stroke="white" strokeWidth="32" strokeOpacity="0.06"
                    fill="none" filter="url(#arcBloom)"
                    strokeDasharray="180 400"
                    strokeDashoffset="-30"
                    strokeLinecap="round"
                  />
                  {/* Layer 2: Medium glow ring */}
                  <circle
                    cx="110" cy="110" r="90"
                    stroke="white" strokeWidth="12" strokeOpacity="0.18"
                    fill="none" filter="url(#arcMid)"
                    strokeDasharray="160 400"
                    strokeDashoffset="-28"
                    strokeLinecap="round"
                  />
                  {/* Layer 3: Inner bright crisp arc — the main visible element */}
                  <circle
                    cx="110" cy="110" r="88"
                    stroke="white" strokeWidth="2.2" strokeOpacity="0.92"
                    fill="none"
                    strokeDasharray="130 400"
                    strokeDashoffset="-22"
                    strokeLinecap="round"
                  />
                  {/* Layer 4: Highlight — very thin bright center of arc */}
                  <circle
                    cx="110" cy="110" r="88"
                    stroke="white" strokeWidth="0.8" strokeOpacity="1"
                    fill="none"
                    strokeDasharray="50 480"
                    strokeDashoffset="30"
                    strokeLinecap="round"
                  />

                  {/* ── SPARKLES — match reference: cluster near arc peak ── */}
                  {/* Large sparkle at arc endpoint (top-right) */}
                  <g transform="translate(189, 44)" opacity="1">
                    <line x1="0" y1="-9" x2="0" y2="9"    stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="-9" y1="0" x2="9" y2="0"    stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="-6" y1="-6" x2="6" y2="6"  stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
                    <line x1="6"  y1="-6" x2="-6" y2="6" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
                  </g>
                  {/* Medium sparkle slightly left of arc peak */}
                  <g transform="translate(168, 25)" opacity="0.75">
                    <line x1="0" y1="-6" x2="0" y2="6"    stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                    <line x1="-6" y1="0" x2="6" y2="0"    stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                    <line x1="-4" y1="-4" x2="4" y2="4"  stroke="white" strokeWidth="0.7" strokeLinecap="round"/>
                    <line x1="4"  y1="-4" x2="-4" y2="4" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>
                  </g>
                  {/* Small sparkle above */}
                  <g transform="translate(148, 12)" opacity="0.55">
                    <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                    <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                  </g>
                  {/* Tiny dot cluster — upper area, fanning out */}
                  <g transform="translate(125, 8)" opacity="0.4">
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
                  </g>
                  {/* Sparkle scattered further from arc — smaller */}
                  <g transform="translate(205, 75)" opacity="0.45">
                    <line x1="0" y1="-4" x2="0" y2="4"  stroke="white" strokeWidth="1" strokeLinecap="round"/>
                    <line x1="-4" y1="0" x2="4" y2="0"  stroke="white" strokeWidth="1" strokeLinecap="round"/>
                  </g>
                  <g transform="translate(212, 110)" opacity="0.28">
                    <line x1="0" y1="-3" x2="0" y2="3"  stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
                    <line x1="-3" y1="0" x2="3" y2="0"  stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
                  </g>
                  {/* Micro dots near arc — small circles instead of crosses */}
                  <circle cx="138" cy="6"  r="1.5" fill="white" opacity="0.5" />
                  <circle cx="110" cy="18" r="1.2" fill="white" opacity="0.35" />
                  <circle cx="200" cy="60" r="1"   fill="white" opacity="0.4" />
                  <circle cx="207" cy="90" r="0.8" fill="white" opacity="0.25" />
                </svg>
              </motion.div>
            </div>

            {/* ── Halftone dot grid — upper right ────────────── */}
            <div
              ref={halftoneRef}
              style={{
                position:   "absolute",
                top:        "6%",
                right:      "-3%",
                width:      "clamp(50px, 10vw, 120px)",
                height:     "clamp(50px, 10vw, 120px)",
                willChange: "transform",
              }}
            >
              <motion.div
                {...(ready && !prefersReduced ? fadeIn(T.glow + 0.15, 0.8) : {})}
                aria-hidden="true"
                style={{
                  width:           "100%",
                  height:          "100%",
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)`,
                  backgroundSize:  "clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px)",
                  WebkitMaskImage: "radial-gradient(ellipse at 90% 20%, white 10%, transparent 75%)",
                  maskImage:       "radial-gradient(ellipse at 90% 20%, white 10%, transparent 75%)",
                }}
              />
            </div>

            {/* ── Left-side subtle glow streak ───────────────── */}
            <div
              ref={streakRef}
              style={{
                position:   "absolute",
                bottom:     "30%",
                left:       "-8%",
                width:      "clamp(40px, 8vw, 90px)",
                height:     "clamp(100px, 20vw, 220px)",
                willChange: "transform",
              }}
            >
              <motion.div
                {...(ready && !prefersReduced ? fadeIn(T.glow + 0.3, 1.0) : {})}
                aria-hidden="true"
                style={{ width: "100%", height: "100%" }}
              >
                <svg viewBox="0 0 90 220" fill="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="streakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="white" stopOpacity="0"   />
                      <stop offset="40%"  stopColor="white" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="white" stopOpacity="0"   />
                    </linearGradient>
                    <filter id="streakBlur">
                      <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                  </defs>
                  <line x1="60" y1="10" x2="10" y2="200"
                    stroke="url(#streakGrad)" strokeWidth="2"
                    strokeLinecap="round" filter="url(#streakBlur)"
                  />
                  <g opacity="0.6">
                    {[0,1,2,3,4].map(row =>
                      [0,1,2,3].map(col => (
                        <circle
                          key={`${row}-${col}`}
                          cx={col * 8 + 18}
                          cy={row * 8 + 170}
                          r="1.2"
                          fill="white"
                          opacity={0.8 - row * 0.12 - col * 0.06}
                        />
                      ))
                    )}
                  </g>
                </svg>
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM CTA AREA
        ══════════════════════════════════════════════════════ */}
        <div
          style={{
            position:       "absolute",
            bottom:         "clamp(20px, 4vh, 48px)",
            left:           0,
            right:          0,
            zIndex:         5,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            "clamp(12px, 2vh, 20px)",
          }}
        >
          {/* "Previously worked with" strip */}
          <motion.div
            {...(ready && !prefersReduced ? fadeIn(T.cta, 0.7) : {})}
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            10,
              flexWrap:       "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize:      12.5,
                fontWeight:    400,
                color:         "rgba(255,255,255,0.35)",
                letterSpacing: "0.01em",
              }}
            >
              Previously worked with
            </span>
            {["Flutter", "Firebase", "Java", "Supabase"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize:      11.5,
                  fontWeight:    500,
                  color:         "rgba(255,255,255,0.30)",
                  border:        "1px solid rgba(255,255,255,0.09)",
                  borderRadius:  999,
                  padding:       "3px 10px",
                  letterSpacing: "0.03em",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            {...(ready && !prefersReduced ? fadeIn(T.cta + 0.1, 0.7) : {})}
            style={{
              display:        "flex",
              gap:            "clamp(10px, 2vw, 16px)",
              flexWrap:       "wrap",
              justifyContent: "center",
            }}
          >
            {/* Primary */}
            <motion.a
              href="#projects"
              onClick={e => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: easeOut }}
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            8,
                padding:        "clamp(12px,1.8vh,16px) clamp(22px,3.5vw,38px)",
                borderRadius:   999,
                fontSize:       "clamp(13px, 1.2vw, 15px)",
                fontWeight:     500,
                color:          "rgba(255,255,255,0.9)",
                background:     "rgba(255,255,255,0.08)",
                border:         "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(10px)",
                cursor:         "pointer",
                textDecoration: "none",
                letterSpacing:  "0.01em",
                transition:     "background 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background    = "rgba(255,255,255,0.13)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor   = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background    = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor   = "rgba(255,255,255,0.14)";
              }}
            >
              View Work
              <ArrowRight size={14} style={{ opacity: 0.7 }} />
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: easeOut }}
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            8,
                padding:        "clamp(12px,1.8vh,16px) clamp(22px,3.5vw,38px)",
                borderRadius:   999,
                fontSize:       "clamp(13px, 1.2vw, 15px)",
                fontWeight:     500,
                color:          "rgba(255,255,255,0.55)",
                background:     "rgba(255,255,255,0.03)",
                border:         "1px solid rgba(255,255,255,0.10)",
                cursor:         "pointer",
                textDecoration: "none",
                letterSpacing:  "0.01em",
                transition:     "color 0.25s, border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color        = "rgba(255,255,255,0.85)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor  = "rgba(255,255,255,0.22)";
                (e.currentTarget as HTMLAnchorElement).style.background   = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color        = "rgba(255,255,255,0.55)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor  = "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLAnchorElement).style.background   = "rgba(255,255,255,0.03)";
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...(ready && !prefersReduced ? fadeIn(T.social, 0.65) : {})}
            style={{
              display:    "flex",
              gap:        "clamp(16px, 3vw, 28px)",
              alignItems: "center",
            }}
          >
            {[
              { href: SOCIAL.github,     icon: <Github   size={14} />, label: "GitHub"   },
              { href: SOCIAL.linkedin,   icon: <Linkedin size={14} />, label: "LinkedIn" },
              { href: `mailto:${EMAIL}`, icon: <Mail     size={14} />, label: "Email"    },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            5,
                  fontSize:       12,
                  fontWeight:     400,
                  color:          "rgba(255,255,255,0.28)",
                  textDecoration: "none",
                  letterSpacing:  "0.02em",
                  transition:     "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.28)"}
              >
                {icon}
                {label}
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}