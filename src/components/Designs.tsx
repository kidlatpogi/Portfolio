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
              end: () => `+=${(scrollWidth - window.innerWidth) * 1.6}`,
              invalidateOnRefresh: true
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="designs" className="relative w-full overflow-hidden bg-[#f8f8f8] pt-4 pb-12 md:pt-0">
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

      {/* On Desktop: Sticky full-screen view. On Mobile: static relative view */}
      <div className="designs-container relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-12 z-30">

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
          {designsData.map((design, index) => (
            <div
              key={index}
              className="w-full md:w-[var(--card-width)] flex-shrink-0 aspect-[1080/1350] relative group overflow-hidden border border-slate-200/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={design.image}
                alt={`${design.title} poster design`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.src !== design.backupImage) {
                    image.src = design.backupImage;
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
              />

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
