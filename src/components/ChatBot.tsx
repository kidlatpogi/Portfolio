import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Keyboard, ExternalLink, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TypingTest } from './TypingTest';

const COOLDOWN_SECONDS = 30;
const COOLDOWN_KEY = 'zeus_chatbot_cooldown_expiry';

// Comprehensive Client-side Bad Words, Adult Terms, Porn Sites, and Slurs
const CLIENT_BAD_WORDS = [
  'fuck', 'fucking', 'fucker', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy',
  'nigger', 'nigga', 'faggot', 'fag', 'slut', 'whore', 'motherfucker', 'cock', 'twat', 'wanker',
  'gago', 'gaga', 'tanga', 'tangina', 'putangina', 'putang ina', 'puta', 'pota', 'ulol', 'bobo',
  'inutil', 'pakshet', 'tarantado', 'hayop', 'leche', 'letse', 'punyeta', 'tae', 'kantot', 'iyot',
  'bwisit', 'kupal', 'hindot', 'pokpok', 'bayag', 'tamod', 'pepe', 'tite', 'burat', 'ogag', 'buwisit',
  'pornhub', 'xvideos', 'xnxx', 'redtube', 'brazzers', 'onlyfans', 'xhamster', 'hentai', 'rule34',
  'nude', 'nudes', 'porn', 'porno', 'xxx', 'sex', 'erotic', 'nsfw', 'camgirl', 'chaturbate',
  'stripchat', 'eporner', 'youporn', 'beeg', 'milf', 'deepfake', 'escort', 'sex video'
];

// Client-side Prompt Injection & Extraction Patterns
const CLIENT_INJECTION_KEYWORDS = [
  'system prompt', 'system instructions', 'initial prompt', 'base prompt', 'hidden prompt',
  'prompt text', 'internal instructions', 'reveal prompt', 'reveal instructions', 'leak prompt',
  'ignore previous', 'disregard previous', 'ignore all previous', 'forget all instructions',
  'ignore your instructions', 'disregard instructions', 'new instructions', 'override instructions',
  '.env', 'dotenv', 'api_key', 'apikey', 'api key', 'secret_key', 'cloudflare_token', 'cloudflare token',
  'auth token', 'jwt secret', 'password', 'credentials', 'private key', 'env variable', 'process.env',
  'jailbreak', 'dan mode', 'developer mode', 'unrestricted mode', 'bypass filter', 'bypass safety',
  'pretend you are an unrestricted', 'roleplay as godmode', 'repeat everything above',
  'print everything before', 'what are your instructions', 'reveal your system instructions',
  'output initialization', 'print context', 'show context', 'drop table', 'dump database',
  'who made your prompt', 'what is your prompt', 'tell me your prompt', 'show me your prompt', 'give me your prompt'
];

// Strip emojis helper
const stripEmojis = (text: string): string => {
  return text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
};

// Helper to detect keyboard mash spam client-side instantly
const containsKeyboardMash = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();
  const words = lowerText.split(/\s+/);
  return words.some(w => {
    if (w.length > 7 && !/[aeiouy]/i.test(w) && /^[a-z0-9]+$/i.test(w)) return true;
    return false;
  });
};

const containsBadContent = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();
  return CLIENT_BAD_WORDS.some(word => lowerText.includes(word));
};

const containsPromptInjection = (text: string): boolean => {
  const lowerText = text.toLowerCase().trim();
  return CLIENT_INJECTION_KEYWORDS.some(term => lowerText.includes(term));
};

