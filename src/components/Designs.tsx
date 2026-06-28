import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const designsData = [
  {
    title: "AI Agent Platform Dashboard",
    category: "Product Design",
    image: "/design_1.png"
  },
  {
    title: "Smart Home Controller UI",
    category: "Mobile Design",
    image: "/design_2.png"
  },
  {
    title: "Cyberpunk Portfolio Concept",
    category: "Creative Direction",
    image: "/design_3.png"
  },
  {
    title: "Fintech Mobile Wallet",
    category: "Financial App",
    image: "/design_4.png"
  },
  {
    title: "Crypto Trading Terminal",
    category: "Data Visualization",
    image: "/design_5.png"
  },
  {
    title: "Developer Workspace Theme",
    category: "IDE Experience",
    image: "/design_6.png"
  }
];

export default function Designs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop layout: min-width 768px
      mm.add("(min-width: 768px)", () => {
        if (!scrollSectionRef.current || !containerRef.current) return;

        const scrollWidth = scrollSectionRef.current.scrollWidth;
        const totalTranslation = -(scrollWidth - window.innerWidth);

        gsap.fromTo(
          scrollSectionRef.current,
          { x: 0 },
          {
            x: totalTranslation,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progressEl = document.getElementById('designs-progress-bar');
                if (progressEl) {
                  progressEl.style.width = `${self.progress * 100}%`;
                }
              }
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="designs" className="relative w-full overflow-hidden bg-[#f8f8f8]">
      {/* On Desktop: Sticky full-screen view. On Mobile: static relative view */}
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-16 md:py-0 z-30">
        
        {/* Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 mb-10 md:mb-14 flex flex-col items-start z-10 flex-shrink-0">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
            Creative Showcase
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
            Designs
          </h2>
        </div>

        {/* Cards flex container */}
        <div 
          ref={scrollSectionRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-16 px-6 md:px-24 items-center w-full md:w-max will-change-transform flex-grow md:flex-grow-0"
        >
          {designsData.map((design, index) => (
            <div 
              key={index} 
              className="w-full sm:w-[500px] md:w-[320px] lg:w-[360px] xl:w-[420px] flex-shrink-0 aspect-[1080/1350] relative group overflow-hidden border border-slate-200/50 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Design Image */}
              <img 
                src={design.image} 
                alt={design.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <span className="text-accent font-mono text-xs md:text-sm uppercase tracking-wider font-bold mb-1">
                  {design.category}
                </span>
                <h3 className="text-white font-sans text-lg md:text-xl font-bold tracking-tight">
                  {design.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar (Desktop only) */}
        <div className="hidden md:block absolute bottom-12 left-24 right-24 h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div 
            id="designs-progress-bar"
            className="h-full bg-accent w-0 transition-all duration-100 ease-out"
          />
        </div>

      </div>
    </section>
  );
}
