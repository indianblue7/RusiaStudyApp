'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onRestart,
  onGoHome,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = '';
  let emoji = '';
  let colorClass = '';

  if (percentage >= 90) {
    message = '완벽해요! 🎉';
    emoji = '🏆';
    colorClass = 'from-yellow-400 to-orange-500';
  } else if (percentage >= 70) {
    message = '잘했어요! 👏';
    emoji = '🥈';
    colorClass = 'from-gray-300 to-gray-400';
  } else if (percentage >= 50) {
    message = '괜찮아요! 💪';
    emoji = '🥉';
    colorClass = 'from-amber-600 to-amber-700';
  } else {
    message = '조금 더 연습해봐요!';
    emoji = '📚';
    colorClass = 'from-blue-400 to-purple-500';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 w-full max-w-2xl"
    >
      {/* Trophy/Medal */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-9xl"
      >
        {emoji}
      </motion.div>

      {/* Result Card */}
      <div
        className={`bg-gradient-to-br ${colorClass} rounded-3xl shadow-2xl p-12 text-white w-full`}
      >
        <h2 className="text-4xl font-bold mb-4">{message}</h2>
        <div className="text-7xl font-bold mb-4">
          {score} / {totalQuestions}
        </div>
        <div className="text-3xl">정답률: {percentage}%</div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        <Button onClick={onRestart} variant="primary" className="flex-1">
          🔄 다시 하기
        </Button>
        <Button onClick={onGoHome} variant="secondary" className="flex-1">
          🏠 홈으로
        </Button>
      </div>
    </motion.div>
  );
};
