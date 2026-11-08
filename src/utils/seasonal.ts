export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type SeasonMode = 'auto' | Season;

export interface SeasonInfo {
  name: string;
  period: string;
  monthsRange: string;
  icon: string;
  description: string;
  accentColor: string;
}

export const SEASON_METADATA: Record<Season, SeasonInfo> = {
  spring: {
    name: 'Spring',
    period: 'Feb – May',
    monthsRange: 'Months 1 to 4',
    icon: '🌸',
    description: 'Soft pink cherry blossom petals & dandelion seeds drifting gently with wind vectors',
    accentColor: '#EC4899',
  },
  summer: {
    name: 'Summer',
    period: 'Jun – Aug',
    monthsRange: 'Months 5 to 7',
    icon: '☀️',
    description: 'Ambient slow-moving golden motes floating upward in daylight glow',
    accentColor: '#F59E0B',
  },
  autumn: {
    name: 'Autumn',
    period: 'Sep – Nov',
    monthsRange: 'Months 8 to 10',
    icon: '🍂',
    description: 'Amber & burnt-orange leaves tumbling down with rotation physics',
    accentColor: '#EA580C',
  },
  winter: {
    name: 'Winter',
    period: 'Dec – Jan',
    monthsRange: 'Months 11 & 0',
    icon: '❄️',
    description: 'Gentle, crisp falling snow particles',
    accentColor: '#38BDF8',
  },
};

export const SEASONS_ORDER: Season[] = ['spring', 'summer', 'autumn', 'winter'];

/**
 * Returns the season corresponding to a given 0-indexed month (0 = Jan, 11 = Dec):
 * - Spring: Feb (1) – May (4)
 * - Summer: Jun (5) – Aug (7)
 * - Autumn: Sep (8) – Nov (10)
 * - Winter: Dec (11) – Jan (0)
 */
export function getSeasonFromMonth(month: number): Season {
  if (month >= 1 && month <= 4) {
    return 'spring';
  } else if (month >= 5 && month <= 7) {
    return 'summer';
  } else if (month >= 8 && month <= 10) {
    return 'autumn';
  } else {
    return 'winter';
  }
}

/**
 * Returns the season derived from the current system date.
 */
export function getCurrentSeason(date: Date = new Date()): Season {
  return getSeasonFromMonth(date.getMonth());
}

/**
 * Calculates the exact milliseconds until the next seasonal change boundary:
 * - Spring (Feb 1 – May 31): Next boundary is Jun 1 00:00:00 of current year.
 * - Summer (Jun 1 – Aug 31): Next boundary is Sep 1 00:00:00 of current year.
 * - Autumn (Sep 1 – Nov 30): Next boundary is Dec 1 00:00:00 of current year.
 * - Winter (Dec 1 – Jan 31):
 *     - If month === 11 (December): Next boundary is Feb 1 00:00:00 of next year.
 *     - If month === 0 (January): Next boundary is Feb 1 00:00:00 of current year.
 */
export function getMsUntilNextBoundary(now: Date = new Date()): number {
  const year = now.getFullYear();
  const month = now.getMonth();

  let nextBoundary: Date;
  if (month >= 1 && month <= 4) {
    nextBoundary = new Date(year, 5, 1, 0, 0, 0, 0); // Jun 1
  } else if (month >= 5 && month <= 7) {
    nextBoundary = new Date(year, 8, 1, 0, 0, 0, 0); // Sep 1
  } else if (month >= 8 && month <= 10) {
    nextBoundary = new Date(year, 11, 1, 0, 0, 0, 0); // Dec 1
  } else if (month === 11) {
    nextBoundary = new Date(year + 1, 1, 1, 0, 0, 0, 0); // Feb 1 next year
  } else {
    nextBoundary = new Date(year, 1, 1, 0, 0, 0, 0); // Feb 1 current year
  }

  return Math.max(nextBoundary.getTime() - now.getTime(), 1000);
}

const STORAGE_KEY = 'portfolio_season_override';

export function getSeasonOverride(): Season | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = sessionStorage.getItem(STORAGE_KEY);
    if (val === 'spring' || val === 'summer' || val === 'autumn' || val === 'winter') {
      return val;
    }
  } catch {}
  return null;
}

export function setSeasonOverride(target: Season | 'auto'): void {
  if (typeof window === 'undefined') return;
  try {
    if (target === 'auto') {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, target);
    }
  } catch {}

  window.dispatchEvent(
    new CustomEvent('seasonChange', {
      detail: { override: target === 'auto' ? null : target },
    })
  );
}

export function getNextSeason(current: Season): Season {
  const idx = SEASONS_ORDER.indexOf(current);
  return SEASONS_ORDER[(idx + 1) % SEASONS_ORDER.length];
}
