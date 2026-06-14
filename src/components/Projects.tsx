import React from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, Radio, Eye, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <section className="parallax-section bg-white z-20 shadow-2xl overflow-y-auto block h-auto min-h-screen py-24" id="projects">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <h2 className="font-headline-md text-headline-md text-gray-900 font-bold mb-2">Projects</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-400 to-transparent"></div>
        </div>

        {/* Bigkas Capstone Spotlight */}
        <div className="mb-16 relative group">
          {/* Outer glow overlay */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex flex-col lg:flex-row bg-gray-50/90 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
            {/* High-Fidelity UI Waveform Mockup (Bigkas Placeholder) */}
            <div className="lg:w-3/5 h-[320px] lg:h-auto bg-zinc-950 p-6 flex flex-col justify-between relative overflow-hidden text-zinc-300 font-mono text-xs">
              {/* Decorative top bar */}
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 z-10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Linguistic Audio Analysis</div>
                <div className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">NLP ACTIVE</div>
              </div>

              {/* Core Waveform Interface mockup */}
              <div className="flex-1 flex flex-col justify-center gap-6 z-10 my-4">
                {/* Waveform bars */}
                <div className="flex items-end justify-center gap-[3px] h-24 px-4">
                  {[40, 20, 55, 75, 90, 45, 30, 65, 80, 50, 70, 95, 60, 40, 85, 30, 50, 75, 90, 65, 35, 45, 80, 55, 70, 85, 40, 25, 60, 80, 95, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 10 }}
                      animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.7}%`, `${h}%`] }}
                      transition={{
                        duration: 2.5 + (i % 3) * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="w-full bg-gradient-to-t from-zinc-800 via-zinc-400 to-white rounded-t-sm"
                    />
                  ))}
                </div>

                {/* Transcription simulation */}
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                      <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                    </button>
                    <div>
                      <div className="text-white font-bold text-sm font-sans tracking-wide">AudioSample_042.wav</div>
                      <div className="text-[10px] text-zinc-500">Duration: 4.8s | Sample Rate: 44.1 kHz</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm tracking-widest font-mono">98.4%</div>
                    <div className="text-[9px] text-zinc-500 uppercase">Phonetic Accuracy</div>
                  </div>
                </div>
              </div>

              {/* Floating grids and indicators */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="flex justify-between items-center text-[10px] text-zinc-500 border-t border-zinc-900 pt-3 z-10">
                <span>STT: TRANSCRIBED</span>
                <span>MODEL: BI-LSTM + TRANSFORMER</span>
              </div>
            </div>

            {/* Spotlight Metadata */}
            <div className="lg:w-2/5 p-10 flex flex-col justify-center">
              <span className="font-label-md text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-400"></span> Capstone Project
              </span>
              <h3 className="font-headline-md text-4xl text-gray-900 font-bold mb-5 flex items-center justify-between">
                Bigkas
                <span className="text-xs font-mono bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full uppercase tracking-wider">Spotlight</span>
              </h3>
              <p className="font-body-lg text-gray-600 mb-8 leading-relaxed">
                A comprehensive linguistic platform leveraging advanced NLP for immersive language acquisition. Built for precision in phonetic analysis and seamless user interaction.
              </p>
              
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="px-3.5 py-1.5 bg-gray-900 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">Next.js</span>
                <span className="px-3.5 py-1.5 bg-gray-900 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">PyTorch</span>
                <span className="px-3.5 py-1.5 bg-gray-900 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">Tailwind v4</span>
              </div>

              <div className="flex gap-4">
                <a href="#contact" className="inline-flex items-center gap-1.5 font-label-md text-xs tracking-wider uppercase border-b-2 border-gray-900 pb-1 font-bold text-gray-900 hover:text-gray-600 hover:border-gray-600 transition-colors">
                  Request Access <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Project: Lokal-Quest */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-gray-400 hover:shadow-lg transition-all"
          >
            {/* Visual CSS Spatial Grid Mockup */}
            <div className="aspect-video bg-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-zinc-400">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 z-10">
                <span className="text-white uppercase font-bold">Lokal-Quest</span>
                <span className="text-[8px] text-zinc-500">MAPPING NODE</span>
              </div>
              
              {/* Interactive spatial circles/grid */}
              <div className="flex-1 flex items-center justify-center relative my-2 z-10">
                <div className="w-20 h-20 rounded-full border border-dashed border-zinc-800 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-dashed border-zinc-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white animate-bounce" />
                  </div>
                </div>
                {/* Node coordinates */}
                <div className="absolute top-2 left-6 text-zinc-500">x: 48.242</div>
                <div className="absolute bottom-2 right-4 text-zinc-500">y: -12.04</div>
                <svg className="absolute inset-0 w-full h-full text-zinc-800" fill="none">
                  <path d="M10,10 L30,40 L60,20 L80,50" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              <div className="flex justify-between text-[8px] text-zinc-600 border-t border-zinc-900 pt-1.5 z-10">
                <span>GPS LOCK</span>
                <span>RADAR ACTIVE</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-md text-lg text-gray-900 font-bold mb-2">Lokal-Quest</h4>
              <p className="font-body-md text-sm text-gray-500 line-clamp-2">Community exploration platform mapping local gems via spatial coordinates.</p>
            </div>
          </motion.div>

          {/* Project: Speak-Easy */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-gray-400 hover:shadow-lg transition-all"
          >
            {/* Visual CSS Wave Modulator Mockup */}
            <div className="aspect-video bg-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-zinc-400">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 z-10">
                <span className="text-white uppercase font-bold">Speak-Easy</span>
                <span className="text-[8px] text-zinc-500">VOICE MIXER</span>
              </div>

              {/* Slider tracks */}
              <div className="flex-1 flex items-center justify-around px-4 my-2 z-10">
                {[40, 80, 20, 60].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-center">
                    <div className="w-1 bg-zinc-800 h-10 rounded-full relative flex items-center justify-center">
                      <motion.div 
                        animate={{ y: [0, 10, -10, 0] }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-2.5 h-2.5 rounded-full bg-white absolute" 
                      />
                    </div>
                    <span className="text-[7px] text-zinc-500">CH_{i+1}</span>
                  </div>
                ))}
                <Radio className="w-4 h-4 text-zinc-500 animate-pulse" />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              <div className="flex justify-between text-[8px] text-zinc-600 border-t border-zinc-900 pt-1.5 z-10">
                <span>GAIN: +3.2DB</span>
                <span>OUT: LIVE</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-md text-lg text-gray-900 font-bold mb-2">Speak-Easy</h4>
              <p className="font-body-md text-sm text-gray-500 line-clamp-2">Real-time voice modulation and instant translation interface.</p>
            </div>
          </motion.div>

          {/* Project: SignBridge */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-gray-400 hover:shadow-lg transition-all"
          >
            {/* Visual CSS Camera Tracking Mockup */}
            <div className="aspect-video bg-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-zinc-400">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 z-10">
                <span className="text-white uppercase font-bold">SignBridge</span>
                <span className="text-[8px] text-zinc-500">CV DETECT</span>
              </div>

              {/* Hand/Bounding box tracking simulation */}
              <div className="flex-1 flex items-center justify-center relative my-2 z-10">
                <div className="w-16 h-12 border border-white/20 rounded relative flex items-center justify-center">
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-white" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-white" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-white" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-white" />
                  <Eye className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="absolute text-[8px] text-white bg-black/60 px-1.5 py-0.5 rounded border border-white/10 -bottom-1">
                  CLASS: SIGN_A [94%]
                </div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              <div className="flex justify-between text-[8px] text-zinc-600 border-t border-zinc-900 pt-1.5 z-10">
                <span>60 FPS</span>
                <span>THREAD: GPU</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-md text-lg text-gray-900 font-bold mb-2">SignBridge</h4>
              <p className="font-body-md text-sm text-gray-500 line-clamp-2">Computer vision application for real-time sign language translation.</p>
            </div>
          </motion.div>

          {/* Project: CodeBayanihan */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-gray-400 hover:shadow-lg transition-all"
          >
            {/* Visual CSS Git Branch Commits Mockup */}
            <div className="aspect-video bg-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-zinc-400">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 z-10">
                <span className="text-white uppercase font-bold">CodeBayanihan</span>
                <span className="text-[8px] text-zinc-500">COLLAB ENGINE</span>
              </div>

              {/* Git branching simulation */}
              <div className="flex-1 flex flex-col justify-center gap-2 px-3 my-2 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-[7.5px] text-white">main [commit: df83ac9]</span>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l border-zinc-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <span className="text-[7px]">feature/collaboration-ui</span>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l border-zinc-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <span className="text-[7px]">bugfix/socket-leak-verify</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              <div className="flex justify-between text-[8px] text-zinc-600 border-t border-zinc-900 pt-1.5 z-10">
                <span>REPO: PUBLIC</span>
                <span>SYNC ACTIVE</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-headline-md text-lg text-gray-900 font-bold mb-2">CodeBayanihan</h4>
              <p className="font-body-md text-sm text-gray-500 line-clamp-2">Collaborative, open-source code sharing environment for local developer communities.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
