import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShapeGrid from './ShapeGrid.tsx';

gsap.registerPlugin(ScrollTrigger);

const designsData = [
  {
    title: "AI Agent Platform Dashboard",
    category: "Product Design",
    color: "#0f172a" // Dark slate
  },
  {
    title: "Smart Home Controller UI",
    category: "Mobile Design",
    color: "#1e293b" // Charcoal
  },
  {
    title: "Cyberpunk Portfolio Concept",
    category: "Creative Direction",
    color: "#C44900" // Accent Orange
  },
  {
    title: "Fintech Mobile Wallet",
    category: "Financial App",
    color: "#111827" // Very dark gray
  },
  {
    title: "Crypto Trading Terminal",
    category: "Data Visualization",
    color: "#1f2937" // Dark gray
  },
  {
    title: "Developer Workspace Theme",
    category: "IDE Experience",
    color: "#090d16" // Deep navy
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
              invalidateOnRefresh: true
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="designs" className="relative w-full overflow-hidden bg-[#f8f8f8]">
      {/* Centering calculations, adaptive widths, and scrollbar hiding scoped to Designs section */}
      <style>{`
        #designs {
          --card-width: 420px; /* default xl card width */
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #designs {
            --card-width: 320px; /* md card width */
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          #designs {
            --card-width: 360px; /* lg card width */
          }
        }

        #designs,
        #designs * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        #designs::-webkit-scrollbar,
        #designs *::-webkit-scrollbar {
          display: none !important;
        }

        #designs .designs-track {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        @media (min-width: 768px) {
          #designs .designs-track {
            /* Calculates left/right padding so Card 01 starts centered and Card 06 ends centered */
            padding-left: calc(50vw - (var(--card-width) / 2)) !important;
            padding-right: calc(50vw - (var(--card-width) / 2)) !important;
          }
        }
      `}</style>

      {/* Interactive Background ShapeGrid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShapeGrid 
          speed={0} 
          squareSize={55} 
          borderColor="rgba(51, 65, 85, 0.05)" 
          hoverFillColor="rgba(51, 65, 85, 0.12)" 
          shape="square" 
          hoverTrailAmount={6} 
          gradientColor="#f8f8f8" 
        />
      </div>

      {/* On Desktop: Sticky full-screen view. On Mobile: static relative view */}
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-start pt-16 md:pt-24 pb-12 z-30">
        
        {/* Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 mb-10 md:mb-14 flex flex-col items-start z-10 flex-shrink-0">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
            Creative Showcase
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
            Designs
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[360px] mt-3">
            Multi-media graphic design posters crafted using Adobe Photoshop.
          </p>
        </div>

        {/* Cards flex container. uses .designs-track for viewport-relative centering offsets */}
        <div 
          ref={scrollSectionRef} 
          className="designs-track flex flex-col md:flex-row gap-8 md:gap-16 items-center w-full md:w-max will-change-transform flex-grow md:flex-grow-0 z-10"
        >
          {designsData.map((design, index) => (
            <div 
              key={index} 
              className="w-full sm:w-[500px] md:w-[320px] lg:w-[360px] xl:w-[420px] flex-shrink-0 aspect-[1080/1350] relative group overflow-hidden border border-slate-200/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Solid Color Background with Large Translucent Index Number */}
              <div 
                style={{ backgroundColor: design.color }} 
                className="w-full h-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center select-none"
              >
                <span className="text-white/10 font-sans text-8xl md:text-9xl font-black tracking-tighter">
                  0{index + 1}
                </span>
              </div>
              
              {/* Gradient Hover Info Overlay */}
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

      </div>
    </section>
  );
}
