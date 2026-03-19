"use client";

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Github, ExternalLink, Layers3, ChevronRight } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { PROJECT_SPRING_CONFIG } from '../lib/constants';
import { PROJECTS } from '../lib/data';

const ProjectsSection: React.FC = () => {
  const hasMounted = useHasMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, PROJECT_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, PROJECT_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(550px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Floating binary fragments (client-only)
  const fragments = useMemo(() => {
    return [...Array(12)].map(() => ({
      x: Math.random() * 100 + '%',
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      code: Math.random() > 0.5 ? '10' : '01',
    }));
  }, []);

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden group/projects"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static hexagon pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 140px',
          }}
        />

        {/* Mouse-reveal cyan hexagons */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div
            className="absolute inset-0 opacity-[0.6]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='70' viewBox='0 0 40 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z' fill='none' stroke='cyan' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 140px',
            }}
          />
        </motion.div>

        {/* Floating binary fragments (client-only) */}
        {hasMounted && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {fragments.map((frag, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-cyan-500/20 border border-cyan-400/40 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                initial={{ x: frag.x, y: '120%', opacity: 0 }}
                animate={{ y: '-20%', opacity: [0, 0.7, 0.7, 0], rotate: [0, 180, 360], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: frag.duration, repeat: Infinity, ease: 'linear', delay: frag.delay }}
              >
                <div className="w-full h-full flex items-center justify-center text-[6px] font-black text-cyan-300 opacity-50">
                  {frag.code}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Moving glow orb */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-cyan-600/[0.15] rounded-full blur-[180px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading + archive button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Layers3 className="text-cyan-400" size={24} />
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em]">System Output</h2>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Featured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Deployments.</span>
            </h2>
          </div>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md group shadow-xl">
            Open Archive <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/50 hover:scale-[1.02] transition-all duration-500 shadow-2xl relative"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-slate-600 font-black text-xs uppercase tracking-[0.3em] text-center px-10 leading-relaxed">
                  Interface_Module_V{i + 1} <br />
                  <span className="text-[10px] text-slate-800">Rendering_Binary_Data...</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {p.title}
                  </h3>
                  <div className="flex gap-2">
                    <a href="#" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all shadow-inner">
                      <Github size={18} />
                    </a>
                    <a href="#" className="p-3 bg-white rounded-xl text-black hover:scale-110 active:scale-95 transition-all">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed font-medium line-clamp-3 italic opacity-80 group-hover:opacity-100 transition-opacity">
                  &quot;{p.description}&quot;
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.15em] font-black px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20"
                    >
                      {tag}
                    </span>
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

export default ProjectsSection;
