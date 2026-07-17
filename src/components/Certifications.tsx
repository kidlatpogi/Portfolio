import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X } from 'lucide-react';
import ShapeGrid from './ShapeGrid.tsx';

gsap.registerPlugin(ScrollTrigger);

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  color: string;
  image: string;
  backupImage: string;
  verifyUrl: string;
  actionLabel?: string;
};

type Badge = {
  name: string;
  issuer: string;
  date: string;
  initials: string;
  color: string;
  image: string;
  backupImage: string;
  verifyUrl: string;
};

type SelectedItem = ({ type: 'cert' } & Certificate) | ({ type: 'badge' } & Badge);

const badgeVerifyUrls = {
  databases: "https://www.credly.com/badges/ec097417-e36a-4642-b03b-df96919ae380/public_url",
  htmlAndCss: "https://www.credly.com/badges/0d6ce002-6844-49de-976f-df4cd26edea0/public_url",
  webDevelopmentFundamentals: "https://www.credly.com/badges/1cce4817-3dd9-4fd5-b508-594add0cb399/public_url",
  htmlEssentials: "https://www.credly.com/badges/b67c1cd5-ad38-4666-89fd-f4cdcf974d8c/public_url",
  cssEssentials: "https://www.credly.com/badges/c1acd1ec-2db1-4b12-923b-0841a1668f38/public_url",
  javascriptEssentials1: "https://www.credly.com/badges/6dac7d87-44c6-49fa-a6cf-6c7d55904935/public_url",
  javascriptEssentials2: "https://www.credly.com/badges/83527a67-c83a-4711-a666-da79ab09933b/public_url",
  vertexAiPromptDesign: "https://www.credly.com/badges/7276c4e4-eedb-48d6-b445-bc68aa49fcd4/public_url"
};

const certificationsData: Certificate[] = [
  // ==========================================
  // 1. Cisco Networking Academy
  // ==========================================
  {
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    color: "#dc2626",
    image: "https://zeusbautista.site/Certifications/Html%20Essentials.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Html%20Essentials.webp",
    verifyUrl: badgeVerifyUrls.htmlEssentials
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    color: "#0ea5e9",
    image: "https://zeusbautista.site/Certifications/CSS%20Essentials.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/CSS%20Essentials.webp",
    verifyUrl: badgeVerifyUrls.cssEssentials
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    color: "#ca8a04",
    image: "https://zeusbautista.site/Certifications/JS%20Essentials%201.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/JS%20Essentials%201.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials1
  },
  {
    title: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Verified",
    color: "#eab308",
    image: "https://zeusbautista.site/Certifications/JS%20Essentials%202.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/JS%20Essentials%202.webp",
    verifyUrl: badgeVerifyUrls.javascriptEssentials2
  },

  // ==========================================
  // 2. IT Specialist
  // ==========================================
  {
    title: "Web Development Fundamentals",
    issuer: "IT Specialist",
    date: "Verified",
    color: "#0891b2",
    image: "https://zeusbautista.site/Certifications/Web%20Development%20Fundamentals.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Web%20Development%20Fundamentals.webp",
    verifyUrl: badgeVerifyUrls.webDevelopmentFundamentals
  },
  {
    title: "HTML and CSS",
    issuer: "IT Specialist",
    date: "Verified",
    color: "#f97316",
    image: "https://zeusbautista.site/Certifications/HTML%20and%20CSS.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/HTML%20and%20CSS.webp",
    verifyUrl: badgeVerifyUrls.htmlAndCss
  },
  {
    title: "Database",
    issuer: "IT Specialist",
    date: "Verified",
    color: "#2563eb",
    image: "https://zeusbautista.site/Certifications/Database.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Database.webp",
    verifyUrl: badgeVerifyUrls.databases
  },

  // ==========================================
  // 3. Simplilearn SkillUp
  // ==========================================
  {
    title: "Git Training",
    issuer: "Simplilearn SkillUp",
    date: "Verified",
    color: "#ef4444",
    image: "https://zeusbautista.site/Certifications/Git%20Training.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Git%20Training.webp",
    verifyUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI3NTgiLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC84NTQxODQ4Xzg4OTUyODcxNzUxMjA2MjA0MjY0LnBuZyIsInVzZXJuYW1lIjoiWmV1cyBBbmdlbG8gQmF1dGlzdGEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2823%2FGIT%2Fcertificate%2Fdownload-skillup&%24web_only=true"
  },
  {
    title: "Cloud Computing",
    issuer: "Simplilearn SkillUp",
    date: "Verified",
    color: "#f97316",
    image: "https://zeusbautista.site/Certifications/Cloud%20Computing.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Cloud%20Computing.webp",
    verifyUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNTExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU0NjQ2MF84ODk1Mjg3MTc1MTI4NTA5MTE5Ny5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F3971%2FIntroduction-to-Cloud-Computing%2Fcertificate%2Fdownload-skillup&%24web_only=true"
  },
  {
    title: "DevOps",
    issuer: "Simplilearn SkillUp",
    date: "Verified",
    color: "#7c3aed",
    image: "https://zeusbautista.site/Certifications/DevOps.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/DevOps.webp",
    verifyUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjc1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU1MjgwMF84ODk1Mjg3MTc1MTM3MjkzMzM4Mi5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6073%2FDevOps%2520101%3A%2520What%2520is%2520DevOps%253F%2Fcertificate%2Fdownload-skillup&%24web_only=true"
  },
  // ==========================================
  // 4. Freecode Camps
  // ==========================================
  {
    title: "Responsive Web Design",
    issuer: "Web Design Certification",
    date: "Verified",
    color: "#10b981",
    image: "https://zeusbautista.site/Certifications/Responsive%20Web%20Design.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Certifications/Responsive%20Web%20Design.webp",
    verifyUrl: "https://zeusbautista.site/Certifications/Responsive%20Web%20Design.webp",
    actionLabel: "View Credential"
  }
];

