import React from 'react';

export default function Certifications() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative" id="certifications">
      <h2 className="font-sans text-5xl md:text-7xl font-semibold text-black tracking-tight">Certifications</h2>
      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
