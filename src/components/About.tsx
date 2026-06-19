import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative" id="about">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="about-me" className="absolute top-0" />
      <div id="skills" className="absolute top-1/3" />
      <div id="experience" className="absolute top-2/3" />

      <h1 className="font-sans text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">About</h1>
    </section>
  );
}
