import React from 'react';
import ScrollReveal from './ScrollReveal.tsx';

export default function Certifications() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="certifications">
      <ScrollReveal
        baseOpacity={0.08}
        enableBlur={true}
        baseRotation={2}
        blurStrength={12}
        as="div"
        containerClassName="flex flex-col items-center w-full mb-8"
      >
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          Milestones
        </span>
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center">
          Certification
        </h2>
      </ScrollReveal>
      {/* Anchor target for CTA Connect button */}
      <div id="connect" className="absolute bottom-0" />
    </section>
  );
}
