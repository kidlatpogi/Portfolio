import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShapeGrid from './ShapeGrid.tsx';
import CircularGallery from './CircularGallery.tsx';

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

// Generates a self-contained SVG mockup of each badge as a Data URL for CircularGallery WebGL texturing
const generateBadgeSvgUrl = (color: string, initials: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" width="280" height="200">
      <rect width="280" height="200" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <rect x="12" y="12" width="256" height="176" rx="12" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,3"/>
      <!-- Decorative outer ring -->
      <circle cx="140" cy="100" r="54" fill="none" stroke="${color}20" stroke-width="6" />
      <!-- Circular Emblem -->
      <circle cx="140" cy="100" r="48" fill="${color}"/>
      <circle cx="140" cy="100" r="44" fill="none" stroke="#ffffff" stroke-width="2"/>
      <!-- Text initials -->
      <text x="140" y="98" font-family="monospace" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
      <text x="140" y="118" font-family="sans-serif" font-size="6" font-weight="bold" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="1">VERIFIED</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
};

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

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // Divide the 10 certifications into 2 equal columns (5 each)
  const col1Certs = certificationsData.filter((_, idx) => idx % 2 === 0);
  const col2Certs = certificationsData.filter((_, idx) => idx % 2 !== 0);

  // Map badgesData to items array compatible with CircularGallery
  const galleryItems = badgesData.map(badge => ({
    text: badge.name,
    image: generateBadgeSvgUrl(badge.color, badge.initials)
  }));

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Vertical columns parallax effect on screens >= 768px (Desktop/Tablet)
      mm.add("(min-width: 768px)", () => {
        if (!col1Ref.current || !col2Ref.current || !containerRef.current) return;

        // Column 1 slides up slightly
        gsap.fromTo(
          col1Ref.current,
          { y: 80 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );

        // Column 2 slides down slightly (offset starting position)
        gsap.fromTo(
          col2Ref.current,
          { y: -80 },
          {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-[#f8f8f8] py-24 md:py-32">
      
      {/* Scoped scrollbar rules */}
      <style>{`
        #certifications,
        #certifications * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        #certifications::-webkit-scrollbar,
        #certifications *::-webkit-scrollbar {
          display: none !important;
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

      {/* Section Content Container */}
      <div className="relative z-30 w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col justify-start">
        
        {/* Section Header - Centered */}
        <div className="w-full flex flex-col items-center text-center mb-16">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Certification and Badges
          </h2>
        </div>

        {/* Certificates staggered vertical parallax layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 items-start w-full">
          
          {/* Column 1: Certifications (Odd indices, 5 cards) */}
          <div ref={col1Ref} className="flex flex-col gap-6 md:gap-8 w-full">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-1 max-md:text-center">
              Certificates (Group A)
            </h3>
            {col1Certs.map((cert, index) => (
              <div 
                key={index} 
                className="w-full relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 cursor-pointer"
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

          {/* Column 2: Certifications (Even indices, 5 cards) */}
          <div ref={col2Ref} className="flex flex-col gap-6 md:gap-8 w-full md:mt-16">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-1 max-md:text-center">
              Certificates (Group B)
            </h3>
            {col2Certs.map((cert, index) => (
              <div 
                key={index} 
                className="w-full relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 cursor-pointer"
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

        {/* Circular Gallery for Verified Badges */}
        <div className="w-full relative z-10 flex flex-col items-center mt-24">
          <div className="w-full flex flex-col items-center text-center mb-8">
            <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
              Verified Badges
            </span>
            <p className="font-sans text-sm md:text-base text-slate-500 max-w-[420px] text-center">
              A 3D auto-scrolling WebGL gallery showcasing digital credentials. Drag or scroll to navigate.
            </p>
          </div>
          <div className="w-full max-w-[1200px] h-[350px] sm:h-[450px] md:h-[500px] relative overflow-hidden bg-white/40 border border-slate-200/50 rounded-3xl backdrop-blur-md shadow-sm">
            <CircularGallery
              items={galleryItems}
              bend={1.5}
              textColor="#334155"
              borderRadius={0.06}
              scrollSpeed={2}
              scrollEase={0.03}
              font="bold 12px monospace"
            />
          </div>
        </div>
        
      </div>

      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
