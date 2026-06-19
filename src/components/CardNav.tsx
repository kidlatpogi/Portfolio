import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import ConnectModal from './ConnectModal';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logoText: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logoText,
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(255, 255, 255, 0.45)',
  menuColor = '#141313',
  buttonBgColor = '#141313',
  buttonTextColor = '#F2F0EF'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const validCards = cardsRef.current.filter((el) => el !== null && el !== undefined);

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    if (validCards.length > 0) {
      gsap.set(validCards, { y: 50, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    if (validCards.length > 0) {
      tl.to(validCards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    }

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[i] = el;
    } else {
      cardsRef.current = cardsRef.current.filter((_, idx) => idx !== i);
    }
  };

  const handleCtaClick = () => {
    setIsModalOpen(true);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Close the menu after clicking a link
      toggleMenu();
    }
  };

  return (
    <div className="contents">
      <div className={`fixed top-6 max-sm:top-4 left-1/2 -translate-x-1/2 w-[90%] max-sm:w-[92%] max-w-[800px] z-[100] box-border ${className}`}>
        <nav
          ref={navRef}
          className={`block h-[60px] p-0 border backdrop-blur-[24px] backdrop-saturate-[180%] relative overflow-hidden will-change-[height] transition-[border-radius,border-color,box-shadow] duration-400 ease-in-out ${
            isExpanded
              ? 'rounded-[1.5rem] max-sm:rounded-[1.25rem] border-white/70 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),inset_0_1px_2px_0_rgba(255,255,255,0.6)]'
              : 'rounded-[2rem] max-sm:rounded-[1.75rem] border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.5)]'
          }`}
          style={{ backgroundColor: baseColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-[60px] flex items-center justify-between pl-6 pr-3 py-2 max-sm:px-4 z-10">
            <div
              className={`h-10 w-10 flex flex-col items-start justify-center cursor-pointer gap-[5px] p-[5px] rounded-full transition-colors duration-300 hover:bg-white/20 max-sm:order-2`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              style={{ color: menuColor }}
            >
              <div className={`w-[22px] h-[2px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHamburgerOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <div className={`w-[22px] h-[2px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHamburgerOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </div>

            <a href="#home" className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 no-underline max-sm:static max-sm:transform-none max-sm:order-1 group cursor-target" onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span className="font-mono font-semibold text-[1.1rem] max-sm:text-[1rem] tracking-[0.15em] uppercase text-[#141313] transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-85">{logoText}</span>
            </a>

            <button
              type="button"
              className="font-mono font-semibold border border-white/30 rounded-[1.5rem] px-5 h-10 text-[0.85rem] tracking-[0.05em] uppercase cursor-pointer flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:brightness-110 active:translate-y-0 max-sm:hidden group gap-1.5"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              onClick={handleCtaClick}
            >
              Connect
              <ArrowUpRight className="transition-transform duration-250 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" size={16} />
            </button>
          </div>

          <div className={`absolute left-0 right-0 top-[60px] bottom-0 p-3 flex items-stretch gap-3 z-10 max-sm:flex-col max-sm:gap-2 max-sm:p-2 max-sm:bottom-0 max-sm:justify-start ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`} aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="h-[176px] flex-[1_1_0%] min-w-0 rounded-[1rem] border border-white/45 shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative flex flex-col p-[18px] gap-3 select-none backdrop-blur-[10px] transition-all duration-300 hover:border-white/70 hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] max-sm:h-auto max-sm:min-h-0 max-sm:flex-[1_1_auto] max-sm:p-3.5 max-sm:gap-2 group/card"
                ref={setCardRef(idx)}
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="font-sans font-semibold text-[1.25rem] tracking-tight text-white max-sm:text-[1.1rem]">{item.label}</div>
                <div className="mt-auto flex flex-col gap-1.5 max-sm:flex-row max-sm:flex-wrap max-sm:gap-2.5 max-sm:mt-1">
                  {item.links?.map((lnk, i) => (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="font-mono text-[0.9rem] font-semibold text-inherit opacity-80 cursor-pointer no-underline inline-flex items-center gap-1.5 w-fit transition-all duration-250 hover:opacity-100 hover:translate-x-[2px] max-sm:text-[0.85rem] max-sm:bg-white/40 max-sm:px-2.5 max-sm:py-1 max-sm:rounded-[0.75rem] max-sm:border max-sm:border-white/30 max-sm:hover:transform-none max-sm:hover:bg-white/60 group/link"
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                      onClick={(e) => handleLinkClick(e, lnk.href)}
                    >
                      <ArrowUpRight className="opacity-50 transition-all duration-250 group-hover/link:opacity-100 group-hover/link:translate-x-[1px] group-hover/link:-translate-y-[1px]" aria-hidden="true" size={16} />
                      {lnk.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
      <ConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CardNav;

