'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Letter } from '@/domain/entities/Letter';

interface FlashCardProps {
  letter: Letter;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  letter,
  isFlipped,
  onFlip,
}) => {
  return (
    <div className="perspective-1000 w-full max-w-md h-96">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onClick={onFlip}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-9xl font-bold mb-4">{letter.letter}</div>
          <div className="text-3xl font-light">{letter.lowercase}</div>
          <div className="mt-6 text-xl bg-white/20 px-6 py-2 rounded-full">
            [{letter.pronunciation}]
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-5xl font-bold mb-4">{letter.exampleWord}</div>
          <div className="text-2xl font-light mb-2">
            [{letter.examplePronunciation}]
          </div>
          <div className="mt-4 text-xl">{letter.exampleTranslation}</div>
          <div className="mt-8 text-6xl opacity-20">{letter.letter}</div>
        </div>
      </motion.div>
    </div>
  );
};
