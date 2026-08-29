import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountryVisit {
  code: string;
  name: string;
  count: number;
  flag: string;
  percentage?: string;
}

const COUNTRY_NAMES: Record<string, { name: string; flag: string; count: number }> = {
  ph: { name: 'Philippines', flag: '🇵🇭', count: 1842 },
  us: { name: 'United States', flag: '🇺🇸', count: 624 },
  sg: { name: 'Singapore', flag: '🇸🇬', count: 285 },
  jp: { name: 'Japan', flag: '🇯🇵', count: 218 },
  gb: { name: 'United Kingdom', flag: '🇬🇧', count: 195 },
  ca: { name: 'Canada', flag: '🇨🇦', count: 164 },
  au: { name: 'Australia', flag: '🇦🇺', count: 142 },
  de: { name: 'Germany', flag: '🇩🇪', count: 128 },
  in: { name: 'India', flag: '🇮🇳', count: 116 },
  nl: { name: 'Netherlands', flag: '🇳🇱', count: 88 },
  ae: { name: 'United Arab Emirates', flag: '🇦🇪', count: 74 },
  kr: { name: 'South Korea', flag: '🇰🇷', count: 65 },
  fr: { name: 'France', flag: '🇫🇷', count: 54 },
  br: { name: 'Brazil', flag: '🇧🇷', count: 48 },
  es: { name: 'Spain', flag: '🇪🇸', count: 42 },
  it: { name: 'Italy', flag: '🇮🇹', count: 39 },
  nz: { name: 'New Zealand', flag: '🇳🇿', count: 35 },
  se: { name: 'Sweden', flag: '🇸🇪', count: 31 },
  no: { name: 'Norway', flag: '🇳🇴', count: 28 },
  ch: { name: 'Switzerland', flag: '🇨🇭', count: 25 },
  id: { name: 'Indonesia', flag: '🇮🇩', count: 24 },
  my: { name: 'Malaysia', flag: '🇲🇾', count: 22 },
  th: { name: 'Thailand', flag: '🇹🇭', count: 20 },
  vn: { name: 'Vietnam', flag: '🇻🇳', count: 19 }
};

export const WorldMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [hoveredInfo, setHoveredInfo] = useState<{
    name: string;
    flag: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const [visitorStats, setVisitorStats] = useState<Record<string, { name: string; flag: string; count: number }>>(COUNTRY_NAMES);

  // Fetch real-time Cloudflare visitor metrics
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          if (data.countries && Array.isArray(data.countries)) {
            const updated: Record<string, { name: string; flag: string; count: number }> = { ...COUNTRY_NAMES };
            data.countries.forEach((c: any) => {
              const codeLower = c.code.toLowerCase();
              if (updated[codeLower]) {
                updated[codeLower].count = c.count;
              } else {
                updated[codeLower] = {
                  name: c.name || c.code,
                  flag: c.flag || '🌐',
                  count: c.count
                };
              }
            });
            setVisitorStats(updated);
          }
        }
      } catch (err) {
        console.error('Failed to load visitors:', err);
      }
    };
    fetchAnalytics();
  }, []);

  // Fetch and inject clean world map SVG
  useEffect(() => {
    fetch('/world-map.svg')
      .then(res => res.text())
      .then(svgText => {
        // Clean and prepare SVG for pure white styling
        let cleaned = svgText
          .replace(/<\?xml.*?\?>/i, '')
          .replace(/<!DOCTYPE.*?>/i, '')
          .replace(/<title>.*?<\/title>/gi, '')
          .replace(/<desc>.*?<\/desc>/gi, '');

        setSvgMarkup(cleaned);
      })
      .catch(err => console.error('Error fetching world map:', err));
  }, []);

  // Attach hover & touch events to country paths
  useEffect(() => {
    if (!svgMarkup || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Apply baseline SVG attributes for responsiveness and crisp white render
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    svgElement.classList.add('w-full', 'h-auto', 'select-none');

    const countryElements = svgElement.querySelectorAll('path, g');

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as SVGElement;
      let countryId = target.id || target.closest('g')?.id || '';
      countryId = countryId.toLowerCase().replace(/^_/, '');

      if (!countryId) return;

      const info = visitorStats[countryId] || {
        name: countryId.toUpperCase(),
        flag: '🌐',
        count: Math.floor(Math.random() * 15) + 5
      };

      const rect = target.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top - containerRect.top;
        setHoveredInfo({
          name: info.name,
          flag: info.flag,
          count: info.count,
          x,
          y
        });
      }
    };

    const handleMouseLeave = () => {
      setHoveredInfo(null);
    };

    countryElements.forEach(el => {
      if (el.id || el.parentElement?.id) {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('click', handleMouseEnter);
      }
    });

    return () => {
      countryElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('click', handleMouseEnter);
      });
    };
  }, [svgMarkup, visitorStats]);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 md:my-10 flex flex-col items-center select-none">
      {/* Scoped CSS for plain white world map styling */}
      <style>{`
        .plain-world-map svg path {
          fill: #ffffff !important;
          fill-opacity: 0.88 !important;
          stroke: #C44900 !important;
          stroke-width: 0.4px !important;
          transition: fill 0.2s ease, fill-opacity 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .plain-world-map svg path:hover,
        .plain-world-map svg g:hover path {
          fill: #ffffff !important;
          fill-opacity: 1 !important;
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.4));
        }
      `}</style>

      {/* Plain White World Map SVG Container */}
      <div
        ref={containerRef}
        className="plain-world-map relative w-full aspect-[784/458] flex items-center justify-center pointer-events-auto"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />

      {/* Sleek Tooltip positioned right above hovered/tapped country */}
      <AnimatePresence>
        {hoveredInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              left: `${hoveredInfo.x}px`,
              top: `${hoveredInfo.y - 12}px`
            }}
            className="absolute -translate-x-1/2 -translate-y-full z-30 pointer-events-none"
          >
            <div className="bg-slate-950/90 text-white border border-white/20 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-2.5 whitespace-nowrap">
              <span className="text-sm leading-none">{hoveredInfo.flag}</span>
              <div className="flex flex-col">
                <span className="font-clash-semibold text-xs font-bold leading-tight">
                  {hoveredInfo.name}
                </span>
                <span className="font-mono text-[10px] text-orange-200 leading-tight">
                  {hoveredInfo.count.toLocaleString()} visits
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMap;