const badgesData: Badge[] = [
  {
    name: "IT Specialist - Databases",
    issuer: "Certiport",
    date: "Verified",
    initials: "DB",
    color: "#2563eb",
    image: "https://zeusbautista.site/Badges/it-specialist-databases.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/it-specialist-databases.webp",
    verifyUrl: badgeVerifyUrls.databases
  },
  {
    name: "IT Specialist - HTML and CSS",
    issuer: "Certiport",
    date: "Verified",
    initials: "HC",
    color: "#f97316",
    image: "https://zeusbautista.site/Badges/it-specialist-html-and-css.webp",
    backupImage: "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Badges/it-specialist-html-and-css.webp",
    verifyUrl: badgeVerifyUrls.htmlAndCss
  },
  {
    name: "Web Development Fundamentals",
    issuer: "Certiport",
    date: "Verified",
    initials: "WD",
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

const credentialDescription =
  "This credential links to the official verification page when available and uses the hosted artwork from Cloudflare R2 for the portfolio preview.";

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
  const gridRef = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
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
            trigger: gridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-[#f8f8f8] py-24 z-30 flex flex-col gap-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShapeGrid
          speed={0}
          squareSize={55}
          borderColor="rgba(51, 65, 85, 0.05)"
          hoverFillColor="rgba(51, 65, 85, 0.12)"
          shape="square"
          hoverTrailAmount={6}
          gradientColor="#f8f8f8"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center mb-16">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Certifications
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1600px] mx-auto px-6 md:px-24 justify-center items-start"
        >
          {certificationsData.map((cert, index) => (
            <div
              key={cert.title}
              onClick={() => setSelectedItem({ type: 'cert', ...cert })}
              className="cert-grid-item w-full min-h-full relative group overflow-hidden border border-slate-200 bg-white/75 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 cursor-pointer"
            >
              <div className="cursor-target w-full aspect-[1.6/1] relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-200/70 mb-4 bg-white">
                <CredentialImage
                  src={cert.image}
                  fallbackSrc={cert.backupImage}
                  alt={`${cert.title} certificate`}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex justify-between items-center gap-3 mb-1.5 pt-1">
                <span style={{ color: cert.color }} className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider truncate">
                  {cert.issuer}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-full uppercase shrink-0">
                  {cert.date}
                </span>
              </div>

              <h3 className="font-sans text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left min-h-[40px] md:min-h-[48px] mb-4">
                {cert.title}
              </h3>

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                aria-label={`${cert.actionLabel || 'Verify Credential'} for ${cert.title}`}
                className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-xl text-xs font-semibold text-slate-600 transition-all duration-300 z-10"
              >
                <span>{cert.actionLabel || "Verify Credential"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div ref={badgesContainerRef} className="relative z-10 w-full flex flex-col items-center pt-12">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center mb-16">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
            Skill Endorsements
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Badges
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 justify-center items-stretch w-full max-w-[1300px] mx-auto px-6 md:px-24">
          {badgesData.map((badge, index) => (
            <div
              key={badge.name}
              onClick={() => setSelectedItem({ type: 'badge', ...badge })}
              className="badge-emblem-card cursor-target relative group flex flex-col items-center justify-between bg-white/75 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm cursor-pointer p-4 sm:p-5 rounded-2xl min-h-[210px] text-center"
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

              <div className="w-full">
                <span style={{ color: badge.color }} className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                  {badge.issuer}
                </span>
                <h3 className="font-sans text-xs md:text-sm font-bold text-slate-700 mt-1 leading-snug">
                  {badge.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{ background: `radial-gradient(circle, ${selectedItem.color}15 0%, transparent 70%)` }}
            className="absolute inset-0 pointer-events-none opacity-80 blur-3xl"
          />

          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FAFAFA] border border-[#334155]/20 rounded-3xl p-6 md:p-10 text-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-in fade-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-[56%] flex items-center justify-center">
              <div className={selectedItem.type === 'cert' ? "w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg" : "w-full max-w-[320px] rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"}>
                <CredentialImage
                  src={selectedItem.image}
                  fallbackSrc={selectedItem.backupImage}
                  alt={`${selectedItem.type === 'cert' ? selectedItem.title : selectedItem.name} preview`}
                  loading="eager"
                  className={selectedItem.type === 'cert' ? "w-full h-auto object-contain" : "w-full h-auto object-contain"}
                />
              </div>
            </div>

            <div className="w-full md:w-[44%] flex flex-col justify-center">
              <span style={{ color: selectedItem.color }} className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest mb-1">
                {selectedItem.issuer}
              </span>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-tight mb-4">
                {selectedItem.type === 'cert' ? selectedItem.title : selectedItem.name}
              </h3>

              <div className="flex gap-4 mb-6">
                <div className="flex flex-col bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl">
                  <span className="text-[9px] text-[#334155]/60 font-bold font-mono uppercase tracking-wider">Status</span>
                  <span className="text-sm font-semibold text-slate-700">{selectedItem.date}</span>
                </div>
              </div>

              <p className="text-sm md:text-base text-[#334155] leading-relaxed mb-8">
                {credentialDescription}
              </p>

              <a
                href={selectedItem.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-accent text-[#FAFAFA] font-mono font-semibold tracking-wider transition-colors duration-250 cursor-pointer text-sm hover:opacity-90 w-full md:w-auto"
              >
                <span className="w-2 h-2 bg-[#FAFAFA] rounded-full" />
                <span>{selectedItem.type === 'cert' ? selectedItem.actionLabel || "Verify Credential" : "Verify Badge"}</span>
                <ExternalLink className="w-4 h-4 text-[#FAFAFA]" />
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
