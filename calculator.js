/**
 * Calculate fidyah based on Syafii Madzhab.
 * @param {Object} params
 * @param {number} params.daysMissed - Number of days of fasting missed.
 * @param {number} params.yearsElapsed - Number of Ramadans passed since the debt occurred.
 * @returns {Object} result - The calculation result.
 * @returns {number} result.totalMudds - Total fidyah in Mudd.
 */
export function calculateFidyah({ daysMissed, yearsElapsed }) {
  if (daysMissed < 0) return { totalMudds: 0 }
  
  // Syafii Madzhab rule: Fidyah doubles/multiplies for each year the debt is not repaid before the next Ramadan.
  // Formula: Days Missed * (Years Elapsed + 1)
  // If yearsElapsed is 0 (current year), multiplier is 1.
  // If yearsElapsed is 1 (one Ramadan passed), multiplier is 2, and so on.
  const totalMudds = daysMissed * (Math.max(0, yearsElapsed) + 1)
  
  return {
    totalMudds
  }
}
