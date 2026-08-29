import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Activity } from 'lucide-react';

interface CountryVisit {
  code: string;
  name: string;
  count: number;
  flag: string;
  coords: [number, number]; // [lng, lat]
  percentage: string;
}

// Equirectangular projection mapping helper (viewBox 1000x500)
const projectCoords = (lng: number, lat: number, width = 1000, height = 500) => {
  const x = ((lng + 180) * (width / 360));
  // Mercator-adjusted linear latitude clamping
  const clampedLat = Math.max(-65, Math.min(80, lat));
  const y = ((90 - clampedLat) * (height / 180));
  return { x, y };
};

// Top visitor pin hubs with accurate geo coordinates
const DEFAULT_LOCATIONS: CountryVisit[] = [
  { code: 'PH', name: 'Philippines', count: 1842, flag: '🇵🇭', coords: [121.0, 14.6], percentage: '47.3' },
  { code: 'US', name: 'United States', count: 624, flag: '🇺🇸', coords: [-95.7, 37.0], percentage: '16.0' },
  { code: 'SG', name: 'Singapore', count: 285, flag: '🇸🇬', coords: [103.8, 1.35], percentage: '7.3' },
  { code: 'JP', name: 'Japan', count: 218, flag: '🇯🇵', coords: [138.2, 36.2], percentage: '5.6' },
  { code: 'GB', name: 'United Kingdom', count: 195, flag: '🇬🇧', coords: [-3.4, 55.3], percentage: '5.0' },
  { code: 'CA', name: 'Canada', count: 164, flag: '🇨🇦', coords: [-106.3, 56.1], percentage: '4.2' },
  { code: 'AU', name: 'Australia', count: 142, flag: '🇦🇺', coords: [133.7, -25.2], percentage: '3.6' },
  { code: 'DE', name: 'Germany', count: 128, flag: '🇩🇪', coords: [10.4, 51.1], percentage: '3.3' },
  { code: 'IN', name: 'India', count: 116, flag: '🇮🇳', coords: [78.9, 20.5], percentage: '3.0' },
  { code: 'NL', name: 'Netherlands', count: 88, flag: '🇳🇱', coords: [5.2, 52.1], percentage: '2.3' },
  { code: 'AE', name: 'United Arab Emirates', count: 74, flag: '🇦🇪', coords: [53.8, 23.4], percentage: '1.9' },
  { code: 'KR', name: 'South Korea', count: 65, flag: '🇰🇷', coords: [127.7, 35.9], percentage: '1.7' }
];

