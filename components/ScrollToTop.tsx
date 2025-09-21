import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (e) {
      // Fallback for browsers that don't support smooth scrolling options
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Re-run effect when pathname changes

  return null;
};

export default ScrollToTop;
