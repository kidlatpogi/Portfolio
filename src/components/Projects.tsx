import { useCallback, useEffect, useRef, useState } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack.tsx';
import ScrollReveal from './ScrollReveal.tsx';
import { ExternalLink, ArrowUpRight, Download, ChevronLeft, ChevronRight, FolderCode } from 'lucide-react';

const STACK_POSITION_RATIO = 0.15;
const ITEM_STACK_DISTANCE = 30;
const DESKTOP_QUERY = '(min-width: 1024px)';

interface ProjectItemData {
  title: string;
  platform: string;
  year: string;
  description: string;
  tags: string[];
  stack: string;
  bgGradient: string;
  accentColor: string;
  link?: string;
  github?: string;
  actionLabel?: string;
  actionType?: 'website' | 'download';
  images?: string[];
  image?: string;
  backupImage?: string;
  isFolder?: boolean;
}

const projectsData: ProjectItemData[] = [
  {
    title: "TalkTics",
    platform: "Web App",
    year: "2025",
    description: "Multimodal AI public speaking & speech analysis platform using MediaPipe vision mesh and Librosa acoustic analytics to deliver real-time feedback on posture, vocal delivery, and presentation metrics.",
    tags: ["React 19", "FastAPI", "MediaPipe", "Librosa", "Supabase", "Cloudflare AI"],
    stack: "[REACT 19] — [FASTAPI] — [MEDIAPIPE]",
    bgGradient: "bg-[#C44900]",
    accentColor: "from-white/15 to-transparent",
    link: "https://bigkas.site/",
    actionLabel: "Visit Website",
    actionType: "website",
    github: "https://github.com/kidlatpogi/talktics-capstone",
    images: [
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/home-page.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/learn.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/journey-sample.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/mediapipe-sample.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/randomizer.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/free-speech.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/progress.png",
      "https://raw.githubusercontent.com/kidlatpogi/talktics-capstone/main/docs/images/achievements.png"
    ],
    backupImage: "https://zeusbautista.site/Project%20Overview/TalkTics.webp"
  },
  {
    title: "L.I.N.N.Y",
    platform: "AI Voice Assistant",
    year: "2025",
    description: "An enterprise-grade, low-latency Python desktop voice assistant unifying multi-model AI reasoning (Groq, Gemini), neural TTS (Edge-TTS), Tapo & Kasa smart home IoT, and native Windows automation.",
    tags: ["Python", "CustomTkinter", "Edge-TTS", "Groq / Gemini", "Tapo IoT"],
    stack: "[PYTHON] — [NEURAL TTS] — [SMART IOT]",
    bgGradient: "bg-[#D65408]",
    accentColor: "from-white/15 to-transparent",
    link: "https://github.com/kidlatpogi/L.I.N.N.Y/releases/latest",
    actionLabel: "Download for Windows",
    actionType: "download",
    github: "https://github.com/kidlatpogi/L.I.N.N.Y",
    images: [
      "https://raw.githubusercontent.com/kidlatpogi/L.I.N.N.Y/main/assets/screenshots/overview.png",
      "https://raw.githubusercontent.com/kidlatpogi/L.I.N.N.Y/main/assets/screenshots/ai_studio.png",
      "https://raw.githubusercontent.com/kidlatpogi/L.I.N.N.Y/main/assets/screenshots/calendar.png",
      "https://raw.githubusercontent.com/kidlatpogi/L.I.N.N.Y/main/assets/screenshots/smart_lighting.png",
      "https://raw.githubusercontent.com/kidlatpogi/L.I.N.N.Y/main/assets/screenshots/app_shortcuts.png"
    ],
    backupImage: "https://zeusbautista.site/Project%20Overview/Linny-1200.webp"
  },
  {
    title: "Saddle Ranch",
    platform: "Web App",
    year: "2025",
    description: "Enterprise restaurant platform engineered for Saddle Ranch Roadhouse multi-branch steakhouse chain, featuring real-time Kitchen Display (KDS), POS terminals, QR table dining, and cascading delivery logistics.",
    tags: ["Laravel 11", "React 18", "TypeScript", "Inertia.js", "Tailwind CSS", "MySQL"],
    stack: "[LARAVEL 11] — [REACT 18] — [INERTIA.JS]",
    bgGradient: "bg-[#E86711]",
    accentColor: "from-white/15 to-transparent",
    link: "https://saddle-ranch-web.onrender.com/",
    actionLabel: "Visit Website",
    actionType: "website",
    github: "https://github.com/kidlatpogi/Saddle-Ranch-Web",
    images: [
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/LANDING%20PAGE.png",
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/Remote%20Ordering.png",
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/QR%20Ordering.png",
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/POS.png",
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/KDS.png",
      "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/Admin.png"
    ],
    backupImage: "https://raw.githubusercontent.com/kidlatpogi/Saddle-Ranch-Web/master/docs/screenshots/POS.png"
  },
  {
    title: "WhatDayIsIt",
    platform: "Desktop App",
    year: "2024",
    description: "A sleek and lightweight Windows Calendar Widget seamlessly connected to Google Calendar without relying on any external databases or APIs, featuring a sub-50MB RAM footprint.",
    tags: ["Electron", "React", "TypeScript", "Tailwind CSS", "Vite"],
    stack: "[ELECTRON] — [REACT] — [TYPESCRIPT]",
    bgGradient: "bg-[#F57C20]",
    accentColor: "from-white/15 to-transparent",
    link: "https://github.com/kidlatpogi/WhatDayIsIt/releases/latest",
    actionLabel: "Download for Windows",
    actionType: "download",
    github: "https://github.com/kidlatpogi/WhatDayIsIt",
    images: [
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Calendar-Desktop-Menu-Example.png",
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Overview.png",
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Customization.png",
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Dragging.gif",
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Customizing.gif",
      "https://raw.githubusercontent.com/kidlatpogi/WhatDayIsIt/main/assets/Layout.gif"
    ],
    backupImage: "https://zeusbautista.site/Project%20Overview/CalendarWidget-1200.webp"
  },
  {
    title: "Web-Tools",
    platform: "Web Directory",
    year: "2024",
    description: "Curated developer arsenal and CS student toolkit compiling 139+ essential developer software, frontier AI coding assistants, design inspiration repositories, and verified certification pathways.",
    tags: ["Astro", "React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
    stack: "[ASTRO] — [REACT] — [TAILWIND CSS]",
    bgGradient: "bg-[#FF9436]",
    accentColor: "from-white/15 to-transparent",
    link: "https://wtoolz.vercel.app/",
    actionLabel: "Visit Website",
    actionType: "website",
    github: "https://github.com/kidlatpogi/Web-tools",
    images: [
      "https://raw.githubusercontent.com/kidlatpogi/Web-tools/main/LandingPage.png"
    ],
    backupImage: "https://zeusbautista.site/Project%20Overview/WebToolz-1200.webp"
  },
  {
    title: "Olympus",
    platform: "Code Vault",
    year: "2024",
    description: "“My all-in-one code vault: JS, Web, and more.” A centralized algorithmic vault housing core data structures, algorithms, utilities, and foundational software engineering implementations.",
    tags: ["C++", "JavaScript", "Algorithms", "Web", "Data Structures"],
    stack: "[C++] — [JAVASCRIPT] — [ALGORITHMS]",
    bgGradient: "bg-[#B43E00]",
    accentColor: "from-white/15 to-transparent",
    link: "",
    github: "https://github.com/kidlatpogi/Olympus",
    isFolder: true
  }
];

const getDocumentTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop || 0);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRailRef = useRef<HTMLDivElement>(null);
  const sidebarPanelRef = useRef<HTMLDivElement>(null);
  const stackColumnRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});

  const handlePrevImage = (projectIndex: number, total: number) => {
    setCurrentImageIndices(prev => {
      const current = prev[projectIndex] || 0;
      return { ...prev, [projectIndex]: (current - 1 + total) % total };
    });
  };

  const handleNextImage = (projectIndex: number, total: number) => {
    setCurrentImageIndices(prev => {
      const current = prev[projectIndex] || 0;
      return { ...prev, [projectIndex]: (current + 1) % total };
    });
  };

  useEffect(() => {
    const island = sectionRef.current?.parentElement;
    if (island?.tagName !== 'ASTRO-ISLAND') return;

    const previousDisplay = island.style.display;
    const previousWidth = island.style.width;
    island.style.display = 'block';
    island.style.width = '100%';

    return () => {
      island.style.display = previousDisplay;
      island.style.width = previousWidth;
    };
  }, []);

  const scrollToProject = useCallback((index: number) => {
    const stackColumn = stackColumnRef.current;
    if (!stackColumn) return;

    const shells = stackColumn.querySelectorAll<HTMLElement>('.scroll-stack-card-shell');
    const targetShell = shells[index];
    if (!targetShell) return;

    const stickyTop = window.innerHeight * STACK_POSITION_RATIO;
    const targetTop = getDocumentTop(targetShell) - stickyTop - ITEM_STACK_DISTANCE * index + 1;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const rail = sidebarRailRef.current;
    const panel = sidebarPanelRef.current;
    const stackColumn = stackColumnRef.current;
    if (!rail || !panel || !stackColumn) return;

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    let frameId: number | null = null;

    let railTop = 0;
    let lastShellTop = 0;
    let panelHeight = 0;
    let railWidth = 0;
    let lastIndex = 0;

    const resetPanel = () => {
      rail.style.minHeight = '';
      panel.style.position = '';
      panel.style.top = '';
      panel.style.width = '';
    };

    const applyPanelPosition = () => {
      frameId = null;

      if (!mediaQuery.matches) {
        resetPanel();
        return;
      }

      if (lastIndex < 0 || lastShellTop === 0) {
        const shells = stackColumn.querySelectorAll<HTMLElement>('.scroll-stack-card-shell');
        if (shells.length > 0) {
          measureLayout();
          return;
        }
        resetPanel();
        return;
      }

      const stickyTop = Math.round(window.innerHeight * STACK_POSITION_RATIO);
      const releaseScrollTop = lastShellTop - stickyTop - ITEM_STACK_DISTANCE * lastIndex;
      const releasedPanelTop = Math.max(0, lastShellTop - ITEM_STACK_DISTANCE * lastIndex - railTop);

      rail.style.minHeight = `${panelHeight}px`;
      panel.style.width = `${railWidth}px`;

      if ((window.scrollY || document.documentElement.scrollTop || 0) >= releaseScrollTop) {
        panel.style.position = 'absolute';
        panel.style.top = `${releasedPanelTop}px`;
      } else {
        panel.style.position = 'sticky';
        panel.style.top = `${stickyTop}px`;
      }
    };

    const requestPanelPosition = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(applyPanelPosition);
    };

    const measureLayout = () => {
      // Temporarily clear inline styling so we can measure natural values
      rail.style.minHeight = '';
      panel.style.width = '';
      panel.style.position = '';
      panel.style.top = '';

      const shells = stackColumn.querySelectorAll<HTMLElement>('.scroll-stack-card-shell');
      lastIndex = shells.length - 1;
      const lastShell = shells[lastIndex];

      railTop = getDocumentTop(rail);
      const stackInner = stackColumn.querySelector<HTMLElement>('.scroll-stack-inner');
      if (lastShell && stackInner) {
        lastShellTop = getDocumentTop(stackInner) + lastShell.offsetTop;
      } else if (lastShell) {
        lastShellTop = getDocumentTop(lastShell);
      } else {
        lastShellTop = 0;
      }
      panelHeight = panel.offsetHeight;
      railWidth = rail.getBoundingClientRect().width;

      applyPanelPosition();
    };

    const handleResize = () => {
      measureLayout();
    };

    const handlePreloaderFinished = () => {
      setTimeout(measureLayout, 100);
    };

    measureLayout();
    const timerId = setTimeout(measureLayout, 200);

    window.addEventListener('scroll', requestPanelPosition, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('preloaderFinished', handlePreloaderFinished);
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', requestPanelPosition);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('preloaderFinished', handlePreloaderFinished);
      mediaQuery.removeEventListener('change', handleResize);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      resetPanel();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center justify-center px-4 pt-12 pb-4 md:pb-0 relative overflow-visible" id="projects">
      {/* Split Layout: Sticky Left Info + Scrolling Right Cards */}
      <div className="w-[95%] md:w-[95%] max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* LEFT COLUMN — Sticky Info Panel */}
          <div ref={sidebarRailRef} className="lg:w-[320px] xl:w-[380px] flex-shrink-0 relative">
            <div ref={sidebarPanelRef} className="w-full">
            {/* ScrollReveal Header */}
            <ScrollReveal
              baseOpacity={0.08}
              enableBlur={false}
              baseRotation={2}
              blurStrength={12}
              as="div"
              containerClassName="flex flex-col items-start w-full mb-6"
            >
              <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-3">
                Selected Projects
              </span>
              <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[2.25rem] xl:text-[3rem] 2xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none mb-6">
                Featured<br />Work
              </h2>
            </ScrollReveal>
            {/* Description */}
            <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[300px] mb-8">
              Applications where performance, design, and user experience come together. The details most skip are the details I care about most.
            </p>

            {/* Project Thumbnails Navigation */}
            <div className="flex flex-row lg:flex-col gap-3 mb-8">
              {projectsData.map((project, index) => {
                const isActive = activeProjectIndex === index;

                return (
                <button
                  key={index}
                  type="button"
                  aria-controls={`project-card-${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => scrollToProject(index)}
                  className={`flex items-center gap-3 group cursor-target text-left transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-[72px] h-[48px] md:w-[88px] md:h-[56px] rounded-lg overflow-hidden ${project.bgGradient} flex items-center justify-center border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${isActive ? 'border-white ring-2 ring-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)]' : 'border-white/20'}`}>
                    <span className="font-mono text-[10px] md:text-xs text-white font-bold tracking-wider drop-shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full transition-all duration-300 group-hover:bg-accent ${isActive ? 'w-6 bg-accent' : 'w-1.5 bg-slate-300'}`} />
                </button>
                );
              })}
            </div>

            {/* View All Button */}
            <a
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-[0.15em] font-bold text-black bg-transparent border-2 border-black px-5 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-target"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </a>
            </div>
          </div>

          {/* RIGHT COLUMN — ScrollStack Cards */}
          <div ref={stackColumnRef} className="flex-grow min-w-0">
            <ScrollStack
              useWindowScroll={true}
              itemDistance={40}
              itemStackDistance={ITEM_STACK_DISTANCE}
              baseScale={0.92}
              itemScale={0.02}
              stackPosition="15%"
              onActiveIndexChange={setActiveProjectIndex}
            >
              {projectsData.map((project, index) => {
                const isVisible = index >= activeProjectIndex;
                const images = project.images && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
                const currentImgIndex = (currentImageIndices[index] || 0) % (images.length || 1);
                const currentImage = images[currentImgIndex];

                return (
                  <ScrollStackItem
                    key={index}
                    itemId={`project-card-${index + 1}`}
                    itemClassName={`${project.bgGradient} text-white flex flex-col justify-between cursor-target overflow-hidden`}
                  >
                    {/* Decorative gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} pointer-events-none rounded-[32px] sm:rounded-[40px]`} />

                     <div className={`w-full h-full grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 transition-opacity duration-300 z-10 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      {/* Left Column / Mobile Unified Info */}
                      <div className="md:col-span-6 flex flex-col justify-center h-full min-w-0">
                        <div className="flex flex-col gap-3 sm:gap-4">
                          {/* Counter + Title Header */}
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[11px] md:text-xs text-white/80 font-bold tracking-widest uppercase">
                              {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                            </span>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 w-full">
                              <h3 className="font-clash-semibold text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-none drop-shadow-sm">
                                {project.title}{" "}
                                <span className="font-sans text-xs md:text-sm font-normal text-white/90 normal-case">
                                  ({project.platform})
                                </span>
                              </h3>
                              <span className="font-mono text-sm md:text-base text-white font-bold drop-shadow-sm">
                                {project.year}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] sm:text-[11px] md:text-xs text-white/80 tracking-[0.15em] uppercase mt-0.5 font-medium">
                              {project.stack}
                            </span>
                          </div>

                          {/* Mobile Mock Preview Device (Visible on Mobile) */}
                          {project.isFolder ? (
                            <div className="flex md:hidden flex-col w-full h-36 min-[380px]:h-44 sm:h-48 rounded-xl overflow-hidden border border-white/25 shadow-xl bg-black/40 my-1 flex-shrink-0 items-center justify-center">
                              <FolderCode className="w-14 h-14 text-white drop-shadow-md" />
                              <span className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest mt-2">All-In-One Code Vault</span>
                            </div>
                          ) : currentImage ? (
                            <div className="flex md:hidden flex-col w-full rounded-xl overflow-hidden border border-white/25 shadow-xl bg-black/40 my-1 flex-shrink-0">
                              <div className="h-4 w-full bg-white/15 border-b border-white/15 flex items-center px-2.5 gap-1 flex-shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                              </div>
                              <div className="w-full h-32 min-[380px]:h-40 sm:h-44 overflow-hidden bg-slate-900 relative">
                                <img
                                  src={currentImage}
                                  alt={`${project.title} Preview ${currentImgIndex + 1}`}
                                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                                  loading="lazy"
                                  onError={(e) => {
                                    const img = e.currentTarget;
                                    if (project.backupImage && img.src !== project.backupImage) {
                                      img.src = project.backupImage;
                                    }
                                  }}
                                />
                              </div>
                              {/* Mobile Prev / Next Controls */}
                              {images.length > 1 && (
                                <div className="flex items-center justify-between px-3 py-1 bg-black/50 border-t border-white/15 backdrop-blur-sm">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePrevImage(index, images.length);
                                    }}
                                    className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-white/15 active:bg-white/30 px-2.5 py-0.5 rounded cursor-target"
                                  >
                                    <ChevronLeft className="w-3 h-3" />
                                    Prev
                                  </button>
                                  <span className="font-mono text-[10px] font-bold text-white/90">
                                    {currentImgIndex + 1} / {images.length}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNextImage(index, images.length);
                                    }}
                                    className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-white/15 active:bg-white/30 px-2.5 py-0.5 rounded cursor-target"
                                  >
                                    Next
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : null}

                          {/* Technology Pills */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/30 text-white border border-white/25 backdrop-blur-sm font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/95 max-w-md drop-shadow-sm">
                            {project.description}
                          </p>

                          {/* Action Links */}
                          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                            {project.github && (
                              <a 
                                href={project.github} 
                                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 hover:border-white/50 text-white transition-all cursor-target font-mono text-[10px] md:text-xs uppercase tracking-wider font-bold shadow-sm"
                                aria-label="GitHub Repository"
                              >
                                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                  <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                Github
                              </a>
                            )}
                            {project.link && (
                              <a 
                                href={project.link} 
                                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 hover:border-white/50 text-white transition-all cursor-target font-mono text-[10px] md:text-xs uppercase tracking-wider font-bold shadow-sm"
                                aria-label={project.actionLabel || "Visit Website"}
                              >
                                {project.actionType === 'download' ? (
                                  <Download className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                )}
                                {project.actionLabel || "Visit Website"}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Mock Preview Device (Hidden on Mobile) */}
                      <div className="hidden md:flex md:col-span-6 h-[95%] self-center items-center justify-center min-w-0">
                        {project.isFolder ? (
                          <div className="flex flex-col relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-black/40 group/folder items-center justify-center p-6">
                            <div className="relative p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-inner flex flex-col items-center justify-center transition-all duration-500 group-hover/folder:scale-105 group-hover/folder:bg-white/15">
                              <FolderCode className="w-20 h-20 xl:w-24 xl:h-24 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover/folder:-translate-y-1" />
                              <span className="font-mono text-xs text-white/90 font-bold uppercase tracking-widest mt-4 text-center">
                                All-In-One Code Vault
                              </span>
                            </div>
                          </div>
                        ) : currentImage ? (
                          <div className="flex flex-col relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-black/30 group/browser">
                            {/* Browser top-bar */}
                            <div className="h-5 w-full bg-white/15 border-b border-white/15 flex items-center px-3 gap-1 flex-shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            </div>
                            {/* Browser content */}
                            <div className="w-full flex-1 min-h-0 overflow-hidden bg-slate-900 relative">
                              <img 
                                key={currentImage}
                                src={currentImage} 
                                alt={`${project.title} Preview ${currentImgIndex + 1}`}
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                                onError={(e) => {
                                  const img = e.currentTarget;
                                  if (project.backupImage && img.src !== project.backupImage) {
                                    img.src = project.backupImage;
                                  }
                                }}
                              />
                            </div>
                            {/* Desktop Prev / Next Navigation Controls */}
                            {images.length > 1 && (
                              <div className="flex items-center justify-between px-3.5 py-1.5 bg-black/40 border-t border-white/15 backdrop-blur-md">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrevImage(index, images.length);
                                  }}
                                  className="flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white/90 hover:text-white bg-white/10 hover:bg-white/25 px-3 py-1 rounded-md transition-all cursor-target shadow-sm"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                  Prev
                                </button>
                                <span className="font-mono text-xs font-bold text-white/90 tracking-widest">
                                  {currentImgIndex + 1} / {images.length}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNextImage(index, images.length);
                                  }}
                                  className="flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white/90 hover:text-white bg-white/10 hover:bg-white/25 px-3 py-1 rounded-md transition-all cursor-target shadow-sm"
                                >
                                  Next
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative w-[70%] max-w-[200px] aspect-square rounded-full border border-white/15 bg-white/15 flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-md" />
                            <span className="font-clash-bold text-5xl font-bold text-white/40 uppercase tracking-tighter select-none">
                              {project.title.substring(0, 2)}
                            </span>
                            <div className="absolute w-2.5 h-2.5 bg-accent rounded-full animate-ping top-1/4 right-1/4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>

        </div>
      </div>
    </section>
  );
}