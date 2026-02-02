'use client';

import React from 'react';
import { FlashCard } from '@/components/molecules/FlashCard';
import { NavigationControls } from '@/components/molecules/NavigationControls';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { useCardStore } from '@/application/stores/useCardStore';
import { useModeStore } from '@/application/stores/useModeStore';

export const CardDisplay: React.FC = () => {
  const {
    currentIndex,
    isFlipped,
    letters,
    nextCard,
    prevCard,
    flipCard,
  } = useCardStore();
  const setMode = useModeStore((state) => state.setMode);

  if (!letters.length) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const currentLetter = letters[currentIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <div className="w-full flex justify-between items-center">
        <div className="flex-1" />
        <h2 className="text-2xl font-bold text-gray-800">알파벳 연습</h2>
        <div className="flex-1 flex justify-end">
          <Button onClick={() => setMode('home')} variant="secondary" className="px-4 py-2">
            ← 홈으로
          </Button>
        </div>
      </div>

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
