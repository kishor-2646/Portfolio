"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import portfolioConfig from '../../portfolio.config';

interface Slide {
  id: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
  subtitle: string;
}

const DEFAULT_PHOTOS: Slide[] = [
  {
    id: "medsakthi",
    src: "/projects/MedSakthi.png",
    alt: "MedSakthi Healthcare Platform",
    tag: "Healthcare Architecture",
    title: "MedSakthi Healthcare Management",
    subtitle: "Hospital operations & real-time patient queue optimization system.",
  },
  {
    id: "trucksingh",
    src: "/projects/trucksingh.png",
    alt: "TruckSingh Logistics System",
    tag: "Real-Time Fleet Tech",
    title: "TruckSingh Logistics Platform",
    subtitle: "Live fleet GPS tracking, reducing manual logistics operations by 40%.",
  },
  {
    id: "greenwave",
    src: "/projects/greenwave.png",
    alt: "GreenWave SDG Ideathon Winner",
    tag: "SDG Ideathon 3.0 Winner",
    title: "Winner — Sairam SDG Ideathon 3.0",
    subtitle: "Social-impact solution aligned with UN SDG Goal 1 (No Poverty).",
  },
  {
    id: "pcify",
    src: "/projects/PCify.png",
    alt: "PCify E-Commerce Architecture",
    tag: "High-Performance Systems",
    title: "PCify Hardware Configurator",
    subtitle: "Dynamic PC builder engine with real-time component compatibility.",
  },
  {
    id: "profile",
    src: "/potrait.png",
    alt: "Kishor Kumar Engineering Milestone",
    tag: "Production Impact",
    title: "Production-Grade Engineering",
    subtitle: "Built systems for 100+ live users with 60%+ communication efficiency.",
  },
];

const PHOTOS: Slide[] = portfolioConfig.about?.carouselSlides || DEFAULT_PHOTOS;

const AUTOPLAY_INTERVAL = 3800;

export default function CinematicPhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  // Automatic infinite rotation timer with visibility awareness
  useEffect(() => {
    if (prefersReduced) return;

    let intervalId: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          setCurrent((prev) => (prev + 1) % PHOTOS.length);
        }, AUTOPLAY_INTERVAL);
      }
    };

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReduced]);

  // Calculate layer transformation properties based on step distance from active index
  // Closely matches the reference GSAP slider depth & visibility
  const getLayerProps = (index: number) => {
    const total = PHOTOS.length;
    let diff = (index - current + total) % total;
    if (diff > total / 2) diff -= total; // Normalized to -2, -1, 0, 1, 2...

    if (diff === 0) {
      // 1. MAIN ACTIVE FOREGROUND PHOTO (Bigger, sharp, prominent, 100% visible)
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1.16,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 10,
      };
    } else if (diff === -1) {
      // 2. TOP BACKGROUND PHOTO (Smaller than main, visible, soft 4.5px blur, 72% opacity, tilted -12deg)
      return {
        x: -32,
        y: -110,
        rotate: -12,
        scale: 0.90,
        opacity: 0.72,
        filter: "blur(4.5px)",
        zIndex: 6,
      };
    } else if (diff === 1) {
      // 3. BOTTOM BACKGROUND PHOTO (Smaller than main, visible, soft 4px blur, 65% opacity, tilted +12deg)
      return {
        x: -12,
        y: 110,
        rotate: 12,
        scale: 0.82,
        opacity: 0.65,
        filter: "blur(4px)",
        zIndex: 5,
      };
    } else if (diff === -2) {
      // 4. DEEP EXITING BACKGROUND LAYER
      return {
        x: -60,
        y: -190,
        rotate: -22,
        scale: 0.72,
        opacity: 0.2,
        filter: "blur(9px)",
        zIndex: 2,
      };
    } else {
      // 5. DEEP ENTERING BACKGROUND LAYER
      return {
        x: -20,
        y: 190,
        rotate: 22,
        scale: 0.70,
        opacity: 0.2,
        filter: "blur(9px)",
        zIndex: 2,
      };
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* 3D Layered Cinematic Photo Rotation Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] h-[340px] sm:h-[390px] md:h-[430px] select-none pointer-events-none my-4 lg:my-0 flex items-center justify-center overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          {PHOTOS.map((photo, index) => {
            const props = getLayerProps(index);

            return (
              <motion.div
                key={photo.id}
                className="absolute w-[84%] sm:w-[82%] aspect-[1.38] rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                style={{
                  backgroundColor: "#0d0d0d",
                  transformOrigin: "center center",
                  willChange: "transform, opacity, filter",
                }}
                animate={
                  prefersReduced
                    ? {
                        opacity: index === current ? 1 : 0,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        filter: "blur(0px)",
                        zIndex: index === current ? 10 : 1,
                      }
                    : {
                        x: props.x,
                        y: props.y,
                        rotate: props.rotate,
                        scale: props.scale,
                        opacity: props.opacity,
                        filter: props.filter,
                        zIndex: props.zIndex,
                      }
                }
                transition={{
                  duration: 1.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Elegant Milestone & Achievement Caption Strip */}
      <div className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] pt-4 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={PHOTOS[current].id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="text-xs sm:text-[12.5px] font-semibold uppercase tracking-[0.22em] text-white/75">
                {PHOTOS[current].tag}
              </span>
              <span className="text-xs font-mono text-white/45 font-medium">
                • {String(current + 1).padStart(2, "0")}/{String(PHOTOS.length).padStart(2, "0")}
              </span>
            </div>

            <h4 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
              {PHOTOS[current].title}
            </h4>

            <p className="text-xs sm:text-sm text-white/65 font-normal leading-relaxed max-w-sm sm:max-w-md mx-auto">
              {PHOTOS[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

