import { calculateFidyah } from "./calculator.js";

export function initApp() {
  const daysInput = document.getElementById("days-missed");
  const yearsInput = document.getElementById("years-elapsed");
  const muddSelect = document.getElementById("mudd-conversion");
  const priceInput = document.getElementById("price-per-kg");

  const resultArea = document.getElementById("fidyah-result");
  const totalDaysDisplay = document.getElementById("total-days");
  const totalWeightDisplay = document.getElementById("total-weight");
  const totalCostDisplay = document.getElementById("total-cost");

  const updateResults = () => {
    const daysMissed = parseInt(daysInput.value) || 0;
    const yearsElapsed = parseInt(yearsInput.value) || 0;
    const muddToKg = parseFloat(muddSelect.value);
    const pricePerKg = parseInt(priceInput.value) || 0;

    if (daysMissed > 0) {
      const result = calculateFidyah({
        daysMissed,
        yearsElapsed,
        muddToKg,
        pricePerKg,
      });

      totalDaysDisplay.textContent = daysMissed;
      totalWeightDisplay.textContent = result.totalWeightKg.toFixed(2);
      totalCostDisplay.textContent = result.totalCost.toLocaleString("id-ID");

      resultArea.classList.remove("hidden");
    } else {
      resultArea.classList.add("hidden");
    }
  };

  [daysInput, yearsInput, muddSelect, priceInput].forEach((input) => {
    input.addEventListener("input", updateResults);
  });
}
