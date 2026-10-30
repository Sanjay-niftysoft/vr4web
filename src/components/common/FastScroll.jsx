import { useEffect } from 'react';

/**
 * FastScroll Component
 * Normalizes and accelerates mouse-wheel scrolling across all pages.
 * - Precision touchpads / trackpads remain 100% untouched native.
 * - Mobile touch scrolling remains 100% native.
 * - Physical mouse wheel notches are boosted immediately with ZERO lerp lag.
 */
export default function FastScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Helper: determine if target or ancestor is an independently scrollable container
    const isScrollable = (el, deltaY) => {
      let node = el;
      while (node && node !== document.body && node !== document.documentElement) {
        if (!(node instanceof HTMLElement)) break;
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
          if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) return true;
          if (deltaY < 0 && node.scrollTop > 1) return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e) => {
      // Allow browser defaults for Ctrl+Wheel (zoom) or horizontal wheel
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (Math.abs(e.deltaY) < 1) return;

      // Allow native scrolling inside nested scrollable elements (dropdowns, drawers, dialogs)
      if (isScrollable(e.target, e.deltaY)) return;

      // Precision touchpads emit continuous, fractional or small deltas with deltaMode 0
      const isTouchpad = e.deltaMode === 0 && (!Number.isInteger(e.deltaY) || Math.abs(e.deltaY) < 32);
      if (isTouchpad) {
        // Native trackpad inertia is already hardware accelerated 120 FPS
        return;
      }

      // Discrete physical mouse wheel notch: boost immediately without floaty lerp lag
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        // Line mode (Firefox default: 3 lines = ~60px)
        delta *= 38;
      } else if (e.deltaMode === 2) {
        // Page mode
        delta *= window.innerHeight;
      }

      // Fast, immediate scroll response (no requestAnimationFrame trailing delay)
      window.scrollBy({
        top: delta * 1.35,
        behavior: 'auto'
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return null;
}
