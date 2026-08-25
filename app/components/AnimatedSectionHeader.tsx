"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useScrollDirection } from "../lib/useScrollDirection";

interface Props {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function AnimatedSectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const scrollDirection = useScrollDirection();
  const prefersReduced = useReducedMotion();
  const [animKey, setAnimKey] = useState(0);

  const words = title.split(" ");

  useEffect(() => {
    if (isInView) {
      setAnimKey((prev) => prev + 1);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={`select-none ${align === "center" ? "text-center mx-auto" : "text-left"} ${className}`}
    >
      {/* ── Kicker Tagline (e.g. FEATURED WORK, EXPERIENCE, GET IN TOUCH) ── */}
      {kicker && (
        <motion.p
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === "down" ? 10 : -10 }}
          animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === "down" ? 10 : -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase mb-2"
        >
          {kicker}
        </motion.p>
      )}

      {/* ── Big Tag Headline with Staggered Character Blur Entrance ── */}
      <div className="overflow-visible select-none">
        {prefersReduced ? (
          <h2
            className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.08] my-1"
            style={{
              fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
            }}
          >
            {title}
          </h2>
        ) : (
          <h2
            key={animKey}
            className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.08] my-1"
            style={{
              fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
            }}
          >
            {words.map((word, wordIdx) => {
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
                          animation: "enterChar 0.65s cubic-bezier(0.16, 1.0, 0.3, 1.0) forwards",
                          animationDelay: `${0.1 + globalIdx * 0.055}s`,
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
                        animation: "enterChar 0.65s cubic-bezier(0.16, 1.0, 0.3, 1.0) forwards",
                        animationDelay: `${0.1 + (prevCharsCount + word.length) * 0.055}s`,
                      }}
                    >
                      {"\u00A0"}
                    </span>
                  )}
                </span>
              );
            })}
          </h2>
        )}
      </div>

      {/* ── Subtitle / Paragraph Description ── */}
      {subtitle && (
        <motion.p
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === "down" ? 12 : -12 }}
          animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: scrollDirection === "down" ? 12 : -12 }}
          transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xs sm:text-sm text-white/50 font-light mt-1.5 leading-relaxed ${align === "center" ? "max-w-xl mx-auto" : "max-w-xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
