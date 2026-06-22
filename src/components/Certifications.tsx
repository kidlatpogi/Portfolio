import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Certifications() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="certifications">
      <ScrollReveal
        baseOpacity={0.08}
        enableBlur={true}
        baseRotation={2}
        blurStrength={12}
        as="div"
      >
        <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-black tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-8">Certifications</h2>
      </ScrollReveal>
      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
