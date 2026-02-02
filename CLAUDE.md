# Russian Alphabet Learning App - Development Workflow

## Package Management
- **Always use `npm`** (detected: package-lock.json)
- Never switch to other package managers

## Development Order
1. Make changes
2. Typecheck: `npx tsc --noEmit`
3. Test: (Add tests as needed)
4. Lint: `npm run lint`
5. Build: `npm run build`

## Coding Conventions

### TypeScript
- Prefer `type` over `interface`
- **NEVER use `enum`** → Use string literal unions instead
- Use Zustand for state management (already configured)

Example:
```typescript
// ❌ Bad
enum Status { Active, Inactive }

// ✅ Good
type Status = 'active' | 'inactive';
```

### Architecture
This project follows **Clean Architecture** with **Atomic Design**:

```
├── domain/               # Business entities (pure logic, no dependencies)
│   └── entities/         # Domain models (Letter.ts)
├── application/          # Application logic (use cases, stores)
│   └── stores/           # Zustand state management
├── infrastructure/       # External implementations
│   └── data/             # Data repositories, API clients
├── components/           # Atomic Design UI components
│   ├── atoms/            # Basic elements (Button, ProgressBar)
│   ├── molecules/        # Simple combinations (FlashCard, Navigation)
│   ├── organisms/        # Complex sections (CardDisplay)
│   └── templates/        # Page layouts (MainLayout)
├── app/                  # Next.js App Router pages
└── mocks/                # Mock data for development
```

### Component Rules
- All UI components go in `components/` with Atomic Design structure
- Use `'use client'` directive for interactive components
- Keep business logic in `domain/` and `application/`
- Data fetching in `infrastructure/`

### Styling
- Use Tailwind CSS utility classes
- Follow gradient design system: `from-blue-* to-purple-*`
- Use Framer Motion for animations

## Prohibited Practices
- ❌ No `console.log` in production code (use proper logging if needed)
- ❌ No `any` type
- ❌ No inline styles (use Tailwind classes)
- ❌ Don't mix business logic with UI components
- ❌ Don't access external APIs directly in components (use repositories)

## Git Workflow
- Write clear commit messages
- Always include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
- Test before committing

## Testing (To be added)
- Add unit tests for domain entities
- Add integration tests for repositories
- Add component tests for complex UI

## Performance
- Use Next.js Image component for images
- Lazy load components when appropriate
- Optimize animations with Framer Motion's `layoutId`
