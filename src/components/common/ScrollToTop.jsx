import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures the window automatically scrolls to the top whenever
 * the user navigates to a new page or changes routes.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor link (hash), scroll to that element
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Scroll window to the top instantly upon route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Fallback for older browsers or strict container scrolling
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}
