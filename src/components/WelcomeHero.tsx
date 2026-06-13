import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Terminal, Cpu, ArrowRight, Mail, Sparkles, Code2 } from 'lucide-react';

export default function WelcomeHero() {
  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Upward entrance animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Rotating background glow helper
  const glowVariants: Variants = {
    animate: {
      scale: [1, 1.05, 0.95, 1],
      opacity: [0.2, 0.25, 0.2, 0.2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 bg-black">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-zinc-700/10 blur-[120px]"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-zinc-800/15 blur-[120px]"
        />
        {/* Subtle grid pattern overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Main Glassmorphic Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-950/30 backdrop-blur-xl border border-zinc-800/80 shadow-[0_0_50px_-12px_rgba(255,255,255,0.06)] flex flex-col items-center text-center"
      >
        {/* Top Floating Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 text-sm font-semibold tracking-wide shadow-inner mb-8"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-zinc-400" />
          <span>OJT Candidate & Student Portfolio</span>
        </motion.div>

        {/* Developer Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4"
        >
          Zeus Angelo{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
            Vargas Bautista
          </span>
        </motion.h1>

        {/* Developer Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 max-w-2xl mb-6 leading-relaxed"
        >
          4th-year BSIT Student building performant web applications, intelligent AI integrations, and cross-platform software.
        </motion.p>

        {/* Short bio / objective */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-zinc-400 max-w-xl mb-8 leading-relaxed"
        >
          Seeking internship/OJT opportunities to leverage web technologies, cloud ecosystems, and full-stack software development skills.
        </motion.p>

        {/* Tech badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-300 font-medium">
            <Code2 className="w-3.5 h-3.5 text-zinc-400" /> Astro
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-300 font-medium">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" /> React.js
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-300 font-medium">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" /> TypeScript
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Tailwind CSS
          </span>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-950 font-semibold shadow-lg shadow-zinc-300/10 hover:from-white hover:to-zinc-200 transition-all duration-200"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(39, 39, 42, 0.8)' }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Get in Touch</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mt-12 border-t border-zinc-800/80 pt-8 w-full max-w-sm"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
