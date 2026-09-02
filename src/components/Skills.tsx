import React, { useState, useMemo } from 'react';

interface Skill {
  name: string;
  logo: string;
  category: 'Frontend & Mobile' | 'Backend & Databases' | 'Tools & DevOps';
  level?: string;
}

const allSkills: Skill[] = [
  // Frontend & Mobile
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'Frontend & Mobile', level: 'Proficient' },
  { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg', category: 'Frontend & Mobile', level: 'Intermediate' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', category: 'Frontend & Mobile', level: 'Proficient' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend & Mobile', level: 'Advanced' },
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', category: 'Frontend & Mobile', level: 'Mastery' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', category: 'Frontend & Mobile', level: 'Mastery' },
  { name: 'Electron', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg', category: 'Frontend & Mobile', level: 'Intermediate' },

  // Backend & Databases
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'Backend & Databases', level: 'Proficient' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'Backend & Databases', level: 'Advanced' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', category: 'Backend & Databases', level: 'Proficient' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', category: 'Backend & Databases', level: 'Proficient' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'Backend & Databases', level: 'Proficient' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'Backend & Databases', level: 'Proficient' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'Backend & Databases', level: 'Intermediate' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'Backend & Databases', level: 'Intermediate' },
  { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'Backend & Databases', level: 'Intermediate' },

  // Tools & DevOps
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'Tools & DevOps', level: 'Advanced' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', category: 'Tools & DevOps', level: 'Advanced' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'Tools & DevOps', level: 'Intermediate' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', category: 'Tools & DevOps', level: 'Daily Driver' },
  { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', category: 'Tools & DevOps', level: 'Proficient' },
  { name: 'Photoshop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', category: 'Tools & DevOps', level: 'Creative UI' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'Tools & DevOps', level: 'UI / Wireframing' }
];

const categories = ['All', 'Frontend & Mobile', 'Backend & Databases', 'Tools & DevOps'] as const;

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return allSkills;
    return allSkills.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden bg-transparent z-10" id="skills">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Subheading */}
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          My Tech Arsenal
        </span>

        {/* "Skills" Heading */}
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-10">
          Skills
        </h2>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 mb-12">
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-mono text-xs md:text-sm font-bold tracking-wide transition-all duration-300 cursor-target ${
                  isActive
                    ? 'bg-accent text-white shadow-md shadow-accent/20 scale-105'
                    : 'bg-white border-2 border-slate-200/80 text-slate-600 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Centered Flex Matrix */}
        <div className="w-full max-w-[1600px] flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mx-auto">
          {filteredSkills.map(skill => {
            return (
              <div
                key={skill.name}
                className="w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3.75rem)/4)] lg:w-[calc((100%-5rem)/5)] xl:w-[calc((100%-6.25rem)/6)] max-w-[240px] group relative border-2 border-slate-200/80 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(196,73,0,0.12)] cursor-target overflow-hidden"
              >
                {/* Tech Logo */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    loading="lazy"
                    decoding="async"
                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
                  />
                </div>

                {/* Skill Name */}
                <span className="font-clash-semibold text-xs sm:text-sm font-bold text-slate-800 text-center relative z-10 group-hover:text-accent transition-colors duration-300 truncate max-w-full">
                  {skill.name}
                </span>

                {/* Skill Category Pill */}
                <span className="font-mono text-[8px] sm:text-[10px] text-slate-400 uppercase font-semibold px-1.5 sm:px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md truncate max-w-full">
                  {skill.category}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
