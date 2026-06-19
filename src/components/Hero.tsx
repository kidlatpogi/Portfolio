import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from './Lanyard/Lanyard';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden" id="home">
      
      {/* Top-Right Badge Sticker (Desktop only) */}
      <div className="absolute top-28 right-12 z-20 hidden md:block select-none pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="relative w-28 h-28 flex items-center justify-center rounded-full border border-black/10 bg-[#FAFAFA]/80 backdrop-blur-[2px] pointer-events-auto cursor-help"
        >
          <svg className="w-24 h-24 absolute" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="font-mono text-[6px] font-bold fill-[#334155] uppercase tracking-[1.5px]">
              <textPath href="#circlePath">
                • OJT Candidate • BSIT 4th Year Student •
              </textPath>
            </text>
          </svg>
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#FAFAFA] font-sans font-bold text-xs">
            ★
          </div>
        </motion.div>
      </div>

      {/* Bottom-Right Profile Avatar Card (Desktop only) */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-3 bg-[#FAFAFA]/75 border border-[#334155]/10 rounded-2xl p-3 backdrop-blur-sm select-none">
        <img src="/zeus_profile.png" alt="Zeus Angelo" className="w-10 h-10 rounded-full border border-[#334155]/20 object-cover" />
        <div className="flex flex-col">
          <span className="font-sans text-[9px] font-bold text-[#334155]/60 uppercase tracking-wider">Locating in</span>
          <span className="font-sans text-xs font-bold text-black uppercase">Manila, PH</span>
        </div>
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 pt-20">
        
        {/* Left Side: Typography Content */}
        <div className="flex flex-col items-start gap-5 text-left order-2 md:order-1 relative z-10">
          <span className="font-mono text-xs md:text-sm font-semibold uppercase tracking-wider text-[#334155] border border-[#334155]/20 rounded-full px-4 py-1.5 bg-[#FAFAFA]/40 backdrop-blur-[4px]">
            🎓 4th year College Student
          </span>
          
          <div className="flex flex-col">
            <h1 className="font-sans text-6xl sm:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none select-none uppercase">
              Zeus Angelo
            </h1>
            <h1 className="font-sans text-6xl sm:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none select-none uppercase">
              Bautista
            </h1>
            <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#334155] tracking-tight mt-3 select-none uppercase">
              Software Engineer
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-2 px-3 py-1.5 border border-[#334155]/20 rounded bg-transparent text-[#334155] font-mono text-xs md:text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            <span>Future Developer</span>
          </div>

          {/* Bottom Logo Strip / Capstone Tech Stack */}
          <div className="mt-8 flex flex-col gap-3">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#334155]/60 font-bold">
              Capstone Tech Stack / Core Competencies:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {['React', 'TypeScript', 'Astro', 'Tailwind', 'Three.js', 'Cloudflare'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] font-semibold text-[#334155] border border-[#334155]/20 px-2.5 py-1 rounded bg-[#FAFAFA]/30 backdrop-blur-[2px] transition-colors hover:border-[#334155]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (Mobile placeholder column) */}
        <div className="w-full h-[450px] md:hidden order-1 flex items-center justify-center relative z-10">
          <Lanyard client:load position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>

      </div>

      {/* Desktop absolute lanyard */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-screen z-0 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <Lanyard client:load position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      </div>
    </section>
  );
}

