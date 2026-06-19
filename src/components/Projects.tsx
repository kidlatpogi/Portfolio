import React from 'react';

export default function Projects() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative" id="projects">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="designs" className="absolute top-1/2" />

      <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight">Projects</h1>
    </section>
  );
}
