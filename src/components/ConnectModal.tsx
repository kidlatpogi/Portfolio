import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const placeholders = [
  "How can I help you?",
  "Tell me about your idea...",
  "What is your vision for this project?",
  "What project do you want to collaborate on?",
  "Tell me about what you want to create..."
];

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Rotate placeholder prompts
  useEffect(() => {
    if (!isOpen || projectDesc !== '') return;
    const interval = setInterval(() => {
      setCurrentPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, projectDesc]);

  // Reset form state on reopen
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setProjectDesc('');
      setIsSubmitted(false);
      setCurrentPlaceholderIdx(0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectDesc) return;

    // Simulate submission (no backend work for now)
    setIsSubmitted(true);

    // Auto-close after 2.5 seconds
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-[540px] bg-[#F2F0EF] border border-zinc-200/50 rounded-3xl p-8 md:p-10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-950 transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Title & Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-zinc-950 font-sans tracking-tight">
                      Let's Talk Tech
                    </h2>
                    <p className="text-zinc-500 text-sm mt-2 font-sans">
                      Ready to build something amazing? Fill out the form below.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name and Email Inputs side-by-side on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 transition-all font-sans"
                        />
                      </div>
                      <div className="flex flex-col">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Textarea container with rotating animated placeholder */}
                    <div className="relative w-full h-36">
                      <textarea
                        required
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full h-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 resize-none transition-all font-sans"
                      />

                      {/* Animated Placeholder overlay */}
                      {projectDesc === '' && (
                        <div className="absolute top-[13px] left-4 pointer-events-none select-none">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={currentPlaceholderIdx}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: isFocused ? 0.25 : 0.45, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="text-zinc-600 block text-sm font-sans"
                            >
                              {placeholders[currentPlaceholderIdx]}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-4 mx-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-zinc-200/80 bg-white text-zinc-900 font-medium shadow-sm transition-all duration-300 hover:bg-zinc-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm"
                    >
                      <span className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
                      Submit Inquiry
                    </button>
                  </form>

                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/60 flex items-center justify-center gap-6">
                    <a
                      href="https://github.com/kidlatpogi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer group"
                    >
                      <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/zeusbautista"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer group"
                    >
                      <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-zinc-950 text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-950 font-sans tracking-tight">Message Sent!</h2>
                  <p className="text-zinc-500 text-sm mt-2 max-w-xs font-sans">
                    Thank you for reaching out. Zeus will get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConnectModal;
