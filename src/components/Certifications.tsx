import React from 'react';

export default function Certifications() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative" id="certifications">
      <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight">Certifications</h1>
      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
