import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles =
    'px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95';
  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
      : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
