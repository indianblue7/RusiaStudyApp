import React from 'react';
import { Button } from '@/components/atoms/Button';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button onClick={onPrev} variant="secondary" className={!canGoPrev ? 'opacity-50' : ''}>
        ← Previous
      </Button>
      <Button onClick={onNext} variant="secondary" className={!canGoNext ? 'opacity-50' : ''}>
        Next →
      </Button>
    </div>
  );
};
