export type HolidaySeason = 'none' | 'christmas' | 'newyear';

/**
 * Determines the active holiday season based on the Philippine holiday calendar:
 * - Christmas (Sept 1 to Dec 30): Snowfall + Santa Hat
 * - New Year (Dec 31 to Jan 2): Fireworks Celebration
 * - Normal (Jan 3 to Aug 31): Regular Portfolio
 */
export const getHolidaySeason = (date = new Date()): HolidaySeason => {
  const month = date.getMonth(); // 0 = Jan, 8 = Sep, 11 = Dec
  const day = date.getDate();

  // Christmas season in Philippines: Sept 1 to Dec 30
  if (
    month === 8 ||
    month === 9 ||
    month === 10 ||
    (month === 11 && day <= 30)
  ) {
    return 'christmas';
  }

  // New Year season in Philippines: Dec 31 to Jan 2
  if (
    (month === 11 && day >= 31) ||
    (month === 0 && day <= 2)
  ) {
    return 'newyear';
  }

  return 'none';
};

/**
 * Calculates milliseconds until the next holiday boundary so the system
 * never polls in a loop and only triggers exactly at the target dates.
 */
export const getMsUntilNextBoundary = (now = new Date()): number => {
  const currentYear = now.getFullYear();

  // Boundary 1: Sept 1 of current year
  const sept1 = new Date(currentYear, 8, 1, 0, 0, 0, 0);
  // Boundary 2: Dec 31 of current year (Dec 30 23:59:59.999 -> Dec 31 00:00)
  const dec31 = new Date(currentYear, 11, 31, 0, 0, 0, 0);
  // Boundary 3: Jan 3 of next year (or current year)
  const jan3 = new Date(currentYear, 0, 3, 0, 0, 0, 0);
  const nextJan3 = new Date(currentYear + 1, 0, 3, 0, 0, 0, 0);

  const targets = [jan3, sept1, dec31, nextJan3]
    .map(d => d.getTime() - now.getTime())
    .filter(diff => diff > 0);

  return targets.length > 0 ? Math.min(...targets) : 24 * 60 * 60 * 1000;
};
