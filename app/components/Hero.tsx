"use client";

/**
 * Hero.tsx — Reference-matched layout
 *
 * Layout matches reference (Divesh portfolio):
 *  - Navbar: single centered pill (handled in Navbar.tsx)
 *  - "Hi, I'm Kishor" + rotating tagline: LEFT-ALIGNED, upper portion
 *  - Portrait: LARGE, centered, absolute — dominates the viewport
 *  - CTA + tech strip: fixed to bottom center
 *  - Glow: soft radial behind the head
 */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";
import { NAME, ROLE, ROTATING_TAGLINES, PROFILE_IMAGE, HERO_UI } from "../lib/data";
import { ease } from "../lib/motion";
import SpecularRimBeam from "./SpecularRimBeam";

/* ── Bezier tuple type ───────────────────────────────────── */
type Bezier = [number, number, number, number];
const easeOut: Bezier = ease.out as unknown as Bezier;
const easeStd: Bezier = [0.4, 0, 0.2, 1];
const easeSnap: Bezier = [0.76, 0, 0.24, 1];

/* ── Identity ───────────────────────────────────────────── */
const firstName = NAME.split(" ")[0]; // "Kishor"

/* ── Rotating taglines from portfolio.config.ts ─────────── */
const TAGLINES = ROTATING_TAGLINES || [
  ROLE,
  "Full-Stack Developer",
  "Mobile App Developer",
  "Problem Solver",
];

/* ── Entrance timing (seconds) ──────────────────────────── */
const T = {
  greeting: 0.20,
  role: 0.40,
  portrait: 0.60,
  cta: 1.10,
};

/* ── Reusable animation helpers ─────────────────────────── */
const fadeUp = (delay: number, distance = 14) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: easeOut },
});

const fadeIn = (delay: number, duration = 0.8) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: easeStd },
});

/* ── Props ───────────────────────────────────────────────── */
export interface HeroProps {
  cardBoxRefCallback?: (node: HTMLDivElement | null) => void;
}

