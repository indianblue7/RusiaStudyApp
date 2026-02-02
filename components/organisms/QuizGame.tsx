'use client';

import React, { useEffect } from 'react';
import { useQuizStore } from '@/application/stores/useQuizStore';
import { useCardStore } from '@/application/stores/useCardStore';
import { useModeStore } from '@/application/stores/useModeStore';
import { QuizQuestion } from '@/components/molecules/QuizQuestion';
import { QuizResults } from '@/components/molecules/QuizResults';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Button } from '@/components/atoms/Button';

export const QuizGame: React.FC = () => {
  const letters = useCardStore((state) => state.letters);
  const setMode = useModeStore((state) => state.setMode);

  const {
    questions,
    currentQuestionIndex,
    score,
    selectedAnswer,
    showFeedback,
    isComplete,
    initializeQuiz,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  // Initialize quiz on mount
  useEffect(() => {
    if (letters.length > 0 && questions.length === 0) {
      initializeQuiz(letters, 10);
    }
  }, [letters, questions.length, initializeQuiz]);

  // Auto-advance after feedback
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showFeedback, nextQuestion]);

  const handleSelectAnswer = (answer: string) => {
    selectAnswer(answer);
    // Submit immediately after selection
    setTimeout(() => {
      submitAnswer();
    }, 100);
  };

  const handleRestart = () => {
    resetQuiz();
    initializeQuiz(letters, 10);
  };

  const handleGoHome = () => {
    setMode('home');
    resetQuiz();
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-2xl text-gray-600">퀴즈를 준비하는 중...</div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      {/* Header with Score and Progress */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            점수: {score} / {currentQuestionIndex + 1}
          </h2>
          <Button
            onClick={handleGoHome}
            variant="secondary"
            className="px-4 py-2"
          >
            ← 홈으로
          </Button>
        </div>
        <ProgressBar
          current={currentQuestionIndex}
          total={questions.length}
        />
      </div>

      {/* Question */}
      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};
