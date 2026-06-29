import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShapeGrid from './ShapeGrid.tsx';

gsap.registerPlugin(ScrollTrigger);

const certificationsData = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    id: "AWS-CCP-12345",
    color: "#C44900" // Burnt Orange
  },
  {
    title: "Google IT Support Professional",
    issuer: "Google Career Certificates",
    date: "2023",
    id: "GOOG-ITSP-67890",
    color: "#4285F4" // Google Blue
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta Professional Certificates",
    date: "2023",
    id: "META-FED-11223",
    color: "#0668E1" // Meta Blue
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    id: "FCC-RWD-33445",
    color: "#2EC866" // Green
  },
  {
    title: "JavaScript Algorithms & DS",
    issuer: "freeCodeCamp",
    date: "2023",
    id: "FCC-JSD-55667",
    color: "#FF9900" // Orange-yellow
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google Career Certificates",
    date: "2023",
    id: "GOOG-UXD-88990",
    color: "#EA4335" // Google Red
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    id: "AWS-CDA-44556",
    color: "#FF9900"
  },
  {
    title: "Cisco Networking Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023",
    id: "CISCO-NE-77889",
    color: "#00b4d8" // Cisco Cyan
  },
  {
    title: "Scrum Foundation Professional",
    issuer: "CertiProf Professional",
    date: "2023",
    id: "CP-SFP-99001",
    color: "#00F2FE"
  },
  {
    title: "EF SET English (C2 Proficient)",
    issuer: "EF Education First",
    date: "2022",
    id: "EFSET-C2-22334",
    color: "#800080" // Purple
  }
];

const badgesData = [
  {
    name: "Google Cloud Essentials",
    issuer: "Google Cloud",
    date: "2023",
    initials: "GCP",
    color: "#34A853" // Google Green
  },
  {
    name: "AWS Cloud Quest: Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    initials: "AWS",
    color: "#FF9900"
  },
  {
    name: "Python for Data Science",
    issuer: "IBM Skills Network",
    date: "2023",
    initials: "IBM",
    color: "#052FAD" // IBM Blue
  },
  {
    name: "GitHub Global Campus",
    issuer: "GitHub Education",
    date: "2022",
    initials: "GIT",
    color: "#24292F"
  },
  {
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    date: "2023",
    initials: "HR",
    color: "#2EC866"
  },
  {
    name: "OCI Foundations Associate",
    issuer: "Oracle University",
    date: "2023",
    initials: "OCI",
    color: "#F20F0F" // Oracle Red
  },
  {
    name: "React Developer Badge",
    issuer: "Meta Careers",
    date: "2023",
    initials: "MDB",
    color: "#0668E1"
  },
  {
    name: "Docker Foundations",
    issuer: "Docker Inc",
    date: "2024",
    initials: "DKR",
    color: "#2496ED" // Docker Blue
  }
];

