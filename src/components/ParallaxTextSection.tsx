import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShapeGrid from './ShapeGrid.tsx';

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
      className="relative w-full overflow-hidden bg-[#fafafa] py-16 md:py-24 border-y border-slate-200/60"
    >
      {/* Interactive Background ShapeGrid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShapeGrid
          speed={0}
          squareSize={55}
          borderColor="rgba(51, 65, 85, 0.05)"
          hoverFillColor="rgba(51, 65, 85, 0.12)"
          shape="square"
          hoverTrailAmount={6}
          gradientColor="#fafafa"
        />
      </div>

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
          className="flex items-center whitespace-nowrap will-change-transform select-none"
        >
          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Software
          </span>
          <span className="font-serif text-[clamp(1.5rem,3.5vw,5rem)] text-slate-300 mx-4 sm:mx-8 md:mx-14 font-light italic">
            &
          </span>
          <span className="font-sans text-[clamp(2.5rem,7.5vw,13rem)] font-black text-black leading-none tracking-tighter uppercase">
            Hardware
          </span>

          <div className="hidden md:flex ml-16 pr-32 flex-col gap-1 text-left border-l border-slate-200/80 pl-10 flex-shrink-0">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-[0.25em]">Focus</span>
            <div className="h-[1.5px] w-6 bg-accent mb-1.5" />
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Performance</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Scalability</span>
            <span className="text-lg text-slate-700 font-mono uppercase tracking-tight font-bold">Clean UI</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile-only Competency & Focus grid directly below the 2 animated rows */}
      <div className="md:hidden px-6 pt-10 mt-8 border-t border-slate-200/60 w-full max-w-[480px] mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-0.5">Competency</span>
            <div className="h-[1.5px] w-5 bg-accent mb-1" />
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">Web Applications</span>
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">Backend Systems</span>
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">AI Integration</span>
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-0.5">Focus</span>
            <div className="h-[1.5px] w-5 bg-accent mb-1" />
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">Performance</span>
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">Scalability</span>
            <span className="text-xs sm:text-sm text-slate-700 font-mono uppercase tracking-tight font-bold">Clean UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}