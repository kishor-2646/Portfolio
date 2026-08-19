"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SignatureProps {
  trigger?: boolean;
  className?: string;
  debug?: boolean;
}

interface StrokeData {
  d: string;
  label: string;
  isDot?: boolean;
  isFlourish?: boolean;
}

const STROKES: StrokeData[] = [
  {
    // STROKE 1: First Name 'Kishor' — Single continuous cursive pen stroke
    // True pen order: K stem down -> loop up & around -> waist pinch -> leg kick -> i -> s -> h (tall loop) -> o -> r
    label: "Kishor (First Name)",
    d:
      "M 35,48 " +
      "C 33,68 30,100 25,125 " +       // K stem down
      "C 28,128 32,120 36,95 " +       // K sweep up
      "C 42,45 48,25 58,25 " +         // K top loop
      "C 64,25 60,45 52,65 " +         // K loop down
      "C 46,80 43,82 48,82 " +         // K waist pinch
      "C 56,82 62,95 68,120 " +        // K leg kick into i
      "C 72,122 76,105 80,86 " +       // connector up to i
      "C 82,82 85,84 84,95 " +         // i stem down
      "C 83,110 82,122 88,121 " +      // i bottom curve
      "C 94,120 98,100 102,84 " +      // s climb
      "C 105,79 108,81 106,88 " +      // s top peak
      "C 103,98 97,112 104,121 " +     // s belly
      "C 110,121 116,108 122,80 " +    // h climb to tall loop
      "C 126,52 130,22 125,22 " +      // h top loop apex
      "C 120,22 116,48 114,85 " +      // h stem down
      "C 113,110 112,125 116,125 " +   // h bottom
      "C 120,125 125,108 130,92 " +    // h arch climb
      "C 134,83 140,83 142,92 " +      // h arch crest
      "C 144,105 142,121 148,121 " +   // h arch down
      "C 154,121 160,105 164,88 " +    // o climb
      "C 167,82 174,84 172,96 " +      // o oval loop
      "C 169,110 162,121 170,121 " +   // o bottom curve
      "C 176,121 180,105 184,88 " +    // r climb
      "C 187,83 192,84 190,92 " +      // r shoulder
      "C 188,105 186,121 195,120 " +   // r down
      "C 202,119 210,116 218,114",     // first name exit connector
  },
  {
    // STROKE 2: Pen lift -> Tittle dot for 'i'
    label: "Dot for 'i'",
    isDot: true,
    d: "M 82,68 C 83,67 85,67 85,69 C 84,71 82,71 82,68 Z",
  },
  {
    // STROKE 3: Second Name 'Kumar' — Single continuous cursive pen stroke
    // True pen order: K stem down -> loop up & around -> waist pinch -> leg kick -> u -> m (3 arches) -> a -> r
    label: "Kumar (Second Name)",
    d:
      "M 245,48 " +
      "C 243,68 240,100 235,125 " +    // second K stem down
      "C 238,128 242,120 246,95 " +    // second K sweep up
      "C 252,45 258,25 268,25 " +      // second K top loop
      "C 274,25 270,45 262,65 " +      // second K loop down
      "C 256,80 253,82 258,82 " +      // second K waist pinch
      "C 266,82 272,95 278,120 " +     // second K leg kick into u
      "C 282,122 286,105 290,88 " +    // connector to u
      "C 293,83 296,85 294,96 " +      // u first down
      "C 292,110 290,121 298,121 " +   // u first valley
      "C 304,121 308,105 312,88 " +    // u second climb
      "C 315,83 318,85 316,96 " +      // u second down
      "C 314,110 312,121 320,121 " +   // u second valley & connect to m
      "C 326,121 330,105 334,88 " +    // m arch 1 climb
      "C 337,83 342,83 340,96 " +      // m arch 1 crest & down
      "C 338,110 336,121 344,121 " +   // m valley 1
      "C 350,121 354,105 358,88 " +    // m arch 2 climb
      "C 361,83 366,83 364,96 " +      // m arch 2 crest & down
      "C 362,110 360,121 368,121 " +   // m valley 2
      "C 374,121 378,105 382,88 " +    // m arch 3 climb
      "C 385,83 390,83 388,96 " +      // m arch 3 crest & down
      "C 386,110 384,121 392,121 " +   // m exit connect to a
      "C 398,121 404,105 408,88 " +    // a oval climb
      "C 411,82 418,84 416,96 " +      // a oval loop
      "C 413,110 408,121 416,121 " +   // a oval bottom
      "C 420,121 422,105 425,88 " +    // r climb
      "C 428,83 433,84 431,92 " +      // r shoulder
      "C 429,105 427,121 436,120 " +   // r down
      "C 445,119 455,116 462,114",     // second name exit connector
  },
  {
    // STROKE 4: Pen lift -> Final Flourish / Underline
    label: "Final Flourish",
    isFlourish: true,
    d: "M 20,145 C 120,142 260,148 380,142 C 425,140 470,136 515,132",
  },
];

export default function Signature({
  trigger = true,
  className = "",
  debug = false,
}: SignatureProps) {
  const prefersReduced = useReducedMotion();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [timings, setTimings] = useState<
    { length: number; duration: number; delay: number }[]
  >([]);

  // Dynamically compute physical lengths via getTotalLength() and build exact sequential timeline
  useEffect(() => {
    const PEN_SPEED = 680; // pixels per second handwriting velocity
    const FLOURISH_SPEED = 850; // slightly faster flourish velocity

    const computed = pathRefs.current.map((pathEl, idx) => {
      const length = pathEl ? pathEl.getTotalLength() : (idx === 1 ? 12 : 800);
      return length;
    });

    let currentTimeline = 0;
    const timelineData = computed.map((len, idx) => {
      const stroke = STROKES[idx];
      let dur = stroke.isDot
        ? 0.12
        : stroke.isFlourish
        ? len / FLOURISH_SPEED
        : len / PEN_SPEED;

      // Natural human pen lift pauses
      const pauseBefore =
        idx === 0
          ? 0
          : idx === 1
          ? 0.08 // brief pen lift to dot 'i'
          : idx === 2
          ? 0.14 // pen lift between Kishor and Kumar
          : 0.12; // pen lift before underline flourish

      const startDelay = currentTimeline + pauseBefore;
      currentTimeline = startDelay + dur;

      return {
        length: Math.max(len, 1),
        duration: dur,
        delay: startDelay,
      };
    });

    setTimings(timelineData);
  }, []);

  const isDrawn = trigger || prefersReduced;

  return (
    <div
      className={`relative w-64 sm:w-80 md:w-96 select-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="10 15 520 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        aria-label="Kishor Kumar Authentic Handwritten Signature"
      >
        {STROKES.map((stroke, index) => {
          const timing = timings[index] || {
            length: 800,
            duration: 1.0,
            delay: index * 0.5,
          };

          const strokeLen = timing.length;
          const strokeDur = timing.duration;
          const strokeDel = timing.delay;

          return (
            <path
              key={index}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              data-stroke={index + 1}
              data-label={debug ? stroke.label : undefined}
              d={stroke.d}
              fill="none"
              stroke="#ffffff"
              strokeWidth={stroke.isDot ? 2.2 : stroke.isFlourish ? 1.5 : 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: prefersReduced ? "none" : strokeLen,
                strokeDashoffset: prefersReduced
                  ? 0
                  : isDrawn
                  ? 0
                  : strokeLen,
                transition: prefersReduced
                  ? "none"
                  : isDrawn
                  ? `stroke-dashoffset ${strokeDur}s cubic-bezier(0.22, 0.61, 0.36, 1) ${strokeDel}s`
                  : "none",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
