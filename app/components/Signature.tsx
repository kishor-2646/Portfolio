"use client";

import React, { useEffect, useRef, useState } from "react";

// Hand-authored centerline strokes tracing the reference handwriting
// (upright cursive, looped K arm/leg, looped i-dot, hooked r with
// descender loop). No font, no <text>, no mask/clip reveal.
const STROKES = [
  { id: "K1-stem", d: "M96,88 C90,96 80,106 72,118 C82,110 90,100 94,92 C88,116 76,168 68,220 C60,272 53,324 48,376 C46,394 44,406 40,416" },
  { id: "K1-armleg", d: "M180,96 C166,114 130,164 108,199 C93,222 80,236 70,246 C94,251 128,264 152,284 C170,299 186,301 202,296 C218,290 234,283 248,275" },
  { id: "i-stem", d: "M252,222 C248,217 247,210 251,205 C257,199 266,204 265,215 C264,251 260,299 256,337 C254,354 250,364 242,368" },
  { id: "i-dot", d: "M254,156 C250,151 250,144 256,141 C264,138 270,144 268,152 C266,160 256,161 254,153" },
  { id: "s", d: "M336,232 C330,218 312,214 300,222 C288,230 290,244 304,252 C318,260 334,266 332,280 C330,294 312,298 298,290 C292,287 289,282 288,277" },
  { id: "h", d: "M360,340 C358,298 361,236 369,178 C375,133 385,103 394,91 C400,84 403,90 400,106 C395,138 378,180 364,230 C356,258 351,282 353,296 C366,270 390,246 413,240 C436,234 450,246 449,268 C448,286 442,296 434,300" },
  { id: "o", d: "M508,300 C486,299 472,282 472,258 C472,232 490,214 514,214 C538,214 554,234 553,260 C552,286 534,304 511,301 C497,299 487,290 485,278" },
  { id: "r1", d: "M578,298 C574,272 567,246 563,226 C572,234 582,242 588,252 C594,264 595,280 590,292 C586,300 575,301 569,294 C563,286 563,270 569,254 C574,240 580,230 587,220 C592,212 598,204 606,194" },
  { id: "K2-stem", d: "M786,60 C780,68 770,78 762,90 C772,82 780,72 784,64 C778,88 766,140 758,192 C750,244 743,296 738,348 C736,366 734,378 730,388" },
  { id: "K2-armleg", d: "M870,68 C856,86 820,136 798,171 C783,194 770,208 760,218 C784,223 818,236 842,256 C860,271 876,273 892,268 C908,262 924,255 938,247" },
  { id: "u", d: "M948,222 C946,240 944,262 946,280 C948,298 962,304 976,296 C986,290 992,270 992,250 C992,238 994,228 1000,222" },
  { id: "m", d: "M1028,224 C1026,244 1023,272 1022,300 C1022,268 1029,234 1044,226 C1058,219 1066,233 1066,254 C1066,262 1065,272 1064,282 C1067,262 1076,232 1092,224 C1106,217 1114,232 1114,254 C1114,270 1111,286 1106,300" },
  { id: "a", d: "M1180,258 C1176,240 1162,228 1148,236 C1134,244 1132,266 1142,282 C1152,298 1172,298 1182,282 C1188,272 1188,254 1186,238 C1185,258 1186,282 1194,296 C1198,302 1202,300 1202,292" },
  { id: "r2", d: "M1226,298 C1222,272 1215,246 1211,226 C1220,234 1230,242 1236,252 C1242,264 1243,280 1238,292 C1234,300 1223,301 1217,294 C1211,286 1211,270 1217,254 C1222,240 1228,230 1235,220 C1240,212 1246,204 1254,194" },
];

const PEN_LIFT_BEFORE: Record<string, boolean> = { "i-dot": true, "K2-stem": true };

const WRITING_SPEED = 0.62;   // px of path length per ms
const MIN_STROKE_MS = 90;
const NORMAL_GAP_MS = 40;
const PEN_LIFT_GAP_MS = 260;

interface SignatureProps {
  width?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
}

export default function Signature({
  width = 360,
  color = "#ffffff",
  strokeWidth = 7,
  className = "",
  style = {},
  trigger = true,
}: SignatureProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const schedule: { path: SVGPathElement; start: number; duration: number; len: number }[] = [];
    let cursor = 0;

    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);

      const duration = Math.max(MIN_STROKE_MS, len / WRITING_SPEED);
      const gapBefore =
        i === 0 ? 0 : PEN_LIFT_BEFORE[STROKES[i].id] ? PEN_LIFT_GAP_MS : NORMAL_GAP_MS;

      cursor += gapBefore;
      schedule.push({ path, start: cursor, duration, len });
      cursor += duration;
    });

    const total = cursor;

    function play() {
      let startTime: number | null = null;

      function frame(ts: number) {
        if (startTime === null) startTime = ts;
        const elapsed = ts - startTime;

        schedule.forEach((item) => {
          const localT = elapsed - item.start;
          if (localT <= 0) {
            item.path.style.strokeDashoffset = String(item.len);
          } else if (localT >= item.duration) {
            item.path.style.strokeDashoffset = "0";
          } else {
            const frac = localT / item.duration;
            const eased = 1 - Math.pow(1 - frac, 2); // ease-out
            item.path.style.strokeDashoffset = String(item.len * (1 - eased));
          }
        });

        if (elapsed < total) {
          rafRef.current = requestAnimationFrame(frame);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if ((entry.isIntersecting || trigger) && !triggered) {
            triggered = true;
            play();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(svgEl);

    // Also trigger if prop becomes true
    if (trigger && !triggered) {
      triggered = true;
      play();
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger]);

  return (
    <div className={`relative select-none ${className}`} style={{ display: "inline-block", ...style }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1340 420"
        width={width}
        height={(width * 420) / 1340}
        style={{ overflow: "visible", display: "block" }}
        className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] h-auto"
        aria-label="Kishor Kumar Handwritten Signature"
      >
        {STROKES.map((s, i) => (
          <path
            key={s.id}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={s.d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}

