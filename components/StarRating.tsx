import React from 'react';
import { StarIcon } from './icons/MiscIcons.tsx';
import { COLORS } from '../constants.ts';

interface StarRatingProps {
  rating: number; // e.g., 4 or 4.5
  maxRating?: number;
  className?: string;
  starClassName?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  className = '',
  starClassName = `w-5 h-5 text-[${COLORS.accent}]`
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        let filled = true; // For simplicity, we'll only show fully filled or empty based on integer rating
        if (starValue > Math.round(rating)) { // Use Math.round for half stars to be filled
            filled = false;
        }

        return (
          <StarIcon 
            key={index} 
            filled={filled} 
            className={starClassName}
          />
        );
      })}
       <span className={`ml-2 text-sm text-[${COLORS.textSecondary}]`}>({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;