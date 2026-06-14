import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-16 relative z-[70] border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo */}
        <a href="#hero" className="font-display-lg text-white font-black tracking-tighter text-2xl hover:text-zinc-300 transition-colors">
          AETHER
        </a>

        {/* Copyright Notice */}
        <div className="font-label-md text-[10px] uppercase tracking-[0.15em] text-zinc-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} Zeus Angelo Vargas Bautista. Engineered for the future.
        </div>

        {/* Social Links */}
        <div className="flex gap-10">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white font-label-md text-[11px] tracking-widest uppercase transition-colors"
          >
            Github
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white font-label-md text-[11px] tracking-widest uppercase transition-colors"
          >
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
