import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth scroll-driven horizontal parallax on both desktop & mobile
  const x1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fafafa] py-16 md:py-24 border-y border-slate-200/60 z-10"
    >
      {/* 2 Parallax Animated Rows */}
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 w-full relative z-10">
        {/* Row 1: Web Dev & App Dev */}
        <motion.div
          style={{ x: x1 }}
          className="flex items-center whitespace-nowrap will-change-transform select-none"
        >
          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Web Dev
          </span>
          <span className="font-serif text-[clamp(1.5rem,3.5vw,5rem)] text-slate-300 mx-4 sm:mx-8 md:mx-14 font-light italic">
            &
          </span>
          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            App Dev
          </span>

          <div className="hidden md:flex ml-16 pr-32 flex-col gap-1 text-left border-l border-slate-200/80 pl-10 flex-shrink-0">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-[0.25em]">Competency</span>
            <div className="h-[1.5px] w-6 bg-accent mb-1.5" />
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Web Applications</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Backend Systems</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">AI Integration</span>
          </div>
        </motion.div>

        {/* Row 2: Software & Hardware */}
        <motion.div
          style={{ x: x2 }}
          className="flex items-center whitespace-nowrap will-change-transform select-none justify-end"
        >
          <div className="hidden md:flex mr-16 pl-32 flex-col gap-1 text-right border-r border-slate-200/80 pr-10 flex-shrink-0">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-[0.25em]">Discipline</span>
            <div className="h-[1.5px] w-6 bg-accent mb-1.5 ml-auto" />
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Full Stack Code</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">IoT & Microcontrollers</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Database Systems</span>
          </div>

          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Software
          </span>
          <span className="font-serif text-[clamp(1.5rem,3.5vw,5rem)] text-slate-300 mx-4 sm:mx-8 md:mx-14 font-light italic">
            &
          </span>
          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Hardware
          </span>
        </motion.div>
      </div>
    </section>
  );
}
