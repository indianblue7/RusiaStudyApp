import { create } from 'zustand';
import { Letter } from '@/domain/entities/Letter';

interface CardState {
  currentIndex: number;
  isFlipped: boolean;
  letters: Letter[];
  setCurrentIndex: (index: number) => void;
  setIsFlipped: (flipped: boolean) => void;
  setLetters: (letters: Letter[]) => void;
  nextCard: () => void;
  prevCard: () => void;
  flipCard: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  currentIndex: 0,
  isFlipped: false,
  letters: [],
  setCurrentIndex: (index) => set({ currentIndex: index, isFlipped: false }),
  setIsFlipped: (flipped) => set({ isFlipped: flipped }),
  setLetters: (letters) => set({ letters }),
  nextCard: () =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % state.letters.length,
      isFlipped: false,
    })),
  prevCard: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex === 0
          ? state.letters.length - 1
          : state.currentIndex - 1,
      isFlipped: false,
    })),
  flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),
}));
