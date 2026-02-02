# Russian Alphabet Learning App

An interactive flashcard app to learn the Russian (Cyrillic) alphabet with pronunciation and example words.

## Features

- 33 Russian alphabet letters with pronunciation guide
- Interactive flip cards with smooth animations
- Example words with translations
- Progress tracking
- Beautiful gradient design
- Responsive layout

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management

## Architecture

This project follows **Clean Architecture** with **Atomic Design** principles:

```
├── domain/               # Business entities
│   └── entities/         # Letter interface
├── application/          # Application logic
│   └── stores/           # State management (Zustand)
├── infrastructure/       # External data sources
│   └── data/             # Letter repository
├── components/           # Atomic Design components
│   ├── atoms/            # Basic UI elements (Button, ProgressBar)
│   ├── molecules/        # Component combinations (FlashCard, Navigation)
│   ├── organisms/        # Complex sections (CardDisplay)
│   └── templates/        # Page layouts (MainLayout)
├── mocks/                # Test data (Russian alphabet JSON)
└── app/                  # Next.js App Router pages
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Click on the flashcard to flip it and see the example word
2. Use "Previous" and "Next" buttons to navigate between letters
3. Track your progress with the progress bar at the top

## Data Structure

Each letter contains:
- Uppercase and lowercase forms
- Pronunciation guide
- Example word in Russian
- English translation
- Pronunciation of example word

## Made with Claude Code

This project was created with Claude Code, an AI-powered coding assistant.
