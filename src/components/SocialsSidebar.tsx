import React, { useState, useEffect, useRef } from 'react';
import { Share2, X } from 'lucide-react';

export default function SocialsSidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footerEl = document.getElementById('contact');
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      let footerInView = isNearBottom;
      if (!footerInView && footerEl) {
        const rect = footerEl.getBoundingClientRect();
        // Hide if top of footer is in viewport
        footerInView = rect.top < window.innerHeight - 80;
      }

      setIsFooterVisible(footerInView);

      // Show sidebar when scrolled down more than 150px AND footer is not visible
      if (window.scrollY > 150 && !footerInView) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const socials = [
    {
      name: 'Resume',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      href: '/Zeus_Angelo_Bautista_Resume.pdf',
      ariaLabel: 'View resume'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: 'https://www.linkedin.com/in/zeus-angelo-bautista/',
      ariaLabel: 'LinkedIn profile'
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      href: 'https://github.com/kidlatpogi',
      ariaLabel: 'GitHub profile'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      href: 'mailto:bautistaangelozeus17@gmail.com',
      ariaLabel: 'Send email'
    }
  ];

  return (
    <>
      {/* DESKTOP VIEW (Right Sidebar) */}
      <div 
        className={`hidden md:flex fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible 
            ? 'opacity-100 translate-x-0 pointer-events-auto' 
            : 'opacity-0 translate-x-6 pointer-events-none'
        }`}
      >
        {socials.map((social) => {
          const isResume = social.name === 'Resume';
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={isResume ? (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('openResumePreview'));
              } : undefined}
              aria-label={social.ariaLabel}
              className="group relative w-11 h-11 rounded-full bg-black flex items-center justify-center text-white hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-target"
            >
              {social.icon}
              
              {/* Hover Tooltip/Title */}
              <div className="absolute right-[125%] top-1/2 -translate-y-1/2 bg-black text-white text-xs font-mono uppercase tracking-wider py-1.5 px-3 rounded-md shadow-md whitespace-nowrap pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-30">
                {social.name}
                <div className="absolute left-[99%] top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
              </div>
            </a>
          );
        })}
      </div>

      {/* MOBILE VIEW (Bottom-Left Circle Menu) */}
      <div 
        ref={menuRef}
        className={`md:hidden fixed bottom-[144px] left-6 z-50 flex flex-col items-start transition-all duration-300 ${
          isFooterVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
        }`}
      >
        {/* Expanded Social Icons Stack (Pops up above the button) */}
        <div 
          className={`flex flex-col gap-2.5 mb-3 transition-all duration-300 ease-out ${
            isMobileOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : 'opacity-0 translate-y-4 pointer-events-none scale-90 h-0 overflow-hidden'
          }`}
        >
          {socials.map((social) => {
            const isResume = social.name === 'Resume';
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (isResume) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('openResumePreview'));
                  }
                  setIsMobileOpen(false);
                }}
                aria-label={social.ariaLabel}
                className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/95 text-white border border-white/20 shadow-xl backdrop-blur-md active:bg-[#C44900] transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center text-white shrink-0">
                  {social.icon}
                </div>
                <span className="font-mono text-xs uppercase tracking-wider font-bold pr-2">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Mobile Circle Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={`cursor-target flex items-center justify-center w-12 h-12 rounded-full text-white shadow-xl border border-white/10 transition-all duration-300 active:scale-95 cursor-pointer ${
            isMobileOpen ? 'bg-[#C44900]' : 'bg-black hover:bg-[#C44900]'
          }`}
          aria-label={isMobileOpen ? 'Close socials menu' : 'Open socials menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <X size={20} className="text-white transition-transform duration-200" />
          ) : (
            <Share2 size={19} className="text-white" />
          )}
        </button>
      </div>
    </>
  );
}
