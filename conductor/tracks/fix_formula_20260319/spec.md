# Fix Formula Specification

## Objective
Fix the calculation formula discrepancy between calculator.js and the inline script in index.html.

## Problem
- calculator.js: `totalMudds = daysMissed * (yearsElapsed + 1)` 
- index.html inline: `totalMudd = days * Math.max(years, 1)`

The formulas produce different results when yearsElapsed > 0.

## Solution
Use the formula from calculator.js (Syafii Madzhab rule):
- Fidyah multiplies for each year the debt is not repaid before the next Ramadan
- Formula: Days Missed × (Years Elapsed + 1)

## Files to Modify
- index.html inline script (after removing duplicate) - align with calculator.js formula

## Success Criteria
- Formula matches: `daysMissed * (yearsElapsed + 1)`
- All tests pass
