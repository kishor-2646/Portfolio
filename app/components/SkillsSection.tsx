"use client";

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useHasMounted } from '../lib/hooks';
import { SPRING_CONFIG } from '../lib/constants';
import { SKILL_CATEGORIES } from '../lib/data';

const SkillsSection: React.FC = () => {
  const hasMounted = useHasMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const highlightMask = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Floating dots (client-only)
  const dots = useMemo(() => {
    return [...Array(18)].map(() => ({
      path: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
      duration: 12 + Math.random() * 8,
    }));
  }, []);

  return (
    <section
      id="skills"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden group/skills"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static circuit pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L90 10 L90 90 L10 90 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='10' cy='10' r='1' fill='white'/%3E%3Ccircle cx='90' cy='10' r='1' fill='white'/%3E%3Ccircle cx='90' cy='90' r='1' fill='white'/%3E%3Ccircle cx='10' cy='90' r='1' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Mouse-reveal indigo grid */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage: highlightMask, WebkitMaskImage: highlightMask }}>
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='indigo' stroke-width='1.5'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        {/* Floating indigo dots (client-only) */}
        {hasMounted && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-indigo-400/80 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.6)]"
                animate={{
                  left: dot.path,
                  top: dot.path.slice().reverse(),
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        )}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Moving glow orb */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-indigo-600/[0.22] rounded-full blur-[160px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Heading */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-indigo-500" />
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.5em]">System Capabilities</h2>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
            Stack <span className="text-indigo-900/40">&amp;</span> Expertise.
          </h2>
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative p-10 bg-white/[0.08] backdrop-blur-3xl border border-white/20 rounded-[3rem] hover:border-indigo-500/50 transition-all duration-700 shadow-2xl overflow-hidden"
            >
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] group-hover:bg-indigo-500/40 transition-colors" />
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center gap-6 mb-12">
                  <div className="p-5 bg-white/10 rounded-3xl group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all duration-500 shadow-inner">
                    <cat.icon size={36} className="text-white group-hover:text-indigo-100" />
                  </div>
                  <h3 className="text-3xl font-black text-white leading-tight">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-3 mt-auto">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: 'black', borderColor: 'white' }}
                      className="px-6 py-3 bg-white/10 text-slate-100 rounded-2xl text-sm font-black border border-white/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
