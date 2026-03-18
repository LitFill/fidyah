import { calculateFidyah } from "./calculator.js";

function getElement(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id "${id}" not found`);
  }
  return el;
}

function updateCalculationBreakdown(daysMissed, yearsElapsed, muddToKg, pricePerKg, result) {
  const breakdownEl = getElement("step-formula");
  if (!breakdownEl) return;

  const yearsAdder = yearsElapsed + 1;
  const multiplierText = yearsElapsed > 0 
    ? ` (${yearsElapsed} Ramadhan + 1)` 
    : "";

  breakdownEl.innerHTML = `
    <p>1. <strong>${daysMissed}</strong> hari × (<strong>${yearsElapsed}</strong> Ramadhan + 1) = <strong>${daysMissed}</strong> × <strong>${yearsAdder}</strong></p>
    <p>2. Total Mudd = <strong>${result.totalMudds}</strong> mudd</p>
    <p>3. ${result.totalMudds} mudd × <strong>${muddToKg}</strong> kg/mudd = <strong>${result.totalWeightKg.toFixed(2)}</strong> kg</p>
    <p>4. ${result.totalWeightKg.toFixed(2)} kg × Rp <strong>${pricePerKg.toLocaleString("id-ID")}</strong> = <strong>Rp ${result.totalCost.toLocaleString("id-ID")}</strong></p>
  `;
}

export function initApp() {
  const daysInput = getElement("days-missed");
  const yearsInput = getElement("years-elapsed");
  const muddSelect = getElement("mudd-conversion");
  const priceInput = getElement("price-per-kg");

  const resultArea = getElement("fidyah-result");
  const totalDaysDisplay = getElement("total-days");
  const totalWeightDisplay = getElement("total-weight");
  const totalCostDisplay = getElement("total-cost");

  if (!daysInput || !yearsInput || !muddSelect || !priceInput || !resultArea ||
      !totalDaysDisplay || !totalWeightDisplay || !totalCostDisplay) {
    console.error("Missing required DOM elements");
    return;
  }

  const updateResults = () => {
    const daysMissed = parseInt(daysInput.value) || 0;
    const yearsElapsed = parseInt(yearsInput.value) || 0;
    const muddToKg = parseFloat(muddSelect.value);
    const pricePerKg = parseFloat(priceInput.value) || 0;

    if (daysMissed > 0) {
      const result = calculateFidyah({
        daysMissed,
        yearsElapsed,
        muddToKg,
        pricePerKg,
      });

      totalDaysDisplay.textContent = result.totalMudds;
      totalWeightDisplay.textContent = result.totalWeightKg.toFixed(2);
      totalCostDisplay.textContent = result.totalCost.toLocaleString("id-ID");

      updateCalculationBreakdown(daysMissed, yearsElapsed, muddToKg, pricePerKg, result);

      resultArea.classList.remove("hidden");
    } else {
      resultArea.classList.add("hidden");
    }
  };

  [daysInput, yearsInput, muddSelect, priceInput].forEach((input) => {
    input.addEventListener("input", updateResults);
  });

  updateResults();
}
