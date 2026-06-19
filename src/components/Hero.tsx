import React from 'react';
import Lanyard from './Lanyard/Lanyard';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 relative overflow-hidden" id="home">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 pt-20">
        
        {/* Left Side: Typography Content */}
        <div className="flex flex-col items-start gap-5 text-left order-2 md:order-1">
          <span className="font-mono text-xs md:text-sm font-semibold uppercase tracking-wider text-[#334155] border border-[#334155]/20 rounded-full px-4 py-1.5 bg-white/40 backdrop-blur-[4px]">
            🎓 4th year College Student
          </span>
          
          <div className="flex flex-col">
            <h1 className="font-sans text-6xl sm:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none select-none uppercase">
              Zeus Angelo
            </h1>
            <h1 className="font-sans text-6xl sm:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none select-none uppercase">
              Bautista
            </h1>
          </div>
          
          <div className="mt-2 flex items-center gap-2 px-4 py-2 border-2 border-black bg-black text-[#FAFAFA] font-mono text-sm md:text-base font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span>Future Developer</span>
          </div>
        </div>

        {/* Right Side: Interactive Lanyard */}
        <div className="w-full h-[450px] md:h-[600px] order-1 md:order-2 flex items-center justify-center relative">
          <Lanyard client:load position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>

      </div>
    </section>
  );
}