export const WorldMap: React.FC = () => {
  const [countries, setCountries] = useState<CountryVisit[]>(DEFAULT_LOCATIONS);
  const [totalVisits, setTotalVisits] = useState<number>(3897);
  const [hoveredCountry, setHoveredCountry] = useState<CountryVisit | null>(null);
  const [activeCountry, setActiveCountry] = useState<string>('PH');
  const [userCountry, setUserCountry] = useState<string>('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          if (data.countries && data.countries.length > 0) {
            setCountries(data.countries);
          }
          if (data.totalVisits) {
            setTotalVisits(data.totalVisits);
          }
          if (data.currentVisitor?.countryCode) {
            setUserCountry(data.currentVisitor.countryCode);
            setActiveCountry(data.currentVisitor.countryCode);
          }
        }
      } catch (err) {
        console.error('Failed to fetch visitor analytics:', err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-black/15 backdrop-blur-md rounded-3xl border border-white/20 p-5 sm:p-8 md:p-10 my-10 shadow-2xl relative overflow-hidden">
      {/* Header Info Row */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/90">
              Live Global Traffic
            </span>
          </div>
          <h4 className="font-clash-semibold text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Worldwide Portfolio Visitors
          </h4>
        </div>

        {/* Global Stats Counter */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm shadow-sm">
          <Globe className="w-4 h-4 text-white" />
          <div className="flex flex-col items-start">
            <span className="font-mono text-[10px] uppercase tracking-wider text-orange-100/70 font-semibold">
              Total Visitors
            </span>
            <span className="font-mono text-base sm:text-lg font-bold text-white leading-none">
              {totalVisits.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive White World Map Canvas */}
      <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto flex items-center justify-center my-2 select-none">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full filter drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="world-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="0.8" />
            </pattern>
            {/* Radial Glow */}
            <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="500" fill="url(#world-grid)" />

          {/* Continents & Landmass Vector Paths (Crisp Stylized White) */}
          <g className="fill-white/85 stroke-white/40" strokeWidth="0.6" strokeLinejoin="round">
            {/* North America */}
            <path d="M 120,70 Q 150,55 220,60 Q 280,65 310,110 Q 290,140 260,170 Q 230,210 200,230 Q 170,200 140,160 Q 110,120 120,70 Z" />
            <path d="M 170,120 Q 240,130 250,190 Q 210,230 180,240 Q 160,210 160,170 Z" />
            {/* Central America & Caribbean */}
            <path d="M 200,235 Q 220,260 250,285 Q 240,295 220,280 Q 195,255 200,235 Z" />
            <circle cx="270" cy="245" r="3" />
            <circle cx="285" cy="250" r="2.5" />

            {/* Greenland */}
            <path d="M 330,40 Q 370,30 395,55 Q 380,95 345,95 Q 320,80 330,40 Z" />

            {/* South America */}
            <path d="M 255,285 Q 320,280 350,330 Q 340,400 290,460 Q 270,450 260,390 Q 240,330 255,285 Z" />

            {/* Europe */}
            <path d="M 450,90 Q 520,75 550,115 Q 530,160 480,165 Q 440,150 450,90 Z" />
            {/* United Kingdom & Ireland */}
            <path d="M 435,100 Q 450,95 448,120 Q 430,125 435,100 Z" />
            <circle cx="422" cy="115" r="3.5" />
            {/* Scandinavia */}
            <path d="M 490,50 Q 530,45 540,85 Q 515,110 495,85 Z" />

            {/* Africa */}
            <path d="M 450,175 Q 545,170 575,230 Q 570,310 525,380 Q 480,385 455,310 Q 430,240 450,175 Z" />
            {/* Madagascar */}
            <path d="M 590,320 Q 605,325 595,360 Q 580,355 590,320 Z" />

            {/* Asia (Mainland + Middle East + Siberia) */}
            <path d="M 545,85 Q 680,60 840,80 Q 880,130 830,190 Q 750,190 710,240 Q 640,240 590,200 Q 540,160 545,85 Z" />
            <path d="M 560,170 Q 620,175 635,225 Q 580,240 560,170 Z" />
            <path d="M 660,190 Q 730,190 750,270 Q 700,290 670,240 Z" /> {/* India */}
            <path d="M 740,180 Q 840,170 850,250 Q 790,280 750,240 Z" /> {/* East & SE Asia */}

            {/* Japan */}
            <path d="M 870,140 Q 890,150 880,185 Q 865,175 870,140 Z" />

            {/* Southeast Asia Islands & Philippines */}
            <path d="M 780,270 Q 820,275 805,305 Q 770,295 780,270 Z" />
            {/* Philippines Archipelago */}
            <g className="fill-white stroke-white" strokeWidth="0.8">
              <circle cx="836" cy="242" r="3.5" />
              <circle cx="840" cy="254" r="3" />
              <circle cx="835" cy="265" r="4" />
            </g>

            {/* Australia & New Zealand */}
            <path d="M 790,340 Q 890,335 905,390 Q 870,445 800,430 Q 765,385 790,340 Z" />
            <path d="M 930,410 Q 945,410 935,445 Q 920,440 930,410 Z" />
          </g>

          {/* Active Country Radar Beacons & Coordinate Markers */}
          {countries.map((c) => {
            if (!c.coords || c.coords.length !== 2) return null;
            const { x, y } = projectCoords(c.coords[0], c.coords[1]);
            const isHovered = hoveredCountry?.code === c.code;
            const isHome = c.code === 'PH';
            const isUser = c.code === userCountry;

            return (
              <g
                key={c.code}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredCountry(c)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => setHoveredCountry(c)}
              >
                {/* Outer Ping Animation */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHome ? 16 : 10}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="animate-ping origin-center opacity-40"
                  style={{ animationDuration: isHome ? '2s' : '3s' }}
                />

                {/* Radar Glow Disc */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 12 : isHome ? 8 : 5.5}
                  fill="#ffffff"
                  className="transition-all duration-300 shadow-lg"
                  opacity={isHovered ? 1 : 0.95}
                />

                {/* Inner Accent Core */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 5 : isHome ? 3.5 : 2.5}
                  fill="#C44900"
                  className="transition-all duration-300"
                />

                {/* Label for Top Hubs on Desktop */}
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className="hidden md:inline-block font-mono text-[9px] font-bold fill-white pointer-events-none drop-shadow-md select-none"
                >
                  {c.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Country Tooltip */}
        {hoveredCountry && (() => {
          const { x, y } = projectCoords(hoveredCountry.coords[0], hoveredCountry.coords[1]);
          // Calculate percentage for CSS placement
          const leftPercent = (x / 1000) * 100;
          const topPercent = (y / 500) * 100;

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              style={{
                left: `${Math.min(85, Math.max(15, leftPercent))}%`,
                top: `${Math.max(12, topPercent - 15)}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-full z-30 pointer-events-none"
            >
              <div className="bg-slate-950/95 text-white border border-white/25 backdrop-blur-xl px-3.5 py-2.5 rounded-xl shadow-2xl flex flex-col gap-1 min-w-[150px]">
                <div className="flex items-center gap-2 border-b border-white/15 pb-1">
                  <span className="text-base leading-none">{hoveredCountry.flag}</span>
                  <span className="font-clash-semibold text-xs font-bold tracking-wide">
                    {hoveredCountry.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-orange-200">
                  <span>Visitors:</span>
                  <span className="font-bold text-white">{hoveredCountry.count.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Traffic Share:</span>
                  <span className="text-orange-300 font-semibold">{hoveredCountry.percentage}%</span>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </div>

      {/* Bottom Breakdown Carousel / Stats Bar */}
      <div className="w-full flex flex-col gap-3 mt-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-orange-100/80 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-white" />
            Top Visiting Regions:
          </span>
          <span className="font-mono text-[10px] text-white/60">
            Hover or tap pins to inspect
          </span>
        </div>

        {/* Scrollable Country Pills */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {countries.slice(0, 8).map((country) => {
            const isSelected = hoveredCountry?.code === country.code;
            return (
              <button
                key={country.code}
                onClick={() => setHoveredCountry(country)}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                className={`cursor-target flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-950 border-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <span>{country.flag}</span>
                <span className="font-bold">{country.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-[#C44900] text-white' : 'bg-white/20 text-orange-100'
                }`}>
                  {country.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
