import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X } from 'lucide-react';
import ShapeGrid from './ShapeGrid.tsx';

gsap.registerPlugin(ScrollTrigger);

const certificationsData = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    id: "AWS-CCP-12345",
    color: "#C44900", // Burnt Orange
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    title: "Google IT Support Professional",
    issuer: "Google Career Certificates",
    date: "2023",
    id: "GOOG-ITSP-67890",
    color: "#4285F4", // Google Blue
    verifyUrl: "https://www.coursera.org/verify/professional-cert/google-it-support"
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta Professional Certificates",
    date: "2023",
    id: "META-FED-11223",
    color: "#0668E1", // Meta Blue
    verifyUrl: "https://www.coursera.org/verify/professional-cert/meta-front-end-developer"
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    id: "FCC-RWD-33445",
    color: "#2EC866", // Green
    verifyUrl: "https://www.freecodecamp.org/certification/fccdf895147-3023-455b-9d41-456b3e9444fc/responsive-web-design"
  },
  {
    title: "JavaScript Algorithms & DS",
    issuer: "freeCodeCamp",
    date: "2023",
    id: "FCC-JSD-55667",
    color: "#FF9900", // Orange-yellow
    verifyUrl: "https://www.freecodecamp.org/certification/fccdf895147-3023-455b-9d41-456b3e9444fc/javascript-algorithms-and-data-structures"
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google Career Certificates",
    date: "2023",
    id: "GOOG-UXD-88990",
    color: "#EA4335", // Google Red
    verifyUrl: "https://www.coursera.org/verify/professional-cert/google-ux-design"
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    id: "AWS-CDA-44556",
    color: "#FF9900",
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    title: "Cisco Networking Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023",
    id: "CISCO-NE-77889",
    color: "#00b4d8", // Cisco Cyan
    verifyUrl: "https://www.credly.com"
  },
  {
    title: "Scrum Foundation Professional",
    issuer: "CertiProf Professional",
    date: "2023",
    id: "CP-SFP-99001",
    color: "#00F2FE",
    verifyUrl: "https://certiprof.com/pages/scrum-foundation-professional-certificate-sfpc"
  },
  {
    title: "EF SET English (C2 Proficient)",
    issuer: "EF Education First",
    date: "2022",
    id: "EFSET-C2-22334",
    color: "#800080", // Purple
    verifyUrl: "https://www.efset.org/cert/c2-proficient"
  }
];