/* ════════════════════════════════════════════════════════════
   ROTATING TAGLINE
   • Phase 1: Current phrase exits as ONE complete unit (.exit-anim)
   • Phase 2: Next phrase enters character-by-character (.char)
════════════════════════════════════════════════════════════ */
function RotatingTagline() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      const timer = setInterval(() => {
        setIndex(prev => (prev + 1) % TAGLINES.length);
      }, 3200);
      return () => clearInterval(timer);
    }

    if (!isExiting) {
      // Hold phrase visible before triggering exit
      const holdTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2800);
      return () => clearTimeout(holdTimer);
    } else {
      // Wait for exit animation (0.4s) to finish, then cycle to next phrase
      const exitTimer = setTimeout(() => {
        setIndex(prev => (prev + 1) % TAGLINES.length);
        setIsExiting(false);
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [index, isExiting, prefersReduced]);

  const label = TAGLINES[index];
  const words = label.split(" ");

  return (
    <div
      className="tagline-container"
      style={{
        overflow: "hidden",
        height: "clamp(52px, 7.8vw, 100px)",
        display: "flex",
        alignItems: "center",
        padding: "4px 20px 14px 0",
      }}
    >
      <div
        key={index}
        className={isExiting ? "exit-anim" : ""}
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-serif), 'Instrument Serif', 'Playfair Display', Georgia, serif",
          fontSize: "clamp(30px, 5vw, 68px)",
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          color: "#ffffff",
          lineHeight: 1.15,
          whiteSpace: "nowrap",
        }}
      >
        {prefersReduced ? (
          label
        ) : (
          words.map((word, wordIdx) => {
            const prevCharsCount = words
              .slice(0, wordIdx)
              .reduce((acc, w) => acc + w.length + 1, 0);

            return (
              <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {word.split("").map((char, charIdx) => {
                  const globalIdx = prevCharsCount + charIdx;
                  return (
                    <span
                      key={charIdx}
                      className="char"
                      style={{
                        animationDelay: `${globalIdx * 0.04}s`,
                        fontStyle: "italic",
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIdx < words.length - 1 && (
                  <span
                    className="char"
                    style={{
                      animationDelay: `${(prevCharsCount + word.length) * 0.04}s`,
                    }}
                  >
                    {"\u00A0"}
                  </span>
                )}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SILHOUETTE STAR MATRIX & RIM BEAM TYPES & EXTRACTION
════════════════════════════════════════════════════════════ */
interface StarMatrixPoint {
  normX: number;       // normalized 0-1 within image width
  normY: number;       // normalized 0-1 within image height
  baseSize: number;    // max arm radius of the 4-point star
  currentOpacity: number;
  targetOpacity: number;
  fadeSpeed: number;
}

interface ContourVertex {
  normX: number;
  normY: number;
  currentOpacity: number;
  targetOpacity: number;
}

interface SilhouetteData {
  stars: StarMatrixPoint[];
  contourVertices: ContourVertex[];
}

/** Draws a luxury 4-point diamond sparkle star (✦) exactly matching reference */
function draw4PointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  opacity: number
) {
  if (opacity <= 0.005 || size <= 0.3) return;

  ctx.save();
  ctx.beginPath();
  const innerR = size * 0.18; // sleek pinched diamond waist

  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const rad = i % 2 === 0 ? size : innerR;
    const x = cx + Math.cos(angle) * rad;
    const y = cy + Math.sin(angle) * rad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
  ctx.shadowColor = `rgba(200, 230, 255, ${(opacity * 0.90).toFixed(3)})`;
  ctx.shadowBlur = size * 2.2;
  ctx.fill();

  // Crisp central core dot for prominent stars
  if (size > 3.2 && opacity > 0.25) {
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(1.3, size * 0.11), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
    ctx.shadowBlur = 0;
    ctx.fill();
  }

  ctx.restore();
}

/** Analyzes portrait alpha data: extracts smooth continuous outer silhouette contour & star matrix */
function buildSilhouetteData(img: HTMLImageElement): SilhouetteData {
  try {
    const origW = img.naturalWidth || 1430;
    const origH = img.naturalHeight || 1100;
    const SW = 500;
    const SH = Math.round((origH / origW) * SW);

    const offscreen = document.createElement("canvas");
    offscreen.width = SW;
    offscreen.height = SH;
    const ctx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!ctx) return { stars: [], contourVertices: [] };

    ctx.drawImage(img, 0, 0, SW, SH);
    const { data } = ctx.getImageData(0, 0, SW, SH);

    const ALPHA_THRESH = 35;

    // 1. Trace outer left boundary & outer right boundary to avoid internal collar lines
    const rawLeft: Array<{ x: number; y: number }> = [];
    const rawRight: Array<{ x: number; y: number }> = [];

    for (let sy = 0; sy < SH; sy += 2) {
      // Leftmost edge (outer boundary)
      for (let sx = 0; sx < Math.floor(SW / 2); sx++) {
        const a = data[(sy * SW + sx) * 4 + 3];
        if (a > ALPHA_THRESH) {
          rawLeft.push({ x: sx, y: sy });
          break;
        }
      }

      // Rightmost edge (outer boundary)
      for (let sx = SW - 1; sx >= Math.floor(SW / 2); sx--) {
        const a = data[(sy * SW + sx) * 4 + 3];
        if (a > ALPHA_THRESH) {
          rawRight.push({ x: sx, y: sy });
          break;
        }
      }
    }

    // 2. Apply moving-average smoothing along the contour to eliminate pixel staircasing
    const smoothContour = (pts: Array<{ x: number; y: number }>, windowSize = 7) => {
      const smoothed: Array<{ x: number; y: number }> = [];
      const hw = Math.floor(windowSize / 2);
      for (let i = 0; i < pts.length; i++) {
        let sumX = 0;
        let sumY = 0;
        let count = 0;
        for (let j = Math.max(0, i - hw); j <= Math.min(pts.length - 1, i + hw); j++) {
          sumX += pts[j].x;
          sumY += pts[j].y;
          count++;
        }
        smoothed.push({ x: sumX / count, y: sumY / count });
      }
      return smoothed;
    };

    const smLeft = smoothContour(rawLeft, 7);
    const smRight = smoothContour(rawRight, 7);

    // Combine into unified ordered perimeter path: bottom-left -> top of head -> bottom-right
    const fullContour: Array<{ x: number; y: number }> = [
      ...smLeft.slice().reverse(),
      ...smRight,
    ];

    const contourVertices: ContourVertex[] = fullContour.map(pt => ({
      normX: pt.x / SW,
      normY: pt.y / SH,
      currentOpacity: 0,
      targetOpacity: 0,
    }));

    // 3. Generate structured 4-point star matrix grid in the transparent field
    const GRID_SPACING = 15; // More spaced out screen matrix for fewer, cleaner stars
    const MAX_OUTWARD_DIST = 52; // Distance extent of star field
    const stars: StarMatrixPoint[] = [];

    for (let gy = 0; gy < SH; gy += GRID_SPACING) {
      for (let gx = 0; gx < SW; gx += GRID_SPACING) {
        const alpha = data[(gy * SW + gx) * 4 + 3];
        if (alpha > ALPHA_THRESH) continue;

        // Compute shortest distance to the smooth outer contour
        let minD = 999999;
        for (let i = 0; i < fullContour.length; i++) {
          const dx = gx - fullContour[i].x;
          const dy = gy - fullContour[i].y;
          const d = dx * dx + dy * dy;
          if (d < minD) {
            minD = d;
            if (minD < 4) break;
          }
        }

        const dist = Math.sqrt(minD);
        if (dist >= 0.5 && dist <= MAX_OUTWARD_DIST) {
          const nd = dist / MAX_OUTWARD_DIST;
          // Stars closest to edge are larger (~11.5px radius), tapering down to ~4.4px at outer edge
          const baseSize = 11.5 * (1.0 - nd * 0.62);

          stars.push({
            normX: gx / SW,
            normY: gy / SH,
            baseSize,
            currentOpacity: 0,
            targetOpacity: 0,
            fadeSpeed: 0.05 + Math.random() * 0.035,
          });
        }
      }
    }

    return { stars, contourVertices };
  } catch (err) {
    console.error("[SilhouetteData] extraction failed:", err);
    return { stars: [], contourVertices: [] };
  }
}

/* ════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
════════════════════════════════════════════════════════════ */
export default function Hero({ cardBoxRefCallback }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  /* ── Refs ───────────────────────────────────────────────── */
  const sectionRef   = useRef<HTMLElement>(null);
  const isHeroInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const shouldAnimate = ready && isHeroInView;

  /* ── Silhouette particle & rim beam refs ─────────────────── */
  const canvasRef      = useRef<HTMLCanvasElement | null>(null);
  const portraitImgRef = useRef<HTMLImageElement | null>(null);
  const silhouetteDataRef = useRef<SilhouetteData>({ stars: [], contourVertices: [] });
  const mouseRef       = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });

  /* ── Scroll-driven parallax ─────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.97]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  const springCfg = { stiffness: 80, damping: 20, restDelta: 0.001 };
  const portraitYSpring = useSpring(portraitY, springCfg);
  const portraitScSpring = useSpring(portraitScale, springCfg);

  /* ── Silhouette Initialization on Mount ─────────────────── */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));

    if (!prefersReduced) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = PROFILE_IMAGE || "/potrait.png";
      if (img.complete && img.naturalWidth > 0) {
        silhouetteDataRef.current = buildSilhouetteData(img);
      } else {
        img.onload = () => {
          silhouetteDataRef.current = buildSilhouetteData(img);
        };
      }
    }

    return () => cancelAnimationFrame(id);
  }, [prefersReduced]);

  /* ── Desktop Window-Level Pointer Tracking (For Silhouette Star Matrix) ── */
  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onPointerMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onPointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [prefersReduced]);

  /* ── Silhouette Canvas Animation Loop ───────────────────── */
  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let animId: number;

    const tick = () => {
      const canvas = canvasRef.current;
      const imgEl  = portraitImgRef.current;

      // Wait until elements are mounted with dimensions
      if (!canvas || !imgEl || !imgEl.offsetWidth || !imgEl.offsetHeight) {
        animId = requestAnimationFrame(tick);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) { animId = requestAnimationFrame(tick); return; }

      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = imgEl.getBoundingClientRect();

      const BLEED = 80; // Generous bleed for star sparkles to radiate outward
      const cssW = Math.round(rect.width + BLEED * 2);
      const cssH = Math.round(rect.height + BLEED * 2);

      // Keep canvas display style in sync with element
      if (canvas.style.width !== `${cssW}px` || canvas.style.height !== `${cssH}px`) {
        canvas.style.width  = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }

      // Keep internal pixel buffer in sync
      const bufW = Math.round(cssW * dpr);
      const bufH = Math.round(cssH * dpr);
      if (canvas.width !== bufW || canvas.height !== bufH) {
        canvas.width  = bufW;
        canvas.height = bufH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const mouse = mouseRef.current;
      const { stars, contourVertices } = silhouetteDataRef.current;
      const INFLUENCE = 190; // Reacting cursor radius in pixels

      // Convert global cursor coordinates to canvas pixel space
      const localMX = mouse.x - (rect.left - BLEED);
      const localMY = mouse.y - (rect.top - BLEED);

      // ──────────────────────────────────────────────────────────
      // 1. DRAW SMOOTH, CONTINUOUS, LUMINOUS SILHOUETTE RIM BEAM
      // ──────────────────────────────────────────────────────────
      // Update contour vertex opacities based on proximity to cursor
      for (let i = 0; i < contourVertices.length; i++) {
        const v = contourVertices[i];
        const vx = BLEED + v.normX * rect.width;
        const vy = BLEED + v.normY * rect.height;

        if (mouse.active) {
          const dist = Math.hypot(vx - localMX, vy - localMY);
          if (dist < INFLUENCE) {
            const factor = 1 - dist / INFLUENCE;
            v.targetOpacity = Math.pow(factor, 1.5) * 1.0;
          } else {
            v.targetOpacity = 0;
          }
        } else {
          v.targetOpacity = 0;
        }

        v.currentOpacity += (v.targetOpacity - v.currentOpacity) * 0.10;
      }

      // Render continuous smooth contour path with glowing multi-pass stroke
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Pass A: Soft Outer Glow Bloom (Thick diffusion aura)
      ctx.lineWidth = 10;
      for (let i = 0; i < contourVertices.length - 1; i++) {
        const v1 = contourVertices[i];
        const v2 = contourVertices[i + 1];
        const segOpacity = (v1.currentOpacity + v2.currentOpacity) / 2;

        if (segOpacity > 0.01) {
          ctx.beginPath();
          ctx.moveTo(BLEED + v1.normX * rect.width, BLEED + v1.normY * rect.height);
          ctx.lineTo(BLEED + v2.normX * rect.width, BLEED + v2.normY * rect.height);
          ctx.strokeStyle = `rgba(180, 225, 255, ${(segOpacity * 0.40).toFixed(3)})`;
          ctx.shadowColor = `rgba(160, 215, 255, ${(segOpacity * 0.95).toFixed(3)})`;
          ctx.shadowBlur  = 16;
          ctx.stroke();
        }
      }

      // Pass B: Solid Continuous Bright Core Beam (Crisp smooth line)
      ctx.lineWidth = 3.6;
      for (let i = 0; i < contourVertices.length - 1; i++) {
        const v1 = contourVertices[i];
        const v2 = contourVertices[i + 1];
        const segOpacity = (v1.currentOpacity + v2.currentOpacity) / 2;

        if (segOpacity > 0.01) {
          ctx.beginPath();
          ctx.moveTo(BLEED + v1.normX * rect.width, BLEED + v1.normY * rect.height);
          ctx.lineTo(BLEED + v2.normX * rect.width, BLEED + v2.normY * rect.height);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(segOpacity * 0.98).toFixed(3)})`;
          ctx.shadowColor = `#ffffff`;
          ctx.shadowBlur  = 8;
          ctx.stroke();
        }
      }
      ctx.restore();

      // ──────────────────────────────────────────────────────────
      // 2. DRAW 4-POINT STAR SPARKLE MATRIX AURA (✦)
      // ──────────────────────────────────────────────────────────
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = BLEED + star.normX * rect.width;
        const sy = BLEED + star.normY * rect.height;

        if (mouse.active) {
          const dist = Math.hypot(sx - localMX, sy - localMY);
          if (dist < INFLUENCE) {
            const factor = 1 - dist / INFLUENCE;
            // Radial cubic falloff from cursor
            const cursorStrength = Math.pow(factor, 2.0);
            star.targetOpacity = cursorStrength * 0.95;
          } else {
            star.targetOpacity = 0;
          }
        } else {
          star.targetOpacity = 0;
        }

        // Smooth trailing interpolation
        star.currentOpacity += (star.targetOpacity - star.currentOpacity) * star.fadeSpeed;

        if (star.currentOpacity > 0.008) {
          // Dynamic star scale based on current activation brightness
          const dynamicSize = star.baseSize * (0.35 + 0.65 * star.currentOpacity);
          draw4PointStar(ctx, sx, sy, dynamicSize, star.currentOpacity);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [prefersReduced]);
  return (
    <>
      <div style={{ overflowX: "hidden", position: "relative" }}>
        <section
          id="hero"
          ref={sectionRef}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "100svh",
            overflow: "hidden",
            background: "rgba(0, 0, 0, 1)",
          }}
        >

          {/* ── Subtle Ambient Atmosphere Glow (fades in smoothly) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={shouldAnimate && !prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-white/[0.03] to-transparent rounded-full blur-[140px] pointer-events-none z-[1]"
          />

          {/* ── Portrait — absolute, centered, large ── */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              x: "-50%",
              y: prefersReduced ? 0 : portraitYSpring,
              scale: prefersReduced ? 1 : portraitScSpring,
              width: "clamp(340px, 52vw, 780px)",
              height: "auto",
              zIndex: 2,
              pointerEvents: "none",
              willChange: "transform",
              transformOrigin: "bottom center",
            }}
            ref={cardBoxRefCallback}
          >
            {/* Stage 4 / Layer 1: Background Radial Glow (fades & expands softly after photo starts revealing) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={shouldAnimate && !prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
              transition={{ duration: 1.6, delay: 0.90, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_55%,transparent_72%)] rounded-full blur-[65px] pointer-events-none z-[1]"
            />

            {/* Stage 1 & 2 / Layer 2: Mask / Clip-Path Curtain Container */}
            <motion.div
              initial={!prefersReduced ? { clipPath: "inset(100% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
              animate={shouldAnimate && !prefersReduced ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 1.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] as Bezier }}
              style={{
                width: "100%",
                position: "relative",
                zIndex: 2,
                willChange: "clip-path",
              }}
            >

              {/* Actual Profile Image — starts at translateY(70px) + scale(1.09) and smoothly settles to (0, 1.0) */}
              <motion.img
                ref={portraitImgRef}
                src={PROFILE_IMAGE || "/potrait.png"}
                alt={`${NAME} — ${ROLE}`}
                crossOrigin="anonymous"
                initial={!prefersReduced ? { y: 70, scale: 1.09, opacity: 0.2 } : { y: 0, scale: 1, opacity: 1 }}
                animate={shouldAnimate && !prefersReduced ? { y: 0, scale: 1.0, opacity: 1 } : { y: 70, scale: 1.09, opacity: 0.2 }}
                transition={{ duration: 2.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] as Bezier }}
                onLoad={e => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (silhouetteDataRef.current.stars.length === 0) {
                    silhouetteDataRef.current = buildSilhouetteData(img);
                  }
                }}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "contrast(1.08) brightness(0.92)",
                  userSelect: "none",
                  position: "relative",
                  zIndex: 2,
                  willChange: "transform, opacity",
                  /* Fade out at bottom only */
                  WebkitMaskImage: `linear-gradient(
                    to bottom,
                    black 0%,
                    black 80%,
                    rgba(0,0,0,0.45) 92%,
                    transparent 100%
                  )`,
                  maskImage: `linear-gradient(
                    to bottom,
                    black 0%,
                    black 80%,
                    rgba(0,0,0,0.45) 92%,
                    transparent 100%
                  )`,
                }}
                draggable={false}
              />
            </motion.div>

            {/* Stage 4 / Layer 3: Interactive Canvas Star Matrix & Rim Beam Layer (fades in after image reveal settles) */}
            {!prefersReduced && (
              <motion.canvas
                ref={canvasRef}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={shouldAnimate && !prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.1, delay: 1.30, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "-80px",
                  left: "-80px",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />
            )}
          </motion.div>


          {/* ── TEXT — left-aligned, upper portion, above portrait ── */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 4,
              opacity: prefersReduced ? 1 : textOpacity,
              y: prefersReduced ? 0 : textY,
              willChange: "opacity, transform",
              /* Align text to left within a max-width container */
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingTop: "clamp(80px, 11vh, 120px)",
              paddingLeft: "clamp(24px, 8vw, 160px)",
            }}
          >
            {/* "Hi, I'm Kishor" — Masked Word-by-Word Sequential Reveal */}
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(36px, 6vw, 82px)",
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.08,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                columnGap: "0.28em",
              }}
            >
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={shouldAnimate && !prefersReduced ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1.0, 0.3, 1] }}
                  className="inline-block font-light"
                >
                  Hi,
                </motion.span>
              </span>

              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={shouldAnimate && !prefersReduced ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1.0, 0.3, 1] }}
                  className="inline-block font-light"
                >
                  I&apos;m
                </motion.span>
              </span>

              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={shouldAnimate && !prefersReduced ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                  transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1.0, 0.3, 1] }}
                  className="inline-block font-bold text-white"
                >
                  {firstName}
                </motion.span>
              </span>
            </h1>

            {/* Rotating tagline — Masked Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={shouldAnimate && !prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.75, delay: T.role, ease: [0.16, 1.0, 0.3, 1] }}
              style={{ marginTop: "clamp(4px, 0.6vh, 8px)" }}
            >
              <RotatingTagline />
            </motion.div>
          </motion.div>


          {/* ── BOTTOM CTA AREA ── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(20px, 4vh, 48px)",
              left: 0,
              right: 0,
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(10px, 1.8vh, 18px)",
            }}
          >
            {/* Tech strip — 'Experienced in' with circular tech logo badges matching reference */}
            <motion.div
              {...(shouldAnimate && !prefersReduced ? fadeUp(0.72, 14) : { initial: { opacity: 0, y: 14 }, animate: { opacity: 0, y: 14 } })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(12px, 1vw, 13.5px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.46)",
                  letterSpacing: "-0.01em",
                }}
              >
                Experienced in
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                {[
                  {
                    name: "Flutter",
                    icon: (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                        <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.014 11.072L7.986 17.414 14.328 24h7.372l-9.56-9.56 3.186-3.368z" fill="#02569B" />
                        <path d="M14.328 24l-3.156-3.214 3.156-3.372 3.186 3.372L14.328 24z" fill="#0175C2" />
                        <path d="M7.986 17.414l3.186-3.186 3.156 3.372-3.156 3.214-3.186-3.4z" fill="#42A5F5" />
                      </svg>
                    ),
                  },
                  {
                    name: "Firebase",
                    icon: (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#FFA000" d="M3.89 15.67L6.2 1.34c.06-.38.54-.49.77-.19l3.41 4.41-6.49 10.11z"/>
                        <path fill="#F57F17" d="M14.07 7.73l2.45-4.7c.18-.35.68-.34.84.02l4.75 12.63-8.04-7.95z"/>
                        <path fill="#FFCA28" d="M22.11 15.68L17.36 3.05a.498.498 0 00-.84-.02l-2.45 4.7 4.19 8.08 3.85-.13z"/>
                        <path fill="#FFA000" d="M12.06 12.87l-1.68-7.31c-.08-.36-.57-.45-.77-.15L1.89 18.25l10.17-5.38z"/>
                        <path fill="#F57F17" d="M1.89 18.25l10.17 5.75c.44.25.99.25 1.43 0l8.62-5.75-10.05 5.56-10.17-5.56z"/>
                        <path fill="#FFCA28" d="M1.89 18.25L12.06 12.87l6.2 2.86-6.2 7.77-10.17-5.25z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Java",
                    icon: (
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
                        {/* Base Saucer */}
                        <path d="M3 18.8C6.5 20.4 17.5 20.4 21 18.8C18 21.4 6 21.4 3 18.8Z" fill="#38BDF8" />
                        <path d="M4.5 16.8C7.5 18.2 16.5 18.2 19.5 16.8C16.8 18.8 7.2 18.8 4.5 16.8Z" fill="#0284C7" />
                        {/* Cup Body */}
                        <path d="M5 11.2C5 15.2 7.8 16.6 12 16.6C16.2 16.6 19 15.2 19 11.2H5Z" fill="#F8FAFC" />
                        <path d="M18.2 11.8C19.8 11.8 21 12.6 21 13.7C21 15 19.5 15.7 17.8 15.7" stroke="#F8FAFC" strokeWidth="1.7" strokeLinecap="round" />
                        {/* Steam 1 */}
                        <path d="M8.8 8.8C8.2 6.5 10.4 5 9.4 2.8" stroke="#FF7E33" strokeWidth="2" strokeLinecap="round" />
                        {/* Steam 2 */}
                        <path d="M12.4 8.2C11.8 5.6 14.2 4.2 13.4 2" stroke="#FFA133" strokeWidth="2" strokeLinecap="round" />
                        {/* Steam 3 */}
                        <path d="M16 8.8C15.4 6.5 17.6 5 16.6 2.8" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    name: "Supabase",
                    icon: (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#3ECF8E" d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.61 14.283a.792.792 0 0 0 .616 1.321h9.362v8.958a.396.396 0 0 0 .716.233l10.674-14.12a.792.792 0 0 0-.616-1.321z"/>
                      </svg>
                    ),
                  },
                ].map(tech => (
                  <motion.div
                    key={tech.name}
                    title={tech.name}
                    whileHover={{ scale: 1.14, borderColor: "rgba(255,255,255,0.28)" }}
                    transition={{ duration: 0.18 }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: "rgba(10,10,10,0.85)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "default",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "clamp(10px, 2vw, 14px)",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* Primary — with live animated specular rim light beam */}
              <motion.a
                href="#projects"
                {...(shouldAnimate && !prefersReduced ? fadeUp(0.88, 16) : { initial: { opacity: 0, y: 16 }, animate: { opacity: 0, y: 16 } })}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easeOut }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(12px,1.6vh,15px) clamp(26px,3vw,38px)",
                  borderRadius: 12,
                  fontSize: "clamp(13px, 1.1vw, 14.5px)",
                  fontWeight: 500,
                  color: "#ffffff",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  background: "#0c0c0c",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                {/* 1. Base Static Subtle Border */}
                <div
                  className="absolute inset-0 rounded-[12px] pointer-events-none"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    zIndex: 1,
                  }}
                />

                {/* 2. Specular Rim Light with Continuous Parametric Arc Interpolation */}
                <SpecularRimBeam radius={12} duration={5.5} beamLength={82} style={{ zIndex: 2 }} />

                {/* 3. Button Text */}
                <span className="relative z-10 font-medium text-white tracking-wide flex items-center gap-2">
                  View Impact &amp; Work
                </span>
              </motion.a>

              {/* Secondary — Contact */}
              <motion.a
                href="#contact"
                {...(shouldAnimate && !prefersReduced ? fadeUp(1.0, 16) : { initial: { opacity: 0, y: 16 }, animate: { opacity: 0, y: 16 } })}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easeOut }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "clamp(12px,1.6vh,15px) clamp(26px,3vw,38px)",
                  borderRadius: 12,
                  fontSize: "clamp(13px, 1.1vw, 14.5px)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Contact
              </motion.a>
            </div>



          </div>

        </section>
      </div>
    </>
  );
}