import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShapeGrid from './ShapeGrid.tsx';

const designsData = [
  {
    title: "Cloud9",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Cloud9-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Cloud9-1200.webp"
  },
  {
    title: "Ketchup",
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
    title: "Typography",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/Typography-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/Typography-1200.webp"
  },
  {
    title: "Podcast Poster",
    category: "Poster Design",
    image: "https://zeusbautista.site/Designs/lamaw-1200.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Designs/lamaw-1200.webp"
  },
  {
    title: "Coming Soon",
    category: "Poster Design",
    image: "",
    backupImage: ""
  }
];

export default function Designs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [200, -800]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-800, 200]);

  return (
    <section ref={containerRef} id="designs" className="relative w-full overflow-hidden bg-[#f8f8f8] py-20 md:py-32 z-30 flex flex-col items-center">
      
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

      <div className="relative z-10 flex flex-col w-full h-full max-w-[100vw]">
        
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 mb-16 flex flex-col items-center text-center">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
            Creative Showcase
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
            Designs
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[360px] mx-auto mt-4">
            Multi-media graphic design posters crafted using Adobe Photoshop.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-10 w-full overflow-hidden">
          
          <motion.div 
            style={{ x: x1 }}
            className="flex items-center gap-6 md:gap-10 will-change-transform pl-10 md:pl-[20vw] w-max"
          >
            {designsData.map((design, index) => (
              <div 
                key={`row1-${index}`} 
                className="w-[280px] md:w-[360px] lg:w-[400px] flex-shrink-0 aspect-[1080/1350] relative group overflow-hidden border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 cursor-pointer bg-slate-200/30 flex items-center justify-center"
              >
                {design.image || design.backupImage ? 
                  <img
                    src={design.image}
                    alt={`${design.title} poster design`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.src !== design.backupImage) {
                        image.src = design.backupImage;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                  :
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 group-hover:scale-105 transition-transform duration-500">
                    <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-slate-400 font-bold">
                      {design.title}
                    </span>
                  </div>
                }
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-accent font-mono text-xs md:text-sm uppercase tracking-wider font-bold mb-1">
                    {design.category}
                  </span>
                  <h3 className="text-white font-sans text-lg md:text-2xl font-bold tracking-tight">
                    {design.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            style={{ x: x2 }}
            className="flex items-center gap-6 md:gap-10 will-change-transform pr-10 md:pr-[20vw] w-max"
          >
            {[...designsData].reverse().map((design, index) => (
              <div 
                key={`row2-${index}`} 
                className="w-[280px] md:w-[360px] lg:w-[400px] flex-shrink-0 aspect-[1080/1350] relative group overflow-hidden border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 cursor-pointer bg-slate-200/30 flex items-center justify-center"
              >
                {design.image || design.backupImage ? 
                  <img
                    src={design.image}
                    alt={`${design.title} poster design`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.src !== design.backupImage) {
                        image.src = design.backupImage;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                  :
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 group-hover:scale-105 transition-transform duration-500">
                    <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-slate-400 font-bold">
                      {design.title}
                    </span>
                  </div>
                }
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-accent font-mono text-xs md:text-sm uppercase tracking-wider font-bold mb-1">
                    {design.category}
                  </span>
                  <h3 className="text-white font-sans text-lg md:text-2xl font-bold tracking-tight">
                    {design.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
