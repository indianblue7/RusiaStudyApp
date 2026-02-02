---
name: russian-alphabet-testing
description: Testing strategy and patterns for Russian Alphabet Learning App. Use when writing tests, debugging, or adding test coverage.
---

# Russian Alphabet Learning App - Testing Guide

## Current Status

⚠️ **Tests are not yet configured in this project.**

This guide outlines the recommended testing strategy.

## Recommended Test Setup

### 1. Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

### 2. Configure Vitest

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

## Testing Strategy

### 1. Domain Layer Tests
Test pure business logic.

**Example: `domain/entities/Letter.test.ts`**

```typescript
import { Letter } from './Letter';

describe('Letter Entity', () => {
  it('should have required properties', () => {
    const letter: Letter = {
      id: 1,
      letter: 'А',
      lowercase: 'а',
      pronunciation: 'a',
      exampleWord: 'Арбуз',
      exampleTranslation: 'Watermelon',
      examplePronunciation: 'arbuz',
    };

    expect(letter.letter).toBe('А');
    expect(letter.lowercase).toBe('а');
  });
});
```

### 2. Application Layer Tests
Test state management logic.

**Example: `application/stores/useCardStore.test.ts`**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCardStore } from './useCardStore';

describe('useCardStore', () => {
  it('should navigate to next card', () => {
    const { result } = renderHook(() => useCardStore());

    act(() => {
      result.current.setLetters(mockLetters);
      result.current.nextCard();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should flip card', () => {
    const { result } = renderHook(() => useCardStore());

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.isFlipped).toBe(true);
  });
});
```

### 3. Infrastructure Layer Tests
Test data access.

**Example: `infrastructure/data/letterRepository.test.ts`**

```typescript
import { LetterRepository } from './letterRepository';

describe('LetterRepository', () => {
  it('should get all letters', async () => {
    const repo = new LetterRepository();
    const letters = await repo.getAllLetters();

    expect(letters).toHaveLength(33);
    expect(letters[0].letter).toBe('А');
  });

  it('should get letter by id', async () => {
    const repo = new LetterRepository();
    const letter = await repo.getLetterById(1);

    expect(letter?.letter).toBe('А');
  });
});
```

### 4. Component Tests
Test UI components.

**Example: `components/atoms/Button.test.tsx`**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Example: `components/molecules/FlashCard.test.tsx`**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { FlashCard } from './FlashCard';

describe('FlashCard', () => {
  const mockLetter = {
    id: 1,
    letter: 'А',
    lowercase: 'а',
    pronunciation: 'a',
    exampleWord: 'Арбуз',
    exampleTranslation: 'Watermelon',
    examplePronunciation: 'arbuz',
  };

  it('should display letter on front', () => {
    render(
      <FlashCard
        letter={mockLetter}
        isFlipped={false}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('А')).toBeInTheDocument();
  });

  it('should call onFlip when clicked', () => {
    const handleFlip = vi.fn();
    render(
      <FlashCard
        letter={mockLetter}
        isFlipped={false}
        onFlip={handleFlip}
      />
    );

    fireEvent.click(screen.getByText('А'));
    expect(handleFlip).toHaveBeenCalledTimes(1);
  });
});
```

## Test Coverage Goals

- **Domain**: 100% (pure logic, easy to test)
- **Application**: 90% (state management)
- **Infrastructure**: 80% (data access)
- **Components**: 70% (UI components)

## Running Tests

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Testing Best Practices

1. **Test behavior, not implementation**
   - Focus on what the component/function does
   - Avoid testing internal state

2. **Use meaningful test names**
   - Describe what is being tested
   - Use "should" statements

3. **Arrange-Act-Assert pattern**
   - Arrange: Set up test data
   - Act: Execute the code
   - Assert: Check results

4. **Mock external dependencies**
   - Mock API calls
   - Mock date/time if needed

5. **Keep tests isolated**
   - Each test should be independent
   - Clean up after each test

## When to Use This Skill

- Setting up tests for the first time
- Writing new tests
- Debugging test failures
- Improving test coverage
- Understanding testing patterns
