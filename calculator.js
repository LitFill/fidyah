/**
 * Calculate fidyah based on Syafii Madzhab.
 * @param {Object} params
 * @param {number} params.daysMissed - Number of days of fasting missed.
 * @param {number} params.yearsElapsed - Number of Ramadans passed since the debt occurred.
 * @param {number} [params.muddToKg=0.75] - Conversion factor from Mudd to kilograms.
 * @param {number} [params.pricePerKg=0] - Price of staple food per kilogram.
 * @param {string} [params.method='linear'] - Calculation method: 'linear' or 'exponential'.
 * @returns {Object<string, number>} result - The calculation result.
 * @returns {number} result.totalMudds - Total fidyah in Mudd.
 * @returns {number} result.totalWeightKg - Total fidyah in kilograms.
 * @returns {number} result.totalCost - Estimated total cost in currency.
 * @returns {string} result.method - The method used for calculation.
 */
export function calculateFidyah({
  daysMissed,
  yearsElapsed,
  muddToKg = 0.75,
  pricePerKg = 0,
  method = 'linear',
}) {
  if (daysMissed < 0) return { totalMudds: 0, totalWeightKg: 0, totalCost: 0, method };

  let totalMudds;

  if (method === 'exponential') {
    // Exponential formula: M = D × 2^(Y-1)
    // If Y = 0 or 1, then 2^(Y-1) = 1 (minimum multiplier)
    const multiplier = yearsElapsed <= 1 ? 1 : Math.pow(2, yearsElapsed - 1);
    totalMudds = daysMissed * multiplier;
  } else {
    // Linear formula: M = D × Y
    totalMudds = daysMissed * yearsElapsed;
  }

  // Convert Mudd to KG
  const totalWeightKg = totalMudds * muddToKg;

  // Calculate Cost
  const totalCost = totalWeightKg * pricePerKg;

  return {
    totalMudds,
    totalWeightKg,
    totalCost,
    method,
  };
}
