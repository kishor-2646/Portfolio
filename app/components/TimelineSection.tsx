"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { History, AlertCircle, Bug, X, RotateCcw } from 'lucide-react';
import { useHasMounted } from '../lib/hooks';
import { TIMELINE_SPRING_CONFIG } from '../lib/constants';
import { TIMELINE_PATHS, FAILURE_LOGS } from '../lib/data';

const TimelineSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [showFailures, setShowFailures] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, TIMELINE_SPRING_CONFIG);
  const smoothY = useSpring(mouseY, TIMELINE_SPRING_CONFIG);
  const maskImage = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Ripple positions (client-only)
  const ripples = useMemo(() => {
    return [...Array(8)].map(() => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section
      id="timeline"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 bg-black overflow-hidden group/timeline"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static vertical stripe */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
            backgroundSize: '100px 100%',
          }}
        />

        {/* Mouse-reveal violet stripes */}
        <motion.div className="absolute inset-0 z-10" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `linear-gradient(to right, #8b5cf6 1.5px, transparent 1.5px)`,
              backgroundSize: '100px 100%',
            }}
          />
        </motion.div>

        {/* Ripple rings (client-only) */}
        {hasMounted && (
          <div className="absolute inset-0 z-20">
            {ripples.map((ripple, i) => (
              <motion.div
                key={i}
                className="absolute border border-violet-500/40 rounded-full"
                style={{ left: ripple.x, top: ripple.y }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 400, height: 400, opacity: [0, 0.4, 0], scale: [0.5, 1.2] }}
                transition={{ duration: ripple.duration, repeat: Infinity, ease: 'easeOut', delay: ripple.delay }}
              />
            ))}
          </div>
        )}

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none" />

        {/* Moving glow orb */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-violet-600/[0.12] rounded-full blur-[200px] z-0"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%' }}
        />
      </div>

      {/* ── Failure-logs floating button + modal ── */}
      {hasMounted && (
        <>
          {/* FAB */}
          <div className="absolute bottom-12 right-4 md:right-12 z-[100] flex flex-col items-center gap-3">
            <button
              onClick={() => setShowFailures(true)}
              className="p-5 rounded-full bg-black/80 backdrop-blur-2xl border border-amber-500/30 text-amber-500 shadow-2xl hover:border-amber-500/60 hover:scale-110 transition-all duration-300 relative group"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <AlertCircle size={28} />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
            </button>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            >
              My Failures
            </motion.span>
          </div>

          {/* Modal */}
          <AnimatePresence>
            {showFailures && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFailures(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-lg bg-black/90 border border-amber-500/30 rounded-[3rem] shadow-[0_0_80px_rgba(245,158,11,0.2)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(245,158,11,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

                  <div className="p-8 md:p-12 relative z-10">
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                          <Bug size={24} className="text-amber-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white uppercase tracking-widest">System_Debug_Logs</h3>
                          <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-tighter">
                            Status: Correction_Active
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowFailures(false)}
                        className="p-3 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-8 mb-10">
                      {FAILURE_LOGS.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black text-slate-600 tracking-widest">{log.code}</span>
                            <span className="text-[9px] font-black text-amber-500/50">{log.year}</span>
                          </div>
                          <h4 className="text-white text-lg font-black tracking-tight mb-2 italic">&quot;{log.title}&quot;</h4>
                          <p className="text-slate-400 text-sm font-medium leading-relaxed border-l-2 border-amber-500/40 pl-5">
                            {log.lesson}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 text-center">
                      <div className="flex items-center justify-center gap-3 text-amber-500 text-xs font-black uppercase tracking-[0.3em]">
                        <RotateCcw size={16} className="animate-spin-slow" />
                        Iterative_Success_Verified
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-32 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <History className="text-violet-400" size={24} />
            <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.5em]">Evolutionary Tracks</h2>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Milestones.
            </span>
          </h2>
        </div>

        {/* Three path columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {TIMELINE_PATHS.map((path, pIdx) => (
            <div key={pIdx} className="relative flex flex-col items-center">
              {/* Column header */}
              <div className="text-center mb-24 relative z-20 w-full group">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className={`mx-auto mb-6 p-6 w-fit rounded-[2.5rem] bg-${path.color}-500/10 border border-${path.color}-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-${path.color}-500/20 transition-all duration-500`}
                >
                  <path.icon size={44} className={`text-${path.color}-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]`} />
                </motion.div>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">{path.title}</h3>
                <div className={`mt-6 mx-auto w-1/3 h-[2px] bg-gradient-to-r from-transparent via-${path.color}-500 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.5)]`} />
              </div>

              {/* Vertical conduit — base */}
              <div className={`absolute top-48 bottom-0 w-[3px] left-1/2 -translate-x-1/2 z-0 opacity-40 bg-${path.color}-500 shadow-[0_0_20px_rgba(0,255,255,0.2)]`} />

              {/* Vertical conduit — animated fill */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 'calc(100% - 180px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-48 w-[3px] left-1/2 -translate-x-1/2 z-10 overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              >
                <div className={`w-full h-full bg-gradient-to-b from-${path.color}-500 via-${path.color}-400 to-transparent`} />
                {/* Travelling pulse */}
                {[0, 0.5, 1].map((delay, k) => (
                  <motion.div
                    key={k}
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
                    className={`absolute left-0 w-full h-64 bg-gradient-to-b from-transparent via-${k === 2 ? path.color + '-300' : 'white'} to-transparent blur-[${k === 1 ? '12px' : '8px'}] opacity-${k === 1 ? '80' : k === 2 ? '90' : '100'} z-20`}
                  />
                ))}
              </motion.div>

              {/* Timeline events */}
              <div className="space-y-32 w-full relative z-20">
                {path.timeline.map((event, eIdx) => (
                  <motion.div
                    key={eIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: pIdx * 0.15 + eIdx * 0.1 }}
                    className="group relative flex flex-col items-center"
                  >
                    {/* Branch line */}
                    <div className={`absolute top-[12px] w-14 h-[3px] bg-${path.color}-500 left-1/2 -translate-x-[calc(50%+7px)] z-10 opacity-80 shadow-[0_0_20px_rgba(255,255,255,0.4)]`} />

                    {/* Node dot */}
                    <div className={`w-8 h-8 rounded-full bg-black border-[4px] border-${path.color}-500 shadow-[0_0_30px_rgba(0,0,0,1)] relative z-30 group-hover:scale-125 transition-transform duration-300 overflow-hidden`}>
                      <div className={`absolute inset-0 bg-${path.color}-400/60 animate-pulse`} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
                    </div>

                    {/* Event card */}
                    <div className="mt-12 w-full px-2">
                      <div className={`group-hover:-translate-y-2 p-10 bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[3rem] group-hover:border-${path.color}-500/60 transition-all duration-700 shadow-2xl relative overflow-hidden text-center`}>
                        <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-${path.color}-500/0 via-${path.color}-500 to-${path.color}-500/0 group-hover:via-${path.color}-400 transition-all duration-700 shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                        <div className="relative z-10">
                          <span className={`inline-block px-5 py-2 rounded-full bg-${path.color}-500/15 border border-${path.color}-500/40 text-[11px] font-black text-${path.color}-300 mb-6 tracking-[0.25em] shadow-inner`}>
                            {event.date}
                          </span>
                          <h4 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                            {event.label}
                          </h4>
                          <div className={`w-16 h-1 bg-${path.color}-500/40 mx-auto mb-5 rounded-full group-hover:w-36 group-hover:bg-${path.color}-400 transition-all duration-700`} />
                          <p className="text-slate-300 text-sm font-bold uppercase tracking-widest opacity-70 leading-relaxed group-hover:opacity-100 transition-opacity">
                            {event.focus}
                          </p>
                        </div>
                        <div className={`absolute -bottom-10 -left-10 w-48 h-48 bg-${path.color}-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
