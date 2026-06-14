import React from 'react';
import { Rocket, Code2, Terminal, Layers, Sparkles, Cpu, Workflow, Cloud } from 'lucide-react';

export default function Skills() {
  const skillList = [
    { name: 'Astro', icon: Rocket, label: 'SSG Framework' },
    { name: 'React', icon: Code2, label: 'UI Library' },
    { name: 'TypeScript', icon: Terminal, label: 'Language Type' },
    { name: 'Tailwind CSS', icon: Layers, label: 'Styling Engine' },
    { name: 'Framer Motion', icon: Sparkles, label: 'Fluid Motion' },
    { name: 'PyTorch', icon: Cpu, label: 'AI Model Core' },
    { name: 'Next.js', icon: Workflow, label: 'Meta Framework' },
    { name: 'Cloudflare', icon: Cloud, label: 'CDN & Compute' },
  ];

  return (
    <section className="parallax-section bg-gray-50 z-40 shadow-2xl py-24" id="skills">
      <div className="w-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-14 w-full text-left">
          <h2 className="font-headline-md text-headline-md text-gray-900 font-bold mb-2">Skills</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-400 to-transparent"></div>
        </div>

        {/* Infinite Marquee Wrapper */}
        <div className="relative marquee-mask overflow-hidden py-4 select-none">
          <div className="flex gap-6 animate-marquee whitespace-nowrap w-fit">
            
            {/* First Set of Skill Cards */}
            <div className="flex gap-6 items-center shrink-0">
              {skillList.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`set1-${index}`}
                    className="w-48 h-48 glass-card-light rounded-2xl flex flex-col items-center justify-center gap-4 border border-gray-200/80 shadow-md group hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-950/5 flex items-center justify-center text-zinc-800 group-hover:scale-110 group-hover:text-black transition-all duration-500">
                      <Icon className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div className="text-center">
                      <span className="block font-label-md text-xs text-gray-900 font-black uppercase tracking-widest">
                        {skill.name}
                      </span>
                      <span className="block text-[9px] text-gray-400 font-mono uppercase tracking-wider mt-1">
                        {skill.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Second Set of Skill Cards for Seamless Loop */}
            <div className="flex gap-6 items-center shrink-0">
              {skillList.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`set2-${index}`}
                    className="w-48 h-48 glass-card-light rounded-2xl flex flex-col items-center justify-center gap-4 border border-gray-200/80 shadow-md group hover:border-gray-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-950/5 flex items-center justify-center text-zinc-800 group-hover:scale-110 group-hover:text-black transition-all duration-500">
                      <Icon className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div className="text-center">
                      <span className="block font-label-md text-xs text-gray-900 font-black uppercase tracking-widest">
                        {skill.name}
                      </span>
                      <span className="block text-[9px] text-gray-400 font-mono uppercase tracking-wider mt-1">
                        {skill.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
