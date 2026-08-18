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
} from "framer-motion";
import { NAME, ROLE } from "../lib/data";
import { ease } from "../lib/motion";

/* ── Bezier tuple type ───────────────────────────────────── */
type Bezier = [number, number, number, number];
const easeOut: Bezier = ease.out as unknown as Bezier;
const easeStd: Bezier = [0.4, 0, 0.2, 1];
const easeSnap: Bezier = [0.76, 0, 0.24, 1];

/* ── Identity ───────────────────────────────────────────── */
const firstName = NAME.split(" ")[0]; // "Kishor"

/* ── Rotating taglines ──────────────────────────────────── */
const TAGLINES = [
  ROLE,                       // "Software Engineer"
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
   MAIN HERO COMPONENT
════════════════════════════════════════════════════════════ */
export default function Hero({ cardBoxRefCallback }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  /* ── Refs ───────────────────────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null);

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

  /* ── Mount ──────────────────────────────────────────────── */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

            {/* Entrance animation — on top of glow */}
            <motion.div
              {...(ready && !prefersReduced
                ? {
                  initial: { opacity: 0, y: 60, scale: 1.04 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 1.3, delay: T.portrait, ease: [0.16, 1, 0.3, 1] as Bezier },
                }
                : {}
              )}
              style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              <img
                src="/potrait.png"
                alt={`${NAME} — ${ROLE}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "contrast(1.08) brightness(0.92)",
                  userSelect: "none",
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
            {/* "Hi, I'm Kishor" */}
            <motion.div
              {...(ready && !prefersReduced ? fadeUp(T.greeting) : {})}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(36px, 6vw, 82px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "rgba(255,255,255,0.95)",
                  lineHeight: 1.08,
                }}
              >
                <span style={{ fontWeight: 300 }}>Hi, I&apos;m </span>
                <span style={{ fontWeight: 700 }}>{firstName}</span>
              </h1>
            </motion.div>

            {/* Rotating tagline */}
            <motion.div
              {...(ready && !prefersReduced ? fadeUp(T.role) : {})}
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
              {...(ready && !prefersReduced ? fadeIn(T.cta, 0.7) : {})}
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
            <motion.div
              {...(ready && !prefersReduced ? fadeIn(T.cta + 0.1, 0.7) : {})}
              style={{
                display: "flex",
                gap: "clamp(10px, 2vw, 14px)",
                flexWrap: "wrap",
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "clamp(11px,1.6vh,15px) clamp(22px,3vw,36px)",
                  borderRadius: 12,
                  fontSize: "clamp(13px, 1.1vw, 14.5px)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.13)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.26)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
              >
                View Impact &amp; Work
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "clamp(11px,1.6vh,15px) clamp(22px,3vw,36px)",
                  borderRadius: 12,
                  fontSize: "clamp(13px, 1.1vw, 14.5px)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.13)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.26)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
              >
                Book a 30 min call
              </motion.a>
            </motion.div>
          </div>

        </section>
      </div>
    </>
  );
}