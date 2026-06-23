import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal.tsx';
import CardSwap, { Card } from './CardSwap.tsx';
import { ExternalLink, Bot, CheckSquare, Paintbrush, Box, BarChart3 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  iframeUrl?: string;
  icon: React.ReactNode;
  mockup: React.ReactNode;
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projectsList: Project[] = [
    {
      title: "AI Chat Assistant",
      description: "A real-time AI conversational bot featuring custom streaming responses, persistent markdown chat histories, and theme integration. Leverages edge handlers for optimal latency and responsive chat flows.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/kidlatpogi",
      iframeUrl: "https://example.com",
      icon: <Bot className="w-5 h-5 text-accent" />,
      mockup: (
        <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 p-4 font-sans text-[11px] leading-normal select-none">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-accent" />
              <span className="font-semibold text-slate-200">Zeus-Bot v1.0</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          {/* Messages */}
          <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto mb-3">
            <div className="bg-slate-800 p-2 rounded-lg max-w-[85%] self-start border border-slate-700">
              <p className="text-slate-300 font-mono text-[9px] uppercase text-accent mb-0.5 font-bold">Zeus-Bot</p>
              Hello! Ask me anything about my tech stack or projects.
            </div>
            <div className="bg-accent/15 p-2 rounded-lg max-w-[85%] self-end border border-accent/30 text-right">
              <p className="text-accent font-mono text-[9px] uppercase mb-0.5 font-bold">User</p>
              How quickly can you learn React Three Fiber?
            </div>
            <div className="bg-slate-800 p-2 rounded-lg max-w-[85%] self-start border border-slate-700">
              <p className="text-slate-300 font-mono text-[9px] uppercase text-accent mb-0.5 font-bold">Zeus-Bot</p>
              Instantly! I spot patterns in APIs and adapt within hours.
            </div>
          </div>
          {/* Input area */}
          <div className="flex gap-1.5 border-t border-slate-700 pt-2">
            <div className="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-slate-400 font-mono text-[9px]">
              Type a message...
            </div>
            <button className="bg-accent text-white px-2.5 py-1 rounded font-mono font-bold text-[9px]">SEND</button>
          </div>
        </div>
      )
    },
    {
      title: "Brutalist Task Manager",
      description: "A keyboard-first productivity application featuring sharp borders, micro-interactions, and local-first browser storage. Allows custom workspace tagging and stats visualization.",
      tags: ["React", "Vite", "Tailwind CSS", "LocalForage"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/kidlatpogi",
      iframeUrl: "https://example.com",
      icon: <CheckSquare className="w-5 h-5 text-accent" />,
      mockup: (
        <div className="w-full h-full flex flex-col bg-[#F9F9F9] p-4 text-black font-sans text-[11px] leading-normal select-none">
          {/* Toolbar */}
          <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-3">
            <span className="font-mono font-bold tracking-tight text-accent text-[10px]">TASKS // ACTIVE</span>
            <button className="border-2 border-black bg-black text-white px-2 py-0.5 font-mono text-[8px] font-bold">+ ADD TASK</button>
          </div>
          {/* Tasks list */}
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {[
              { id: "1", text: "Implement GSAP CardSwap component", done: true },
              { id: "2", text: "Fix hydration dispatcher bugs", done: true },
              { id: "3", text: "Optimize Astro CSS bundling", done: false },
              { id: "4", text: "Design voxel assets in Blender", done: false },
            ].map((t) => (
              <div key={t.id} className="flex items-center justify-between border-2 border-black p-1.5 bg-white text-[10px]">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 border-2 border-black flex items-center justify-center font-bold text-[8px] ${t.done ? 'bg-black text-white' : 'bg-white'}`}>
                    {t.done && "✓"}
                  </span>
                  <span className={t.done ? 'line-through text-slate-400' : 'font-semibold'}>{t.text}</span>
                </div>
                <span className={`font-mono text-[8px] uppercase px-1 border ${t.done ? 'border-slate-300 text-slate-400' : 'border-accent text-accent font-bold bg-accent/5'}`}>
                  {t.done ? 'done' : 'pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Infinite Vector Canvas",
      description: "An interactive visual whiteboard enabling visual brainstorming on an infinite canvas with real-time pressure-sensitive drawing, shape rendering, and exporting options.",
      tags: ["TypeScript", "HTML5 Canvas", "Astro", "GSAP"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/kidlatpogi",
      iframeUrl: "https://example.com",
      icon: <Paintbrush className="w-5 h-5 text-accent" />,
      mockup: (
        <div className="w-full h-full bg-stone-50 p-3 flex flex-col relative text-black font-sans text-[11px] leading-normal overflow-hidden select-none">
          {/* Vector grid paper background */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          {/* Canvas Toolbar */}
          <div className="z-10 bg-white border-2 border-black p-1 flex gap-1.5 items-center justify-between shadow-none mb-2">
            <div className="flex gap-1">
              {['✏️', '⏹️', '⚪', '➡️'].map((emoji, i) => (
                <span key={i} className={`w-5 h-5 border border-black flex items-center justify-center cursor-pointer text-[10px] ${i === 0 ? 'bg-accent/10 border-accent text-accent font-bold' : 'bg-stone-100'}`}>{emoji}</span>
              ))}
            </div>
            <div className="w-3.5 h-3.5 bg-accent border border-black rounded-full" />
          </div>
          {/* Canvas Area with drawings */}
          <div className="z-10 flex-1 border-2 border-dashed border-black/30 relative flex items-center justify-center">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10 30 Q 30 70 50 20 T 90 80" fill="none" stroke="#C44900" strokeWidth="2" strokeDasharray="2,2" />
              <circle cx="50" cy="20" r="3" fill="black" />
              <rect x="75" y="65" width="10" height="10" fill="none" stroke="black" strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-[8px] text-black/50 absolute bottom-1 right-1.5">zoom: 100%</span>
          </div>
        </div>
      )
    },
    {
      title: "3D Voxel Portfolio Room",
      description: "An interactive 3D miniature bedroom showcasing projects, skills, and social links. Built using WebGL with full physics collisions, gravity control, and drag-and-drop objects.",
      tags: ["Three.js", "React Three Fiber", "Rapier", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/kidlatpogi",
      iframeUrl: "https://example.com",
      icon: <Box className="w-5 h-5 text-accent" />,
      mockup: (
        <div className="w-full h-full bg-[#1A1A1A] p-4 flex flex-col relative text-white font-sans text-[11px] leading-normal overflow-hidden select-none">
          {/* Isometric room skeleton wireframe background */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="30" x2="90" y2="70" stroke="white" strokeWidth="0.5" />
              <line x1="10" y1="70" x2="90" y2="30" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          {/* Control panel */}
          <div className="z-10 flex justify-between items-center border-b border-white/10 pb-2 mb-3">
            <span className="font-mono font-bold tracking-tight text-accent flex items-center gap-1 text-[10px]"><Box className="w-3 h-3" /> voxel-viewer</span>
            <span className="font-mono text-[8px] text-emerald-400">FPS: 60</span>
          </div>
          {/* Voxel Rendering Grid Mock */}
          <div className="z-10 flex-1 flex items-center justify-center relative">
            {/* Isometric voxel building box layout */}
            <div className="w-20 h-20 relative flex items-center justify-center">
              {/* Layer 3 */}
              <div className="w-12 h-5 bg-[#C44900] border border-white transform skew-x-[-15deg] rotate-[15deg] absolute top-2 shadow-md flex items-center justify-center font-mono text-[7px] font-bold">VOXEL</div>
              {/* Layer 2 */}
              <div className="w-14 h-7 bg-slate-700 border border-white transform skew-x-[15deg] rotate-[-15deg] absolute top-6 shadow-md"></div>
              {/* Layer 1 */}
              <div className="w-16 h-9 bg-slate-900 border border-white transform skew-x-[-20deg] rotate-[20deg] absolute top-10"></div>
            </div>
            <div className="absolute left-1 bottom-1 flex flex-col gap-0.5 font-mono text-[7px] text-white/50">
              <span>PHYSICS: Rapier3D</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Git Analytics Dashboard",
      description: "A developer tool that generates visual velocity metrics, contribution heatmaps, and repository statistics directly from public GitHub logs using SVG data paths.",
      tags: ["React", "D3.js", "Tailwind CSS", "GitHub API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/kidlatpogi",
      iframeUrl: "https://example.com",
      icon: <BarChart3 className="w-5 h-5 text-accent" />,
      mockup: (
        <div className="w-full h-full bg-[#18181B] p-4 flex flex-col relative text-zinc-100 font-sans text-[11px] leading-normal overflow-hidden select-none">
          {/* Title */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3">
            <span className="font-mono font-bold tracking-tight text-accent flex items-center gap-1 text-[10px]"><BarChart3 className="w-3 h-3" /> git-velocity</span>
            <span className="font-mono text-[8px] text-zinc-500">updated 2m ago</span>
          </div>
          {/* Charts & Stats */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="border border-zinc-800 bg-zinc-900 p-1.5 rounded">
                <span className="text-[8px] text-zinc-400 font-mono uppercase block">Commits</span>
                <span className="text-sm font-bold text-white">1,248</span>
              </div>
              <div className="border border-zinc-800 bg-zinc-900 p-1.5 rounded">
                <span className="text-[8px] text-zinc-400 font-mono uppercase block">Prs Merged</span>
                <span className="text-sm font-bold text-accent">143</span>
              </div>
            </div>
            {/* Commit velocity chart */}
            <div className="flex-1 border border-zinc-800 bg-zinc-900 p-1.5 rounded flex flex-col min-h-[60px]">
              <div className="flex-1 flex items-end gap-1 pt-1">
                {[15, 35, 45, 25, 60, 80, 55, 90, 75, 40].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-zinc-800 relative group" style={{ height: `${val}%` }}>
                    <div className={`absolute inset-0 bg-accent transition-all duration-300 ${idx === 7 ? 'opacity-100' : 'opacity-30 group-hover:opacity-75'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const activeProject = projectsList[activeIndex] || projectsList[0];

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      {/* Main Section Header */}
      <ScrollReveal
        baseOpacity={0.08}
        enableBlur={true}
        baseRotation={2}
        blurStrength={12}
        as="div"
      >
        <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-16">
          Projects
        </h2>
      </ScrollReveal>

      {/* Responsive Two-Column Grid */}
      <div className="w-[95%] md:w-[90%] max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 mx-auto relative min-h-[520px]">
        
        {/* Left Column - Details Panel */}
        <div className="w-full md:w-[48%] flex flex-col justify-center min-h-[350px]">
          <div
            key={activeIndex}
            className="flex flex-col text-left projects-panel-fadein"
            style={{ animation: 'projectsFadeIn 0.25s ease forwards' }}
          >
              {/* Project Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 border-2 border-black bg-white flex items-center justify-center">
                  {activeProject.icon}
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-black uppercase tracking-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] md:text-[11px] font-semibold uppercase px-2 py-0.5 border border-accent text-accent bg-accent/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="font-sans text-sm md:text-base text-slate-700 leading-relaxed mb-8">
                {activeProject.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-semibold bg-black text-white hover:bg-accent border border-black hover:border-accent px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-250 cursor-target"
                >
                  Visit Project
                  <ExternalLink size={14} />
                </a>
                
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold bg-transparent text-black border-2 border-black hover:bg-black hover:text-white px-5 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-250 cursor-target"
                  >
                    View Source
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
              </div>
          </div>
        </div>

        {/* Right Column - CardSwap Stack */}
        <div className="w-full md:w-[48%] flex items-center justify-center overflow-visible select-none" style={{ minHeight: '420px' }}>
          <CardSwap
            width={360}
            height={260}
            cardDistance={35}
            verticalDistance={0}
            delay={5000}
            pauseOnHover={true}
            skewAmount={3}
            onActiveCardChange={setActiveIndex}
          >
            {projectsList.map((project, idx) => (
              <Card key={idx} className="border-2 border-black bg-white overflow-hidden flex flex-col w-full h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {/* Brutalist Window Title Bar */}
                <div className="bg-[#E5E7EB] border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between font-mono text-[10px] text-black">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border border-black" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-black" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-black" />
                  </div>
                  <span className="font-semibold">{project.title.toLowerCase().replace(/\s+/g, '-')}.exe</span>
                </div>

                {/* Main Visual Frame - always use mockup for dummy projects */}
                <div className="flex-1 w-full relative bg-white overflow-hidden">
                  {project.mockup}
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

      </div>
    </section>
  );
}
