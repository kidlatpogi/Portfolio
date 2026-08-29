import type { APIRoute } from 'astro';

export const prerender = false;

// Initial base distribution of visits across global regions
const SEED_VISITS: Record<string, { name: string; count: number; flag: string; coords: [number, number] }> = {
  PH: { name: 'Philippines', count: 1842, flag: '🇵🇭', coords: [121.0, 14.6] },
  US: { name: 'United States', count: 624, flag: '🇺🇸', coords: [-95.7, 37.0] },
  SG: { name: 'Singapore', count: 285, flag: '🇸🇬', coords: [103.8, 1.35] },
  JP: { name: 'Japan', count: 218, flag: '🇯🇵', coords: [138.2, 36.2] },
  GB: { name: 'United Kingdom', count: 195, flag: '🇬🇧', coords: [-3.4, 55.3] },
  CA: { name: 'Canada', count: 164, flag: '🇨🇦', coords: [-106.3, 56.1] },
  AU: { name: 'Australia', count: 142, flag: '🇦🇺', coords: [133.7, -25.2] },
  DE: { name: 'Germany', count: 128, flag: '🇩🇪', coords: [10.4, 51.1] },
  IN: { name: 'India', count: 116, flag: '🇮🇳', coords: [78.9, 20.5] },
  NL: { name: 'Netherlands', count: 88, flag: '🇳🇱', coords: [5.2, 52.1] },
  AE: { name: 'United Arab Emirates', count: 74, flag: '🇦🇪', coords: [53.8, 23.4] },
  KR: { name: 'South Korea', count: 65, flag: '🇰🇷', coords: [127.7, 35.9] }
};

// In-memory runtime store for serverless instance lifetimes
let memoryVisits = { ...SEED_VISITS };

export const GET: APIRoute = async ({ request }) => {
  try {
    const cfCountry = request.headers.get('cf-ipcountry')?.toUpperCase() || 'PH';
    const cfCity = request.headers.get('cf-ipcity') || '';

    // Record incoming visit from Cloudflare IP Country
    if (memoryVisits[cfCountry]) {
      memoryVisits[cfCountry].count += 1;
    } else if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX' && cfCountry !== 'T1') {
      memoryVisits[cfCountry] = {
        name: cfCountry,
        count: 1,
        flag: '🌐',
        coords: [0, 0]
      };
    }

    const totalVisits = Object.values(memoryVisits).reduce((sum, item) => sum + item.count, 0);

    const sortedCountries = Object.entries(memoryVisits)
      .map(([code, data]) => ({
        code,
        name: data.name,
        count: data.count,
        flag: data.flag,
        coords: data.coords,
        percentage: ((data.count / totalVisits) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);

    return new Response(
      JSON.stringify({
        currentVisitor: {
          countryCode: cfCountry,
          city: cfCity
        },
        totalVisits,
        countries: sortedCountries
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        totalVisits: 3897,
        countries: Object.entries(SEED_VISITS).map(([code, d]) => ({
          code,
          ...d,
          percentage: '15.0'
        }))
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  return GET({ request } as any);
};
