import React from 'react';

export default function Projects() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center">Projects</h2>
    </section>
  );
}
