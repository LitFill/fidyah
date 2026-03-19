# Improve Desktop Layout

## Overview
Current layout is mobile-optimized but wastes space on desktop. This track improves desktop experience by adding a two-column layout with supplementary content.

## Current State
- Single centered column (max-w-md)
- Works well on mobile
- Large whitespace margins on desktop

## Proposed Changes
1. Two-column layout on desktop (lg:+)
2. Calculator on left, supplementary content on right
3. Mobile remains single column
4. Add comparison table (Linear vs Eksponensial)
5. Add FAQ or quick reference section

## Files to Modify
- `index.html`
- `ui.js` (optional - for dual formula display)

## Testing
- Run `npm test` to ensure no regression
- Manual testing at 320px, 768px, 1024px, 1440px

## Status
📋 Pending - Ready to implement
