# Fix Duplicate Code Plan

## Phase 1: Remove inline function

**Status: COMPLETE**

- [x] Remove inline calculateFidyah function from index.html (lines 358-384)
- [x] Verify no other inline functions conflict with modules

## Phase 2: Integrate ui.js module

**Status: COMPLETE**

- [x] Add module import to index.html `<script type="module">`
- [x] Call initApp() function on page load
- [x] Test that calculations work correctly

## Phase 3: Verify

**Status: COMPLETE**

- [x] Test with sample inputs
- [x] Verify results match expected formula
- [x] Update track status
