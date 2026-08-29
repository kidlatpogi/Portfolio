import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHolidaySeason, type HolidaySeason } from '../utils/seasonal';

const profileImage = "/Common/Profile%20Picture.webp";
const profileImageBackup = "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Common/Profile%20Picture.webp";
const profileImageHover = "/Common/Bautista%20Zeus%20Angelo%20V..webp";
const profileImageHoverBackup = "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Common/Bautista%20Zeus%20Angelo%20V..webp";

export default function Hero() {
  const [startStrikethrough, setStartStrikethrough] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [season, setSeason] = useState<HolidaySeason>('none');

  const isChristmas = season === 'christmas';

  useEffect(() => {
    setSeason(getHolidaySeason());

    const isPreloaderGone = typeof document !== 'undefined' && !document.getElementById('preloader');
    if (isPreloaderGone) {
      const timer = setTimeout(() => {
        setStartStrikethrough(true);
      }, 150);
      return () => clearTimeout(timer);
    }

    const handlePreloaderRemoved = () => {
      setTimeout(() => {
        setStartStrikethrough(true);
      }, 150);
    };

    window.addEventListener('preloaderFullyRemoved', handlePreloaderRemoved);

    return () => {
      window.removeEventListener('preloaderFullyRemoved', handlePreloaderRemoved);
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:p-12 relative overflow-hidden" id="home">

      <div className="w-full max-w-[1400px] relative z-10 pt-20 flex justify-center">

        {/* Typography — full-width block */}
        <div className="flex flex-col items-start gap-4 sm:gap-5 text-left relative z-10 w-fit max-w-full">
          <span className="hero-subtitle font-array-semibold text-[1.15rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] 2xl:text-[2rem] font-semibold uppercase tracking-wider text-[#334155]">
            4th year College Student
          </span>

          <div className="flex flex-col items-start w-fit max-w-full">
            {/* Row 1: Zeus Angelo + Dotted line + Profile Picture (Snug inline-flex flow) */}
            <div className="inline-flex items-center">
              <h1 className="hero-title-1 font-sans text-[9vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap">
                Zeus Angelo
              </h1>

              {/* Profile picture directly attached to Zeus Angelo */}
              <div className="inline-flex items-center z-20 flex-shrink-0 ml-1.5 sm:ml-3 md:ml-4 lg:ml-6 w-[4.25rem] sm:w-[8rem] md:w-[12rem] lg:w-[13rem] xl:w-[16rem] 2xl:w-[18rem]">
                {/* Playful Dotted Line */}
                <div className="relative flex-grow h-6 sm:h-14 md:h-20 overflow-visible">
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

                <div
                  className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-[9.5rem] xl:h-[9.5rem] 2xl:w-40 2xl:h-40 rounded-full border-[2px] sm:border-[3px] md:border-[5px] border-accent bg-[#E5E5E5] flex-shrink-0 ring-4 sm:ring-6 md:ring-[10px] ring-accent/10 cursor-pointer"
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  {/* Authentic Classic Santa Hat for Profile Avatar */}
                  <AnimatePresence>
                    {isChristmas && (
                      <motion.div
                        initial={{ scale: 0, rotate: -15, y: -8, opacity: 0 }}
                        animate={{ scale: 1, rotate: -8, y: 0, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                        className="absolute -top-2.5 -left-1 sm:-top-5 sm:-left-2 md:-top-7 md:-left-3 lg:-top-8 lg:-left-3 xl:-top-9 xl:-left-4 z-30 pointer-events-none select-none w-10 sm:w-16 md:w-24 lg:w-28 xl:w-32 drop-shadow-xl"
                      >
                        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="santaRed" x1="20%" y1="100%" x2="80%" y2="0%">
                              <stop offset="0%" stopColor="#991B1B" />
                              <stop offset="45%" stopColor="#DC2626" />
                              <stop offset="100%" stopColor="#EF4444" />
                            </linearGradient>
                            <linearGradient id="furGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" />
                              <stop offset="100%" stopColor="#F1F5F9" />
                            </linearGradient>
                          </defs>

                          {/* Soft bottom contact shadow */}
                          <ellipse cx="44" cy="56" rx="36" ry="5" fill="#000000" opacity="0.25" />

                          {/* Solid Red Cone Body */}
                          <path
                            d="M 14 54 C 22 28 44 14 65 10 C 78 8 88 16 88 28 C 88 36 86 42 84 44 C 80 44 76 46 72 48 C 46 52 28 54 14 54 Z"
                            fill="url(#santaRed)"
                          />
                          {/* Folded Tip Shadow Detail */}
                          <path
                            d="M 64 10 C 78 8 88 16 88 28 C 88 38 84 44 80 44 C 76 44 74 34 76 26 C 78 18 72 12 64 10 Z"
                            fill="#991B1B"
                          />
                          {/* Velvet highlight curve */}
                          <path
                            d="M 22 46 C 32 28 48 16 65 10 C 60 12 44 24 30 48 Z"
                            fill="#F87171"
                            opacity="0.75"
                          />

                          {/* White Fur Pom-Pom */}
                          <circle cx="84" cy="46" r="9" fill="#E2E8F0" />
                          <circle cx="83" cy="45" r="8.5" fill="#FFFFFF" />
                          <circle cx="81" cy="43" r="3.5" fill="#FFFFFF" />

                          {/* White Fur Brim */}
                          <rect x="8" y="46" width="70" height="18" rx="9" fill="#E2E8F0" />
                          <rect x="10" y="45" width="66" height="17" rx="8.5" fill="url(#furGrad)" />

                          {/* Fluffy rounded puffs */}
                          <circle cx="16" cy="53" r="7.5" fill="#FFFFFF" />
                          <circle cx="28" cy="53" r="8.5" fill="#FFFFFF" />
                          <circle cx="43" cy="53" r="9" fill="#FFFFFF" />
                          <circle cx="57" cy="53" r="8.5" fill="#FFFFFF" />
                          <circle cx="69" cy="53" r="7.5" fill="#FFFFFF" />

                          {/* Soft bottom puff shading */}
                          <ellipse cx="16" cy="58" rx="5" ry="2" fill="#CBD5E1" opacity="0.6" />
                          <ellipse cx="28" cy="59" rx="6" ry="2" fill="#CBD5E1" opacity="0.6" />
                          <ellipse cx="43" cy="59" rx="7" ry="2" fill="#CBD5E1" opacity="0.6" />
                          <ellipse cx="57" cy="59" rx="6" ry="2" fill="#CBD5E1" opacity="0.6" />
                          <ellipse cx="69" cy="58" rx="5" ry="2" fill="#CBD5E1" opacity="0.6" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Profile Images with overflow containment */}
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src={profileImage}
                      alt="Zeus Angelo Bautista"
                      loading="eager"
                      decoding="async"
                      onError={(event) => {
                        const image = event.currentTarget;
                        if (image.src !== profileImageBackup) {
                          image.src = profileImageBackup;
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ease-out"
                      style={{ opacity: isProfileHovered ? 0 : 1 }}
                    />
                    <img
                      src={profileImageHover}
                      alt="Zeus Angelo Bautista smiling"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        const image = event.currentTarget;
                        if (image.src !== profileImageHoverBackup) {
                          image.src = profileImageHoverBackup;
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ease-out"
                      style={{ opacity: isProfileHovered ? 1 : 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Bautista */}
            <h1 className="hero-title-2 font-sans text-[9vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[8.5rem] font-black text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap">
              Bautista
            </h1>

            {/* Row 3: Future Developer */}
            <h1 className="hero-title-3 font-clash-semibold text-[9vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[8.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap">
              <span className="relative inline-block italic mr-[0.25em]">
                <span>Future</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: startStrikethrough ? 1 : 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 12,
                    mass: 0.6
                  }}
                  style={{ originX: 0 }}
                  className="absolute left-0 right-0 top-[55%] -translate-y-1/2 h-[3px] sm:h-[4px] md:h-[5px] lg:h-[6px] xl:h-[7px] 2xl:h-[8px] bg-black rounded-full pointer-events-none"
                />
              </span>
              Developer
            </h1>
          </div>

          {/* Social / Resume Links */}
          <div className="hero-socials mt-6 sm:mt-8 flex flex-col items-start justify-start w-full gap-4">
            <span className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider text-[#334155]/60 font-bold">
              Socials:
            </span>
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
              {/* 1. Resume */}
              <a
                href="/Zeus_Angelo_Bautista_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('openResumePreview'));
                }}
                className="flex items-center gap-2 text-[#334155] hover:text-accent font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Resume
              </a>

              {/* 2. Linkedin */}
              <a
                href="https://www.linkedin.com/in/zeus-angelo-bautista/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#334155] hover:text-accent font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Linkedin
              </a>

              {/* 3. Github */}
              <a
                href="https://github.com/kidlatpogi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#334155] hover:text-accent font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Github
              </a>

              {/* 4. Email */}
              <a
                href="mailto:bautistaangelozeus17@gmail.com"
                className="flex items-center gap-2 text-[#334155] hover:text-accent font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#334155] group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
