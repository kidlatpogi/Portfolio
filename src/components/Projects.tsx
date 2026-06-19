import React from 'react';

export default function Projects() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      <h2 className="font-display text-5xl md:text-7xl font-bold text-black tracking-tight">Projects</h2>
    </section>
  );
}
