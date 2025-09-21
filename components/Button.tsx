import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../constants.ts';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'filter';
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  isActive?: boolean; // For filter variant
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  to,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  isActive = false,
  className = '',
}) => {
  const baseStyles = `font-medium rounded-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[${COLORS.background}] focus:ring-[${COLORS.accent}]`;
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-6 py-3 text-base md:px-8 md:py-4 md:text-lg',
  };

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = `bg-[${COLORS.accent}] text-[${COLORS.background}] hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed`;
      break;
    case 'secondary':
      variantStyles = `bg-transparent border border-[${COLORS.border}] text-[${COLORS.textSecondary}] hover:border-[${COLORS.accent}] hover:text-[${COLORS.accent}] disabled:opacity-50 disabled:cursor-not-allowed`;
      break;
    case 'filter':
      variantStyles = isActive
        ? `bg-[${COLORS.accent}] text-[${COLORS.background}]`
        : `bg-transparent border border-[${COLORS.border}] text-[${COLORS.textSecondary}] hover:border-[${COLORS.accent}] hover:text-[${COLORS.accent}]`;
      break;
  }

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;