const getBrowserAndOS = async (): Promise<{ os: string; browser: string }> => {
  if (typeof navigator === 'undefined') return { os: 'Unknown OS', browser: 'Unknown Browser' };
  const ua = navigator.userAgent;

  // Accurate OS Detection (Checking Android and iOS touch devices before generic Linux/Mac)
  let os = 'Unknown OS';
  if (/Android/i.test(ua)) {
    os = 'Android';
  } else if (/iPhone|iPod/i.test(ua) || /iPad/i.test(ua) || (ua.includes('Macintosh') && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1)) {
    os = 'iOS';
  } else if (/Windows|Win32|Win64/i.test(ua)) {
    os = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS';
  } else if (/CrOS/i.test(ua)) {
    os = 'ChromeOS';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  // Accurate Browser Detection (Brave API, Arc CSS variables, Edge, Opera, Vivaldi, etc.)
  let browser = 'Unknown Browser';
  let isBrave = false;
  try {
    if ((navigator as any).brave && typeof (navigator as any).brave.isBrave === 'function') {
      isBrave = await (navigator as any).brave.isBrave();
    }
  } catch {}

  const isArc = typeof window !== 'undefined' && ((window as any).arc !== undefined || (typeof getComputedStyle === 'function' && getComputedStyle(document.documentElement).getPropertyValue('--arc-palette-title') !== ''));

  if (isBrave) {
    browser = 'Brave Browser';
  } else if (isArc) {
    browser = 'Arc Browser';
  } else if (ua.includes('Edg/')) {
    browser = 'Microsoft Edge';
  } else if (ua.includes('OPR/') || ua.includes('Opera/')) {
    browser = 'Opera';
  } else if (ua.includes('Vivaldi/')) {
    browser = 'Vivaldi';
  } else if (ua.includes('SamsungBrowser/')) {
    browser = 'Samsung Internet';
  } else if (ua.includes('Chrome/')) {
    browser = 'Google Chrome';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Apple Safari';
  } else if (ua.includes('Firefox/')) {
    browser = 'Mozilla Firefox';
  }

  return { os, browser };
};

const getClientFootprintMessage = async (): Promise<string> => {
  const { os, browser } = await getBrowserAndOS();
  const timezone = typeof Intl !== 'undefined' ? (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Manila') : 'Asia/Manila';
  
  let screenRes = '1920x1080 (24-bit)';
  if (typeof window !== 'undefined' && window.screen) {
    const depth = window.screen.colorDepth || 24;
    screenRes = `${window.screen.width}x${window.screen.height} (${depth}-bit)`;
  }

  const cpu = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Logical Cores` : 'Undisclosed';
  
  let ram = 'Protected by browser';
  if (typeof navigator !== 'undefined' && (navigator as any).deviceMemory) {
    const mem = (navigator as any).deviceMemory;
    ram = mem >= 8 ? `≥8 GB RAM (Browser Cap)` : `~${mem} GB RAM`;
  }

  const language = typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US';

  let ip = 'Undisclosed';
  let isp = 'Local Service Provider';
  let location = 'Cavite, Philippines';

  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        ip = data.ip || ip;
        isp = data.connection?.isp || data.connection?.org || isp;
        const locParts = [data.city, data.region, data.country].filter(Boolean);
        if (locParts.length > 0) location = locParts.join(', ');
      }
    }
  } catch {
    try {
      const fb = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(1500) });
      if (fb.ok) {
        const fbData = await fb.json();
        ip = fbData.ip || ip;
      }
    } catch {}
  }

  return `### That's so unkind of you to try that! 👻\n\nNice try on the prompt injection! Anyway, here is your digital footprint:\n- **Public IP**: ${ip}\n- **Internet Service Provider (ISP)**: ${isp}\n- **Approximate Location**: ${location}\n- **Timezone**: ${timezone}\n- **Operating System**: ${os}\n- **Browser**: ${browser}\n- **Device Specs**: ${cpu} • ${ram}\n- **Screen Resolution**: ${screenRes}\n- **Preferred Language**: ${language}\n\n*Think before you click, and always remember to be kind! ✨*`;
};

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const TOPICS = [
  { label: 'About Zeus', query: 'Tell me about Zeus Angelo Bautista' },
  { label: 'Experience', query: 'What is Zeus\'s work and internship experience?' },
  { label: 'Tech Stack', query: 'What is Zeus\'s tech stack and skills?' },
  { label: 'Projects', query: 'Can you give me a full overview of Zeus\'s projects?' },
  { label: 'Certifications', query: 'What verified certifications does Zeus have?' },
  { label: 'Contact', query: 'How can I contact or hire Zeus?' }
];

// Helper to format inline markdown (links, bold, code)
const renderInlineMarkdown = (text: string) => {
  const clean = stripEmojis(text);
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(clean)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBoldAndCode(clean.substring(lastIndex, match.index)));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={`link-${match.index}`}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C44900] font-semibold underline underline-offset-2 hover:text-[#9A3800] transition-colors inline-flex items-center gap-0.5 cursor-target"
      >
        <span>{linkText}</span>
        <ExternalLink size={11} className="inline opacity-70" />
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < clean.length) {
    parts.push(renderBoldAndCode(clean.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : clean;
};

// Helper for bold and inline code
const renderBoldAndCode = (text: string) => {
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return boldParts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {boldText}
        </strong>
      );
    }
    return part;
  });
};

