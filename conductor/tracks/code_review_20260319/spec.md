# Code Review Specification

## Objective
Review source code files (calculator.js, ui.js, index.html) and identify bugs, security issues, and potential improvements.

## Files to Review

1. **calculator.js** - Fidyah calculation logic
   - Validate function inputs and edge cases
   - Check calculation formula correctness
   - Review arithmetic operations

2. **ui.js** - User interface logic
   - Event handling
   - DOM manipulation
   - Input validation

3. **index.html** - HTML structure and inline JavaScript
   - Inline script logic conflicts
   - Accessibility issues
   - Form validation

## Review Criteria

- Logic errors
- Type coercion issues
- Null/undefined handling
- Input validation
- Race conditions
- Memory leaks
- Security vulnerabilities

## Output
- List of bugs found with severity (critical/high/medium/low)
- Suggested fixes for each issue
