'use client';

import React from 'react';
import { FlashCard } from '@/components/molecules/FlashCard';
import { NavigationControls } from '@/components/molecules/NavigationControls';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { useCardStore } from '@/application/stores/useCardStore';

export const CardDisplay: React.FC = () => {
  const {
    currentIndex,
    isFlipped,
    letters,
    nextCard,
    prevCard,
    flipCard,
  } = useCardStore();

  if (!letters.length) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const currentLetter = letters[currentIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <ProgressBar current={currentIndex} total={letters.length} />

      <FlashCard
        letter={currentLetter}
        isFlipped={isFlipped}
        onFlip={flipCard}
      />

      <div className="text-center text-gray-600 text-sm">
        Click the card to flip
      </div>

      <NavigationControls
        onPrev={prevCard}
        onNext={nextCard}
        canGoPrev={currentIndex > 0}
        canGoNext={currentIndex < letters.length - 1}
      />
    </div>
  );
};
