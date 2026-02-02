import { Letter } from '@/domain/entities/Letter';

export type Question = {
  letter: Letter;
  correctAnswer: string;
  options: string[];
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomWrongAnswers(
  correctAnswer: string,
  allLetters: Letter[],
  count: number = 3
): string[] {
  const wrongAnswers = allLetters
    .filter((letter) => letter.koreanPronunciation !== correctAnswer)
    .map((letter) => letter.koreanPronunciation);

  const shuffled = shuffleArray(wrongAnswers);
  return shuffled.slice(0, count);
}

export function generateQuizQuestions(
  letters: Letter[],
  questionCount: number = 10
): Question[] {
  const shuffledLetters = shuffleArray(letters);
  const selectedLetters = shuffledLetters.slice(0, questionCount);

  return selectedLetters.map((letter) => {
    const correctAnswer = letter.koreanPronunciation;
    const wrongAnswers = getRandomWrongAnswers(correctAnswer, letters, 3);
    const allOptions = shuffleArray([correctAnswer, ...wrongAnswers]);

    return {
      letter,
      correctAnswer,
      options: allOptions,
    };
  });
}
