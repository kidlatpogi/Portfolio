import React, { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GithubHeatmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkScroll = () => {
    if (!calendarContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = calendarContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollCalendar = (direction: 'left' | 'right') => {
    if (!calendarContainerRef.current) return;
    const scrollAmount = Math.max(280, Math.round(calendarContainerRef.current.clientWidth * 0.65));
    calendarContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!calendarContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - calendarContainerRef.current.offsetLeft;
    scrollLeftPos.current = calendarContainerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !calendarContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - calendarContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    calendarContainerRef.current.scrollLeft = scrollLeftPos.current - walk;
    checkScroll();
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const island = sectionRef.current?.parentElement;
    if (island?.tagName === 'ASTRO-ISLAND') {
      island.style.display = 'block';
      island.style.width = '100%';
    }

    const container = calendarContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }

    // Automatically refresh ScrollTrigger whenever the GitHub calendar SVG finishes rendering or resizes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
        if (typeof window !== 'undefined' && ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
      resizeObserver.observe(container);
    }

    const timer = setTimeout(() => {
      checkScroll();
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Brand color scheme: Slate-100 to Zeus's accent burnt orange (#C44900)
  const brandTheme = {
    light: ['#ebebeb', '#ffc199', '#ff934d', '#ff6600', '#C44900'],
    dark: ['#2e2e2e', '#ffc199', '#ff934d', '#ff6600', '#C44900']
  };

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20 select-none relative z-10" id="github-activity">
      <style>{`
        #github-activity .calendar-scroll-track {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f8fafc;
        }
        #github-activity .calendar-scroll-track::-webkit-scrollbar {
          height: 7px;
          display: block !important;
        }
        #github-activity .calendar-scroll-track::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 9999px;
        }
        #github-activity .calendar-scroll-track::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
          transition: background-color 0.2s;
        }
        #github-activity .calendar-scroll-track::-webkit-scrollbar-thumb:hover {
          background: #C44900;
        }
      `}</style>

      <div className="w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
      
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-10">
        <span className="font-array-semibold text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
          Code Activity
        </span>
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[4rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
          Contributions
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed max-w-[440px] mt-3">
          Active open-source development contributions and commit history fetched live from GitHub.
        </p>
      </div>

      {/* Card container containing Header Bar, Heatmap graph, and bottom actions */}
      <div className="w-full flex flex-col gap-5 md:gap-6 p-5 sm:p-6 md:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300">
        
        {/* Navigation & Hint Control Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
              Activity Matrix
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 font-medium">
              ↔ Scroll or drag horizontally
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollCalendar('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left in contributions"
                className={`p-1.5 rounded-lg border transition-all duration-200 cursor-target ${
                  canScrollLeft
                    ? 'border-slate-200 text-slate-700 hover:border-accent hover:text-accent hover:bg-slate-50'
                    : 'border-slate-100 text-slate-300 cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCalendar('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right in contributions"
                className={`p-1.5 rounded-lg border transition-all duration-200 cursor-target ${
                  canScrollRight
                    ? 'border-slate-200 text-slate-700 hover:border-accent hover:text-accent hover:bg-slate-50'
                    : 'border-slate-100 text-slate-300 cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Heatmap graph container with side scrolling and drag */}
        <div
          ref={calendarContainerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="calendar-scroll-track w-full overflow-x-auto py-3 pb-4 scroll-smooth cursor-grab active:cursor-grabbing select-none data-lenis-prevent min-h-[160px]"
        >
          <div className="min-w-max flex justify-start lg:justify-center mx-auto px-1">
            <GitHubCalendar
              username="kidlatpogi"
              theme={brandTheme}
              colorScheme="light"
              blockSize={16}
              blockMargin={5}
              fontSize={13}
            />
          </div>
        </div>

        {/* Card Footer with Link */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <a
            href="https://github.com/kidlatpogi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider px-5 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-[#334155] hover:text-accent transition-all duration-200 flex items-center gap-2 cursor-target shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            @kidlatpogi
          </a>
        </div>

      </div>
      </div>
    </section>
  );
}
