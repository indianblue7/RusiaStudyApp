import { useCallback } from 'react';

export const useQuizSound = () => {
  const playCorrectSound = useCallback(() => {
    if (typeof window === 'undefined') return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 정답: 밝은 톤 (800Hz)
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // 볼륨 설정
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }, []);

  const playWrongSound = useCallback(() => {
    if (typeof window === 'undefined') return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 오답: 낮은 부저음 (200Hz)
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';

    // 볼륨 설정
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.4
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  }, []);

  return { playCorrectSound, playWrongSound };
};
