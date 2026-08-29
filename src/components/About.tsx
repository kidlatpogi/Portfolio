import React from 'react';
import ScrollReveal from './ScrollReveal.tsx';
import { Cpu, Sparkles } from 'lucide-react';

const profileImage = "https://zeusbautista.site/Common/Bautista%20Zeus%20Angelo%20V..webp";
const profileImageBackup = "https://pub-6be64aebeca647248b39162d6d6633f8.r2.dev/Common/Bautista%20Zeus%20Angelo%20V..webp";

export default function About() {
  return (
    <section className="h-auto w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="about">
      {/* Anchor targets for sub-navigation scroll links */}
      <div id="about-me" className="absolute top-0" />

      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Subheading */}
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          Who am I
        </span>

        {/* "About" Heading */}
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-12">
          About
        </h2>

        {/* Main Narrative Paragraph with ScrollReveal */}
        <div className="w-[95%] md:w-[95%] max-w-[2000px] flex justify-center mx-auto mb-14">
          <ScrollReveal
            baseOpacity={0.08}
            enableBlur={false}
            baseRotation={2}
            blurStrength={12}
            textClassName="text-black font-sans text-left md:text-justify tracking-normal leading-relaxed text-lg sm:text-xl md:text-2xl lg:text-3xl"
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
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[2.5px] border-accent object-cover shadow-sm"
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

        {/* 3-Card Bento Showcase (Clean, No Icons, No Footers) */}
        <div className="w-[95%] md:w-[95%] max-w-[1600px] grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          
          {/* Card 1: Philosophy */}
          <div className="border-2 border-slate-200/80 bg-white p-7 md:p-8 rounded-3xl flex flex-col justify-start gap-3 hover:border-accent hover:shadow-[0_12px_28px_-8px_rgba(196,73,0,0.1)] transition-all duration-300 group cursor-target">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
              Philosophy
            </span>
            <h3 className="font-clash-semibold text-xl md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">
              Rapid Learning & Pattern Mastery
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mt-1">
              Deconstructing complex technical problems by identifying foundational software patterns across front-end, back-end, and AI architectures.
            </p>
          </div>

          {/* Card 2: Background */}
          <div className="border-2 border-slate-200/80 bg-white p-7 md:p-8 rounded-3xl flex flex-col justify-start gap-3 hover:border-accent hover:shadow-[0_12px_28px_-8px_rgba(196,73,0,0.1)] transition-all duration-300 group cursor-target">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
              Background
            </span>
            <h3 className="font-clash-semibold text-xl md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">
              National University Dasmariñas
            </h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mt-1">
              Bachelor of Science in Information Technology (BSIT). Based in Cavite, Philippines—focused on building production-ready web apps and computer vision tools.
            </p>
          </div>

          {/* Card 3: Key Accomplishments */}
          <div className="border-2 border-slate-200/80 bg-white p-7 md:p-8 rounded-3xl flex flex-col justify-start gap-3 hover:border-accent hover:shadow-[0_12px_28px_-8px_rgba(196,73,0,0.1)] transition-all duration-300 group cursor-target">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
              Highlights
            </span>
            <h3 className="font-clash-semibold text-xl md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">
              Key Accomplishments
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-clash-semibold text-2xl font-bold text-accent">12+</span>
                <p className="font-mono text-[10px] text-slate-500 uppercase font-semibold">Verified Badges</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-clash-semibold text-2xl font-bold text-accent">6+</span>
                <p className="font-mono text-[10px] text-slate-500 uppercase font-semibold">Web Applications</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
