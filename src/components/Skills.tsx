import React from 'react';

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
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-20 relative overflow-hidden" id="skills">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">
        
        {/* "Technical" Subheading - styled like Hero's subheader, centered */}
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          Technical
        </span>

        {/* "Skills" Heading - styled like "Developer" from Hero, centered */}
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-12">
          Skills
        </h2>

        {/* Interactive Badges Grid */}
        <div className="w-[90%] md:w-[80%] max-w-[1200px] flex flex-wrap items-center justify-center gap-6 sm:gap-8 mx-auto">
          {skillsList.map((skill) => (
            <div 
              key={skill.name} 
              className="group relative flex flex-col items-center cursor-pointer"
            >
              {/* Tooltip */}
              <div className="absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-black text-white text-xs md:text-sm font-mono uppercase tracking-wider py-1.5 px-3.5 rounded-md shadow-md whitespace-nowrap pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-30">
                {skill.name}
                <div className="absolute top-[99%] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </div>

              {/* Badge Circular Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200/80 bg-white flex items-center justify-center shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_12px_24px_-8px_rgba(196,73,0,0.2)] group-hover:rotate-3">
                <img 
                  src={skill.logo} 
                  alt={`${skill.name} logo`} 
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
