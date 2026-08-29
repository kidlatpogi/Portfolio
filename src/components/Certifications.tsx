import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, CheckCircle2, ShieldCheck, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const badgeVerifyUrls = {
  webDevelopmentFundamentals: "https://www.credly.com/badges/61fe2198-4c4b-4a50-b46a-7f61c3608ca4/public_url",
  htmlEssentials: "https://www.credly.com/badges/c181fe6c-0331-41ee-8267-2704db662491/public_url",
  cssEssentials: "https://www.credly.com/badges/1aebcc96-3fa1-4963-bfa5-7cf05f935f1a/public_url",
  javascriptEssentials1: "https://www.credly.com/badges/1fe5fb6c-cb23-42e6-9fd6-cbfe88719ce3/public_url",
  javascriptEssentials2: "https://www.credly.com/badges/e8838ee2-78d1-4db8-8422-799ffb738e4a/public_url",
  vertexAiPromptDesign: "https://www.cloudskillsboost.google/public_profiles/80e9275a-4b9d-47be-a56e-6fe130fe300c/badges/14841961",
  ciscoAcademyYear: "https://www.credly.com/organizations/cisco/badges",
  devOps101: "https://simpli-web.app.link/e/E14x8Xg6bRb",
  introCloudComputing: "https://simpli-web.app.link/e/Gf8Zq0wcbRb",
  gitTraining: "https://simpli-web.app.link/e/i0i5iC0hbRb",
  htmlCssSpecialist: "https://www.credly.com/badges/632488a0-7b56-4c9f-b98f-07e03aaec46c/public_url",
  databasesSpecialist: "https://www.credly.com/badges/e05b5efb-6401-4475-b695-177ee13bbf7a/public_url",
  responsiveWebDesign: "https://www.freecodecamp.org/certification/Zeus_Angelo_Bautista/responsive-web-design"
};

