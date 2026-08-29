import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Database, Cloud } from 'lucide-react';
import ScrollReveal from './ScrollReveal.tsx';

interface ExperienceItem {
  role: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
  duration: string;
  location: string;
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'IT Helper (Freelance)',
    company: 'Municipality of Silang, Cavite',
    type: 'Freelance Government Tech',
    description: 'Spearheaded the municipal birth records digitalization initiative, converting thousands of physical registry archives into high-speed searchable electronic records and integrating them into the civil registry database.',
    highlights: [
      'Digitalized Silang population civil and birth registry records with high data accuracy',
      'Normalized schema records and integrated data into department relational database',
      'Accelerated document lookup and retrieval efficiency for public civil officers'
    ],
    duration: 'Dec 2024 – Jan 2025',
    location: 'Bulihan, Silang, Cavite',
    tags: ['Database Architecture', 'Data Normalization', 'Data Integrity', 'Public Sector IT']
  },
  {
    role: 'Registrar Assistant (OJT)',
    company: 'Bulihan Integrated National Highschool',
    type: 'Academic IT Operations',
    description: 'Modernized the institutional academic filing infrastructure by transforming historical student transcripts and records into structured digital repositories with cloud-backed disaster recovery.',
    highlights: [
      'Processed and indexed high-volume student academic cumulative records',
      'Deployed cloud storage workflows for rapid departmental search and record retrieval',
      'Ensured student privacy compliance and organized digital folder taxonomy'
    ],
    duration: 'April 2023 (OJT)',
    location: 'Bulihan, Silang, Cavite',
    tags: ['Cloud Storage', 'Records Management', 'Document Indexing', 'Workflow Optimization']
  }
];

export default function Experience() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden" id="experience">
      <div className="w-full max-w-[1600px] flex flex-col items-center z-10">

        {/* Chapter Index + Subheading */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-[0.25em]">
            03 //
          </span>
          <span className="font-array-semibold text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#334155] text-center">
            My Career Journey
          </span>
        </div>

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

              {/* Experience Milestone Card */}
              <div className="w-full border-2 border-slate-200/80 bg-white p-7 md:p-10 rounded-3xl flex flex-col justify-between gap-6 transition-all duration-300 hover:border-accent hover:shadow-[0_16px_36px_-12px_rgba(196,73,0,0.12)] cursor-target">

                {/* Top Row: Role, Company & Metadata */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-bold px-2.5 py-0.5 bg-orange-50 rounded-full border border-accent/20">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-clash-semibold text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-lg text-accent font-semibold mt-1">
                      {exp.company}
                    </p>
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

                {/* Description & Key Highlights */}
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                        <span className="font-sans text-sm text-slate-600 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-xl font-medium group-hover:border-accent/30 transition-colors"
                    >
                      {tag}
                    </span>
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
