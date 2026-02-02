import { Letter } from '@/domain/entities/Letter';
import alphabetData from '@/mocks/russian-alphabet.json';

export class LetterRepository {
  async getAllLetters(): Promise<Letter[]> {
    return alphabetData as Letter[];
  }

  async getLetterById(id: number): Promise<Letter | undefined> {
    return alphabetData.find((letter) => letter.id === id);
  }
}
