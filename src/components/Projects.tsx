import { useEffect, useRef } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack.tsx';
import ScrollReveal from './ScrollReveal.tsx';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projectsData = [
  {
    title: "AI Automation Platform",
    description: "An automated system integrating large language models with customized agent workflows to execute repetitive tasks and optimize data structures.",
    tags: ["Python", "FastAPI", "React", "OpenAI"],
    stack: "[PYTHON] — [REACT]",
    bgGradient: "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]",
    accentColor: "from-blue-500/20 to-purple-600/20",
    link: "#",
    github: "#"
  },
  {
    title: "E-Commerce Microservices",
    description: "A highly resilient e-commerce application composed of autonomous microservices using Docker containerization, Kafka event streaming, and PostgreSQL.",
    tags: ["Node.js", "Docker", "PostgreSQL", "Kafka"],
    stack: "[NODE.JS] — [DOCKER]",
    bgGradient: "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accentColor: "from-emerald-500/20 to-cyan-600/20",
    link: "#",
    github: "#"
  },
  {
    title: "High-Fidelity Portfolio",
    description: "Personal responsive portfolio built using React, Astro, and Tailwind CSS. Implements smooth Lenis scroll and customized scroll reveal animations.",
    tags: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
    stack: "[REACT] — [ASTRO]",
    bgGradient: "bg-gradient-to-br from-[#C44900] via-[#E85D04] to-[#dc2626]",
    accentColor: "from-orange-500/20 to-red-600/20",
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center justify-center px-4 py-12 md:py-16 relative overflow-visible" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      {/* Split Layout: Sticky Left Info + Scrolling Right Cards */}
      <div className="w-[95%] md:w-[95%] max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* LEFT COLUMN — Sticky Info Panel */}
          <div className="lg:w-[320px] xl:w-[380px] flex-shrink-0 lg:sticky lg:top-[15vh] lg:self-start">
            {/* ScrollReveal Header */}
            <ScrollReveal
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={2}
              blurStrength={12}
              as="div"
              containerClassName="flex flex-col items-start w-full mb-6"
            >
              <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-3">
                Selected Projects
              </span>
              <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none mb-6">
                Featured<br />Work
              </h2>
            </ScrollReveal>
            {/* Description */}
            <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[300px] mb-8">
              Applications where performance, design, and user experience come together. The details most skip are the details I care about most.
            </p>

            {/* Project Thumbnails Navigation */}
            <div className="flex flex-row lg:flex-col gap-3 mb-8">
              {projectsData.map((project, index) => (
                <div key={index} className="flex items-center gap-3 group cursor-target">
                  <div className={`w-[72px] h-[48px] md:w-[88px] md:h-[56px] rounded-lg overflow-hidden ${project.bgGradient} flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                    <span className="font-mono text-[10px] text-white/60 font-bold tracking-wider">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-accent" />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-[0.15em] font-bold text-black bg-transparent border-2 border-black px-5 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-target"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT COLUMN — ScrollStack Cards */}
          <div className="flex-grow min-w-0">
            <ScrollStack
              useWindowScroll={true}
              itemDistance={100}
              itemStackDistance={30}
              baseScale={0.92}
              itemScale={0.02}
              stackPosition="15%"
            >
              {projectsData.map((project, index) => (
                <ScrollStackItem
                  key={index}
                  itemClassName={`${project.bgGradient} text-white flex flex-col justify-between cursor-target overflow-hidden`}
                >
                  {/* Decorative gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} pointer-events-none rounded-[40px]`} />

                  <div className="flex flex-col gap-4 relative z-10">
                    {/* Counter + Title Header */}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] md:text-xs text-white/50 font-bold tracking-widest uppercase">
                        {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                      </span>
                      <h3 className="font-clash-semibold text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase">
                        {project.title}
                      </h3>
                    </div>

                    {/* Stack Label */}
                    <span className="font-mono text-[11px] md:text-xs text-white/40 tracking-[0.15em] uppercase">
                      {project.stack}
                    </span>

                    {/* Technology Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Description + Links */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10 mt-auto">
                    <p className="font-sans text-xs md:text-sm leading-relaxed text-white/60 max-w-md">
                      {project.description}
                    </p>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a href={project.github} className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-target" aria-label="GitHub Repository">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                      <a href={project.link} className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-target" aria-label="Live Demo">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>

        </div>
      </div>
    </section>
  );
}
