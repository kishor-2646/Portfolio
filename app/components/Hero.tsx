"use client";

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Layers, Database, Smartphone, Zap, ChevronRight, User } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { SPRING_CONFIG } from '../lib/constants';

const FLOATING_ICONS = [Layers, Database, Smartphone, Zap];

const Hero: React.FC = () => {
  const hasMounted = useHasMounted();

  // Mouse-tracked spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Generate random floating cubes once on mount (avoids hydration mismatch)
  const cubes = useMemo(() => {
    return [...Array(12)].map(() => ({
      x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
      y: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 5,
      size: 15 + Math.random() * 20,
    }));
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 px-4 bg-black overflow-hidden group/hero"
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}
        />
        {/* Coarse grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Mouse-reveal colour grid */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '60px 60px' }}
          />
        </motion.div>

        {/* Floating data cubes (client-only) */}
        {hasMounted && (
          <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {cubes.map((cube, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/[0.2] border border-white/40 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm"
                style={{ width: cube.size, height: cube.size }}
                animate={{
                  left: cube.x,
                  top: cube.y,
                  opacity: [0, 0.9, 0.9, 0],
                  rotate: [0, 180, 360],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ duration: cube.duration, repeat: Infinity, ease: 'linear', delay: cube.delay }}
              />
            ))}
          </div>
        )}

        {/* Bottom + radial fade-out masks */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_95%)] z-20 pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-30">
        {/* Text column */}
        <div className="space-y-10 text-left order-2 lg:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.95]"
          >
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300">
              Future Logic.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-xl leading-relaxed font-medium"
          >
            Full-stack developer focused on high-performance distributed systems and pixel-perfect interface engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-10 py-5 bg-white text-black hover:scale-105 active:scale-95 rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-3">
              View Work <ChevronRight size={20} />
            </button>
            <button className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all text-lg backdrop-blur-md">
              Get Resume
            </button>
          </motion.div>
        </div>

        {/* Avatar / floating-icon column */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end py-12">
          {FLOATING_ICONS.map((Icon, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, idx % 2 === 0 ? -15 : 15, 0] }}
              transition={{ repeat: Infinity, duration: 4 + idx, ease: 'easeInOut', delay: idx * 0.5 }}
              className={`absolute z-40 p-5 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl text-white ${
                idx === 0 ? 'top-0 right-10' : idx === 1 ? 'top-1/4 -left-10' : idx === 2 ? 'bottom-1/4 -right-10' : '-bottom-5 left-10'
              }`}
            >
              <Icon size={32} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-20 bg-indigo-500/20 rounded-full blur-[120px] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden border border-white/20 bg-black shadow-2xl transition-transform duration-700 hover:rotate-2">
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                <User size={160} className="text-slate-700" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
