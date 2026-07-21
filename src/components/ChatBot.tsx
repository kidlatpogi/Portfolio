import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles } from 'lucide-react';

// Helper to detect keyboard mash spam client-side instantly
const containsKeyboardMash = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();
  const words = lowerText.split(/\s+/);
  const hasMash = words.some(w => {
    if (w.length > 7 && !/[aeiouy]/i.test(w) && /^[a-z0-9]+$/i.test(w)) return true;
    return false;
  });
  return hasMash;
};

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
  const [inputValue, setInputValue] = useState('');
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setTimeout(() => {
      setCooldownRemaining(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldownRemaining]);

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
        text: "Feel free to type any custom question or click the suggestion topics below!",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom whenever messages change or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping || cooldownRemaining > 0) return;

    const cleanText = textToSend.trim();

    // Check for keyboard mash spam client-side instantly
    if (containsKeyboardMash(cleanText)) {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: cleanText,
        timestamp: new Date()
      };
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          id: `bot-warn-${Date.now()}`,
          sender: 'bot',
          text: "The use of bad words, curse words, or any profanity is not allowed. Please keep our conversation professional and respectful.",
          timestamp: new Date()
        }
      ]);
      setInputValue('');
      setCooldownRemaining(15); // Start 15 seconds cooldown
      return;
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);
    setInputValue('');
    setCooldownRemaining(15); // Start 15 seconds cooldown

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.response,
            timestamp: new Date()
          }
        ]);
      } else if (response.status === 400 && data.isBlocked) {
        // Server blocked the message due to inappropriate language
        setMessages(prev => [
          ...prev,
          {
            id: `bot-warn-${Date.now()}`,
            sender: 'bot',
            text: "The use of bad words, curse words, or any profanity is not allowed. Please keep our conversation professional and respectful.",
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "I'm having trouble connecting to my server right now. Feel free to contact Zeus directly at bautistaangelozeus17@gmail.com!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const topics = [
    {
      label: 'About Zeus',
      query: 'Tell me about Zeus'
    },
    {
      label: 'Work Experience',
      query: 'Tell me about your work experience'
    },
    {
      label: 'Tech Stack',
      query: 'What technologies do you use?'
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
            <div data-lenis-prevent className="h-[280px] overflow-y-auto overscroll-contain p-4 flex flex-col gap-3 bg-[#FAFAFA]">
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

            {/* Quick replies suggestion bar (above input) */}
            <div className="p-3 border-t border-[#334155]/10 bg-[#FAFAFA] flex flex-col gap-1.5">
              <span className="font-mono text-[8px] font-semibold text-[#334155]/60 uppercase tracking-wider">
                Suggested Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(t.query)}
                    className="font-mono text-[9px] font-semibold rounded-full border border-[#334155]/30 hover:border-accent px-2.5 py-1 text-slate-700 bg-white hover:bg-orange-50 hover:text-accent cursor-pointer transition-all duration-200"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 border-t border-[#334155]/10 bg-[#FAFAFA] flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={cooldownRemaining > 0 ? `Cooldown active (${cooldownRemaining}s)...` : "Ask me something about Zeus..."}
                disabled={isTyping || cooldownRemaining > 0}
                className="flex-grow px-3 py-2 text-xs rounded-xl border border-[#334155]/20 bg-white text-black focus:outline-none focus:border-accent disabled:opacity-60 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim() || cooldownRemaining > 0}
                className="p-2 rounded-xl bg-black text-[#FAFAFA] hover:bg-accent disabled:opacity-40 disabled:hover:bg-black transition-colors cursor-pointer flex items-center justify-center border-none outline-none"
                aria-label="Send message"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
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
