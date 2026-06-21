import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface Skill {
  name: string;
  logo: string;
}

const skillsList: Skill[] = [
  { 
    name: 'HTML5', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' 
  },
  { 
    name: 'CSS3', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' 
  },
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' 
  },
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' 
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
    logo: 'https://cdn.simpleicons.org/supabase/3FCF8E' 
  },
  { 
    name: 'Python', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' 
  },
  { 
    name: 'Git', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' 
  },
  { 
    name: 'GitHub', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' 
  },
  { 
    name: 'VS Code', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' 
  },
  { 
    name: 'Electron', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg' 
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
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' 
  }
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
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-20 relative overflow-hidden" id="skills">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">
        
        {/* Headings inside ScrollReveal */}
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={2}
          blurStrength={12}
          as="div"
          containerClassName="flex flex-col items-center w-full"
        >
          {/* "Technical" Subheading - styled like Hero's subheader, centered */}
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
            Technical
          </span>

          {/* "Skills" Heading - styled like "Developer" from Hero, centered */}
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-12">
            Skills
          </h2>
        </ScrollReveal>

        {/* Interactive Badges Grid inside ScrollReveal */}
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={2}
          blurStrength={12}
          as="div"
          containerClassName="w-[95%] md:w-[95%] max-w-[2000px] flex flex-wrap items-center justify-center gap-6 sm:gap-8 mx-auto"
          wordAnimationEnd="bottom center"
        >
          {skillsList.map((skill) => {
            const isActive = activeSkill === skill.name;
            return (
              <div 
                key={skill.name} 
                className="group relative flex flex-col items-center cursor-pointer reveal-item cursor-target"
                onClick={() => handleSkillTap(skill.name)}
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                {/* Tooltip */}
                <div 
                  className={`absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-black text-white text-xs md:text-sm font-mono uppercase tracking-wider py-1.5 px-3.5 rounded-md shadow-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out z-30 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                  }`}
                >
                  {skill.name}
                  <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                </div>

                {/* Badge Circular Container */}
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
                    className={`w-9 h-9 sm:w-11 sm:h-11 object-contain filter transition-all duration-500 ease-out ${
                      isActive ? 'grayscale-0' : 'grayscale md:group-hover:grayscale-0'
                    }`}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </ScrollReveal>

      </div>
    </section>
  );
}
