'use client';

import { useEffect } from 'react';
import { MainLayout } from '@/components/templates/MainLayout';
import { CardDisplay } from '@/components/organisms/CardDisplay';
import { useCardStore } from '@/application/stores/useCardStore';
import { LetterRepository } from '@/infrastructure/data/letterRepository';

export default function Home() {
  const setLetters = useCardStore((state) => state.setLetters);

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
      <CardDisplay />
    </MainLayout>
  );
}
