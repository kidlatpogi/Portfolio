import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal.tsx';

interface Skill {
  name: string;
  logo: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const categorizedSkills: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'JavaScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
      },
      {
        name: 'TypeScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
      },
      {
        name: 'React',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
      },
      {
        name: 'Tailwind CSS',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
      },
      {
        name: 'HTML5',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
      },
      {
        name: 'CSS3',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
      },
      {
        name: 'Electron',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg'
      }
    ]
  },
  {
    title: 'Backend & Database',
    skills: [
      {
        name: 'Node.js',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
      },
      {
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
      },
      {
        name: 'MySQL',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
      },
      {
        name: 'Firebase',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg'
      },
      {
        name: 'Supabase',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg'
      }
    ]
  },
  {
    title: 'Tools',
    skills: [
      {
        name: 'Git',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
      },
      {
        name: 'GitHub',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
      },
      {
        name: 'Docker',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
      },
      {
        name: 'VS Code',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg'
      },
      {
        name: 'Linux',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg'
      },
      {
        name: 'Photoshop',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg'
      },
      {
        name: 'Figma',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
      }
    ]
  }
];

const allSkills: Skill[] = categorizedSkills.flatMap(c => c.skills);

// Mobile Viewport: 5 per row -> 3 rows of 5 and 1 row of 4 (Total 19 skills)
const mobileRows: Skill[][] = [
  allSkills.slice(0, 5),   // Row 1: JavaScript, TypeScript, React, Tailwind CSS, HTML5
  allSkills.slice(5, 10),  // Row 2: CSS3, Electron, Node.js, Python, MySQL
  allSkills.slice(10, 15), // Row 3: Firebase, Supabase, Git, GitHub, Docker
  allSkills.slice(15, 19)  // Row 4: VS Code, Linux, Photoshop, Figma
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#skills')) {
        setActiveSkill(null);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleSkillTap = (name: string) => {
    setActiveSkill(prev => (prev === name ? null : name));
  };

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" id="skills">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Headings inside ScrollReveal */}
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={false}
          baseRotation={2}
          blurStrength={12}
          as="div"
          containerClassName="flex flex-col items-center w-full mb-12"
        >
          {/* Subheading */}
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
            Technical
          </span>

          {/* Heading */}
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center">
            Skills
          </h2>
        </ScrollReveal>

        {/* Desktop Categorized Skills Section (3 rows) */}
        <div className="hidden md:flex flex-col gap-4 sm:gap-6 w-[95%] max-w-[1600px] mx-auto relative z-10">
          {categorizedSkills.map((category) => (
            <ScrollReveal
              key={category.title}
              baseOpacity={0.08}
              enableBlur={false}
              baseRotation={1}
              blurStrength={8}
              as="div"
              containerClassName="flex flex-col items-center justify-center pb-5 md:pb-6 border-b border-slate-300/20 last:border-b-0 last:pb-0 w-full skills-parallax-row"
              wordAnimationEnd="top 50%"
              simpleReveal={true}
            >
              <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 reveal-item skills-badges-col parallax-y">
                {category.skills.map((skill) => {
                  const isActive = activeSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      className="group relative flex flex-col items-center cursor-pointer cursor-target"
                      onClick={() => handleSkillTap(skill.name)}
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div
                        className={`absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-black text-white text-xs md:text-sm font-mono uppercase tracking-wider py-1.5 px-3.5 rounded-md shadow-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out z-30 ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                        }`}
                      >
                        {skill.name}
                        <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                      </div>

                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 bg-white flex items-center justify-center shadow-sm transition-all duration-500 ease-out ${
                          isActive
                            ? 'scale-110 border-accent shadow-[0_12px_24px_-8px_rgba(196,73,0,0.2)] rotate-3'
                            : 'border-slate-200/80 md:group-hover:scale-110 md:group-hover:border-accent md:group-hover:shadow-[0_12px_24px_-8px_rgba(196,73,0,0.2)] md:group-hover:rotate-3'
                        }`}
                      >
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className="w-9 h-9 sm:w-12 sm:h-12 object-contain transition-all duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile Viewport Skills Section (5 per row: 3 rows of 5, 1 row of 4) */}
        <div className="flex md:hidden flex-col items-center w-full max-w-[480px] mx-auto relative z-10">
          <ScrollReveal
            baseOpacity={0.08}
            enableBlur={false}
            baseRotation={1}
            blurStrength={8}
            as="div"
            containerClassName="w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            simpleReveal={true}
          >
            {mobileRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex items-center justify-center gap-2 min-[360px]:gap-2.5 min-[390px]:gap-3.5 sm:gap-4 w-full"
              >
                {row.map((skill) => {
                  const isActive = activeSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      className="group relative flex flex-col items-center cursor-pointer cursor-target"
                      onClick={() => handleSkillTap(skill.name)}
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      {/* Tooltip */}
                      <div
                        className={`absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-mono uppercase tracking-wider py-1 px-2.5 rounded-md shadow-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out z-30 ${
                          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                      >
                        {skill.name}
                        <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rotate-45" />
                      </div>

                      {/* Badge Circular Container */}
                      <div
                        className={`w-12 h-12 min-[360px]:w-[52px] min-[360px]:h-[52px] min-[390px]:w-14 min-[390px]:h-14 sm:w-16 sm:h-16 rounded-full border-2 bg-white flex items-center justify-center shadow-sm transition-all duration-500 ease-out flex-shrink-0 ${
                          isActive
                            ? 'scale-110 border-accent shadow-[0_12px_24px_-8px_rgba(196,73,0,0.2)] rotate-3'
                            : 'border-slate-200/80'
                        }`}
                      >
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 min-[390px]:w-8 min-[390px]:h-8 sm:w-9 sm:h-9 object-contain transition-all duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}