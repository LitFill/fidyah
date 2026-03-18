/**
 * Calculate fidyah based on Syafii Madzhab.
 * @param {Object} params
 * @param {number} params.daysMissed - Number of days of fasting missed.
 * @param {number} params.yearsElapsed - Number of Ramadans passed since the debt occurred.
 * @param {number} [params.muddToKg=0.75] - Conversion factor from Mudd to kilograms.
 * @returns {Object} result - The calculation result.
 * @returns {number} result.totalMudds - Total fidyah in Mudd.
 * @returns {number} result.totalWeightKg - Total fidyah in kilograms.
 */
export function calculateFidyah({ daysMissed, yearsElapsed, muddToKg = 0.75 }) {
  if (daysMissed < 0) return { totalMudds: 0, totalWeightKg: 0 }
  
  // Syafii Madzhab rule: Fidyah doubles/multiplies for each year the debt is not repaid before the next Ramadan.
  // Formula: Days Missed * (Years Elapsed + 1)
  const totalMudds = daysMissed * (Math.max(0, yearsElapsed) + 1)
  
  // Convert Mudd to KG
  const totalWeightKg = totalMudds * muddToKg
  
  return {
    totalMudds,
    totalWeightKg
  }
}
