"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import exactSignatureData from './exactSignature.json';

interface HanddrawnSignatureProps {
  trigger: boolean;
  delay?: number;
  className?: string;
}

export default function HanddrawnSignature({
  trigger,
  delay = 1.4,
  className = "",
}: HanddrawnSignatureProps) {
  const prefersReduced = useReducedMotion();
  const mainPathRef = useRef<SVGPathElement | null>(null);
  const dotPathRef = useRef<SVGPathElement | null>(null);
  const [mainLength, setMainLength] = useState(1200);

  // Compute exact path length dynamically
  useEffect(() => {
    if (mainPathRef.current) {
      setMainLength(mainPathRef.current.getTotalLength() || 1200);
    }
  }, []);

  const isDrawn = trigger || prefersReduced;

  return (
    <div
      className={`relative w-60 sm:w-72 md:w-80 h-16 sm:h-20 select-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 2 358 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-label="Kishor Kumar signature"
      >
        {/* Exact hand-drawn cursive vector path from user reference */}
        <motion.path
          ref={mainPathRef}
          d={exactSignatureData.main}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.0}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={
            prefersReduced
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          animate={
            isDrawn
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration: 1.75,
                    delay: delay,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                  opacity: {
                    duration: 0.08,
                    delay: delay,
                  },
                }
          }
        />

        {/* Dot over 'i' */}
        <motion.circle
          ref={dotPathRef as any}
          cx={59}
          cy={33.5}
          r={1.8}
          fill="#ffffff"
          initial={
            prefersReduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          animate={
            isDrawn
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  duration: 0.2,
                  delay: delay + 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        />
      </svg>
    </div>
  );
}
