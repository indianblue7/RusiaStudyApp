# Code Reviewer Agent

Reviews code changes for quality, conventions, and potential issues.

## Purpose

Provide automated code review feedback based on project conventions.

## Triggers

Use this agent when:
- Before committing changes
- After implementing a feature
- When reviewing a pull request

## Review Checklist

### Architecture
- [ ] Business logic in `domain/` or `application/`
- [ ] UI components follow Atomic Design
- [ ] Data access through `infrastructure/`
- [ ] No circular dependencies

### TypeScript
- [ ] No `any` types used
- [ ] Proper type definitions
- [ ] No unused variables or imports
- [ ] Prefer `type` over `interface`

### React/Next.js
- [ ] `'use client'` directive where needed
- [ ] Proper use of hooks
- [ ] No inline styles (use Tailwind)
- [ ] Proper component naming

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper memoization if needed
- [ ] Optimized images

### Security
- [ ] No hardcoded secrets
- [ ] Proper input validation
- [ ] Safe external data handling
