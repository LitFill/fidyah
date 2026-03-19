# Fix Display Bug Specification

## Objective
Fix display to show calculated totalMudds instead of input daysMissed.

## Problem
```javascript
// ui.js line 28 - shows input value
totalDaysDisplay.textContent = daysMissed;

// Should show calculated result
totalDaysDisplay.textContent = result.totalMudds;
```

When yearsElapsed > 0, the display shows incorrect value.

## Solution
Display result.totalMudds instead of daysMissed.

## Files to Modify
- ui.js - line 28

## Success Criteria
- Shows calculated total (days × years) not input value
