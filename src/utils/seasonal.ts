export type HolidaySeason = 'christmas' | 'none';

/**
 * Calculates the current holiday season in the Philippines:
 * - Christmas Season: September 1 to December 31
 * - Normal: January 1 to August 31
 */
export function getHolidaySeason(date: Date = new Date()): HolidaySeason {
  const month = date.getMonth(); // 8 = Sep, 9 = Oct, 10 = Nov, 11 = Dec
  if (month >= 8 && month <= 11) {
    return 'christmas';
  }
  return 'none';
}

/**
 * Calculates the exact milliseconds until the next seasonal change boundary
 * without polling intervals:
 * - If currently Christmas (Sep 1 - Dec 31): Next boundary is Jan 1 00:00:00 of next year.
 * - If currently Normal (Jan 1 - Aug 31): Next boundary is Sep 1 00:00:00 of current year.
 */
export function getMsUntilNextBoundary(now: Date = new Date()): number {
  const year = now.getFullYear();
  const month = now.getMonth();

  if (month >= 8 && month <= 11) {
    // Target: Jan 1 00:00:00 of next year
    const nextBoundary = new Date(year + 1, 0, 1, 0, 0, 0, 0);
    return Math.max(nextBoundary.getTime() - now.getTime(), 1000);
  } else {
    // Target: Sep 1 00:00:00 of current year
    const nextBoundary = new Date(year, 8, 1, 0, 0, 0, 0);
    return Math.max(nextBoundary.getTime() - now.getTime(), 1000);
  }
}
