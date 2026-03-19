# Code Review Bug Report

## Summary
Review of calculator.js, ui.js, and index.html identified several bugs ranging from critical to low severity.

---

## Critical Bugs

### 1. Duplicate/conflicting calculation logic
**File:** index.html (lines 358-384)
**Severity:** CRITICAL

**Problem:** There's a duplicate `calculateFidyah` function in the inline `<script>` block that conflicts with the imported ES module. The inline function shadows the module import, making ui.js unusable.

**Code:**
```javascript
// index.html line 358
function calculateFidyah() {  // This shadows the imported module
  // ... different calculation logic
}
```

**Impact:** The ui.js module is never used. All calculations go through the inline function with different (incorrect) logic.

---

## High Bugs

### 2. Formula discrepancy between module and inline script
**Files:** calculator.js (line 23) vs index.html (line 369)
**Severity:** HIGH

**Problem:** The calculation formulas produce different results:

- **calculator.js:** `totalMudds = daysMissed * (Math.max(0, yearsElapsed) + 1)`
- **index.html inline:** `years = Math.max(years, 1)` then `totalMudd = days * years`

| yearsElapsed | calculator.js result | index.html result |
|--------------|---------------------|-------------------|
| 0            | days × 1            | days × 1          |
| 1            | days × 2            | days × 1          |
| 2            | days × 3            | days × 2           |

**Impact:** Users get incorrect fidyah calculations depending on which code path runs.

---

## Medium Bugs

### 3. Missing DOM element null checks
**File:** ui.js (lines 4-12)
**Severity:** MEDIUM

**Problem:** The code assumes all DOM elements exist but doesn't verify before accessing them.

```javascript
const daysInput = document.getElementById("days-missed");
// If element doesn't exist, daysInput is null
// Subsequent code will fail with TypeError
```

**Impact:** If element IDs change or are missing, the entire app breaks with unclear errors.

---

## Low Bugs

### 4. Type coercion issue with price input
**File:** ui.js (line 18)
**Severity:** LOW

**Problem:** Uses `parseInt` for price which should support decimals:

```javascript
const pricePerKg = parseInt(priceInput.value) || 0;
```

**Impact:** Price per kg that includes decimals (e.g., 15000.50) would be truncated to integer.

### 5. Display inconsistency for total days
**File:** ui.js (line 28)
**Severity:** LOW

**Problem:** Displays input `daysMissed` instead of calculated `result.totalMudds`:

```javascript
// ui.js line 28 - shows input value
totalDaysDisplay.textContent = daysMissed;

// index.html line 375 - shows calculated value  
document.getElementById("total-days").textContent = totalMudd;
```

**Impact:** When yearsElapsed > 0, the display shows incorrect total days.

---

## Recommendations

1. **Remove duplicate inline function** - Use only the ES module (ui.js + calculator.js), remove inline calculateFidyah from index.html
2. **Fix formula consistency** - Align calculation logic between all files
3. **Add null checks** - Add defensive checks for DOM elements
4. **Use parseFloat for price** - Handle decimal prices correctly
5. **Fix total days display** - Show calculated result, not input value
