"use client";

import { useState, useEffect } from 'react';

export type ScrollDirection = 'down' | 'up';

/**
 * Hook to track window scroll direction with threshold debounce
 * Returns 'down' when scrolling downwards, and 'up' when scrolling upwards.
 */
export function useScrollDirection(threshold = 8): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      const direction: ScrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrollDirection;
}
