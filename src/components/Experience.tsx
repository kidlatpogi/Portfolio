import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  description?: string;
  bullets: string[];
  duration: string;
  location: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'IT Helper (Freelance)',
    company: 'Municipality of Silang, Cavite',
    type: 'Contract / Freelance',
    bullets: [
      'Spearheaded the municipal birth records digitalization initiative, converting physical written registry archives into standardized digital records.',
      'Normalized data schema and integrated records into the municipal civil registry database to ensure high integrity and searchability.',
      'Optimized document lookup times for administrative civil officers through structured database indexing.'
    ],
    duration: 'December 2024 – January 2025',
    location: 'Bulihan, Silang, Cavite'
  },
  {
    role: 'Registrar Assistant (OJT)',
    company: 'Bulihan Integrated National High School',
    type: 'Internship / On-the-Job Training',
    bullets: [
      'Digitalized cumulative student academic records into organized, searchable electronic repositories.',
      'Integrated institutional records with departmental cloud storage systems for secure, centralized access and disaster recovery.',
      'Maintained student data privacy and adhered to organizational taxonomy standards for record classification.'
    ],
    duration: 'April 2023',
    location: 'Bulihan, Silang, Cavite'
  }
];

export default function Experience() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="experience">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Subheading */}
        <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center mb-3">
          My Journey
        </span>

        {/* "Experience" Heading */}
        <h2 className="font-clash-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-semibold text-accent tracking-tighter leading-[0.9] select-none whitespace-nowrap text-center mb-16">
          Experience
        </h2>

        {/* Experience Timeline Container */}
        <div className="w-[95%] md:w-[95%] max-w-[1600px] flex flex-col gap-10 mx-auto relative">
          
          {/* Vertical Glowing Accent Timeline Line */}
          <div className="absolute left-6 md:left-8 top-6 bottom-6 w-[3px] bg-gradient-to-b from-accent via-accent/40 to-transparent hidden sm:block rounded-full" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 items-start relative group sm:pl-16 md:pl-20 w-full"
            >
              {/* Glowing Timeline Marker Node */}
              <div className="absolute left-4 md:left-[23px] top-8 w-5 h-5 rounded-full bg-white border-4 border-accent shadow-md shadow-accent/40 group-hover:scale-125 group-hover:bg-accent transition-all duration-300 hidden sm:block z-10" />

              {/* Experience Milestone Card - Proper ATS Structured */}
              <div className="w-full border-2 border-slate-200/80 bg-white p-7 md:p-10 rounded-3xl flex flex-col justify-between gap-6 transition-all duration-300 hover:border-accent hover:shadow-[0_16px_36px_-12px_rgba(196,73,0,0.12)] cursor-target">

                {/* Top ATS Header: Role, Company, Employment Type & Date */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="font-clash-semibold text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 mt-1.5">
                      <p className="font-sans text-base md:text-lg text-accent font-semibold">
                        {exp.company}
                      </p>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span className="font-mono text-xs text-slate-500 font-semibold px-2 py-0.5 bg-slate-100 rounded-md">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col gap-2 md:items-end flex-shrink-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-bold bg-slate-100 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {exp.duration}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* ATS Bullet Points */}
                <div className="flex flex-col gap-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <p className="font-sans text-sm md:text-base text-slate-700 leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
