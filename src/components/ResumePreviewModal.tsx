import React, { useEffect, useState } from 'react';

export default function ResumePreviewModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openResumePreview', handleOpen);
    return () => window.removeEventListener('openResumePreview', handleOpen);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 select-none">
      {/* Glassmorphic Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[950px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#334155]/60 font-bold">
              Resume Preview
            </span>
            <h2 className="font-clash-bold text-lg md:text-xl font-bold text-slate-900 uppercase">
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
        <div className="w-full h-[75vh] md:h-[80vh] bg-slate-100 relative overflow-y-auto overscroll-contain flex justify-center py-6 px-4 data-lenis-prevent">
          <div className="max-w-full w-auto shadow-md border border-slate-200/80 rounded-lg overflow-hidden bg-white select-text">
            <img 
              src="/Zeus_Angelo_Bautista_Resume.png" 
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
