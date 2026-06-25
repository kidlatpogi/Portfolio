import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal.tsx';

interface ExperienceItem {
  role: string;
  company: string;
  description: string;
  duration: string;
  location: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'IT Helper (Freelance)',
    company: 'Municipality of Silang, Cavite',
    description: 'Digitalized Silang Population birth records by converting written data into a searchable digital format and integrating them into the department\'s database.',
    duration: 'December 2024 – January 2025',
    location: 'Bulihan Silang Cavite'
  },
  {
    role: 'Registrar Assistant (OJT)',
    company: 'Bulihan Integrated National Highschool',
    description: 'Digitalized student records into searchable files and integrated the data into the Registrars\' office cloud storage for efficient retrieval.',
    duration: 'April 2023 (Half Month)',
    location: 'Bulihan Silang Cavite'
  }
];

export default function Experience() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-10 md:py-14 relative overflow-hidden" id="experience">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Headings inside ScrollReveal */}
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={2}
          blurStrength={12}
          as="div"
          containerClassName="flex flex-col items-center w-full"
        >
          {/* "Work" Subheading - styled like Hero's subheader, centered */}
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
            My Journey
          </span>

          {/* "Experience" Heading - styled like "Developer" from Hero, centered */}
          <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-10">
            Experience
          </h2>
        </ScrollReveal>

        {/* Experience Cards container */}
        <div className="w-[95%] md:w-[95%] max-w-[1600px] flex flex-col gap-8 mx-auto relative w-full">
          {/* Connected dashed timeline line for larger screens */}
          <div className="absolute left-8 top-4 bottom-4 w-0 border-l-2 border-dashed border-slate-300 hidden md:block" />

          {experiences.map((exp, index) => (
            <ScrollReveal
              key={index}
              baseOpacity={0.08}
              enableBlur={true}
              baseRotation={2}
              blurStrength={12}
              as="div"
              containerClassName="flex flex-col md:flex-row gap-6 items-start relative group reveal-item md:pl-16 w-full"
              wordAnimationEnd="top 80%"
            >
              {/* Timeline marker - centered on the vertical line */}
              <div className="absolute left-[25px] top-8 w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white group-hover:bg-accent group-hover:scale-125 transition-all duration-300 hidden md:block z-10" />

              {/* Experience Card */}
              <div className="w-full border-2 border-slate-200/80 bg-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all duration-300 hover:border-accent hover:shadow-[0_12px_24px_-8px_rgba(196,73,0,0.08)] cursor-target">

                <div className="flex-grow max-w-5xl">
                  {/* Role Title */}
                  <h3 className="font-sans text-xl md:text-2xl font-bold text-black group-hover:text-accent transition-colors duration-300 flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-accent md:hidden flex-shrink-0" />
                    {exp.role}
                  </h3>

                  {/* Company name */}
                  <p className="font-sans text-base md:text-lg text-accent font-semibold mt-1">
                    {exp.company}
                  </p>

                  {/* Task description */}
                  <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed mt-4">
                    {exp.description}
                  </p>
                </div>

                {/* Metadata Column */}
                <div className="flex flex-col gap-2.5 min-w-[200px] md:items-end flex-shrink-0">
                  {/* Duration pill */}
                  <span className="font-mono text-[0.8rem] uppercase tracking-wider text-slate-500 font-bold bg-slate-100 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.duration}
                  </span>

                  {/* Location label */}
                  <span className="font-mono text-[0.75rem] uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
