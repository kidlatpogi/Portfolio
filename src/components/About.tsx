import React from 'react';
import ScrollReveal from './ScrollReveal.tsx';
import { Cpu, Sparkles } from 'lucide-react';

const profileImage = "https://zeusbautista.site/Common/Profile%20Picture.webp";
const profileImageBackup = "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Common/Profile%20Picture.webp";

export default function About() {
  return (
    <section className="h-auto w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden" id="about">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="about-me" className="absolute top-0" />

      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* "Who am I" Subheading - styled like Hero's subheader, centered */}
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          Who am I
        </span>

        {/* "About" Heading - styled like "Developer" from Hero, centered */}
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-12">
          About
        </h2>

        {/* ScrollReveal text block - 90% - 95% width, centered alignment */}
        <div className="w-[95%] md:w-[95%] max-w-[2000px] flex justify-center mx-auto">
          <ScrollReveal
            baseOpacity={0.08}
            enableBlur={false}
            baseRotation={2}
            blurStrength={12}
            textClassName="text-black font-sans text-left md:text-justify tracking-normal leading-relaxed"
            wordAnimationEnd="top 55%"
          >
            Hi, I’m{' '}
            <span className="inline-flex items-center gap-2 align-middle">
              <img
                src={profileImage}
                alt="Zeus Angelo Bautista"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.src !== profileImageBackup) {
                    image.src = profileImageBackup;
                  }
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2.5px] border-accent object-cover shadow-sm"
              />
              <span className="text-accent font-bold">Zeus</span>
            </span>
            . Most of my problem-solving comes from a natural knack for spotting{' '}
            <span className="inline-flex items-center gap-1.5 text-accent font-bold align-middle">
              patterns
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
            </span>
            , which makes it easy for me to pick up new tech stacks on the fly. I’m just a highly curious developer{' '}
            <span className="inline-flex items-center gap-2 text-accent align-middle font-bold">
              <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-accent animate-pulse" />
              who loves building
            </span>{' '}
            things that solve actual problems—or honestly,{' '}
            <span className="inline-flex items-center text-accent/80 font-mono text-[0.8em] border border-accent/20 px-3 py-1 rounded-full bg-accent/5 align-middle select-none">
              <i>tools that make my own life easier</i>.
            </span>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
