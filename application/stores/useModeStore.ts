import { create } from 'zustand';

type Mode = 'home' | 'practice' | 'quiz';

interface ModeState {
  currentMode: Mode;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeState>((set) => ({
  currentMode: 'home',
  setMode: (mode) => set({ currentMode: mode }),
}));
