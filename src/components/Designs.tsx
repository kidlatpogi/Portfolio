import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShapeGrid from './ShapeGrid.tsx';

gsap.registerPlugin(ScrollTrigger);

const designsData = [
  {
    title: "Cloud 9",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Cloud9-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Cloud9-1200.webp"
  },
  {
    title: "Papa Ketchup",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Ketchup-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Ketchup-1200.webp"
  },
  {
    title: "Here With Me",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Here-with-me-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Here-with-me-1200.webp"
  },
  {
    title: "Multo",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Multo-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Multo-1200.webp"
  },
  {
    title: "Let Down",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Typography-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Typography-1200.webp"
  },
  {
    title: "Podcast Poster",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/lamaw-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/lamaw-1200.webp"
  }
];

export default function Designs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const island = containerRef.current?.parentElement;
    if (island?.tagName === 'ASTRO-ISLAND') {
      island.style.display = 'block';
      island.style.width = '100%';
    }

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop layout: min-width 768px
      mm.add("(min-width: 768px)", () => {
        if (!scrollSectionRef.current || !containerRef.current) return;

        const getScrollDistance = () => {
          if (!scrollSectionRef.current) return 0;
          return scrollSectionRef.current.scrollWidth - window.innerWidth;
        };

        gsap.fromTo(
          scrollSectionRef.current,
          { x: 0 },
          {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getScrollDistance() * 1.1}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          }
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger after a slight delay to ensure all DOM dimensions and fonts are settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="designs" className="relative w-full overflow-hidden bg-[#f8f8f8] pt-4 pb-12 md:pt-0 z-20">
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
        /* Height-based corrections for smaller laptops */
        @media (min-width: 1024px) and (max-height: 800px) {
          #designs {
            --card-width: 290px;
          }
        }
        @media (min-width: 1280px) and (max-height: 800px) {
          #designs {
            --card-width: 330px;
          }
        }
        @media (min-width: 1536px) and (max-height: 900px) {
          #designs {
            --card-width: 380px;
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

        #designs .designs-container {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        #designs .designs-header {
          margin-bottom: 3rem;
        }
        @media (max-height: 800px) {
          #designs .designs-container {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          #designs .designs-header {
            margin-bottom: 0.75rem !important;
          }
          #designs .designs-header p {
            margin-top: 0.25rem !important;
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

      {/* On Desktop: Sticky full-screen view via GSAP pin. On Mobile: static relative view */}
      <div className="designs-container relative md:h-screen md:overflow-hidden flex flex-col justify-center py-12 z-10">

        {/* Section Header */}
        <div className="designs-header w-full max-w-[1600px] mx-auto px-6 md:px-24 mb-12 flex flex-col items-start z-10 flex-shrink-0">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
            Creative Showcase
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
            Designs
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[360px] mt-3">
            Multi-media graphic design posters crafted using Adobe Photoshop.
          </p>
        </div>

        {/* Cards container: 3x2 grid on mobile viewports, horizontal flex on desktop */}
        <div
          ref={scrollSectionRef}
          className="designs-track grid grid-cols-2 grid-rows-3 gap-4 max-sm:gap-3 md:flex md:flex-row md:gap-16 items-center w-full md:w-max will-change-transform flex-grow md:flex-grow-0 z-10"
        >
          {designsData.map((item, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={item.title}
                className="designs-card flex-shrink-0 w-full md:w-[var(--card-width)] flex flex-col group cursor-target select-none"
              >
                {/* 1:1 Aspect Ratio Card Image */}
                <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-white/80 border border-slate-200/80 shadow-md group-hover:shadow-xl group-hover:border-accent/40 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={() => ScrollTrigger.refresh()}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src !== item.backupImage) {
                        img.src = item.backupImage;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Inner Border Gradient Overlay */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
                </div>

                {/* Card Meta Details */}
                <div className="mt-3 md:mt-4 flex items-center justify-between px-1">
                  <div className="flex flex-col">
                    <span className="font-clash-semibold text-sm md:text-lg font-bold text-slate-800 tracking-tight group-hover:text-accent transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs md:text-sm font-bold text-slate-300 group-hover:text-accent/60 transition-colors">
                    {num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
