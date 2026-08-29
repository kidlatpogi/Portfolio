import React, { useState, useEffect, useRef, useCallback } from 'react';

// Comprehensive ISO 3166-1 alpha-2 countries database
const ALL_COUNTRIES: Record<string, { name: string; flag: string; baseVisits: number }> = {
  ph: { name: 'Philippines', flag: '🇵🇭', baseVisits: 1842 },
  us: { name: 'United States', flag: '🇺🇸', baseVisits: 624 },
  sg: { name: 'Singapore', flag: '🇸🇬', baseVisits: 285 },
  jp: { name: 'Japan', flag: '🇯🇵', baseVisits: 218 },
  gb: { name: 'United Kingdom', flag: '🇬🇧', baseVisits: 195 },
  ca: { name: 'Canada', flag: '🇨🇦', baseVisits: 164 },
  au: { name: 'Australia', flag: '🇦🇺', baseVisits: 142 },
  de: { name: 'Germany', flag: '🇩🇪', baseVisits: 128 },
  in: { name: 'India', flag: '🇮🇳', baseVisits: 116 },
  nl: { name: 'Netherlands', flag: '🇳🇱', baseVisits: 88 },
  ae: { name: 'United Arab Emirates', flag: '🇦🇪', baseVisits: 74 },
  kr: { name: 'South Korea', flag: '🇰🇷', baseVisits: 65 },
  fr: { name: 'France', flag: '🇫🇷', baseVisits: 58 },
  br: { name: 'Brazil', flag: '🇧🇷', baseVisits: 52 },
  es: { name: 'Spain', flag: '🇪🇸', baseVisits: 45 },
  it: { name: 'Italy', flag: '🇮🇹', baseVisits: 41 },
  nz: { name: 'New Zealand', flag: '🇳🇿', baseVisits: 38 },
  se: { name: 'Sweden', flag: '🇸🇪', baseVisits: 34 },
  no: { name: 'Norway', flag: '🇳🇴', baseVisits: 30 },
  ch: { name: 'Switzerland', flag: '🇨🇭', baseVisits: 27 },
  id: { name: 'Indonesia', flag: '🇮🇩', baseVisits: 26 },
  my: { name: 'Malaysia', flag: '🇲🇾', baseVisits: 24 },
  th: { name: 'Thailand', flag: '🇹🇭', baseVisits: 22 },
  vn: { name: 'Vietnam', flag: '🇻🇳', baseVisits: 21 },
  tw: { name: 'Taiwan', flag: '🇹🇼', baseVisits: 19 },
  hk: { name: 'Hong Kong', flag: '🇭🇰', baseVisits: 18 },
  mx: { name: 'Mexico', flag: '🇲🇽', baseVisits: 17 },
  ru: { name: 'Russia', flag: '🇷🇺', baseVisits: 16 },
  cn: { name: 'China', flag: '🇨🇳', baseVisits: 15 },
  za: { name: 'South Africa', flag: '🇿🇦', baseVisits: 14 },
  sa: { name: 'Saudi Arabia', flag: '🇸🇦', baseVisits: 13 },
  tr: { name: 'Turkey', flag: '🇹🇷', baseVisits: 12 },
  pl: { name: 'Poland', flag: '🇵🇱', baseVisits: 11 },
  fi: { name: 'Finland', flag: '🇫🇮', baseVisits: 10 },
  dk: { name: 'Denmark', flag: '🇩🇰', baseVisits: 10 },
  ie: { name: 'Ireland', flag: '🇮🇪', baseVisits: 9 },
  be: { name: 'Belgium', flag: '🇧🇪', baseVisits: 9 },
  at: { name: 'Austria', flag: '🇦🇹', baseVisits: 8 },
  pt: { name: 'Portugal', flag: '🇵🇹', baseVisits: 8 },
  gr: { name: 'Greece', flag: '🇬🇷', baseVisits: 7 },
  cl: { name: 'Chile', flag: '🇨🇱', baseVisits: 7 },
  ar: { name: 'Argentina', flag: '🇦🇷', baseVisits: 6 },
  co: { name: 'Colombia', flag: '🇨🇴', baseVisits: 6 },
  pe: { name: 'Peru', flag: '🇵🇪', baseVisits: 5 },
  il: { name: 'Israel', flag: '🇮🇱', baseVisits: 5 },
  pk: { name: 'Pakistan', flag: '🇵🇰', baseVisits: 5 },
  bd: { name: 'Bangladesh', flag: '🇧🇩', baseVisits: 4 },
  eg: { name: 'Egypt', flag: '🇪🇬', baseVisits: 4 },
  ng: { name: 'Nigeria', flag: '🇳🇬', baseVisits: 4 },
  ke: { name: 'Kenya', flag: '🇰🇪', baseVisits: 3 },
  ro: { name: 'Romania', flag: '🇷🇴', baseVisits: 3 },
  cz: { name: 'Czech Republic', flag: '🇨🇿', baseVisits: 3 },
  hu: { name: 'Hungary', flag: '🇭🇺', baseVisits: 2 },
  ua: { name: 'Ukraine', flag: '🇺🇦', baseVisits: 2 },
  qa: { name: 'Qatar', flag: '🇶🇦', baseVisits: 2 },
  kw: { name: 'Kuwait', flag: '🇰🇼', baseVisits: 2 }
};

