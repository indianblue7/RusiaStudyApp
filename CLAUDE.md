# Russian Alphabet Learning App

## Package & Commands
- **Always use `npm`**
- Dev: `npm run dev` | Build: `npm run build` | Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

## Architecture
Clean Architecture + Atomic Design:
- `domain/` - Pure business entities (no dependencies)
- `application/` - Use cases, Zustand stores
- `infrastructure/` - Data access, repositories
- `components/` - atoms → molecules → organisms → templates
- `app/` - Next.js pages

## TypeScript Rules
- Prefer `type` over `interface`
- **NEVER use `enum`** → Use `type Status = 'active' | 'inactive'`
- No `any` type
- Use Zustand for state

## Component Rules
- Interactive components need `'use client'`
- Business logic stays in `domain/` or `application/`
- Data fetching in `infrastructure/` repositories
- Tailwind CSS only (no inline styles)
- Gradients: `from-blue-* to-purple-*`
- Animations: Framer Motion

## Workflow (2026 Best Practice)
**Plan First, Code Second** - Use Plan Mode for complex tasks:
1. `/plan` to enter plan mode
2. Explore files and analyze requirements
3. Write implementation plan
4. Get approval, then implement

Prevents solving the wrong problem.

## Prohibited
- ❌ `console.log` in production
- ❌ `any` type
- ❌ Inline styles
- ❌ Business logic in UI components
- ❌ Direct API calls in components

## Git
Clear commit messages + "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

## Context Optimization (2026)
This CLAUDE.md is intentionally concise to preserve context window.
Details → Skills: russian-alphabet-architecture, russian-alphabet-testing, russian-alphabet-animations, russian-alphabet-data
