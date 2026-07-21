import React, { useState, useEffect } from 'react';

export default function SocialsSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerEl = document.getElementById('contact');
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      let isFooterVisible = isNearBottom;
      if (!isFooterVisible && footerEl) {
        const rect = footerEl.getBoundingClientRect();
        // Hide if top of footer is in viewport
        isFooterVisible = rect.top < window.innerHeight - 80;
      }

      // Show sidebar when scrolled down more than 150px AND footer is not visible
      if (window.scrollY > 150 && !isFooterVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case page starts scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const socials = [
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
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      href: 'mailto:bautistaangelozeus17@gmail.com',
      ariaLabel: 'Send email'
    },
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
      href: '/resume.pdf',
      ariaLabel: 'View resume'
    }
  ];

  return (
    <div 
      className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-x-0 pointer-events-auto' 
          : 'opacity-0 translate-x-6 pointer-events-none'
      }`}
    >
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="group relative w-11 h-11 rounded-full bg-black flex items-center justify-center text-white hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-target"
        >
          {social.icon}
          
          {/* Hover Tooltip/Title (positioned to the left) */}
          <div className="absolute right-[125%] top-1/2 -translate-y-1/2 bg-black text-white text-xs font-mono uppercase tracking-wider py-1.5 px-3 rounded-md shadow-md whitespace-nowrap pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-30">
            {social.name}
            {/* Small triangle arrow on the right pointing to the button */}
            <div className="absolute left-[99%] top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
          </div>
        </a>
      ))}
    </div>
  );
}
