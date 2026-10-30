import { useEffect } from 'react';

/**
 * FastScroll Component
 * Normalizes and accelerates slow mouse-wheel scrolling across all pages.
 * - Leaves precision touchpads and trackpads completely native (100% untouched).
 * - Leaves mobile touch completely native (100% untouched).
 * - Leaves keyboard and scrollbar navigation 100% native.
 * - Accelerates discrete physical mouse wheel notches with immediate, smooth responsiveness.
 */
export default function FastScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isMoving = false;
    let animId = null;

    // Helper: determine if target or ancestor is an independently scrollable container
    const isScrollable = (el, deltaY) => {
      let node = el;
      while (node && node !== document.body && node !== document.documentElement) {
        if (!(node instanceof HTMLElement)) break;
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
          if (deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) {
            return true;
          }
          if (deltaY < 0 && node.scrollTop > 1) {
            return true;
          }
        }
        node = node.parentElement;
      }
      return false;
    };

    const updateScrollTarget = () => {
      if (!isMoving) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    const step = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.8) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isMoving = false;
        animId = null;
        return;
      }

      // Snappy, silky interpolation (0.22 per frame = ~120-160ms total settling)
      currentY += diff * 0.22;
      window.scrollTo(0, Math.round(currentY));
      animId = requestAnimationFrame(step);
    };

    const onWheel = (e) => {
      // Allow default handling for Ctrl+Wheel (zoom) or horizontal-only wheel
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (Math.abs(e.deltaY) < 1) return;

      // Check if scrolling inside a nested scrollable element
      if (isScrollable(e.target, e.deltaY)) return;

      // Precision touchpads emit continuous, small, and often fractional deltas with deltaMode === 0
      // Physical mouse wheels emit discrete integer notches (e.g. deltaMode === 1 [lines], or deltaMode === 0 with delta >= 35 and integer)
      const isTouchpad = e.deltaMode === 0 && (!Number.isInteger(e.deltaY) || Math.abs(e.deltaY) < 35);
      if (isTouchpad) {
        // Native trackpad inertia is already smooth and fast
        if (isMoving && animId) {
          cancelAnimationFrame(animId);
          isMoving = false;
        }
        targetY = window.scrollY;
        currentY = window.scrollY;
        return;
      }

      // It is a physical mouse wheel: intercept and boost scroll responsiveness
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        // Line mode (Firefox default: 3 lines = ~60px)
        delta *= 40;
      } else if (e.deltaMode === 2) {
        // Page mode
        delta *= window.innerHeight;
      }

      // Fast, comfortable wheel boost (1.65x multiplier for brisk, modern feel)
      const boostedDelta = delta * 1.65;

      const maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;

      // Ensure target starts from current position if user wasn't actively scrolling with wheel
      if (!isMoving) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }

      targetY = Math.max(0, Math.min(maxScroll, targetY + boostedDelta));

      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(step);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', updateScrollTarget, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', updateScrollTarget);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return null;
}

