import { GitHubCalendar } from 'react-github-calendar';

export default function GithubHeatmap() {
  // Brand color scheme: Slate-100 to Zeus's accent burnt orange (#C44900)
  const brandTheme = {
    light: ['#ebebeb', '#ffc199', '#ff934d', '#ff6600', '#C44900'],
    dark: ['#2e2e2e', '#ffc199', '#ff934d', '#ff6600', '#C44900']
  };

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto mb-12 select-none" id="github-activity">
      <div className="flex flex-col gap-8 p-6 md:p-10 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
        
        {/* Section Header (matching Designs.tsx style) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col items-start">
            <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
              Code Activity
            </span>
            <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
              Contributions
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[420px] mt-4">
              Active open-source development contributions and commit history fetched live from GitHub.
            </p>
          </div>
          
          <a
            href="https://github.com/kidlatpogi"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-end font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-[#334155] hover:text-accent transition-all duration-200 flex items-center gap-2 cursor-target shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            @kidlatpogi
          </a>
        </div>

        {/* Heatmap graph container */}
        <div className="w-full overflow-x-auto flex justify-center py-2 scrollbar-hide data-lenis-prevent">
          <div className="min-w-[1000px] sm:min-w-0">
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

      </div>
    </section>
  );
}