const certificationsData = [
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Dec 2024",
    skills: ["Client-Server Architecture", "Web Protocols", "Frontend Development"],
    color: "#0891b2",
    image: "https://zeusbautista.site/Certifications/Web%20Development%20Fundamentals%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Web%20Development%20Fundamentals%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.webDevelopmentFundamentals
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "Aug 2024",
    skills: ["HTML5", "Document Structure", "Web Accessibility", "SEO Basics"],
    color: "#dc2626",
    image: "https://zeusbautista.site/Certifications/HTML%20Essentials%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/HTML%20Essentials%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.htmlEssentials
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco Networking Academy",
    date: "Aug 2024",
    skills: ["CSS3", "Flexbox & Grid", "Responsive Design", "Animations"],
    color: "#0ea5e9",
    image: "https://zeusbautista.site/Certifications/CSS%20Essentials%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/CSS%20Essentials%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.cssEssentials
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Aug 2024",
    skills: ["JS Basics", "Control Flow", "Functions", "DOM Manipulation"],
    color: "#ca8a04",
    image: "https://zeusbautista.site/Certifications/JavaScript%20Essentials%201%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/JavaScript%20Essentials%201%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials1
  },
  {
    title: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Sep 2024",
    skills: ["OOP", "Async JS", "Promises & APIs", "Error Handling"],
    color: "#eab308",
    image: "https://zeusbautista.site/Certifications/JavaScript%20Essentials%202%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/JavaScript%20Essentials%202%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials2
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    date: "Feb 2025",
    skills: ["Vertex AI", "Prompt Engineering", "LLM Evaluation", "GenAI"],
    color: "#4285f4",
    image: "https://zeusbautista.site/Certifications/Prompt%20Design%20in%20Vertex%20AI%20Skill%20Badge%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Prompt%20Design%20in%20Vertex%20AI%20Skill%20Badge%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.vertexAiPromptDesign
  },
  {
    title: "DevOps 101",
    issuer: "Simplilearn SkillUp",
    date: "Feb 2025",
    skills: ["DevOps Lifecycle", "CI/CD Concepts", "Automation"],
    color: "#ea580c",
    image: "https://zeusbautista.site/Certifications/DevOps%20101%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/DevOps%20101%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.devOps101,
    actionLabel: "Verify Certificate"
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "Simplilearn SkillUp",
    date: "Feb 2025",
    skills: ["Cloud Concepts", "IaaS / PaaS / SaaS", "Virtualization"],
    color: "#0284c7",
    image: "https://zeusbautista.site/Certifications/Introduction%20to%20Cloud%20Computing%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Introduction%20to%20Cloud%20Computing%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.introCloudComputing,
    actionLabel: "Verify Certificate"
  },
  {
    title: "Git Training",
    issuer: "Simplilearn SkillUp",
    date: "Feb 2025",
    skills: ["Git", "Version Control", "GitHub Workflows", "Branching"],
    color: "#f97316",
    image: "https://zeusbautista.site/Certifications/Git%20Training%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Git%20Training%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.gitTraining,
    actionLabel: "Verify Certificate"
  },
  {
    title: "HTML and CSS",
    issuer: "IT Specialist (Certiport)",
    date: "Aug 2024",
    skills: ["Modern HTML5", "Responsive CSS3", "Web Layouts"],
    color: "#059669",
    image: "https://zeusbautista.site/Certifications/Information%20Technology%20Specialist%20-%20HTML%20and%20CSS.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Information%20Technology%20Specialist%20-%20HTML%20and%20CSS.webp",
    verifyUrl: badgeVerifyUrls.htmlCssSpecialist
  },
  {
    title: "Databases",
    issuer: "IT Specialist (Certiport)",
    date: "Aug 2024",
    skills: ["Database Design", "SQL Queries", "Relational Models", "Indexes"],
    color: "#7c3aed",
    image: "https://zeusbautista.site/Certifications/Information%20Technology%20Specialist%20-%20Databases.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Information%20Technology%20Specialist%20-%20Databases.webp",
    verifyUrl: badgeVerifyUrls.databasesSpecialist
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Feb 2024",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design"],
    color: "#0a0a23",
    image: "https://zeusbautista.site/Certifications/Responsive%20Web%20Design%20Certificate.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Responsive%20Web%20Design%20Certificate.webp",
    verifyUrl: badgeVerifyUrls.responsiveWebDesign,
    actionLabel: "Verify Certificate"
  }
];

interface SelectedItem {
  type: 'cert' | 'badge';
  title?: string;
  name?: string;
  issuer: string;
  date?: string;
  skills?: string[];
  color: string;
  image?: string;
  backupImage?: string;
  verifyUrl: string;
  actionLabel?: string;
  description?: string;
}

const badgesData = [
  {
    name: "Information Technology Specialist - HTML and CSS",
    issuer: "Certiport",
    date: "Verified",
    initials: "HTML",
    color: "#059669",
    image: "https://zeusbautista.site/Badges/information-technology-specialist-html-and-css.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/information-technology-specialist-html-and-css.webp",
    verifyUrl: badgeVerifyUrls.htmlCssSpecialist
  },
  {
    name: "Information Technology Specialist - Databases",
    issuer: "Certiport",
    date: "Verified",
    initials: "DB",
    color: "#7c3aed",
    image: "https://zeusbautista.site/Badges/information-technology-specialist-databases.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/information-technology-specialist-databases.webp",
    verifyUrl: badgeVerifyUrls.databasesSpecialist
  },
  {
    name: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Verified",
    initials: "WEB",
    color: "#0891b2",
    image: "https://zeusbautista.site/Badges/web-development-fundamentals.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/web-development-fundamentals.webp",
    verifyUrl: badgeVerifyUrls.webDevelopmentFundamentals
  },
  {
    name: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    initials: "HTML",
    color: "#dc2626",
    image: "https://zeusbautista.site/Badges/html-essentials.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/html-essentials.webp",
    verifyUrl: badgeVerifyUrls.htmlEssentials
  },
  {
    name: "CSS Essentials",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    initials: "CSS",
    color: "#0ea5e9",
    image: "https://zeusbautista.site/Badges/css-essentials.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/css-essentials.webp",
    verifyUrl: badgeVerifyUrls.cssEssentials
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    initials: "JS1",
    color: "#ca8a04",
    image: "https://zeusbautista.site/Badges/javascript-essentials-1.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/javascript-essentials-1.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials1
  },
  {
    name: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    initials: "JS2",
    color: "#eab308",
    image: "https://zeusbautista.site/Badges/javascript-essentials-2.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/javascript-essentials-2.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials2
  },
  {
    name: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    date: "Verified",
    initials: "AI",
    color: "#4285f4",
    image: "https://zeusbautista.site/Badges/prompt-design-in-vertex-ai-skill-badge.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/prompt-design-in-vertex-ai-skill-badge.webp",
    verifyUrl: badgeVerifyUrls.vertexAiPromptDesign
  }
];

