import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden" id="home">

      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 pt-20">
        
        {/* Left Side: Typography Content */}
        <div className="flex flex-col items-start gap-5 text-left order-2 md:order-1 relative z-10">
          <span className="font-mono text-xs md:text-sm font-semibold uppercase tracking-wider text-[#334155] border border-[#334155]/20 rounded-full px-4 py-1.5 bg-[#FAFAFA]/40 backdrop-blur-[4px]">
            4th year College Student
          </span>
          
          <div className="flex flex-col">
            <h1 className="font-sans text-7xl sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none">
              Zeus Angelo
            </h1>
            <h1 className="font-sans text-7xl sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none">
              Bautista
            </h1>
            <h1 className="font-sans text-7xl sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black text-[#DF2935] tracking-tighter leading-[0.9] select-none">
              Future Developer
            </h1>
          </div>

          {/* Social / Resume Links */}
          <div className="mt-8 flex flex-col gap-4">
            <span className="font-mono text-sm md:text-base uppercase tracking-wider text-[#334155]/60 font-bold">
              Socials:
            </span>
            <div className="flex flex-wrap items-center gap-8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#334155] hover:text-black font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-5 h-5 text-[#334155] group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Resume
              </a>
              <a
                href="https://linkedin.com/in/zeusbautista"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#334155] hover:text-black font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-5 h-5 text-[#334155] group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Linkedin
              </a>
              <a
                href="https://github.com/kidlatpogi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#334155] hover:text-black font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-5 h-5 text-[#334155] group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Github
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Profile */}
        <div className="flex flex-col items-start order-1 md:order-2 relative z-10 md:pt-16">
          <p className="font-sans text-sm md:text-base font-medium text-black">Hi! I Am</p>
          <p className="font-sans text-2xl md:text-3xl font-bold text-[#DF2935] leading-tight">
            Zeus Angelo Bautista.
          </p>
          <div className="relative mt-6 md:mt-8">
            <svg
              className="absolute -top-8 left-4 w-16 h-16 text-[#334155]/25 pointer-events-none"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 4 C 20 20, 28 36, 32 52"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
            <img
              src="/zeus_profile.png"
              alt="Zeus Angelo Bautista"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-[#DF2935]/30 shadow-[0_0_24px_rgba(223,41,53,0.35)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

