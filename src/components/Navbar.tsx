import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Home, Terminal, Mail, Briefcase, Award } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'projects', 'designs', 'skills', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'designs', label: 'Designs', icon: Palette },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Top Nav Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className={`fixed top-8 inset-x-0 mx-auto w-fit max-w-[calc(100vw-2rem)] px-8 py-3.5 rounded-full border bg-black/40 backdrop-blur-2xl z-[100] items-center gap-stack-lg lg:flex hidden transition-all duration-300 ${
          scrolled ? 'border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]' : 'border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)]'
        }`}
      >
        <a href="#hero" className="font-display-lg text-white font-black tracking-tighter text-xl pr-4 border-r border-white/10 select-none">
          AETHER
        </a>
        <nav className="flex items-center gap-stack-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative font-label-md text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="font-label-md text-[11px] tracking-widest uppercase btn-silver px-5 py-2 rounded-full font-bold ml-4"
        >
          Resume
        </motion.button>
      </motion.header>

      {/* Mobile Bottom Navigation Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-[400px] bg-black/85 backdrop-blur-2xl border border-white/10 rounded-full flex justify-around items-center py-3.5 px-6 lg:hidden z-[100] shadow-2xl"
      >
        <a
          href="#projects"
          className={`p-2 transition-colors duration-200 ${activeSection === 'projects' ? 'text-white' : 'text-zinc-500'}`}
          aria-label="Projects"
        >
          <Briefcase className="w-5 h-5" />
        </a>
        <a
          href="#designs"
          className={`p-2 transition-colors duration-200 ${activeSection === 'designs' ? 'text-white' : 'text-zinc-500'}`}
          aria-label="Designs"
        >
          <Palette className="w-5 h-5" />
        </a>
        <a
          href="#hero"
          className="relative -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white shadow-lg shadow-white/5 backdrop-blur-xl"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </a>
        <a
          href="#skills"
          className={`p-2 transition-colors duration-200 ${activeSection === 'skills' ? 'text-white' : 'text-zinc-500'}`}
          aria-label="Skills"
        >
          <Terminal className="w-5 h-5" />
        </a>
        <a
          href="#contact"
          className={`p-2 transition-colors duration-200 ${activeSection === 'contact' ? 'text-white' : 'text-zinc-500'}`}
          aria-label="Contact"
        >
          <Mail className="w-5 h-5" />
        </a>
      </motion.nav>
    </>
  );
}
