import React, { useEffect, useState } from 'react';

export default function ResumePreviewModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openResumePreview', handleOpen);
    if (typeof window !== 'undefined' && (window as any).__resumePreviewRequested) {
      setIsOpen(true);
      (window as any).__resumePreviewRequested = false;
    }
    return () => window.removeEventListener('openResumePreview', handleOpen);
  }, []);

  // Prevent scroll and pause Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: true } }));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { isOpen: false } }));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 select-none">
      <style>{`
        .resume-preview-body {
          scrollbar-width: thin !important;
          scrollbar-color: #C44900 #e2e8f0 !important;
        }
        .resume-preview-body::-webkit-scrollbar {
          display: block !important;
          width: 8px !important;
        }
        .resume-preview-body::-webkit-scrollbar-track {
          background: #f1f5f9 !important;
          border-radius: 4px !important;
        }
        .resume-preview-body::-webkit-scrollbar-thumb {
          background: #C44900 !important;
          border-radius: 4px !important;
        }
        .resume-preview-body::-webkit-scrollbar-thumb:hover {
          background: #a33c00 !important;
        }
      `}</style>

      {/* Glassmorphic Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[950px] h-[92vh] max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/80 flex-shrink-0">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#334155]/60 font-bold">
              Resume Preview
            </span>
            <h2 className="font-clash-bold text-base md:text-xl font-bold text-slate-900 uppercase">
              Zeus Angelo Bautista
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Download Button */}
            <a
              href="/Zeus_Angelo_Bautista_Resume.pdf"
              download="Zeus_Angelo_Bautista_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-full text-[10px] md:text-xs font-mono tracking-wider font-bold transition-all uppercase cursor-target shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-target"
              aria-label="Close preview"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Image Viewer */}
        <div 
          className="resume-preview-body w-full flex-1 min-h-0 bg-slate-100 relative overflow-y-auto overscroll-contain flex justify-center items-start py-6 px-4 data-lenis-prevent"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="max-w-full w-auto shadow-md border border-slate-200/80 rounded-lg overflow-hidden bg-white select-text">
            <img 
              src="https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Common/Zeus_Angelo_Bautista_Resume.webp" 
              alt="Zeus Angelo Bautista Resume Preview"
              className="max-w-full h-auto object-contain pointer-events-auto select-text"
              draggable="false"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
