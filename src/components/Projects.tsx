import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack.tsx';
import { ExternalLink, Code } from 'lucide-react';

const projectsData = [
  {
    title: "AI Automation Platform",
    description: "An automated system integrating large language models with customized agent workflows to execute repetitive tasks and optimize data structures.",
    tags: ["Python", "FastAPI", "React", "OpenAI"],
    bgColor: "bg-white border border-slate-200",
    textColor: "text-black",
    link: "#",
    github: "#"
  },
  {
    title: "E-Commerce Microservices",
    description: "A highly resilient e-commerce application composed of autonomous microservices using Docker containerization, Kafka event streaming, and PostgreSQL.",
    tags: ["Node.js", "Docker", "PostgreSQL", "Kafka"],
    bgColor: "bg-[#1E293B] border border-slate-800",
    textColor: "text-white",
    link: "#",
    github: "#"
  },
  {
    title: "High-Fidelity Portfolio",
    description: "Personal responsive portfolio built using React, Astro, and Tailwind CSS. Implements smooth Lenis scroll and customized scroll reveal animations.",
    tags: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
    bgColor: "bg-gradient-to-br from-[#C44900] to-[#E85D04]",
    textColor: "text-white",
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-12 md:py-16 relative overflow-hidden" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      {/* Main Section Header */}
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10 mb-12">
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          Feature Works
        </span>
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center">
          Projects
        </h2>
      </div>

      {/* Scroll Stack Projects */}
      <div className="w-[95%] md:w-[90%] max-w-[1200px] mx-auto relative z-10">
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={80}
          itemStackDistance={35}
          baseScale={0.92}
          itemScale={0.02}
          stackPosition="15%"
        >
          {projectsData.map((project, index) => (
            <ScrollStackItem 
              key={index}
              itemClassName={`${project.bgColor} ${project.textColor} flex flex-col justify-between`}
            >
              <div className="flex flex-col gap-4">
                {/* Header info */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2 text-accent">
                    <Code className="w-5 h-5" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold">Featured Project</span>
                  </div>
                  
                  {/* Action links */}
                  <div className="flex items-center gap-4">
                    <a href={project.github} className="hover:text-accent transition-colors cursor-target text-[#334155] dark:text-slate-300" aria-label="GitHub Repository">
                      <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <a href={project.link} className="hover:text-accent transition-colors cursor-target text-[#334155] dark:text-slate-300" aria-label="Live Demo">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm md:text-base leading-relaxed max-w-3xl opacity-80">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className={`font-mono text-[10px] md:text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${
                      project.textColor === 'text-white' 
                        ? 'border-white/20 bg-white/5 text-white/90' 
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
