'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Question } from '@/application/utilities/quizGenerator';
import { useQuizSound } from '@/application/hooks/useQuizSound';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  showFeedback: boolean;
  onSelectAnswer: (answer: string) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  showFeedback,
  onSelectAnswer,
}) => {
  const { playCorrectSound, playWrongSound } = useQuizSound();

  // 피드백 표시 시 소리 재생
  useEffect(() => {
    if (showFeedback && selectedAnswer) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }
  }, [showFeedback, selectedAnswer, question.correctAnswer, playCorrectSound, playWrongSound]);
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      {/* Letter Display */}
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl p-12 text-white">
        <div className="text-9xl font-bold">{question.letter.letter}</div>
      </div>

      {/* Question Text */}
      <h3 className="text-2xl font-bold text-gray-800">
        이 글자의 발음은 무엇일까요?
      </h3>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          let buttonClass =
            'p-6 rounded-2xl text-2xl font-bold transition-all duration-300 ';

          if (showCorrect) {
            buttonClass += 'bg-green-500 text-white scale-105';
          } else if (showIncorrect) {
            buttonClass += 'bg-red-500 text-white scale-95';
          } else if (isSelected) {
            buttonClass +=
              'bg-blue-500 text-white ring-4 ring-blue-300';
          } else {
            buttonClass +=
              'bg-white text-gray-800 hover:bg-gray-100 border-2 border-gray-300';
          }

          return (
            <motion.button
              key={option}
              onClick={() => !showFeedback && onSelectAnswer(option)}
              disabled={showFeedback}
              whileHover={!showFeedback ? { scale: 1.05 } : {}}
              whileTap={!showFeedback ? { scale: 0.95 } : {}}
              className={buttonClass}
            >
              {option}
              {showCorrect && ' ✓'}
              {showIncorrect && ' ✗'}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
