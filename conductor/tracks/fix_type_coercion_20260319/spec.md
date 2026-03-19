# Fix Type Coercion Specification

## Objective
Fix type coercion to use parseFloat for price input.

## Problem
```javascript
const pricePerKg = parseInt(priceInput.value) || 0;
```
Using parseInt truncates decimal values (e.g., 15000.50 → 15000).

## Solution
Use parseFloat instead of parseInt for price input.

## Files to Modify
- ui.js - line 18

## Success Criteria
- Price accepts decimal values
- No truncation of decimal prices