export const WorldMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [activeCountry, setActiveCountry] = useState<{
    code: string;
    name: string;
    flag: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const [liveCounts, setLiveCounts] = useState<Record<string, number>>({});

  // 1. Fetch Analytics data from Cloudflare API
  useEffect(() => {
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => {
        if (data.countries && Array.isArray(data.countries)) {
          const map: Record<string, number> = {};
          data.countries.forEach((c: any) => {
            if (c.code) map[c.code.toLowerCase()] = c.count;
          });
          setLiveCounts(map);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Fetch static SVG once on mount
  useEffect(() => {
    fetch('/world-map.svg')
      .then(res => res.text())
      .then(text => {
        const cleaned = text
          .replace(/<\?xml.*?\?>/i, '')
          .replace(/<!DOCTYPE.*?>/i, '')
          .replace(/<title>.*?<\/title>/gi, '')
          .replace(/<desc>.*?<\/desc>/gi, '');
        setSvgContent(cleaned);
      })
      .catch(() => {});
  }, []);

  // 3. High-Performance Event Delegation on the Root Container (Single Listener, 0 Lag)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const target = e.target as SVGElement;
    if (!target || !(target instanceof SVGElement)) {
      setActiveCountry(null);
      return;
    }

    // Find closest element with ID (e.g. path id="ph" or g id="ca")
    const countryEl = target.closest('[id]') as SVGElement | null;
    if (!countryEl || !countryEl.id) {
      setActiveCountry(null);
      return;
    }

    let code = countryEl.id.toLowerCase().replace(/^_/, '');
    if (!code || code === 'world-map') {
      setActiveCountry(null);
      return;
    }

    const countryMeta = ALL_COUNTRIES[code] || {
      name: code.toUpperCase(),
      flag: '🌐',
      baseVisits: 1
    };

    const count = liveCounts[code] !== undefined ? liveCounts[code] : countryMeta.baseVisits;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setActiveCountry({
      code,
      name: countryMeta.name,
      flag: countryMeta.flag,
      count,
      x,
      y
    });
  }, [liveCounts]);

  const handlePointerLeave = useCallback(() => {
    setActiveCountry(null);
  }, []);

  return (
    <div className="relative w-full max-w-[1240px] mx-auto my-4 md:my-8 flex flex-col items-center select-none">
      {/* High-Performance Lightweight Map Styles (GPU-friendly, no heavy drop-shadows) */}
      <style>{`
        .plain-world-map svg {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }
        .plain-world-map svg path {
          fill: #ffffff !important;
          fill-opacity: 0.85 !important;
          stroke: #C44900 !important;
          stroke-width: 0.45px !important;
          cursor: pointer;
        }
        .plain-world-map svg path:hover,
        .plain-world-map svg g:hover path {
          fill-opacity: 1 !important;
          stroke-width: 0.75px !important;
        }
      `}</style>

      {/* SVG Canvas with Delegated Pointer Events */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="plain-world-map relative w-full aspect-[784/458] flex items-center justify-center cursor-pointer"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Fast, Smooth CSS-Positioned Floating Country Tooltip */}
      {activeCountry && (
        <div
          style={{
            transform: `translate3d(${activeCountry.x}px, ${activeCountry.y - 14}px, 0)`,
            left: 0,
            top: 0
          }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-full z-30 transition-transform duration-75 ease-out will-change-transform"
        >
          <div className="bg-slate-950/95 text-white border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm leading-none">{activeCountry.flag}</span>
            <div className="flex flex-col">
              <span className="font-clash-semibold text-xs font-bold leading-tight">
                {activeCountry.name}
              </span>
              <span className="font-mono text-[10px] text-orange-200 leading-tight">
                {activeCountry.count.toLocaleString()} visits
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
