import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with greeting messages
  useEffect(() => {
    setMessages([
      {
        id: 'greet-1',
        sender: 'bot',
        text: "Hello! I'm Zeus's portfolio assistant.",
        timestamp: new Date()
      },
      {
        id: 'greet-2',
        sender: 'bot',
        text: "Click any of the topics below to learn more about Zeus's experience, services, and FAQ!",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom whenever messages change or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleTopicClick = (topic: string, queryText: string, botResponse: string) => {
    if (isTyping) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  const topics = [
    {
      label: 'About Zeus',
      query: 'Tell me about Zeus',
      response: 'Zeus Angelo is an IT Developer & AI Engineer specializing in high-fidelity digital experiences. He is currently a 4th-year BSIT student focused on building high-performance, animation-rich web and mobile applications.'
    },
    {
      label: 'Work Experience',
      query: 'Tell me about your work experience?',
      response: 'Yes, I do have work experience. I have worked as a Freelance Web Developer and as a UI/UX Design Intern at Sabiya Cloud Technology.'
    },
    {
      label: 'Tech Stack & Tools',
      query: 'What technologies do you use?',
      response: 'The core stack includes Astro, React, TypeScript, Tailwind CSS, Framer Motion, and Cloudflare Pages/R2. This portfolio is built strictly following a brutalist minimalist typography and color design system.'
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col items-start font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.1 }}
            className="w-[360px] max-sm:w-[calc(100vw-32px)] bg-[#FAFAFA] border border-[#334155]/20 rounded-3xl overflow-hidden mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="bg-black text-[#FAFAFA] p-4 flex items-center justify-between border-b border-[#334155]/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#334155] flex items-center justify-center text-white border border-[#334155]/20">
                  <Bot size={20} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-black rounded-full" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-sans font-semibold text-sm leading-tight text-white">Zeus's Assistant</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-[280px] overflow-y-auto overscroll-contain p-4 flex flex-col gap-3 bg-[#FAFAFA]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                    }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#334155]/10 flex items-center justify-center text-[#334155] shrink-0 border border-[#334155]/20">
                      <Bot size={14} />
                    </div>
                  )}
                  <div
                    className={`px-3.5 py-2.5 rounded-[1.25rem] text-xs leading-relaxed border ${msg.sender === 'user'
                      ? 'bg-black text-[#FAFAFA] border-black rounded-tr-none'
                      : 'bg-[#FAFAFA] text-[#334155] border-[#E5E7EB] rounded-tl-none font-sans'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] self-start">
                  <div className="w-7 h-7 rounded-full bg-[#334155]/10 flex items-center justify-center text-[#334155] shrink-0 border border-[#334155]/20">
                    <Bot size={14} />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-[1.25rem] bg-[#FAFAFA] border border-[#E5E7EB] rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#334155] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#334155] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#334155] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="p-4 border-t border-[#334155]/10 bg-[#FAFAFA] flex flex-col gap-2.5">
              <span className="font-mono text-[9px] font-semibold text-[#334155]/60 uppercase tracking-wider">
                Select a topic to chat:
              </span>
              <div className="flex flex-wrap gap-2">
                {topics.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTopicClick(t.label, t.query, t.response)}
                    className="font-mono text-[10px] font-semibold rounded-full border border-[#334155] px-3 py-1.5 text-[#334155] bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[#C44900] hover:text-[#FAFAFA]"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewNotification(false);
        }}
        className="w-14 h-14 rounded-full bg-black text-[#FAFAFA] flex items-center justify-center cursor-pointer relative border-none outline-none focus:outline-none"
        aria-label="Toggle chatbot assistant"
        animate={{
          y: isOpen ? 0 : [0, -8, 0]
        }}
        transition={
          isOpen
            ? { duration: 0.2 }
            : {
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeInOut'
            }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="3" y="6" width="18" height="13" rx="4" />
                <path d="M12 6V3" />
                <circle cx="12" cy="2" r="1" fill="currentColor" />
                <circle cx="8" cy="12" r="1.2" fill="currentColor" />
                <circle cx="16" cy="12" r="1.2" fill="currentColor" />
                <path d="M9.5 15c.5.5 1.5.8 2.5.8s2-.3 2.5-.8" />
              </svg>
              {hasNewNotification && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border border-black flex items-center justify-center">
                  <Sparkles size={8} className="text-white animate-pulse" />
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
