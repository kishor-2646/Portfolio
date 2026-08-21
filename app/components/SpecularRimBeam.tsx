"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface SpecularRimBeamProps {
  radius?: number;
  duration?: number; // seconds per complete loop
  borderWidth?: number;
  beamLength?: number; // length of the specular highlight in pixels
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SpecularRimBeam — Single Continuous Specular Glass Rim Reflection
 *
 * • Evaluates exact position (x, y) along the rounded rectangle perimeter using
 *   smooth continuous quarter-circle arc interpolation at all 4 corners.
 * • Direction: Bottom-right -> Bottom (right-to-left) -> Bottom-left corner -> Left (up) ->
 *   Top-left corner -> Top (left-to-right) -> Top-right corner -> Right (down) -> loop.
 * • Strict uniform width, uniform brightness, and smooth cosine falloff (dim -> soft -> bright center -> soft -> dim).
 * • Zero L-shaped corners, zero brightness spikes, zero seams, and seamless looping.
 */
export default function SpecularRimBeam({
  radius = 12,
  duration = 5.6,
  borderWidth = 1.5,
  beamLength = 82,
  className = "",
  style = {},
}: SpecularRimBeamProps) {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bufW = Math.round(w * dpr);
      const bufH = Math.round(h * dpr);

      if (canvas.width !== bufW || canvas.height !== bufH) {
        canvas.width = bufW;
        canvas.height = bufH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Offset by half borderWidth so stroke center aligns perfectly with element border
      const inset = borderWidth / 2;
      const strokeW = w - inset * 2;
      const strokeH = h - inset * 2;
      const r = Math.max(0, Math.min(radius - inset, strokeW / 2, strokeH / 2));

      const lHoriz = strokeW - 2 * r;
      const lVert = strokeH - 2 * r;
      const lArc = (Math.PI * r) / 2;

      // 8 sequential perimeter segments:
      // 0: Bottom straight (traveling right-to-left)
      // 1: Bottom-Left arc (turning upward)
      // 2: Left straight (traveling bottom-to-top)
      // 3: Top-Left arc (turning rightward)
      // 4: Top straight (traveling left-to-right)
      // 5: Top-Right arc (turning downward)
      // 6: Right straight (traveling top-to-bottom)
      // 7: Bottom-Right arc (turning leftward)
      const segLengths = [
        lHoriz, // 0: Bottom straight
        lArc,   // 1: Bottom-Left corner
        lVert,  // 2: Left straight
        lArc,   // 3: Top-Left corner
        lHoriz, // 4: Top straight
        lArc,   // 5: Top-Right corner
        lVert,  // 6: Right straight
        lArc,   // 7: Bottom-Right corner
      ];

      const perimeter = segLengths.reduce((acc, len) => acc + len, 0);

      // Current center of moving highlight along perimeter
      const progress = (elapsed % duration) / duration;
      const centerDist = progress * perimeter;

      // Exact continuous perimeter mapping function
      const getPerimeterPoint = (dist: number): { x: number; y: number } => {
        let s = dist % perimeter;
        if (s < 0) s += perimeter;

        // 0: Bottom straight (from x = w - inset - r to x = inset + r at y = h - inset)
        if (s <= segLengths[0]) {
          return {
            x: inset + strokeW - r - s,
            y: inset + strokeH,
          };
        }
        s -= segLengths[0];

        // 1: Bottom-Left corner (quarter circle from angle π/2 to angle π)
        if (s <= segLengths[1]) {
          const theta = Math.PI / 2 + (s / lArc) * (Math.PI / 2);
          const cx = inset + r;
          const cy = inset + strokeH - r;
          return {
            x: cx + r * Math.cos(theta),
            y: cy + r * Math.sin(theta),
          };
        }
        s -= segLengths[1];

        // 2: Left straight (from y = h - inset - r to y = inset + r at x = inset)
        if (s <= segLengths[2]) {
          return {
            x: inset,
            y: inset + strokeH - r - s,
          };
        }
        s -= segLengths[2];

        // 3: Top-Left corner (quarter circle from angle π to angle 3π/2)
        if (s <= segLengths[3]) {
          const theta = Math.PI + (s / lArc) * (Math.PI / 2);
          const cx = inset + r;
          const cy = inset + r;
          return {
            x: cx + r * Math.cos(theta),
            y: cy + r * Math.sin(theta),
          };
        }
        s -= segLengths[3];

        // 4: Top straight (from x = inset + r to x = w - inset - r at y = inset)
        if (s <= segLengths[4]) {
          return {
            x: inset + r + s,
            y: inset,
          };
        }
        s -= segLengths[4];

        // 5: Top-Right corner (quarter circle from angle -π/2 to angle 0)
        if (s <= segLengths[5]) {
          const theta = -Math.PI / 2 + (s / lArc) * (Math.PI / 2);
          const cx = inset + strokeW - r;
          const cy = inset + r;
          return {
            x: cx + r * Math.cos(theta),
            y: cy + r * Math.sin(theta),
          };
        }
        s -= segLengths[5];

        // 6: Right straight (from y = inset + r to y = h - inset - r at x = w - inset)
        if (s <= segLengths[6]) {
          return {
            x: inset + strokeW,
            y: inset + r + s,
          };
        }
        s -= segLengths[6];

        // 7: Bottom-Right corner (quarter circle from angle 0 to angle π/2)
        const theta = 0 + (s / lArc) * (Math.PI / 2);
        const cx = inset + strokeW - r;
        const cy = inset + strokeH - r;
        return {
          x: cx + r * Math.cos(theta),
          y: cy + r * Math.sin(theta),
        };
      };

      // Sub-segment sampling for smooth cosine falloff
      const halfLen = beamLength / 2;
      const SAMPLES = 60; // High sample density (~1.3px per sample) for silky smooth curves

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < SAMPLES; i++) {
        const u1 = (i / SAMPLES) * 2 - 1; // -1 to 1
        const u2 = ((i + 1) / SAMPLES) * 2 - 1;

        const d1 = centerDist + u1 * halfLen;
        const d2 = centerDist + u2 * halfLen;

        const pt1 = getPerimeterPoint(d1);
        const pt2 = getPerimeterPoint(d2);

        // Smooth cosine bell curve (0 at ends, 1.0 at center, continuous derivative everywhere)
        const uMid = (u1 + u2) / 2;
        const taper = Math.pow(Math.cos(uMid * (Math.PI / 2)), 2.2);

        if (taper > 0.005) {
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          // Pass 1: Subtle glass specular bloom (constant blur radius, no bloat)
          ctx.strokeStyle = `rgba(255, 255, 255, ${(taper * 0.35).toFixed(3)})`;
          ctx.shadowColor = `rgba(255, 255, 255, ${(taper * 0.80).toFixed(3)})`;
          ctx.shadowBlur = 2.5;
          ctx.lineWidth = borderWidth;
          ctx.stroke();

          // Pass 2: Crisp metallic specular core
          ctx.strokeStyle = `rgba(255, 255, 255, ${(taper * 0.95).toFixed(3)})`;
          ctx.shadowBlur = 0;
          ctx.lineWidth = borderWidth;
          ctx.stroke();
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, duration, borderWidth, beamLength, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        borderRadius: "inherit",
        overflow: "visible",
        ...style,
      }}
    />
  );
}
