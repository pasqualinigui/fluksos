import React from 'react';
import StarRating from './StarRating.tsx';
import { COLORS, TYPOGRAPHY } from '../constants.ts';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  imageUrl: string; // Placeholder URL
  rating: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  imageUrl,
  rating,
  className = '',
}) => {
  return (
    <div 
      className={`bg-[${COLORS.border}] bg-opacity-30 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-[${COLORS.border}] flex flex-col items-center text-center ${className} transition-all duration-300 ease-in-out hover:shadow-cyan-500/30 hover:border-[${COLORS.accent}] hover:scale-[1.03]`}
    >
      <img 
        // Note: Using picsum.photos for placeholder. Replace with actual images or more specific placeholders.
        src={imageUrl} 
        alt={`Foto de ${name} (placeholder)`} 
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[${COLORS.accent}] shadow-md" 
      />
      <p className={`${TYPOGRAPHY.body} text-[${COLORS.textPrimary}] italic mb-4`}>"{quote}"</p>
      <div className="mt-auto w-full"> {/* Pushes name, role, rating to bottom if card height varies */}
        <h4 className={`font-['IBM_Plex_Mono'] text-lg text-[${COLORS.textPrimary}] font-medium`}>{name}</h4>
        <p className={`text-sm text-[${COLORS.textSecondary}] mb-2`}>{role}</p>
        <StarRating rating={rating} />
      </div>
    </div>
  );
};

export default TestimonialCard;