import React, { useRef, useEffect } from 'react';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: string; // e.g., '0ms', '100ms', '200ms'
  threshold?: number;
  triggerOnce?: boolean;
}

const ScrollRevealWrapper: React.FC<ScrollRevealWrapperProps> = ({
  children,
  className = '',
  delay = '0ms',
  threshold = 0.1, // Trigger when 10% of the element is visible
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Set initial style for delay if provided
    if (delay !== '0ms') {
        currentRef.style.transitionDelay = delay;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentRef.classList.add('is-visible');
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else {
          if (!triggerOnce) {
            currentRef.classList.remove('is-visible');
          }
        }
      },
      { threshold }
    );

    observer.observe(currentRef);
    
    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
    >
      {children}
    </div>
  );
};
export default ScrollRevealWrapper;