// Structured ATS / Pretty Markdown Formatter Component
const FormattedMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <span className="font-sans text-sm md:text-base font-medium text-white break-words">{stripEmojis(content)}</span>;
  }

  const cleanContent = stripEmojis(content);
  const lines = cleanContent.split('\n');

  return (
    <div className="flex flex-col gap-1.5 text-xs md:text-sm text-slate-700 leading-relaxed font-sans w-full">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-1" />;
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="font-clash-bold text-sm sm:text-base text-slate-900 mt-2 mb-0.5 tracking-tight">
              {renderBoldAndCode(trimmed.slice(4))}
            </h3>
          );
        }

        // Heading 2
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="font-clash-bold text-base sm:text-lg text-slate-900 mt-2.5 mb-1 tracking-tight">
              {renderBoldAndCode(trimmed.slice(3))}
            </h2>
          );
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1.5 my-0.5">
              <span className="text-[#C44900] font-bold text-xs mt-0.5 select-none">•</span>
              <span className="flex-1 text-slate-800 leading-normal">
                {renderInlineMarkdown(trimmed.slice(2))}
              </span>
            </div>
          );
        }

        // Numbered list item (e.g. 1. 2. 3.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1.5 my-0.5">
              <span className="font-mono text-[11px] font-bold text-[#C44900] mt-0.5 select-none min-w-[14px]">
                {numberedMatch[1]}.
              </span>
              <span className="flex-1 text-slate-800 leading-normal">
                {renderInlineMarkdown(numberedMatch[2])}
              </span>
            </div>
          );
        }

        // Regular Paragraph
        return (
          <p key={index} className="text-slate-800 my-0.5 leading-normal">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isTypingTestOpen, setIsTypingTestOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore cooldown state from localStorage
  useEffect(() => {
    const expiry = localStorage.getItem(COOLDOWN_KEY);
    if (expiry) {
      const remaining = Math.ceil((parseInt(expiry, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldownRemaining(remaining);
      } else {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(COOLDOWN_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const activateCooldown = (seconds: number) => {
    const expiryTime = Date.now() + seconds * 1000;
    localStorage.setItem(COOLDOWN_KEY, expiryTime.toString());
    setCooldownRemaining(seconds);
  };

  // Footer visibility detector
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTypingTestOpen) {
          setIsTypingTestOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isTypingTestOpen]);

  // Text streaming simulator helper
  const streamTextIntoBotMessage = async (botMsgId: string, fullText: string) => {
    setIsStreaming(true);
    setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: '', timestamp: new Date() }]);

    const chunkSize = Math.max(1, Math.floor(fullText.length / 45));
    let currentIdx = 0;

    while (currentIdx < fullText.length) {
      currentIdx = Math.min(fullText.length, currentIdx + chunkSize);
      const displayedText = fullText.slice(0, currentIdx);

      setMessages(prev =>
        prev.map(m => (m.id === botMsgId ? { ...m, text: displayedText } : m))
      );

      scrollToBottom();
      await new Promise(r => setTimeout(r, 16));
    }

    setIsStreaming(false);
  };

  // Main Send Handler
  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    const cleanText = query.trim();

    if (!cleanText || isThinking || isStreaming || cooldownRemaining > 0) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: new Date()
    };

    // 1. Check for Profanity / Bad Words / NSFW / Slurs / Keyboard Mash
    // FLOW: Validate -> Thinking (0.5s) -> Reply (Typing Effect)
    if (containsBadContent(cleanText) || containsKeyboardMash(cleanText)) {
      setMessages(prev => [...prev, userMsg]);
      setInputValue('');
      setIsThinking(true);
      activateCooldown(COOLDOWN_SECONDS);

      await new Promise(r => setTimeout(r, 600));
      setIsThinking(false);

      const botMsgId = `bot-warn-${Date.now()}`;
      await streamTextIntoBotMessage(
        botMsgId,
        "The use of bad words, curse words, profanity, or inappropriate content is not allowed. Please keep our conversation professional and respectful."
      );
      return;
    }

    // 2. Check for Prompt Injection / System Prompt Extraction
    // FLOW: Validate -> Thinking (1.0s) -> Reply (Typing Effect)
    if (containsPromptInjection(cleanText)) {
      setMessages(prev => [...prev, userMsg]);
      setInputValue('');
      setIsThinking(true);
      activateCooldown(COOLDOWN_SECONDS);

      const [footprintReply] = await Promise.all([
        getClientFootprintMessage(),
        new Promise(r => setTimeout(r, 1000))
      ]);

      setIsThinking(false);

      const botMsgId = `bot-shield-${Date.now()}`;
      await streamTextIntoBotMessage(botMsgId, footprintReply);
      return;
    }

    // 3. Valid user query
    // FLOW: Validate -> Thinking (0.5s min) -> Reply (Typing Effect)
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsThinking(true);
    activateCooldown(COOLDOWN_SECONDS);

    try {
      const [response] = await Promise.all([
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map(m => ({
              sender: m.sender,
              text: m.text
            }))
          })
        }),
        new Promise(r => setTimeout(r, 500))
      ]);

      const data = await response.json();
      setIsThinking(false);

      const botMsgId = `bot-${Date.now()}`;

      if (response.ok && data.response) {
        await streamTextIntoBotMessage(botMsgId, data.response);
      } else if (response.status === 400 && data.isBlocked) {
        await streamTextIntoBotMessage(
          botMsgId,
          data.response || "The use of bad words, curse words, profanity, or inappropriate content is not allowed. Please keep our conversation professional and respectful."
        );
      } else {
        await streamTextIntoBotMessage(
          botMsgId,
          data.response || data.error || "Sorry, I could not process your request right now. Please try again later."
        );
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setIsThinking(false);
      const botMsgId = `bot-err-${Date.now()}`;
      await streamTextIntoBotMessage(
        botMsgId,
        "I am having trouble connecting right now. Please feel free to reach Zeus directly at bautistaangelozeus17@gmail.com!"
      );
    }
  };

  const isInputDisabled = isThinking || isStreaming || cooldownRemaining > 0;

  return (
    <>
      {/* Typing Test Modal Island */}
      <TypingTest
        isOpen={isTypingTestOpen}
        onClose={() => setIsTypingTestOpen(false)}
      />

      {/* Immersive Overlay Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#f8f8f8]/85 backdrop-blur-2xl px-6 py-8 sm:px-12 md:px-20 lg:px-28"
          >
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between max-w-4xl mx-auto flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#C44900]">
                  PORTFOLIO ASSISTANT
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                  Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shadow-2xs">ESC</kbd> to close
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-target w-10 h-10 rounded-full bg-black/5 hover:bg-black text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                  aria-label="Close ask modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Interactive Content Area */}
            {messages.length === 0 ? (
              /* Initial State: Big Prominent Prompt */
              <div className="w-full max-w-3xl mx-auto flex flex-col justify-center flex-grow py-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 my-auto"
                >
                  <h1 className="font-clash-semibold text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-none lowercase select-none">
                    what do you want to ask?
                  </h1>

                  {/* Input Row */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend(inputValue);
                    }}
                    className="relative w-full flex items-center"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={cooldownRemaining > 0 ? `Cooldown active (${cooldownRemaining}s)...` : "Type a question or choose below..."}
                      disabled={isInputDisabled}
                      className="w-full text-lg sm:text-2xl md:text-3xl font-sans text-slate-900 bg-transparent border-b-2 border-slate-300 focus:border-[#C44900] pb-3 pr-12 focus:outline-none transition-colors duration-200 placeholder:text-slate-400/70"
                    />
                    <button
                      type="submit"
                      disabled={isInputDisabled || !inputValue.trim()}
                      className="cursor-target absolute right-0 bottom-3 text-slate-400 hover:text-[#C44900] disabled:opacity-30 transition-colors cursor-pointer"
                      aria-label="Submit query"
                    >
                      <CornerDownLeft size={24} />
                    </button>
                  </form>

                  {/* Suggestion Chips */}
                  <div className="flex flex-col gap-2.5 mt-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Suggested Questions:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          disabled={isInputDisabled}
                          onClick={() => handleSend(t.query)}
                          className="cursor-target font-mono text-xs font-semibold rounded-full border border-slate-300 hover:border-[#C44900] bg-white hover:bg-orange-50 disabled:opacity-50 px-4 py-2 text-slate-700 hover:text-[#C44900] transition-all duration-200 shadow-2xs cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{t.label}</span>
                          <ArrowRight size={12} className="opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Conversation View: Messages + Typing + Input Box */
              <div className="w-full max-w-3xl mx-auto flex flex-col justify-center my-auto py-2">
                <div className="flex flex-col w-full">
                  {/* Messages Feed */}
                  <div
                    ref={scrollContainerRef}
                    data-lenis-prevent
                    className="overflow-y-auto overscroll-contain flex flex-col gap-3.5 max-h-[52vh] mb-4 pr-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col gap-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 px-1">
                          {msg.sender === 'user' ? (
                            <span>You</span>
                          ) : (
                            <span className="text-[#C44900] font-bold">Zeus's Assistant</span>
                          )}
                        </div>

                        {/* Text bubble */}
                        <div
                          className={`p-4 sm:p-5 rounded-2xl border ${
                            msg.sender === 'user'
                              ? 'w-fit max-w-[85%] sm:max-w-xl bg-black text-white border-black self-end'
                              : 'w-full max-w-2xl bg-white text-slate-800 border-slate-200/80 shadow-2xs'
                          }`}
                        >
                          <FormattedMessage content={msg.text} isUser={msg.sender === 'user'} />
                        </div>
                      </div>
                    ))}

                    {/* Thinking Indicator (Bouncing Dots) */}
                    {isThinking && (
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C44900] font-bold px-1">
                          Zeus's Assistant
                        </span>
                        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-[#C44900] animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-[#C44900] animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-[#C44900] animate-bounce" style={{ animationDelay: '300ms' }} />
                          <span className="font-mono text-xs text-slate-400 ml-1.5">Thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Input Bar */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-200/80 flex-shrink-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend(inputValue);
                      }}
                      className="relative w-full flex items-center"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={cooldownRemaining > 0 ? `Cooldown active (${cooldownRemaining}s)...` : "Ask a follow-up question..."}
                        disabled={isInputDisabled}
                        className="w-full text-sm sm:text-base font-sans text-slate-900 bg-white border border-slate-300 focus:border-[#C44900] rounded-xl px-4 py-2.5 pr-10 focus:outline-none transition-colors duration-200 shadow-2xs"
                      />
                      <button
                        type="submit"
                        disabled={isInputDisabled || !inputValue.trim()}
                        className="cursor-target absolute right-3 text-slate-400 hover:text-[#C44900] disabled:opacity-30 transition-colors cursor-pointer"
                        aria-label="Submit follow-up query"
                      >
                        <CornerDownLeft size={18} />
                      </button>
                    </form>

                    {/* Quick Suggestion Pills */}
                    <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {TOPICS.map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          disabled={isInputDisabled}
                          onClick={() => handleSend(t.query)}
                          className="cursor-target font-mono text-[10px] font-semibold rounded-full border border-slate-200 hover:border-[#C44900] bg-white hover:bg-orange-50 disabled:opacity-50 px-3 py-1 text-slate-700 hover:text-[#C44900] transition-all duration-200 cursor-pointer shadow-2xs shrink-0"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Stack (Bottom-Left) - Hidden when reaching footer */}
      <div className={`fixed bottom-6 left-6 z-50 flex flex-col gap-3 items-start transition-all duration-300 ${
        isFooterVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 pointer-events-auto translate-y-0'
      }`}>
        {/* 1. Typing Test Button (Top) */}
        <div className="group relative flex items-center">
          <button
            onClick={() => setIsTypingTestOpen(true)}
            className="cursor-target flex items-center h-12 rounded-full bg-black hover:bg-[#C44900] text-[#FAFAFA] transition-all duration-300 shadow-xl border border-white/10 cursor-pointer overflow-hidden max-w-[48px] group-hover:max-w-[200px] px-3.5 group-hover:pr-5 group-hover:pl-4"
            aria-label="Open typing test"
          >
            <div className="flex items-center justify-center shrink-0">
              <Keyboard size={19} className="text-white" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 ml-2.5 transition-opacity duration-200">
              Typing Test
            </span>
          </button>
        </div>

        {/* 2. Ask AI Button (Bottom) */}
        <div className="group relative flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-target flex items-center h-12 rounded-full bg-black hover:bg-[#C44900] text-[#FAFAFA] transition-all duration-300 shadow-xl border border-white/10 cursor-pointer overflow-hidden max-w-[48px] group-hover:max-w-[180px] px-3.5 group-hover:pr-5 group-hover:pl-4"
            aria-label="Open portfolio AI assistant"
          >
            <div className="flex items-center justify-center shrink-0">
              <Bot size={19} className="text-white" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 ml-2.5 transition-opacity duration-200">
              Ask AI
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
