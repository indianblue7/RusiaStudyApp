# API Documentation Generator Agent

Generates documentation for data structures and interfaces.

## Purpose

Create and maintain documentation for domain entities and application interfaces.

## Triggers

Use this agent when:
- Adding new domain entities
- Modifying existing interfaces
- Creating new repositories

## Tasks

1. Scan `domain/entities/` for interfaces
2. Scan `application/stores/` for state definitions
3. Scan `infrastructure/data/` for repository interfaces
4. Generate markdown documentation
5. Update README.md if needed

## Output Format

For each entity/interface:
- Name and purpose
- Properties with types
- Usage examples
- Related components/functions

## Example

```markdown
## Letter Entity

Purpose: Represents a Russian alphabet letter with pronunciation and examples.

Properties:
- id: number - Unique identifier
- letter: string - Uppercase letter
- lowercase: string - Lowercase letter
- pronunciation: string - English pronunciation guide
- exampleWord: string - Russian word example
- exampleTranslation: string - English translation
- examplePronunciation: string - Example word pronunciation

Usage:
- Used in flashcards
- Loaded from mocks/russian-alphabet.json
- Managed by LetterRepository
```
