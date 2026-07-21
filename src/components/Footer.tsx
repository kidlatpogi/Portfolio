import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/kidlatpogi'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zeus-angelo-bautista/'
  },
  {
    name: 'Email',
    url: 'mailto:bautistaangelozeus17@gmail.com'
  },
  {
    name: 'Resume',
    url: '/Zeus_Angelo_Bautista_Resume.pdf'
  }
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#C44900] md:h-screen md:min-h-screen flex flex-col justify-between pt-20 pb-8 relative overflow-hidden border-t border-[#C44900]/20">
      <div className="w-[95%] md:w-[95%] max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col justify-between h-full min-h-[calc(100vh-140px)] md:min-h-0 relative z-10">
        
        {/* Top Split Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-16 w-full">
          
          {/* Left Column: Headline & Bio */}
          <div className="flex flex-col items-start max-w-[500px]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-orange-200/90 mb-4 font-bold">
              Collaborations
            </span>
            <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-white tracking-tighter uppercase mb-6 select-none">
              What if we<br />
              <span className="text-slate-950">work together?</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-orange-50/90 leading-relaxed max-w-[420px]">
              Feel free to reach out for project opportunities, integrations, or developer collaborations. Let's design and build something exceptional together.
            </p>
          </div>

          {/* Right Column: Social Links */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 min-w-[200px]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-orange-200/90 mb-2 font-bold">
              Connections
            </span>
            {socials.map((social, index) => {
              const isResume = social.name === 'Resume';
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={isResume ? (e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('openResumePreview'));
                  } : undefined}
                  className="group flex items-center gap-3 font-clash-semibold text-2xl sm:text-3xl md:text-4xl font-bold text-white hover:text-slate-950 transition-colors duration-300 cursor-target"
                >
                  <span className="relative">
                    {social.name}
                    <span className="absolute left-0 bottom-0.5 w-0 h-[2.5px] bg-slate-950 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-slate-950" />
                </a>
              );
            })}
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/20 pt-8 w-full">
          {/* Left: Copyright */}
          <span className="font-mono text-[10px] md:text-xs text-orange-200/80 uppercase tracking-wider text-center sm:text-left">
            &copy; {new Date().getFullYear()} Zeus Angelo Bautista. All rights reserved.
          </span>

          {/* Right: Email Link */}
          <a
            href="mailto:bautistaangelozeus17@gmail.com"
            className="font-mono text-xs md:text-sm text-orange-100 hover:text-slate-950 font-bold tracking-wide transition-colors duration-300 cursor-target"
          >
            bautistaangelozeus17@gmail.com
          </a>
        </div>

      </div>

      {/* Massive Watermark display text */}
      <div className="absolute bottom-16 md:bottom-20 left-0 w-full overflow-hidden select-none pointer-events-none flex justify-center z-0">
        <h3 className="font-clash-semibold text-[15vw] xl:text-[180px] 2xl:text-[220px] font-black text-black/[0.04] leading-none tracking-tighter text-center uppercase whitespace-nowrap">
          GETINTOUCH
        </h3>
      </div>
    </footer>
  );
}
