'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AudioButtonProps {
  onClick: () => void;
  isPlaying?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  onClick,
  isPlaying = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card flip when clicking audio button
        onClick();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${sizeClasses[size]} ${className} rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center`}
      aria-label="Play pronunciation"
    >
      {isPlaying ? (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          🔊
        </motion.span>
      ) : (
        <span>🔊</span>
      )}
    </motion.button>
  );
};
