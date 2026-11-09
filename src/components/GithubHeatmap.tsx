import React, { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const availableYears = [2026, 2025, 2024] as const;

export default function GithubHeatmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [yearlyTotals, setYearlyTotals] = useState<Record<number, number>>({
    2026: 3329,
    2025: 735,
    2024: 1
  });

  useEffect(() => {
    const island = sectionRef.current?.parentElement;
    if (island?.tagName === 'ASTRO-ISLAND') {
      island.style.display = 'block';
      island.style.width = '100%';
    }

    // Fetch dynamic totals from API
    fetch('https://github-contributions-api.jogruber.de/v4/kidlatpogi')
      .then(res => res.json())
      .then(data => {
        if (data?.total) {
          setYearlyTotals(prev => ({ ...prev, ...data.total }));
        }
      })
      .catch(() => {
        // Fallback pre-populated with actual totals
      });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && calendarContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (typeof window !== 'undefined' && ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      });
      resizeObserver.observe(calendarContainerRef.current);
    }

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Whenever year changes, refresh ScrollTrigger after render
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  // Brand color scheme: Slate-100 to Zeus's accent burnt orange (#D9541E)
  const brandTheme = {
    light: ['#ebebeb', '#ffc199', '#ff934d', '#ff6600', '#D9541E'],
    dark: ['#2e2e2e', '#ffc199', '#ff934d', '#ff6600', '#D9541E']
  };

  const currentCount = yearlyTotals[selectedYear] ?? (selectedYear === 2026 ? 3329 : selectedYear === 2025 ? 735 : 1);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20 select-none relative z-10" id="github-activity">
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
      
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
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

        {/* Heatmap Card Box */}
        <div className="w-full p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm flex flex-col gap-6">
          
          {/* Responsive Calendar Track with larger squares */}
          <div
            ref={calendarContainerRef}
            className="w-full overflow-x-auto py-3 scroll-smooth data-lenis-prevent"
          >
            <div className="min-w-max flex justify-start lg:justify-center mx-auto px-1">
              <GitHubCalendar
                key={selectedYear}
                username="kidlatpogi"
                year={selectedYear}
                theme={brandTheme}
                colorScheme="light"
                blockSize={16}
                blockMargin={5}
                fontSize={13}
                showWeekdayLabels={['mon', 'wed', 'fri']}
                showTotalCount={false}
              />
            </div>
          </div>

          {/* Bottom Bar: Contributions Count + Year Filter Buttons + Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            
            {/* Left: Contributions Count + Learn how we count contributions */}
            <div className="flex flex-col gap-1">
              <h3 className="font-clash-semibold text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                {currentCount.toLocaleString()} contributions in {selectedYear}
              </h3>
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] sm:text-xs text-slate-400 hover:text-accent transition-colors cursor-target w-fit"
              >
                Learn how we count contributions
              </a>
            </div>

            {/* Right: Year Filter Buttons + GitHub profile link */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                {availableYears.map(year => {
                  const isSelected = selectedYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSelectedYear(year)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-200 cursor-target ${
                        isSelected
                          ? 'bg-accent text-white shadow-md shadow-accent/25 scale-[1.02]'
                          : 'bg-[#F3EEE3]/80 border border-black/8 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-[#F3EEE3]'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>

              <a
                href="https://github.com/kidlatpogi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-600 hover:text-accent flex items-center gap-1.5 px-3 py-2 rounded-xl border border-black/8 bg-[#F3EEE3]/80 hover:bg-[#F3EEE3] transition-colors cursor-target font-semibold ml-0 sm:ml-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                @kidlatpogi
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
