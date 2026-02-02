'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { CardDisplay } from '@/components/organisms/CardDisplay';
import { ModeSelector } from '@/components/organisms/ModeSelector';
import { QuizGame } from '@/components/organisms/QuizGame';
import { useCardStore } from '@/application/stores/useCardStore';
import { useModeStore } from '@/application/stores/useModeStore';
import { LetterRepository } from '@/infrastructure/data/letterRepository';

export default function Home() {
  const setLetters = useCardStore((state) => state.setLetters);
  const currentMode = useModeStore((state) => state.currentMode);

  useEffect(() => {
    const loadLetters = async () => {
      const repository = new LetterRepository();
      const letters = await repository.getAllLetters();
      setLetters(letters);
    };

    loadLetters();
  }, [setLetters]);

  return (
    <MainLayout>
      {currentMode === 'home' && <ModeSelector />}
      {currentMode === 'practice' && <CardDisplay />}
      {currentMode === 'quiz' && <QuizGame />}
    </MainLayout>
  );
}
