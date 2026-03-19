"use client";

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Sparkles, Briefcase, Trophy, Github, Activity, Star } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { ABOUT_SPRING_CONFIG } from '../lib/constants';

const STATS = [
  { label: 'Experience', value: '05+', icon: Briefcase },
  { label: 'Milestones', value: '40+', icon: Trophy },
  { label: 'OSS Commits', value: '1.2k', icon: Github },
  { label: 'Efficiency', value: '100%', icon: Activity },
];

const ACHIEVEMENT_CHIPS = ['IoT Integration', 'Real-time Ops', 'React Native'];

const AboutSection: React.FC = () => {
  const hasMounted = useHasMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, ABOUT_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, ABOUT_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Animated data-stream threads (client-only)
  const threads = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      isVertical: i % 2 === 0,
      initialPos: Math.random() * 100 + '%',
      path: ['-20%', '120%'],
      duration: 6 + Math.random() * 10,
      delay: i * 0.8,
    }));
  }, []);

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden group/about"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Static diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 1px, transparent 1px, transparent 15px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Mouse-reveal emerald pattern */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #10b981, #10b981 1px, transparent 1px, transparent 15px)',
              backgroundSize: '30px 30px',
            }}
          />
        </motion.div>

        {/* Moving glow orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[120px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }}
        />

        {/* Animated data-stream threads (client-only) */}
        {hasMounted && (
          <div className="absolute inset-0 overflow-hidden opacity-[0.4] z-0">
            {threads.map((thread, i) => (
              <motion.div
                key={i}
                className="absolute bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.6)] rounded-full"
                style={{
                  width: thread.isVertical ? '2px' : '300px',
                  height: thread.isVertical ? '300px' : '2px',
                  top: thread.isVertical ? 0 : thread.initialPos,
                  left: thread.isVertical ? thread.initialPos : 0,
                }}
                animate={thread.isVertical ? { top: thread.path } : { left: thread.path }}
                transition={{ duration: thread.duration, repeat: Infinity, ease: 'linear', delay: thread.delay }}
              />
            ))}
          </div>
        )}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Slow-rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] border-[1px] border-white/10 rounded-full opacity-[0.07]"
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Heading */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Sparkles className="text-emerald-400" size={24} />
            <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">System Metadata</h2>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Overview &amp; Focus.</h2>
        </div>

        {/* Bio + Stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 bg-white/[0.06] backdrop-blur-2xl border border-white/20 rounded-[3rem] space-y-8 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 shadow-xl"
          >
            <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                digital architectures
              </span>{' '}
              that bridge the gap between imagination and reality.
            </p>
            <div className="space-y-6 text-slate-100 text-lg leading-relaxed font-medium">
              <p>
                Since 2018, I&apos;ve transformed complex requirements into scalable applications, focusing on the intersection
                of human-centric design and machine efficiency.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/[0.06] backdrop-blur-3xl border border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-white/40 transition-all duration-500 shadow-lg"
              >
                <div className="p-5 bg-white/10 rounded-[1.5rem] text-slate-100 mb-6 group-hover:text-white group-hover:bg-white/20 transition-all">
                  <stat.icon size={28} />
                </div>
                <div className="text-5xl font-black mb-2 text-white">{stat.value}</div>
                <div className="text-slate-300 text-xs uppercase font-black tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured achievement banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group p-12 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-3xl border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[100px] group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8 text-white">
              <div className="p-6 bg-white/10 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Star className="text-amber-400 fill-amber-400" size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tight">Featured Achievement</h3>
                <p className="text-slate-100 text-lg font-medium">Smart Ambulance Ecosystem — Global Hackathon Runner-up</p>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {ACHIEVEMENT_CHIPS.map((chip) => (
                <div
                  key={chip}
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white text-sm font-bold backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
