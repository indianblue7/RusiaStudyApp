---
name: russian-alphabet-animations
description: Animation patterns and Framer Motion usage for Russian Alphabet Learning App. Use when working with animations, transitions, or card flip effects.
---

# Russian Alphabet Learning App - Animations Guide

## Animation Library

This project uses **Framer Motion** for smooth, performant animations.

## Core Animation Patterns

### 1. Card Flip Animation

**Location**: `components/molecules/FlashCard.tsx`

```typescript
<motion.div
  className="relative w-full h-full cursor-pointer"
  onClick={onFlip}
  initial={false}
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.6, ease: 'easeInOut' }}
  style={{ transformStyle: 'preserve-3d' }}
>
  {/* Front Side */}
  <div style={{ backfaceVisibility: 'hidden' }}>
    {/* Front content */}
  </div>

  {/* Back Side */}
  <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
    {/* Back content */}
  </div>
</motion.div>
```

**Key Principles:**
- Use `rotateY` for 3D flip effect
- Set `transformStyle: 'preserve-3d'` on parent
- Use `backfaceVisibility: 'hidden'` to hide back side
- Smooth transition with `easeInOut` curve
- Duration: 0.6s (feels natural for card flip)

### 2. Button Hover Animations

**Location**: `components/atoms/Button.tsx`

```typescript
className="transition-all duration-200 hover:scale-105 active:scale-95"
```

**Pattern:**
- Use Tailwind's `transition-all` for smooth transitions
- `hover:scale-105` for subtle grow effect
- `active:scale-95` for press feedback
- Short duration (200ms) for responsive feel

### 3. Progress Bar Animation

**Location**: `components/atoms/ProgressBar.tsx`

```typescript
<div
  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
  style={{ width: `${percentage}%` }}
/>
```

**Pattern:**
- Animate `width` property
- Use `transition-all` for smooth fill
- Duration: 300ms for noticeable but smooth change

## Animation Best Practices

### 1. Performance

**Do:**
- Animate `transform` and `opacity` (GPU-accelerated)
- Use `will-change` for complex animations
- Keep animations under 1 second

**Don't:**
- Animate `width`, `height`, `top`, `left` directly (causes reflow)
- Use too many simultaneous animations
- Animate during initial page load

### 2. Easing Functions

| Use Case | Easing | Example |
|----------|--------|---------|
| Card flip | `easeInOut` | Natural rotation |
| Button hover | `ease` (default) | Quick response |
| Progress bar | `linear` or `ease` | Smooth fill |
| Entrance | `easeOut` | Decelerating motion |
| Exit | `easeIn` | Accelerating motion |

### 3. Duration Guidelines

| Animation Type | Duration | Rationale |
|---------------|----------|-----------|
| Micro-interactions | 100-200ms | Instant feedback |
| UI transitions | 200-400ms | Noticeable but smooth |
| Page transitions | 400-600ms | Clear state change |
| Card flips | 600-800ms | Natural 3D effect |

## Adding New Animations

### Example: Entrance Animation

```typescript
import { motion } from 'framer-motion';

export const AnimatedCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
```

### Example: Stagger Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Example: Gesture Animations

```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
>
  Drag me!
</motion.div>
```

## Gradient Color System

The app uses consistent gradient colors for visual appeal:

**Primary Gradient:**
```css
from-blue-500 to-purple-600
```

**Hover Gradient:**
```css
from-blue-600 to-purple-700
```

**Card Front (Blue to Purple):**
```css
from-blue-400 to-purple-500
```

**Card Back (Purple to Pink):**
```css
from-purple-400 to-pink-500
```

## Accessibility

**Always consider:**
- Provide `prefers-reduced-motion` support
- Animations should not be essential for functionality
- Ensure keyboard navigation works without animations

```typescript
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={{
    rotateY: isFlipped ? 180 : 0,
  }}
  transition={{
    duration: shouldReduceMotion ? 0 : 0.6,
  }}
>
```

## Debugging Animations

1. **Use Framer Motion DevTools**
   ```bash
   npm install -D framer-motion-devtools
   ```

2. **Log animation states**
   ```typescript
   <motion.div
     animate={{ x: 100 }}
     onAnimationStart={() => console.log('Started')}
     onAnimationComplete={() => console.log('Completed')}
   >
   ```

3. **Slow down animations for testing**
   ```typescript
   transition={{ duration: 2.0 }} // Temporarily increase
   ```

## When to Use This Skill

- Adding new card animations
- Creating hover effects
- Implementing page transitions
- Debugging animation performance
- Making animations more accessible
- Creating entrance/exit animations
