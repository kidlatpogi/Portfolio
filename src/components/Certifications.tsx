import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Terminal, Share2, Award } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      id: 'Cert 01',
      title: 'AI Fluency',
      description: 'Generative AI workflows and LLM integration specialist.',
      icon: Brain,
    },
    {
      id: 'Cert 02',
      title: 'Claude Code',
      description: "Advanced deployment of Anthropic's toolsets for architectural design.",
      icon: Terminal,
    },
    {
      id: 'Cert 03',
      title: 'Model Context Protocol',
      description: 'Standardized data-to-LLM communication and integration expert.',
      icon: Share2,
    },
  ];

  return (
    <section className="parallax-section bg-black z-50 shadow-2xl py-24" id="certifications">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <h2 className="font-headline-md text-headline-md text-white font-bold mb-2">Certifications</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-white via-zinc-400 to-transparent"></div>
        </div>

        {/* Certifications Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass-card silver-border rounded-2xl p-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Decorative Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/30 transition-all duration-500 shadow-inner">
                    <Icon className="w-10 h-10 text-white stroke-[1.25]" />
                  </div>
                  
                  {/* Certificate ID */}
                  <span className="font-label-md text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-zinc-600" /> {cert.id}
                  </span>
                  
                  {/* Certificate Name */}
                  <h4 className="font-headline-md text-2xl text-white font-bold mb-4 tracking-wide group-hover:text-zinc-300 transition-colors">
                    {cert.title}
                  </h4>
                  
                  {/* Certificate Description */}
                  <p className="font-body-md text-sm text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
