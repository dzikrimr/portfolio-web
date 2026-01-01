"use client";

import { useCallback } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const scrollTo = useCallback((target: string | number, options?: { duration?: number; offset?: number }) => {
    const lenis = new Lenis({
      duration: options?.duration || 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const targetPosition = typeof target === 'string' 
      ? (document.querySelector(target) as HTMLElement)?.offsetTop || 0
      : target;

    const offsetPosition = targetPosition - (options?.offset || 0);

    function scrollToPosition() {
      lenis.scrollTo(offsetPosition, { duration: options?.duration || 1.2 });
    }

    scrollToPosition();
  }, []);

  return { scrollTo };
};