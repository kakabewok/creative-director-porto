/**
 * Extracts the most recent (largest) year from a comma-separated year string.
 *
 * Examples:
 *   "2012,2024,2025" → 2025
 *   "2021,2023"      → 2023
 *   "2019"           → 2019
 *   undefined / ""   → 0
 */
export function getLatestYear(yearField: string | undefined | null): number {
  if (!yearField) return 0

  const years = yearField
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n))

  return years.length > 0 ? Math.max(...years) : 0
}
