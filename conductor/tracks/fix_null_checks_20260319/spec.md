# Fix Null Checks Specification

## Objective
Add defensive null checks for DOM element access in ui.js.

## Problem
ui.js accesses DOM elements without checking if they exist:
```javascript
const daysInput = document.getElementById("days-missed");
// If element doesn't exist, daysInput is null
// Code fails with unclear TypeError
```

## Solution
Add null checks and provide clear error messages.

## Files to Modify
- ui.js - Add null checks

## Success Criteria
- App handles missing DOM elements gracefully
- Clear error message if element IDs are wrong
