import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown, Sparkles, Terminal } from 'lucide-react';
import ColorBends from './ColorBends';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.08, 0.95, 1],
      opacity: [0.15, 0.25, 0.15, 0.15],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="parallax-section bg-black z-10 py-20 lg:py-0" id="hero">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ColorBends
          colors={["#ffffff", "#e2e8f0", "#cbd5e1", "#94a3b8", "#475569", "#334155", "#1e293b", "#0f172a"]}
          rotation={45}
          speed={0.15}
          scale={1.3}
          frequency={1.5}
          warpStrength={0.7}
          mouseInfluence={0.6}
          parallax={0.3}
          iterations={2}
          intensity={1.0}
          bandWidth={5}
          transparent
          className="absolute inset-0 w-full h-full opacity-35"
        />
        {/* Specular dots grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="relative w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-stack-md text-left">
            {/* Top Micro-badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-on-surface-variant w-fit text-xs font-semibold tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-zinc-400" />
              <span>OJT Candidate &bull; System Integrator</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-[64px] font-black tracking-tight leading-[1.1] text-gradient-silver pb-2"
            >
              Zeus Angelo <br />
              Vargas Bautista
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              Architecting high-fidelity digital experiences. Engineered for precision, designed with purpose. 4th-year BSIT student specializing in web stacks, cloud services, and AI orchestration.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-silver px-8 py-4 rounded-full font-label-md text-xs uppercase tracking-[0.2em] font-black text-center shadow-lg"
              >
                View Protocol
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-label-md text-xs uppercase tracking-[0.2em] font-black text-center backdrop-blur-md transition-colors"
              >
                Establish Link
              </motion.a>
            </motion.div>
          </div>

          {/* Premium Vector Avatar Placeholder */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full" />
            <motion.div
              whileHover={{ rotateY: 3, rotateX: -3, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="silver-border rounded-2xl p-2.5 relative z-10 overflow-hidden max-w-sm w-full aspect-[3/4] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Monochromatic Premium Abstract Vector representation */}
              <div className="w-full h-full rounded-xl bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
                
                {/* Abstract Glowing Sphere Grid representing Core AI/Systems */}
                <svg className="w-4/5 h-4/5 text-zinc-800 opacity-60 z-0" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#4b5563" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#111827" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Concentric rings */}
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.75" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 2" />
                  <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" />
                  
                  {/* Rotating lines */}
                  <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.25" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.25" />
                  <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
                  <line x1="21.7" y1="78.3" x2="78.3" y2="21.7" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
                  
                  {/* Glowing core */}
                  <circle cx="50" cy="50" r="4" fill="url(#silverGrad)" className="animate-pulse" />
                </svg>

                {/* Glassmorphic card overlay details */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md text-left z-10">
                  <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wider uppercase mb-1">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>SYSTEM CORE v1.0.4</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded overflow-hidden">
                    <motion.div
                      animate={{ width: ['20%', '80%', '45%', '90%', '20%'] }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                      className="bg-white h-full"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono mt-1.5 uppercase">
                    <span>HOST: CLOUDFLARE</span>
                    <span>PING: 14MS</span>
                  </div>
                </div>

                {/* Silver highlights */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <span className="font-label-md text-[9px] tracking-[0.25em] text-white uppercase">Initialize Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white" />
        </div>
      </div>
    </section>
  );
}
