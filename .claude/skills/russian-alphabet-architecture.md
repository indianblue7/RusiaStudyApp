---
name: russian-alphabet-architecture
description: Russian Alphabet Learning App architecture and structure. Use when working with project structure, dependencies, or architectural decisions.
---

# Russian Alphabet Learning App - Architecture

## Overview

This is a flashcard application for learning the Russian (Cyrillic) alphabet, built with Next.js 15 and following Clean Architecture principles with Atomic Design.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library for card flips
- **Zustand** - Lightweight state management

## Architecture Layers

### 1. Domain Layer (`domain/`)
Pure business logic with no external dependencies.

```
domain/
└── entities/
    └── Letter.ts      # Letter interface definition
```

**Rules:**
- No imports from other layers
- Pure TypeScript interfaces and types
- Represents core business concepts

### 2. Application Layer (`application/`)
Application-specific logic and orchestration.

```
application/
└── stores/
    └── useCardStore.ts    # Zustand store for card state
```

**Rules:**
- Can import from `domain/`
- Contains state management
- Defines use cases and workflows

### 3. Infrastructure Layer (`infrastructure/`)
External implementations and data sources.

```
infrastructure/
└── data/
    └── letterRepository.ts    # Data access layer
```

**Rules:**
- Can import from `domain/` and `application/`
- Handles external data sources
- Implements repository pattern

### 4. Presentation Layer (`components/`, `app/`)
UI components following Atomic Design.

```
components/
├── atoms/              # Basic UI elements
│   ├── Button.tsx
│   └── ProgressBar.tsx
├── molecules/          # Simple combinations
│   ├── FlashCard.tsx
│   └── NavigationControls.tsx
├── organisms/          # Complex sections
│   └── CardDisplay.tsx
└── templates/          # Page layouts
    └── MainLayout.tsx

app/
└── page.tsx           # Next.js page
```

**Rules:**
- Can import from all layers
- Atoms should be reusable
- Molecules combine atoms
- Organisms are complex UI sections
- Templates define page layouts

## Data Flow

```
User Interaction
    ↓
Component (Presentation)
    ↓
Zustand Store (Application)
    ↓
Repository (Infrastructure)
    ↓
Mock Data (mocks/)
```

## Key Patterns

### 1. Repository Pattern
- All data access goes through repositories
- Currently uses mock data from JSON
- Easy to swap for API calls later

### 2. State Management with Zustand
- Single store for card state
- Centralized state logic
- Easy to test and debug

### 3. Atomic Design
- Build from small to large
- Reusable components
- Clear component hierarchy

## Dependency Rules

```
domain/          ← No dependencies
   ↑
application/     ← Can depend on domain
   ↑
infrastructure/  ← Can depend on domain & application
   ↑
components/      ← Can depend on all layers
```

## File Naming Conventions

- Components: PascalCase (Button.tsx)
- Utilities: camelCase (useCardStore.ts)
- Types/Interfaces: PascalCase (Letter.ts)
- Constants: UPPER_SNAKE_CASE

## When to Use This Skill

- Adding new features
- Refactoring code
- Debugging architectural issues
- Understanding component relationships
- Planning new components
