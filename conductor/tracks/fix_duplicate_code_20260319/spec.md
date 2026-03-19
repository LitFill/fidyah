# Fix Duplicate Code Specification

## Objective
Remove the duplicate inline `calculateFidyah` function from index.html that conflicts with the ES module import.

## Problem
- index.html has an inline `<script>` block with its own `calculateFidyah` function (lines 358-384)
- This shadows the imported ES module from ui.js
- The ui.js module is never used, making it dead code

## Solution
1. Remove the inline calculateFidyah function from index.html
2. Import and use ui.js module in index.html
3. Ensure all inline scripts properly use the module

## Files to Modify
- index.html - Remove inline calculateFidyah, add module import
- ui.js - Ensure exports are correct

## Success Criteria
- ui.js module is properly loaded and used
- No duplicate/conflicting functions
- Calculator works correctly
