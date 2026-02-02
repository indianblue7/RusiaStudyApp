---
name: russian-alphabet-data
description: Data management and repository patterns for Russian Alphabet Learning App. Use when working with data access, mock data, or preparing for API integration.
---

# Russian Alphabet Learning App - Data Management Guide

## Data Architecture

This project uses the **Repository Pattern** to separate data access from business logic.

## Current Implementation

### 1. Mock Data Source

**Location**: `mocks/russian-alphabet.json`

Contains 33 Russian alphabet letters with:
- Uppercase and lowercase forms
- Pronunciation guide
- Example words with translations

```json
{
  "id": 1,
  "letter": "А",
  "lowercase": "а",
  "pronunciation": "a",
  "exampleWord": "Арбуз",
  "exampleTranslation": "Watermelon",
  "examplePronunciation": "arbuz"
}
```

### 2. Domain Entity

**Location**: `domain/entities/Letter.ts`

```typescript
export interface Letter {
  id: number;
  letter: string;
  lowercase: string;
  pronunciation: string;
  exampleWord: string;
  exampleTranslation: string;
  examplePronunciation: string;
}
```

**Rules:**
- No external dependencies
- Pure interface definition
- Represents business concept

### 3. Repository Implementation

**Location**: `infrastructure/data/letterRepository.ts`

```typescript
export class LetterRepository {
  async getAllLetters(): Promise<Letter[]> {
    return alphabetData as Letter[];
  }

  async getLetterById(id: number): Promise<Letter | undefined> {
    return alphabetData.find((letter) => letter.id === id);
  }
}
```

**Current Features:**
- `getAllLetters()` - Fetch all 33 letters
- `getLetterById(id)` - Fetch single letter

## Repository Pattern Benefits

### 1. Separation of Concerns
- Business logic doesn't know about data source
- Easy to switch from mock to API
- Testable in isolation

### 2. Single Source of Truth
- All data access goes through repository
- Consistent error handling
- Easy to add caching

### 3. Type Safety
- Repository returns typed entities
- Compile-time checks
- Better IDE support

## Extending Data Access

### Adding New Repository Methods

**Example: Search by pronunciation**

```typescript
class LetterRepository {
  async searchByPronunciation(query: string): Promise<Letter[]> {
    const letters = await this.getAllLetters();
    return letters.filter((letter) =>
      letter.pronunciation.toLowerCase().includes(query.toLowerCase())
    );
  }
}
```

**Example: Get random letter**

```typescript
class LetterRepository {
  async getRandomLetter(): Promise<Letter> {
    const letters = await this.getAllLetters();
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }
}
```

## Preparing for API Integration

### Step 1: Create API Client

**Location**: `infrastructure/api/apiClient.ts`

```typescript
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }
}
```

### Step 2: Update Repository

```typescript
export class LetterRepository {
  private apiClient: ApiClient;
  private useApi: boolean;

  constructor(useApi = false) {
    this.useApi = useApi;
    this.apiClient = new ApiClient();
  }

  async getAllLetters(): Promise<Letter[]> {
    if (this.useApi) {
      return this.apiClient.get<Letter[]>('/api/letters');
    }
    // Fallback to mock data
    return alphabetData as Letter[];
  }
}
```

### Step 3: Environment Configuration

Add to `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_USE_API=false
```

## Data Validation

### Using Zod for Runtime Validation

```typescript
import { z } from 'zod';

const LetterSchema = z.object({
  id: z.number().positive(),
  letter: z.string().length(1),
  lowercase: z.string().length(1),
  pronunciation: z.string().min(1),
  exampleWord: z.string().min(1),
  exampleTranslation: z.string().min(1),
  examplePronunciation: z.string().min(1),
});

export type Letter = z.infer<typeof LetterSchema>;

// Validate API response
export class LetterRepository {
  async getAllLetters(): Promise<Letter[]> {
    const data = await this.apiClient.get('/api/letters');
    return z.array(LetterSchema).parse(data);
  }
}
```

## Caching Strategy

### Simple In-Memory Cache

```typescript
export class LetterRepository {
  private cache: Letter[] | null = null;
  private cacheTime: number = 0;
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  async getAllLetters(): Promise<Letter[]> {
    const now = Date.now();

    if (this.cache && now - this.cacheTime < this.cacheDuration) {
      return this.cache;
    }

    const letters = await this.fetchLetters();
    this.cache = letters;
    this.cacheTime = now;

    return letters;
  }

  private async fetchLetters(): Promise<Letter[]> {
    // Actual data fetching logic
    return alphabetData as Letter[];
  }
}
```

## Error Handling

### Repository Error Types

```typescript
export class DataError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'DataError';
  }
}

export class LetterRepository {
  async getAllLetters(): Promise<Letter[]> {
    try {
      const data = await this.fetchLetters();
      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new DataError(
          'Network error',
          'NETWORK_ERROR',
          0
        );
      }
      throw new DataError(
        'Failed to fetch letters',
        'FETCH_ERROR',
        500
      );
    }
  }
}
```

## Testing Data Layer

### Mock Repository for Tests

```typescript
export class MockLetterRepository implements ILetterRepository {
  private mockData: Letter[] = [
    {
      id: 1,
      letter: 'А',
      lowercase: 'а',
      pronunciation: 'a',
      exampleWord: 'Арбуз',
      exampleTranslation: 'Watermelon',
      examplePronunciation: 'arbuz',
    },
  ];

  async getAllLetters(): Promise<Letter[]> {
    return this.mockData;
  }

  async getLetterById(id: number): Promise<Letter | undefined> {
    return this.mockData.find((letter) => letter.id === id);
  }
}
```

## Data Structure Guidelines

### Adding New Fields

If adding new fields to Letter entity:

1. Update `domain/entities/Letter.ts`
2. Update `mocks/russian-alphabet.json`
3. Update Zod schema (if using)
4. Update relevant components

### Example: Adding Audio URL

```typescript
// 1. Update entity
export interface Letter {
  // ... existing fields
  audioUrl?: string; // Optional for backward compatibility
}

// 2. Update mock data
{
  "id": 1,
  "letter": "А",
  // ... existing fields
  "audioUrl": "/audio/a.mp3"
}

// 3. Update components to use audio
<audio src={letter.audioUrl} />
```

## When to Use This Skill

- Adding new data fields
- Implementing API integration
- Adding caching layer
- Handling data errors
- Creating new repository methods
- Validating data
- Testing data access
