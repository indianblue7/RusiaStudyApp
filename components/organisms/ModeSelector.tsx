'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useModeStore } from '@/application/stores/useModeStore';

export const ModeSelector: React.FC = () => {
  const setMode = useModeStore((state) => state.setMode);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <h2 className="text-4xl font-bold text-gray-800">학습 모드 선택</h2>
      <p className="text-lg text-gray-600">원하는 학습 방식을 선택하세요</p>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <motion.button
          onClick={() => setMode('practice')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 p-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl text-white hover:shadow-3xl transition-shadow"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold mb-2">알파벳 연습 모드</h3>
          <p className="text-white/90">
            플래시카드로 러시아 알파벳을 천천히 익혀보세요
          </p>
        </motion.button>

        <motion.button
          onClick={() => setMode('quiz')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 p-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl shadow-2xl text-white hover:shadow-3xl transition-shadow"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold mb-2">퀴즈 모드</h3>
          <p className="text-white/90">
            게임 형식으로 배운 내용을 테스트해보세요
          </p>
        </motion.button>
      </div>
    </div>
  );
};
