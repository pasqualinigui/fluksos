import React from 'react';
import { COLORS } from '../../constants.ts';

interface IconProps {
  className?: string;
  strokeWidth?: number; 
}

export const CheckIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.712-1.001zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.172.198-.296.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/>
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const FluksosLogoIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className || `w-8 h-8 text-[${COLORS.accent}]`} fill="currentColor">
    <path d="M50 0 L65 15 L50 30 L35 15 Z M15 35 L30 50 L15 65 L0 50 Z M85 35 L100 50 L85 65 L70 50 Z M50 70 L65 85 L50 100 L35 85 Z M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 Z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-10 h-10 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SpeechBubbleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-10 h-10 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15A2.25 2.25 0 0 0 6 17.25h12A2.25 2.25 0 0 0 20.25 15V6.75A2.25 2.25 0 0 0 18 4.5H6A2.25 2.25 0 0 0 3.75 6.75v8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12" /> 
  </svg>
);

export const WarningTriangleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-10 h-10 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-10 h-10 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.956 11.956 0 0112 3c2.373 0 4.03.824 5.25 2.052A12.016 12.016 0 0118.75 9c.178.02.355.039.53.058a11.928 11.928 0 011.666 8.356c-.035.19-.07.378-.107.567a11.956 11.956 0 01-5.25 5.176A11.956 11.956 0 0112 21a11.956 11.956 0 01-5.25-2.824A11.956 11.956 0 013.75 12c0-1.007.11-2.007.323-2.964A12.016 12.016 0 015.25 6.052 11.956 11.956 0 019 2.714z" />
  </svg>
);

export const DocumentXIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-10 h-10 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3H19.5A2.25 2.25 0 0121.75 5.25V19.5A2.25 2.25 0 0119.5 21.75H4.5A2.25 2.25 0 012.25 19.5V10.083c0-.399.168-.779.438-1.049l3.417-3.417A1.5 1.5 0 017.167 5.25H9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3v2.25H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5l-4.5 4.5m0-4.5l4.5 4.5" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className, filled = true, strokeWidth = 1.5 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    className={className || `w-5 h-5 text-[${COLORS.accent}]`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className || `w-6 h-6 text-[${COLORS.accent}]`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);