const badgesData = [
  {
    name: "Google Cloud Essentials",
    issuer: "Google Cloud",
    date: "2023",
    initials: "GCP",
    color: "#34A853", // Google Green
    verifyUrl: "https://www.cloudskillsboost.google"
  },
  {
    name: "AWS Cloud Quest: Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    initials: "AWS",
    color: "#FF9900",
    verifyUrl: "https://aws.amazon.com/training/pathways/quest-practitioner"
  },
  {
    name: "Python for Data Science",
    issuer: "IBM Skills Network",
    date: "2023",
    initials: "IBM",
    color: "#052FAD", // IBM Blue
    verifyUrl: "https://www.credly.com"
  },
  {
    name: "GitHub Global Campus",
    issuer: "GitHub Education",
    date: "2022",
    initials: "GIT",
    color: "#24292F",
    verifyUrl: "https://education.github.com"
  },
  {
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    date: "2023",
    initials: "HR",
    color: "#2EC866",
    verifyUrl: "https://www.hackerrank.com/certificates"
  },
  {
    name: "OCI Foundations Associate",
    issuer: "Oracle University",
    date: "2023",
    initials: "OCI",
    color: "#F20F0F", // Oracle Red
    verifyUrl: "https://education.oracle.com"
  },
  {
    name: "React Developer Badge",
    issuer: "Meta Careers",
    date: "2023",
    initials: "MDB",
    color: "#0668E1",
    verifyUrl: "https://www.coursera.org"
  },
  {
    name: "Docker Foundations",
    issuer: "Docker Inc",
    date: "2024",
    initials: "DKR",
    color: "#2496ED", // Docker Blue
    verifyUrl: "https://www.docker.com"
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
  const gridRef = useRef<HTMLDivElement>(null);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'all' | 'certs' | 'badges'>('all');

  // Modal State
  const [selectedItem, setSelectedItem] = useState<{
    type: 'cert' | 'badge';
    title?: string;
    name?: string;
    issuer: string;
    date: string;
    id?: string;
    color: string;
    initials?: string;
    verifyUrl: string;
  } | null>(null);

  // Close modal on Escape key & toggle body scroll overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
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

  // GSAP Scroll Reveal Stagger for Grid Items
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-grid-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Dynamically filter items
  const filteredItems = [
    ...(activeTab === 'all' || activeTab === 'certs'
      ? certificationsData.map(c => ({ ...c, type: 'cert' as const }))
      : []),
    ...(activeTab === 'all' || activeTab === 'badges'
      ? badgesData.map(b => ({ ...b, title: b.name, type: 'badge' as const }))
      : [])
  ];

  return (
    <section ref={containerRef} id="certifications" className="relative w-full overflow-hidden bg-[#f8f8f8] py-24 z-30">
      
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

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header - Centered */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-24 flex flex-col items-center text-center mb-12">
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-2">
            Milestones & Credentials
          </span>
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-semibold text-accent tracking-tight leading-[0.9] select-none text-center">
            Certification and Badges
          </h2>
        </div>

        {/* Tab Filter Switcher */}
        <div className="flex justify-center gap-2 md:gap-4 mb-16 px-4">
          {(['all', 'certs', 'badges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-black text-[#FAFAFA] border-black shadow-md scale-105'
                  : 'bg-white/50 text-[#334155] border-[#334155]/20 hover:border-[#334155]/40 hover:bg-white'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'certs' ? 'Certifications' : 'Badges'}
            </button>
          ))}
        </div>

        {/* Bento/Modern Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1600px] mx-auto px-6 md:px-24"
        >
          {filteredItems.map((item, index) => (
            <div 
              key={`${item.type}-${index}-${item.title}`} 
              onClick={() => setSelectedItem(item.type === 'cert' ? { type: 'cert', ...item } : { type: 'badge', ...item, name: item.title })}
              className="cert-grid-item w-full flex-shrink-0 relative group overflow-hidden border border-slate-200 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 cursor-pointer"
            >
              {item.type === 'cert' ? (
                <>
                  {/* Miniature Mock Image of the Certificate */}
                  <div className="w-full relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 mb-4 transition-transform duration-500 group-hover:scale-[1.02]">
                    <CertificateMock color={item.color} title={item.title} issuer={item.issuer} id={item.id!} />
                  </div>

                  {/* Metadata Row below the Image */}
                  <div className="flex justify-between items-center mb-1.5 pt-1">
                    <span 
                      style={{ color: item.color }} 
                      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider"
                    >
                      {item.issuer}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-full uppercase">
                      {item.date}
                    </span>
                  </div>

                  {/* Title of the Certificate */}
                  <h3 className="font-sans text-sm md:text-base lg:text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left line-clamp-2 min-h-[40px] md:min-h-[48px] mb-4">
                    {item.title}
                  </h3>

                  {/* Verify Button */}
                  <a 
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-xl text-xs font-semibold text-slate-600 transition-all duration-300 z-10"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <>
                  {/* Miniature Mock Image of the Badge */}
                  <div className="w-full relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 mb-4 transition-transform duration-500 group-hover:scale-[1.02] flex items-center justify-center bg-slate-50">
                    <BadgeMock color={item.color} initials={item.initials!} />
                  </div>

                  {/* Metadata Row below the Image */}
                  <div className="flex justify-between items-center mb-1.5 pt-1 w-full">
                    <span className="font-mono text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {item.issuer}
                    </span>
                    <span className="font-mono text-[8px] md:text-[9px] text-slate-500 font-bold bg-slate-100/80 px-2 py-0.5 rounded-full uppercase">
                      {item.date}
                    </span>
                  </div>

                  {/* Title/Name of the Badge */}
                  <h3 className="font-sans text-sm md:text-base font-bold text-slate-800 tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 text-left line-clamp-2 min-h-[40px] md:min-h-[48px] mb-4">
                    {item.title}
                  </h3>

                  {/* Verify Button */}
                  <a 
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-auto w-full flex items-center justify-center gap-1.5 py-1.5 px-3 border border-slate-200 hover:border-accent bg-white/50 hover:bg-accent hover:text-white rounded-xl text-xs font-semibold text-slate-600 transition-all duration-300 z-10"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
        
      </div>

      {/* Fullscreen Overlay Modal */}
      {selectedItem && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedItem(null)}
        >
          {/* Brand glow behind the modal */}
          <div 
            style={{ 
              background: `radial-gradient(circle, ${selectedItem.color}15 0%, transparent 70%)` 
            }}
            className="absolute inset-0 pointer-events-none opacity-80 blur-3xl"
          />

          <div 
            className="relative w-full max-w-4xl bg-[#FAFAFA] border border-[#334155]/20 rounded-3xl p-6 md:p-10 text-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Credential Image View (Left / Top) */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              {selectedItem.type === 'cert' ? (
                // Elegant large-format Certificate view
                <div className="w-full aspect-[1.6/1] bg-slate-50 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 md:p-10 shadow-lg select-none text-slate-800">
                  {/* Elegant Double Border Inset to prevent overflow border clipping */}
                  <div className="absolute inset-2 border-8 border-double border-slate-200 pointer-events-none rounded-xl" />
                  <div className="absolute inset-4 border border-slate-200 pointer-events-none rounded-lg" />
                  
                  <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-xs font-mono tracking-widest text-slate-400 uppercase">CERTIFICATE OF ACHIEVEMENT</span>
                      <span className="text-[8px] md:text-sm font-sans font-bold text-slate-500">{selectedItem.issuer}</span>
                    </div>
                    <div style={{ backgroundColor: selectedItem.color }} className="w-3.5 h-3.5 rounded-full opacity-80" />
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto z-10 gap-1.5 text-center">
                    <span className="text-[7px] md:text-[10px] font-sans text-slate-400 italic">This is to certify that</span>
                    <span className="text-[12px] md:text-xl font-bold font-sans text-slate-800 tracking-wide uppercase leading-none my-0.5">ZEUS ANGELO BAUTISTA</span>
                    <span className="text-[7px] md:text-[10px] font-sans text-slate-400 leading-none">has successfully met all requirements for</span>
                    <span style={{ color: selectedItem.color }} className="text-[10px] md:text-lg font-sans font-bold tracking-tight px-2 text-center mt-1">{selectedItem.title}</span>
                  </div>

                  <div className="flex justify-between items-end z-10 text-[7px] md:text-[10px] font-mono text-slate-400 leading-none">
                    <div className="flex flex-col items-start">
                      <span className="font-mono text-slate-600 font-bold mb-1 italic">Zeus Angelo</span>
                      <div className="w-10 md:w-16 h-[0.5px] bg-slate-300 mb-0.5" />
                      <span>SIGNATURE</span>
                    </div>
                    
                    <div style={{ backgroundColor: selectedItem.color }} className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/50 shadow-md relative rotate-12">
                      <div style={{ borderLeftColor: selectedItem.color, borderRightColor: selectedItem.color }} className="absolute bottom-[-6px] w-6 h-4 border-l-6 border-r-6 border-t-6 border-t-transparent opacity-60" />
                      <span className="text-white text-[7px] md:text-xs font-bold font-mono">SEAL</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-mono text-slate-600 font-bold mb-1">{selectedItem.id || 'VERIFIED'}</span>
                      <div className="w-10 md:w-16 h-[0.5px] bg-slate-300 mb-0.5" />
                      <span>CREDENTIAL</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Elegant large-format Badge view
                <div className="relative p-6 bg-white rounded-3xl border border-[#E5E7EB] w-full max-w-[280px] aspect-square flex items-center justify-center shadow-lg">
                  {/* Outer animated rings */}
                  <div className="absolute inset-4 border border-dashed border-slate-300 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-8 border border-slate-200 rounded-full" />
                  
                  {/* Glowing center badge */}
                  <div 
                    style={{ 
                      background: `radial-gradient(circle, ${selectedItem.color} 0%, ${selectedItem.color}dd 70%, ${selectedItem.color}aa 100%)`,
                      boxShadow: `0 10px 30px -5px ${selectedItem.color}80`
                    }} 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center border-4 border-white text-white relative z-10 select-none"
                  >
                    <span className="font-mono text-4xl font-black tracking-wider leading-none drop-shadow-md">{selectedItem.initials}</span>
                    <span className="text-[8px] tracking-[0.2em] text-white/90 uppercase font-extrabold mt-2 border-t border-white/20 pt-1.5">VERIFIED BADGE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Credential Details (Right / Bottom) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span 
                style={{ color: selectedItem.color }} 
                className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest mb-1"
              >
                {selectedItem.issuer}
              </span>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-tight mb-4">
                {selectedItem.title || selectedItem.name}
              </h3>

              <div className="flex gap-4 mb-6">
                <div className="flex flex-col bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl">
                  <span className="text-[9px] text-[#334155]/60 font-bold font-mono uppercase tracking-wider">Issued Date</span>
                  <span className="text-sm font-semibold text-slate-700">{selectedItem.date}</span>
                </div>
                {selectedItem.id && (
                  <div className="flex flex-col bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl">
                    <span className="text-[9px] text-[#334155]/60 font-bold font-mono uppercase tracking-wider">Credential ID</span>
                    <span className="text-sm font-mono font-semibold text-slate-700">{selectedItem.id}</span>
                  </div>
                )}
              </div>

              <p className="text-sm md:text-base text-[#334155] leading-relaxed mb-8">
                This verified credential confirms the completion of professional training requirements and validation of expertise in standard technologies and frameworks.
              </p>

              <a 
                href={selectedItem.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-accent text-[#FAFAFA] font-mono font-semibold tracking-wider transition-colors duration-250 cursor-pointer text-sm hover:opacity-90 w-full md:w-auto"
              >
                <span className="w-2 h-2 bg-[#FAFAFA] rounded-full" />
                <span>Verify Credential</span>
                <ExternalLink className="w-4 h-4 text-[#FAFAFA]" />
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
