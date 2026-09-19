import { useRef, useEffect } from 'react';

export default function ParallaxTextSection() {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const updateParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      const totalDist = windowH + rect.height;
      const currentDist = windowH - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));

      // Range: [150, -150] for row 1, [-150, 150] for row 2
      const x1 = 150 - progress * 300;
      const x2 = -150 + progress * 300;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${x1}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent py-16 md:py-24 border-y border-slate-200/60 z-10"
    >
      {/* 2 Parallax Animated Rows */}
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-16 w-full relative z-10">
        {/* Row 1: Web Dev & App Dev */}
        <div
          ref={row1Ref}
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
        </div>

        {/* Row 2: Software & Hardware */}
        <div
          ref={row2Ref}
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
        </div>
      </div>
    </section>
  );
}
