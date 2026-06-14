import React from 'react';
import { motion } from 'framer-motion';

export default function Designs() {
  const designs = [
    {
      id: 1,
      title: 'Topographic Chrome Wave',
      category: 'Generative Art',
      height: 'h-[360px]',
      renderGraphic: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
          {/* Contour Lines SVG */}
          <svg className="w-full h-full text-zinc-800 opacity-60 absolute inset-0" viewBox="0 0 200 300" fill="none">
            <defs>
              <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {/* Generate some flowing path waveforms */}
            {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280].map((y, i) => (
              <path
                key={i}
                d={`M -20,${y} Q 30,${y - 30 + (i % 3) * 15} 100,${y + 10} T 220,${y - 10}`}
                stroke="url(#chromeGrad)"
                strokeWidth="0.75"
              />
            ))}
          </svg>
          <div className="absolute bottom-4 left-4 text-left z-10">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">01 // WAVEFORM</span>
            <h4 className="text-sm font-bold text-white tracking-wide mt-1">Topography Contour</h4>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ),
    },
    {
      id: 2,
      title: 'Obsidian Polyhedron',
      category: '3D Mesh',
      height: 'h-[440px]',
      renderGraphic: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
          {/* Crystal Mesh SVG */}
          <svg className="w-4/5 h-4/5 text-zinc-700 opacity-70" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Draw diamond/polyhedron shapes */}
            <polygon points="50,15 80,40 50,85 20,40" stroke="currentColor" strokeWidth="0.5" fill="url(#polyGrad)" />
            <polygon points="50,15 50,85" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="20,40 80,40" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="50,15 35,40 50,85" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="50,15 65,40 50,85" stroke="currentColor" strokeWidth="0.5" />
            <line x1="20" y1="40" x2="35" y2="40" stroke="currentColor" strokeWidth="0.5" />
            <line x1="65" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <div className="absolute bottom-4 left-4 text-left z-10">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">02 // GEOMETRY</span>
            <h4 className="text-sm font-bold text-white tracking-wide mt-1">Crystal Core Mesh</h4>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ),
    },
    {
      id: 3,
      title: 'Isometric Nodes',
      category: 'Interface',
      height: 'h-[380px]',
      renderGraphic: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
          {/* Isometric grid SVG */}
          <svg className="w-full h-full text-zinc-800 opacity-60 absolute inset-0" viewBox="0 0 200 200" fill="none">
            {/* Isometric lines */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map((pos) => (
              <React.Fragment key={pos}>
                <line x1={pos} y1="0" x2={pos - 200} y2="200" stroke="currentColor" strokeWidth="0.25" />
                <line x1={pos - 200} y1="0" x2={pos} y2="200" stroke="currentColor" strokeWidth="0.25" />
              </React.Fragment>
            ))}
            {/* Specular nodes */}
            <circle cx="100" cy="100" r="4" fill="#ffffff" className="animate-ping" />
            <circle cx="100" cy="100" r="3" fill="#ffffff" />
            
            <circle cx="60" cy="80" r="2" fill="#94a3b8" />
            <line x1="100" y1="100" x2="60" y2="80" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
            
            <circle cx="140" cy="120" r="2" fill="#94a3b8" />
            <line x1="100" y1="100" x2="140" y2="120" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
          <div className="absolute bottom-4 left-4 text-left z-10">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">03 // PROTOCOL</span>
            <h4 className="text-sm font-bold text-white tracking-wide mt-1">Isometric Data Link</h4>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ),
    },
    {
      id: 4,
      title: 'Glass Typographic Poster',
      category: 'Branding',
      height: 'h-[420px]',
      renderGraphic: () => (
        <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
          {/* Overlapping text and blur panels */}
          <div className="font-display-lg text-8xl font-black text-zinc-900 absolute tracking-tighter uppercase select-none z-0">
            ZOO
          </div>
          <div className="font-display-lg text-8xl font-black text-zinc-900 absolute tracking-tighter uppercase select-none z-0 mt-20">
            G'S
          </div>
          
          {/* Overlapping glass panel */}
          <div className="w-2/3 h-1/2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md z-10 flex flex-col justify-between p-4 shadow-xl">
            <div className="text-[9px] text-white/50 tracking-widest uppercase font-mono">Specular Layer</div>
            <div className="text-[20px] font-black text-white/90 tracking-tighter uppercase leading-none text-left">
              AETHER<br />DESIGN
            </div>
            <div className="text-[8px] text-white/40 font-mono text-left">2026 PERSONAL LABS</div>
          </div>
          
          <div className="absolute bottom-4 left-4 text-left z-10">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">04 // BRANDS</span>
            <h4 className="text-sm font-bold text-white tracking-wide mt-1">Aether Specular Layer</h4>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ),
    },
  ];

  return (
    <section className="parallax-section bg-black z-30 shadow-2xl py-24 overflow-y-auto block h-auto min-h-screen" id="designs">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <h2 className="font-headline-md text-headline-md text-white font-bold mb-2">Designs</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-white via-zinc-400 to-transparent"></div>
        </div>

        {/* Masonry Layout Grid */}
        <div className="masonry-grid">
          {designs.map((design) => (
            <div
              key={design.id}
              className={`masonry-item silver-border rounded-xl overflow-hidden relative group cursor-pointer ${design.height}`}
            >
              {design.renderGraphic()}
              {/* Highlight flash line */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
