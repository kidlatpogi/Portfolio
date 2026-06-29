import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/zeusbautista'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/kidlatpogi'
  },
  {
    name: 'Resume',
    url: '/resume.pdf'
  },
  {
    name: 'Email',
    url: 'mailto:bautistaangelozeus17@gmail.com'
  }
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#f8f8f8] pt-20 pb-10 relative overflow-hidden border-t border-slate-200/50">
      <div className="w-[95%] md:w-[95%] max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col justify-between relative z-10">
        
        {/* Top Split Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-16 w-full">
          
          {/* Left Column: Headline & Bio */}
          <div className="flex flex-col items-start max-w-[500px]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-4 font-bold">
              Collaborations
            </span>
            <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-slate-900 tracking-tighter uppercase mb-6 select-none">
              What if we<br />
              <span className="text-accent">work together?</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-[420px]">
              Feel free to reach out for project opportunities, integrations, or developer collaborations. Let's design and build something exceptional together.
            </p>
          </div>

          {/* Right Column: Social Links */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 min-w-[200px]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">
              Connections
            </span>
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-clash-semibold text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 hover:text-accent transition-colors duration-300 cursor-target"
              >
                <span className="relative">
                  {social.name}
                  <span className="absolute left-0 bottom-0.5 w-0 h-[2.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-200/60 pt-8 w-full">
          {/* Left: Copyright */}
          <span className="font-mono text-[10px] md:text-xs text-slate-400 uppercase tracking-wider text-center sm:text-left">
            &copy; {new Date().getFullYear()} Zeus Angelo Bautista. All rights reserved.
          </span>

          {/* Right: Email Link */}
          <a
            href="mailto:bautistaangelozeus17@gmail.com"
            className="font-mono text-xs md:text-sm text-slate-500 hover:text-accent font-bold tracking-wide transition-colors duration-300 cursor-target"
          >
            bautistaangelozeus17@gmail.com
          </a>
        </div>

        {/* Massive Watermark display text */}
        <div className="w-full mt-12 md:mt-20 overflow-hidden select-none pointer-events-none">
          <h3 className="font-clash-semibold text-[13.5vw] font-black text-slate-200/50 leading-none tracking-tighter text-center uppercase whitespace-nowrap">
            GETINTOUCH
          </h3>
        </div>

      </div>
    </footer>
  );
}
