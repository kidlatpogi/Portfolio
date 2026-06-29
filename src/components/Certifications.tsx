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
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-[#f8f8f8] py-16 md:py-0">
      
      {/* Centering layout styles, viewport offsets, and scrollbar removal */}
      <style>{`
        #certifications {
          --card-width-cert: 420px;
          --card-width-badge: 220px;
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
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-between pt-12 md:pt-20 pb-12 md:pb-16 z-30 w-full">
        
        {/* Section Header */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-start z-10 flex-shrink-0 mb-8 md:mb-0">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] mb-2">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none">
            Certification and Badges
          </h2>
        </div>

        {/* Double Track Container */}
        <div className="flex flex-col gap-10 md:gap-12 w-full justify-center flex-grow md:flex-grow-0 my-auto">
          
          {/* Row 1: Certifications (Translates Left on Desktop, Swipeable on Mobile) */}
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <div 
              ref={track1Ref} 
              className="track-container track-container-1 flex flex-row gap-6 md:gap-10 items-center w-max will-change-transform z-10"
            >
              {certificationsData.map((cert, index) => (
                <div 
                  key={index} 
                  className="w-[280px] md:w-[320px] lg:w-[360px] xl:w-[420px] flex-shrink-0 h-[150px] md:h-[170px] lg:h-[190px] relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer"
                >
                  {/* Decorative Subtle Left Accent Bar */}
                  <div 
                    style={{ backgroundColor: cert.color }} 
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                  />
                  
                  {/* Translucent Index Number */}
                  <span className="absolute right-6 top-3 text-slate-100 font-sans text-6xl md:text-7xl font-black tracking-tighter select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:text-slate-200/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Issuer + Title Info */}
                  <div className="flex flex-col gap-1.5 z-10 pr-12">
                    <span 
                      style={{ color: cert.color }} 
                      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider"
                    >
                      {cert.issuer}
                    </span>
                    <h3 className="font-sans text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 pr-4">
                      {cert.title}
                    </h3>
                  </div>

                  {/* ID + Date Footer */}
                  <div className="flex justify-between items-center z-10 border-t border-slate-100 pt-3 mt-2">
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-400 font-semibold tracking-wider">
                      ID: {cert.id}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-full uppercase">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Badges (Translates Right on Desktop, Swipeable on Mobile) */}
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <div 
              ref={track2Ref} 
              className="track-container track-container-2 flex flex-row gap-6 md:gap-10 items-center w-max will-change-transform z-10"
            >
              {badgesData.map((badge, index) => (
                <div 
                  key={index} 
                  className="w-[180px] md:w-[200px] lg:w-[220px] flex-shrink-0 h-[150px] md:h-[170px] lg:h-[190px] relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between p-5 cursor-pointer text-center items-center justify-center"
                >
                  {/* Badge Shield Background Emblem */}
                  <div 
                    style={{ borderColor: `${badge.color}20`, backgroundColor: `${badge.color}08` }} 
                    className="absolute inset-0 m-4 border border-dashed rounded-xl pointer-events-none group-hover:scale-[1.03] transition-transform duration-500"
                  />

                  {/* Translucent Index Number */}
                  <span className="absolute right-4 top-2 text-slate-100 font-sans text-5xl font-black tracking-tighter select-none pointer-events-none group-hover:text-slate-200/50">
                    B{index + 1}
                  </span>

                  {/* Badge Icon Emblem */}
                  <div 
                    style={{ backgroundColor: badge.color }} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-mono text-xs md:text-sm font-bold tracking-wider shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 z-10"
                  >
                    {badge.initials}
                  </div>

                  {/* Badge Info */}
                  <div className="flex flex-col gap-1 z-10 mt-3">
                    <h3 className="font-sans text-xs md:text-sm font-bold text-slate-800 tracking-tight leading-tight group-hover:text-accent transition-colors duration-300 px-2 line-clamp-2">
                      {badge.name}
                    </h3>
                    <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      {badge.issuer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Spacer / Bottom Alignment Helper */}
        <div className="w-full flex-shrink-0 md:h-8" />
        
      </div>

      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
