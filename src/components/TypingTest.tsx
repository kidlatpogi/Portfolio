import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { TYPING_SENTENCES } from '../data/typingSentences';
import { keyboardAudio } from '../utils/keyboardAudio';

interface TypingTestProps {
  isOpen: boolean;
  onClose: () => void;
}

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const TypingTest: React.FC<TypingTestProps> = ({ isOpen, onClose }) => {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pick a random sentence from 100 quotes
  const loadNewSentence = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TYPING_SENTENCES.length);
    setCurrentText(TYPING_SENTENCES[randomIndex]);
    setUserInput('');
    setStartTime(null);
    setElapsedTime(0);
    setIsFinished(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Initialize sentence on open
  useEffect(() => {
    if (isOpen) {
      loadNewSentence();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      document.body.style.overflow = '';
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, loadNewSentence]);

  // Timer interval
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished]);

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = keyboardAudio.toggleMute();
    setIsMuted(nextMute);
  };

  // Calculate stats
  const totalTyped = userInput.length;
  let correctCount = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === currentText[i]) {
      correctCount++;
    }
  }

  const accuracy = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;
  const timeInMinutes = Math.max(elapsedTime, 1) / 60;
  const grossWPM = Math.round(correctCount / 5 / timeInMinutes) || 0;

  // Global keydown handler for typing
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // TAB to restart
      if (e.key === 'Tab') {
        e.preventDefault();
        loadNewSentence();
        return;
      }

      if (isFinished) return;

      const lowerKey = e.key.toLowerCase();
      const isSpace = e.key === ' ';
      const isBackspace = e.key === 'Backspace';

      // Highlight virtual key
      setActiveKey(isSpace ? 'space' : lowerKey);
      setTimeout(() => setActiveKey(null), 100);

      // Play Mechanical Switch Audio
      keyboardAudio.playKeySound(isSpace, isBackspace);

      // Start timer on first keypress
      if (!startTime && e.key.length === 1) {
        setStartTime(Date.now());
      }

      // Backspace
      if (isBackspace) {
        e.preventDefault();
        setUserInput(prev => prev.slice(0, -1));
        return;
      }

      // Ignore modifiers / non-printable
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      e.preventDefault();
      const nextInput = userInput + e.key;
      setUserInput(nextInput);

      // Check if finished
      if (nextInput.length >= currentText.length) {
        setIsFinished(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, userInput, currentText, startTime, isFinished, onClose, loadNewSentence]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#f8f8f8]/90 backdrop-blur-2xl px-6 py-8 sm:px-12 md:px-20 lg:px-28 select-none"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between max-w-4xl mx-auto flex-shrink-0">
            {/* Left: Title & Audio Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#C44900]">
                TYPING TEST
              </span>

              <button
                onClick={handleToggleMute}
                className="cursor-target flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#C44900] text-slate-600 hover:text-[#C44900] text-xs font-mono transition-colors cursor-pointer shadow-2xs"
                title={isMuted ? 'Unmute keyboard audio' : 'Mute keyboard audio'}
              >
                {isMuted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} className="text-[#C44900]" />}
                <span>{isMuted ? 'Muted' : 'Audio'}</span>
              </button>
            </div>

            {/* Right: ESC Hint & Close Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hidden md:inline-block font-mono text-[11px] text-slate-400">
                Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shadow-2xs">ESC</kbd> to close
              </span>
              <button
                onClick={onClose}
                className="cursor-target w-10 h-10 rounded-full bg-black/5 hover:bg-black text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close typing test"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center flex-grow py-4">
            {/* Live Stats Row */}
            <div className="flex items-center justify-center gap-12 sm:gap-20 mb-6 sm:mb-10">
              <div className="flex flex-col items-center">
                <span className="font-clash-bold text-4xl sm:text-5xl text-slate-900 leading-none">
                  {grossWPM}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-semibold">
                  WPM
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-clash-bold text-4xl sm:text-5xl text-slate-900 leading-none">
                  {accuracy}<span className="text-xl sm:text-2xl text-slate-400">%</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-semibold">
                  ACC
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-clash-bold text-4xl sm:text-5xl text-slate-900 leading-none">
                  {elapsedTime}<span className="text-xl sm:text-2xl text-slate-400">s</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-semibold">
                  TIME
                </span>
              </div>
            </div>

            {/* Typing Sentence Display */}
            <div className="relative w-full text-center px-2 py-3 mb-6 sm:mb-8 min-h-[90px] flex items-center justify-center">
              <p className="font-mono text-xl sm:text-2xl md:text-3xl tracking-wide leading-relaxed">
                {currentText.split('').map((char, index) => {
                  const isTyped = index < userInput.length;
                  const isCurrent = index === userInput.length;
                  const isCorrect = isTyped && userInput[index] === char;
                  const isIncorrect = isTyped && userInput[index] !== char;

                  return (
                    <span key={index} className="relative inline">
                      {/* Blinking Cursor Bar */}
                      {isCurrent && (
                        <span className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-[#C44900] animate-pulse" />
                      )}

                      <span
                        className={
                          isCorrect
                            ? 'text-slate-900 font-medium'
                            : isIncorrect
                            ? 'text-red-500 bg-red-100/90 rounded-[2px] px-0.5'
                            : 'text-slate-400/70'
                        }
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Virtual Keyboard Visualizer (Square Keys) */}
            <div className="flex flex-col items-center gap-1.5 mb-6">
              {KEYBOARD_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1.5 sm:gap-2">
                  {row.map(k => (
                    <div
                      key={k}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md aspect-square flex items-center justify-center font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-75 ${
                        activeKey === k
                          ? 'bg-[#C44900] text-white scale-95 shadow-inner'
                          : 'bg-white text-slate-700 border border-slate-300/80 shadow-2xs'
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>
              ))}

              {/* Space Bar */}
              <div
                className={`w-44 sm:w-60 h-8 sm:h-9 rounded-md flex items-center justify-center font-mono text-[10px] uppercase tracking-widest font-semibold transition-all duration-75 mt-0.5 ${
                  activeKey === 'space'
                    ? 'bg-[#C44900] text-white scale-95 shadow-inner'
                    : 'bg-white text-slate-400 border border-slate-300/80 shadow-2xs'
                }`}
              >
                SPACE
              </div>
            </div>

            {/* Finished Modal Summary */}
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 mt-2"
              >
                <button
                  onClick={loadNewSentence}
                  className="cursor-target flex items-center gap-2 bg-black hover:bg-[#C44900] text-white font-mono text-xs font-bold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer shadow-md"
                >
                  <RotateCcw size={14} />
                  <span>Next Sentence (Tab)</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Footnote & Controls */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-6 text-slate-400 font-mono text-xs flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shadow-2xs">tab</kbd>
              <span>restart</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shadow-2xs">esc</kbd>
              <span>close</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingTest;