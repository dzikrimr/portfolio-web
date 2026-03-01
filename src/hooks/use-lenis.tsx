"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      smoothWheel: true,
    });

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableContainer = target.closest('[data-lenis-prevent]');
      if (scrollableContainer) {
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return lenisRef.current;
};
