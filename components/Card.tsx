import React from 'react';
import { COLORS } from '../constants.ts';

interface CardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  tags?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  tags,
  onClick,
  children,
  className = '',
  titleClassName = '',
  descriptionClassName = ''
}) => {
  const cardClasses = `bg-[${COLORS.border}] bg-opacity-30 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-[${COLORS.border}] hover:border-[${COLORS.accent}] transition-all duration-300 ease-in-out group ${onClick ? 'cursor-pointer' : ''} hover:shadow-cyan-500/30 hover:scale-[1.03] hover:-translate-y-1 card-activatable-on-scroll ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {icon && <div className={`mb-4 text-[${COLORS.accent}] group-hover:opacity-90 transition-opacity`}>{icon}</div>}
      {title && <h3 className={`text-xl font-['IBM_Plex_Mono'] text-[${COLORS.textPrimary}] mb-2 ${titleClassName}`}>{title}</h3>}
      {description && <p className={`text-[${COLORS.textSecondary}] text-sm ${descriptionClassName}`}>{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className={`px-2 py-1 text-xs bg-[${COLORS.accent}] bg-opacity-20 text-[${COLORS.accent}] rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;