function CredentialImage({
  src,
  fallbackSrc,
  alt,
  className,
  loading = "lazy"
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => ScrollTrigger.refresh()}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.src !== fallbackSrc) {
          image.src = fallbackSrc;
        }
      }}
      className={className}
    />
  );
}

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const certScrollPinnedContainerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const badgesContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
    };

    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  useEffect(() => {
    const island = containerRef.current?.parentElement;
    if (island?.tagName === 'ASTRO-ISLAND') {
      island.style.display = 'block';
      island.style.width = '100%';
    }

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Mobile: keep fade-in for certs
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".cert-grid-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Desktop: Horizontal pin scroll for certs
      mm.add("(min-width: 768px)", () => {
        if (!row1Ref.current || !row2Ref.current || !certScrollPinnedContainerRef.current) return;

        const getScrollAmt = () => {
          if (!row1Ref.current || !row2Ref.current) return 600;
          const maxRowWidth = Math.max(row1Ref.current.scrollWidth, row2Ref.current.scrollWidth);
          const scrollAmt = maxRowWidth - window.innerWidth + 80;
          return Math.max(scrollAmt, 600);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: certScrollPinnedContainerRef.current,
            pin: true,
            scrub: 0.3,
            start: 'top top',
            end: () => `+=${getScrollAmt()}`,
            invalidateOnRefresh: true,
            anticipatePin: 0
          }
        });

        tl.to(row1Ref.current, {
          x: () => -getScrollAmt(),
          ease: 'none',
          force3D: true
        }, 0);

        tl.to(row2Ref.current, {
          x: () => getScrollAmt(),
          ease: 'none',
          force3D: true
        }, 0);
      });

      gsap.fromTo(
        ".badge-emblem-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgesContainerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-transparent py-6 md:py-0 z-10">
      <style>{`
        #certifications {
          --cert-card-width: 340px;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #certifications { --cert-card-width: 250px; }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          #certifications { --cert-card-width: 275px; }
        }
        @media (min-width: 1280px) and (max-width: 1535px) {
          #certifications { --cert-card-width: 300px; }
        }
        /* Height-based corrections for smaller laptops */
        @media (min-width: 768px) and (max-height: 800px) {
          #certifications { --cert-card-width: 240px; }
        }
        @media (min-width: 1024px) and (max-height: 800px) {
          #certifications { --cert-card-width: 250px; }
        }
        @media (min-width: 1280px) and (max-height: 800px) {
          #certifications { --cert-card-width: 270px; }
        }
        @media (min-width: 1536px) and (max-height: 900px) {
          #certifications { --cert-card-width: 300px; }
        }

        #certifications,\n        #certifications * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        #certifications::-webkit-scrollbar,
        #certifications *::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>

      {/* On Desktop: Sticky full-screen view (100vh). On Mobile: static relative view */}
      <div ref={certScrollPinnedContainerRef} className="certifications-desktop-container relative md:h-screen md:overflow-hidden flex flex-col justify-center py-12 md:py-4 z-10">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center mb-10 sm:mb-16 md:mb-6 flex-shrink-0">
          <span className="font-array-semibold text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-1.5">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[3.75rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Certifications
          </h2>
        </div>

        {/* Mobile View: Dynamic 2-Column Grid */}
        <div className="block md:hidden px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full">
            {certificationsData.map((cert) => (
              <div
                key={`mobile-${cert.title}`}
                onClick={() => setSelectedItem({ type: 'cert', ...cert })}
                className="cert-grid-item w-full relative group overflow-hidden border border-slate-200 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-3 sm:p-5 cursor-pointer"
              >
                <div className="cursor-target w-full aspect-[1.6/1] relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-200/70 mb-2.5 sm:mb-4 bg-white flex items-center justify-center">
                  {cert.image ? (
                    <CredentialImage
                      src={cert.image}
                      fallbackSrc={cert.backupImage}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-mono text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center p-1">
                      {cert.title}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center gap-1.5 sm:gap-3 mb-1 pt-0.5">
                  <span style={{ color: cert.color }} className="font-mono text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider truncate">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[7px] sm:text-[9px] md:text-[10px] text-slate-500 font-bold bg-slate-100/80 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase shrink-0">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-sans text-xs sm:text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left line-clamp-2 min-h-[32px] sm:min-h-[48px] mb-2 sm:mb-4">
                  {cert.title}
                </h3>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`${cert.actionLabel || 'Verify Credential'} for ${cert.title}`}
                  className="mt-auto w-full flex items-center justify-center gap-1 py-1.5 px-2 sm:py-2 sm:px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold text-slate-600 transition-all duration-300 z-10 truncate"
                >
                  <span className="truncate">{cert.actionLabel || "Verify Credential"}</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll rows - Desktop */}
        <div className="hidden md:flex flex-col gap-5 w-full overflow-hidden">
          {/* Row 1 - scrolling left */}
          <div
            ref={row1Ref}
            className="flex items-center gap-8 will-change-transform pl-[10vw] pr-[10vw] w-max"
            style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
          >
            {certificationsData.slice(0, 6).map((cert) => (
              <div
                key={`desktop-row1-${cert.title}`}
                onClick={() => setSelectedItem({ type: 'cert', ...cert })}
                className="cert-grid-item w-[var(--cert-card-width)] flex-shrink-0 relative group overflow-hidden border border-slate-200/90 bg-white rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-4 cursor-pointer"
              >
                <div className="cursor-target w-full aspect-[1.6/1] relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-200/70 mb-3 bg-white flex items-center justify-center">
                  {cert.image ? (
                    <CredentialImage
                      src={cert.image}
                      fallbackSrc={cert.backupImage}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-mono text-slate-400 text-sm font-bold uppercase tracking-wider">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center gap-3 mb-1.5 pt-1">
                  <span style={{ color: cert.color }} className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-slate-500 font-bold bg-slate-100/80 px-2 py-0.5 rounded-full uppercase shrink-0">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-sans text-xs md:text-[13px] lg:text-sm font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left md:min-h-0 md:max-h-[36px] overflow-hidden line-clamp-2 md:mb-1">
                  {cert.title}
                </h3>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`${cert.actionLabel || 'Verify Credential'} for ${cert.title}`}
                  className="mt-auto w-full md:hidden items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-xl text-xs font-semibold text-slate-600 transition-all duration-300 z-10"
                >
                  <span>{cert.actionLabel || "Verify Credential"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Row 2 - scrolling right */}
          <div
            ref={row2Ref}
            className="flex items-center gap-8 will-change-transform pl-[10vw] pr-[10vw] w-max self-end"
            style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
          >
            {certificationsData.slice(6, 12).map((cert) => (
              <div
                key={`desktop-row2-${cert.title}`}
                onClick={() => setSelectedItem({ type: 'cert', ...cert })}
                className="cert-grid-item w-[var(--cert-card-width)] flex-shrink-0 relative group overflow-hidden border border-slate-200/90 bg-white rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-4 cursor-pointer"
              >
                <div className="cursor-target w-full aspect-[1.6/1] relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-200/70 mb-3 bg-white flex items-center justify-center">
                  {cert.image ? (
                    <CredentialImage
                      src={cert.image}
                      fallbackSrc={cert.backupImage}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-mono text-slate-400 text-sm font-bold uppercase tracking-wider">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center gap-3 mb-1.5 pt-1">
                  <span style={{ color: cert.color }} className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-slate-500 font-bold bg-slate-100/80 px-2 py-0.5 rounded-full uppercase shrink-0">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-sans text-xs md:text-[13px] lg:text-sm font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left md:min-h-0 md:max-h-[36px] overflow-hidden line-clamp-2 md:mb-1">
                  {cert.title}
                </h3>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`${cert.actionLabel || 'Verify Credential'} for ${cert.title}`}
                  className="mt-auto w-full md:hidden items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-xl text-xs font-semibold text-slate-600 transition-all duration-300 z-10"
                >
                  <span>{cert.actionLabel || "Verify Credential"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Section directly follows Certifications with natural clean spacing */}
      <div ref={badgesContainerRef} className="relative z-10 w-full flex flex-col justify-center items-center py-12 md:py-16 md:min-h-screen overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center mb-8 md:mb-8 flex-shrink-0">
          <span className="font-array-semibold text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-1.5">
            Skill Endorsements
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[3.75rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Badges
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center items-stretch w-full max-w-[1300px] mx-auto px-6 md:px-24">
          {badgesData.map((badge, index) => (
            <div
              key={badge.name}
              onClick={() => setSelectedItem({ type: 'badge', ...badge })}
              className="badge-emblem-card cursor-target relative group flex flex-col items-center justify-between bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer p-4 sm:p-5 rounded-2xl min-h-[210px] text-center"
            >
              <a
                href={badge.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                aria-label={`Verify ${badge.name} badge`}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-accent transition-colors duration-300 z-10 p-1 bg-white/80 hover:bg-white rounded-full shadow-sm"
                title="Verify Badge"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="w-full aspect-square max-w-[132px] sm:max-w-[148px] mb-3 flex items-center justify-center">
                <CredentialImage
                  src={badge.image}
                  fallbackSrc={badge.backupImage}
                  alt={`${badge.name} badge`}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col items-center w-full mt-auto">
                <span style={{ color: badge.color }} className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1">
                  {badge.issuer}
                </span>
                <h3 className="font-sans text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2">
                  {badge.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification & Detail Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {selectedItem.image && (
                <div className={`w-full ${selectedItem.type === 'badge' ? 'max-w-[180px] aspect-square' : 'aspect-[1.6/1]'} rounded-xl overflow-hidden mb-5 border border-slate-100 shadow-sm flex items-center justify-center bg-slate-50`}>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title || selectedItem.name || 'Credential'}
                    className={`w-full h-full ${selectedItem.type === 'badge' ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
              )}

              <span
                style={{ color: selectedItem.color }}
                className="font-mono text-xs font-bold uppercase tracking-wider mb-1"
              >
                {selectedItem.issuer}
              </span>

              <h3 className="font-sans text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {selectedItem.title || selectedItem.name}
              </h3>

              {selectedItem.date && (
                <span className="font-mono text-xs text-slate-400 mb-4">
                  Issued: {selectedItem.date}
                </span>
              )}

              {selectedItem.skills && selectedItem.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                  {selectedItem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={selectedItem.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent hover:bg-accent/90 text-white font-sans font-semibold rounded-xl transition-colors shadow-sm"
              >
                <span>{selectedItem.actionLabel || "Verify on Official Issuer"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
