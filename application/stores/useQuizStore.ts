import { create } from 'zustand';
import { Letter } from '@/domain/entities/Letter';
import { generateQuizQuestions, type Question } from '@/application/utilities/quizGenerator';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  showFeedback: boolean;
  isComplete: boolean;

  initializeQuiz: (letters: Letter[], questionCount?: number) => void;
  selectAnswer: (answer: string) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  showFeedback: false,
  isComplete: false,

  initializeQuiz: (letters, questionCount = 10) => {
    const questions = generateQuizQuestions(letters, questionCount);
    set({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      showFeedback: false,
      isComplete: false,
    });
  },

  selectAnswer: (answer) => {
    set({ selectedAnswer: answer });
  },

  submitAnswer: () => {
    const { selectedAnswer, questions, currentQuestionIndex, score } = get();
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    set({
      showFeedback: true,
      score: isCorrect ? score + 1 : score,
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      set({ isComplete: true });
    } else {
      set({
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showFeedback: false,
      });
    }
  },

  resetQuiz: () => {
    set({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      showFeedback: false,
      isComplete: false,
    });
  },
}));
