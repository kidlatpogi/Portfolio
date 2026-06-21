import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12 md:p-12 relative overflow-hidden" id="home">

      <div className="w-full max-w-[1400px] relative z-10 pt-20 flex justify-center">

        {/* Typography — full-width block */}
        <div className="flex flex-col items-start gap-5 text-left relative z-10 w-max max-w-full">
          <span className="font-array-semibold text-[1.5rem] md:text-[2rem] font-semibold uppercase tracking-wider text-[#334155]">
            4th year College Student
          </span>

          <div className="relative w-max max-w-full">
            <h1 className="relative inline-block font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap">
              Zeus Angelo

              {/* Profile picture placeholder on the right side */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-1 sm:ml-3 md:ml-4 lg:ml-6 flex items-center z-20 w-[5rem] sm:w-[8rem] md:w-[14rem] lg:w-[18rem]">
                {/* Playful Dotted Line */}
                <div className="relative flex-grow h-8 sm:h-14 md:h-20 overflow-visible">
                  <svg
                    className="absolute inset-0 w-full h-full text-accent pointer-events-none overflow-visible"
                    viewBox="0 0 160 80"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="dotted-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity={1} />
                        <stop offset="70%" stopColor="currentColor" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="currentColor" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,40 C 30,15 50,15 70,35 C 85,50 100,50 100,35 C 100,15 80,15 80,35 C 80,55 110,65 160,40"
                      stroke="url(#dotted-fade)"
                      strokeWidth="2.5"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                    />
                    <circle cx="160" cy="40" r="4.5" fill="currentColor" opacity="0.15" />
                  </svg>
                </div>

                {/* Circular Profile Holder (empty grey circle with accent border) */}
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-[2px] sm:border-[3px] md:border-[5px] border-accent bg-[#E5E5E5] flex-shrink-0 ring-4 sm:ring-6 md:ring-[10px] ring-accent/10"
                />
              </div>
            </h1>
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap">
              Bautista
            </h1>
            <h1 className="font-clash-semibold text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap">
              <span className="relative inline-block italic">
                <span>Future</span>
                <span className="absolute left-0 right-0 top-[55%] -translate-y-1/2 h-[3px] sm:h-[4px] md:h-[6px] lg:h-[8px] bg-black rounded-full pointer-events-none" />
              </span>{" "}
              Developer
            </h1>
          </div>

          {/* Social / Resume Links */}
          <div className="mt-8 flex items-center justify-start w-auto">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-sm md:text-base uppercase tracking-wider text-[#334155]/60 font-bold">
                Socials:
              </span>
              <div className="flex flex-wrap items-center gap-8">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#334155] hover:text-accent font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="flex items-center gap-2.5 text-[#334155] hover:text-accent font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="flex items-center gap-2.5 text-[#334155] hover:text-accent font-mono text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  Github
                </a>
              </div>
            </div>

            {/* Desktop profile removed per request */}
          </div>
        </div>

      </div>
    </section>
  );
}