// Helper Component: Renders a miniature high-fidelity mockup document for Certificates
const CertificateMock: React.FC<{ color: string; title: string; issuer: string; id: string }> = ({ color, title, issuer, id }) => {
  return (
    <div className="w-full aspect-[1.6/1] bg-slate-50 border-2 border-slate-200 rounded-xl relative overflow-hidden flex flex-col justify-between p-4 shadow-inner select-none">
      {/* Elegant Border Inset */}
      <div className="absolute inset-1.5 border border-slate-200 pointer-events-none rounded-lg" />
      
      {/* Certificate Header Accent */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-[6px] font-mono tracking-widest text-slate-400 uppercase">CERTIFICATE OF ACHIEVEMENT</span>
          <span className="text-[5px] font-sans font-bold text-slate-500">{issuer}</span>
        </div>
        <div style={{ backgroundColor: color }} className="w-2 h-2 rounded-full opacity-80" />
      </div>

      {/* Certificate Body Lines */}
      <div className="flex flex-col items-center justify-center my-auto z-10 gap-0.5 text-center">
        <span className="text-[4px] font-sans text-slate-400 italic">This is to certify that</span>
        <span className="text-[8px] font-clash-semibold font-bold text-slate-800 tracking-wide uppercase leading-none my-0.5">ZEUS ANGELO BAUTISTA</span>
        <span className="text-[4px] font-sans text-slate-400 leading-none">has successfully met all requirements for</span>
        <span style={{ color: color }} className="text-[6px] font-sans font-bold tracking-tight px-1 text-center line-clamp-1 mt-0.5">{title}</span>
      </div>

      {/* Certificate Footer with Seal & Signatures */}
      <div className="flex justify-between items-end z-10 text-[4px] font-mono text-slate-400 leading-none">
        <div className="flex flex-col">
          <div className="w-5 h-[0.5px] bg-slate-300 mb-0.5" />
          <span>SIGNATURE</span>
        </div>
        
        {/* Golden/Accent Seal */}
        <div style={{ backgroundColor: color }} className="w-5 h-5 rounded-full flex items-center justify-center border border-white/50 shadow-sm relative rotate-12">
          {/* Ribbons */}
          <div style={{ borderLeftColor: color, borderRightColor: color }} className="absolute bottom-[-3px] w-3 h-2 border-l-3 border-r-3 border-t-3 border-t-transparent opacity-60" />
          <span className="text-white text-[3.5px] font-bold">SEAL</span>
        </div>

        <div className="flex flex-col items-end">
          <div className="w-5 h-[0.5px] bg-slate-300 mb-0.5" />
          <span>CREDENTIAL</span>
        </div>
      </div>
    </div>
  );
};

// Helper Component: Renders a miniature high-fidelity mockup shield/badge for Badges
const BadgeMock: React.FC<{ color: string; initials: string }> = ({ color, initials }) => {
  return (
    <div className="w-full aspect-[1.4/1] bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center p-2 shadow-inner select-none">
      {/* Decorative Dashed Ring */}
      <div className="absolute inset-1.5 border border-dashed border-slate-300 rounded-full" />
      
      {/* Center Shield/Emblem */}
      <div 
        style={{ 
          background: `radial-gradient(circle, ${color} 0%, ${color}dd 70%, ${color}aa 100%)`,
          boxShadow: `0 4px 8px -2px ${color}40`
        }} 
        className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-white text-white relative z-10 shadow-sm transition-transform duration-500 group-hover:scale-105"
      >
        <span className="font-mono text-xs font-black tracking-wider leading-none drop-shadow-sm">{initials}</span>
        <span className="text-[4px] tracking-widest text-white/80 uppercase font-bold mt-0.5">VERIFIED</span>
      </div>

      {/* Decorative Corner Dots */}
      <div className="absolute top-1 left-1 w-0.5 h-0.5 rounded-full bg-slate-300" />
      <div className="absolute top-1 right-1 w-0.5 h-0.5 rounded-full bg-slate-300" />
      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 rounded-full bg-slate-300" />
      <div className="absolute bottom-1 right-1 w-0.5 h-0.5 rounded-full bg-slate-300" />
    </div>
  );
};

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Pinned dual track animation on screens >= 768px (Desktop/Tablet)
      mm.add("(min-width: 768px)", () => {
        if (!track1Ref.current || !track2Ref.current || !containerRef.current) return;

        const scrollWidth1 = track1Ref.current.scrollWidth;
        const scrollWidth2 = track2Ref.current.scrollWidth;

        // Translation offset calculation
        const trans1 = -(scrollWidth1 - window.innerWidth);
        const trans2 = -(scrollWidth2 - window.innerWidth);

        // Maximum scroll distance based on the longer track
        const scrollDuration = Math.max(scrollWidth1, scrollWidth2) - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${scrollDuration}`,
            invalidateOnRefresh: true
          }
        });

        // Row 1 (Certifications) scrolls left
        tl.fromTo(
          track1Ref.current,
          { x: 0 },
          { x: trans1, ease: 'none' },
          0
        );

        // Row 2 (Badges) scrolls right (starts offset left and moves back to 0)
        tl.fromTo(
          track2Ref.current,
          { x: trans2 },
          { x: 0, ease: 'none' },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-[#f8f8f8] py-12 md:py-0">
      
      {/* Centering layout styles, viewport offsets, and scrollbar removal */}
      <style>{`
        #certifications {
          --card-width-cert: 420px;
          --card-width-badge: 240px;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #certifications {
            --card-width-cert: 320px;
            --card-width-badge: 180px;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          #certifications {
            --card-width-cert: 360px;
            --card-width-badge: 200px;
          }
        }

        #certifications,
        #certifications * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        #certifications::-webkit-scrollbar,
        #certifications *::-webkit-scrollbar {
          display: none !important;
        }

        #certifications .track-container {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        @media (min-width: 768px) {
          #certifications .track-container-1 {
            padding-left: calc(50vw - (var(--card-width-cert) / 2)) !important;
            padding-right: calc(50vw - (var(--card-width-cert) / 2)) !important;
          }
          #certifications .track-container-2 {
            padding-left: calc(50vw - (var(--card-width-badge) / 2)) !important;
            padding-right: calc(50vw - (var(--card-width-badge) / 2)) !important;
          }
        }
      `}</style>

      {/* Interactive Background ShapeGrid */}
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

      {/* Desktop layout: sticky full-height screen. Mobile: natural vertical stack */}
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-16 md:py-24 z-30 w-full">
        
        {/* Section Header - Centered */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center z-10 flex-shrink-0 mb-10 md:mb-14">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none text-center">
            Certification and Badges
          </h2>
        </div>

        {/* Double Track Container */}
        <div className="flex flex-col gap-10 md:gap-14 w-full justify-center">
          
          {/* Row 1: Certifications (Translates Left on Desktop, Swipeable on Mobile) */}
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <div 
              ref={track1Ref} 
              className="track-container track-container-1 flex flex-row gap-6 md:gap-10 items-start w-max will-change-transform z-10"
            >
              {certificationsData.map((cert, index) => (
                <div 
                  key={index} 
                  className="w-[280px] md:w-[320px] lg:w-[360px] xl:w-[420px] flex-shrink-0 relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 cursor-pointer"
                >
                  {/* Miniature Mock Image of the Certificate */}
                  <div className="w-full relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 mb-4 transition-transform duration-500 group-hover:scale-[1.02]">
                    <CertificateMock color={cert.color} title={cert.title} issuer={cert.issuer} id={cert.id} />
                  </div>

                  {/* Metadata Row below the Image */}
                  <div className="flex justify-between items-center mb-1.5 pt-1">
                    <span 
                      style={{ color: cert.color }} 
                      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider"
                    >
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-full uppercase">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title of the Certificate */}
                  <h3 className="font-sans text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left line-clamp-2 min-h-[40px] md:min-h-[48px]">
                    {cert.title}
                  </h3>

                  {/* Verifiable ID */}
                  <span className="font-mono text-[9px] md:text-[10px] text-slate-400 font-semibold tracking-wider text-left border-t border-slate-100 pt-3 mt-3">
                    ID: {cert.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Badges (Translates Right on Desktop, Swipeable on Mobile) */}
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <div 
              ref={track2Ref} 
              className="track-container track-container-2 flex flex-row gap-6 md:gap-10 items-start w-max will-change-transform z-10"
            >
              {badgesData.map((badge, index) => (
                <div 
                  key={index} 
                  className="w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] flex-shrink-0 relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-4 cursor-pointer text-center items-center"
                >
                  {/* Miniature Mock Image of the Badge */}
                  <div className="w-full relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 mb-4 transition-transform duration-500 group-hover:scale-[1.02] flex items-center justify-center bg-slate-50">
                    <BadgeMock color={badge.color} initials={badge.initials} />
                  </div>

                  {/* Metadata Row below the Image */}
                  <div className="flex flex-col gap-1 items-center justify-center mb-1.5 w-full pt-1">
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {badge.issuer}
                    </span>
                    <span className="font-mono text-[8px] md:text-[9px] text-slate-500 font-bold bg-slate-100/80 px-2 py-0.5 rounded-full uppercase">
                      {badge.date}
                    </span>
                  </div>

                  {/* Title/Name of the Badge */}
                  <h3 className="font-sans text-xs md:text-sm font-bold text-slate-800 tracking-tight leading-tight group-hover:text-accent transition-colors duration-300 px-1 line-clamp-2 min-h-[30px] md:min-h-[36px]">
                    {badge.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

        </div>
        
      </div>

      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
