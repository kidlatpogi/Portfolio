import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform row 1 to slide right-to-left on scroll down
  const x1 = useTransform(scrollYProgress, [0, 1], [180, -180]);
  // Transform row 2 to slide left-to-right on scroll down
  const x2 = useTransform(scrollYProgress, [0, 1], [-180, 180]);

  return (
    <div 
      ref={containerRef}
      className="w-full relative overflow-hidden bg-[#f8f8f8] py-20 md:py-32 flex flex-col justify-center border-y border-slate-200/40"
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col gap-12 lg:gap-16 w-full">
        {/* Row 1 */}
        <motion.div 
          style={{ x: x1 }}
          className="flex items-center whitespace-nowrap will-change-transform select-none"
        >
          <span className="font-sans text-[clamp(6rem,11vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            IT Developer
          </span>
          <span className="font-serif text-[clamp(3rem,5vw,5rem)] text-slate-300 mx-14 font-light italic">
            &
          </span>
          <span className="font-sans text-[clamp(6rem,11vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            AI Engineer
          </span>
          
          <div className="ml-16 pr-32 flex flex-col gap-1 text-left border-l border-slate-200/80 pl-10">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-[0.25em]">Services</span>
            <div className="h-[1.5px] w-6 bg-accent mb-1.5" />
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Web Applications</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Backend Systems</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">AI Integration</span>
          </div>
        </motion.div>

        {/* Row 2 */}
        <motion.div 
          style={{ x: x2 }}
          className="flex items-center whitespace-nowrap will-change-transform select-none"
        >
          <span className="font-sans text-[clamp(6rem,11vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Full Stack
          </span>
          <span className="font-serif text-[clamp(3rem,5vw,5rem)] text-slate-300 mx-14 font-light italic">
            &
          </span>
          <span className="font-sans text-[clamp(6rem,11vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Systems
          </span>

          <div className="ml-16 pr-32 flex flex-col gap-1 text-left border-l border-slate-200/80 pl-10">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-[0.25em]">Focus</span>
            <div className="h-[1.5px] w-6 bg-accent mb-1.5" />
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Performance</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Scalability</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Clean UI / Smart UX</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-6 flex flex-col gap-10">
        <div className="space-y-4">
          <div className="whitespace-nowrap translate-x-4">
            <span className="text-5xl sm:text-6xl font-black text-black uppercase leading-none tracking-tighter">IT Developer</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xl font-light italic text-slate-300">&</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="whitespace-nowrap -translate-x-4 flex justify-end">
            <span className="text-5xl sm:text-6xl font-black text-black uppercase leading-none tracking-tighter">AI Engineer</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200/60">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.2em] mb-1">Services</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">Web Apps</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">Backend API</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">AI Agents</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.2em] mb-1">Focus</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">Performance</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">Scalability</span>
            <span className="text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold">Smart UX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
