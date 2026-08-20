"use client";

import { useEffect, useRef } from 'react';

const ORBS = [
  { size: 260, topPct: 6, left: '10%', duration: '14s', delay: '0s', opacity: 0.14, blur: 40, parallax: 0.18 },
  { size: 220, topPct: 18, left: '72%', duration: '16s', delay: '-6s', opacity: 0.12, blur: 36, parallax: 0.32 },
  { size: 300, topPct: 38, left: '30%', duration: '18s', delay: '-12s', opacity: 0.1, blur: 44, parallax: 0.12 },
  { size: 190, topPct: 52, left: '85%', duration: '13s', delay: '-18s', opacity: 0.13, blur: 32, parallax: 0.4 },
  { size: 280, topPct: 68, left: '15%', duration: '17s', delay: '-24s', opacity: 0.11, blur: 42, parallax: 0.2 },
  { size: 210, topPct: 80, left: '60%', duration: '15s', delay: '-4s', opacity: 0.12, blur: 34, parallax: 0.28 },
  { size: 240, topPct: 30, left: '52%', duration: '19s', delay: '-16s', opacity: 0.1, blur: 38, parallax: 0.15 },
  { size: 180, topPct: 92, left: '35%', duration: '12s', delay: '-10s', opacity: 0.13, blur: 30, parallax: 0.36 },
];

// Each orb is rendered twice, offset by one viewport height apart, so as one
// copy drifts out past the top/bottom edge, its twin is already sliding into
// view from the opposite edge — no visible pop/jump at the wrap point.
export const StarBackground = () => {
  const orbWrapperRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let animationFrameId: number;

    const animate = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      orbWrapperRefs.current.forEach((el, idx) => {
        if (!el) return;
        const orbIndex = Math.floor(idx / 2);
        const isTwin = idx % 2 === 1;
        const rawOffset = -scrollY * ORBS[orbIndex].parallax;
        const wrapped = ((rawOffset % viewportHeight) + viewportHeight) % viewportHeight;
        const twinShift = isTwin ? -viewportHeight : 0;
        el.style.transform = `translate3d(0, ${wrapped + twinShift}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {ORBS.flatMap((orb, orbIndex) => (
        [0, 1].map((twin) => (
          <div
            key={`${orbIndex}-${twin}`}
            ref={(el) => { if (el) orbWrapperRefs.current[orbIndex * 2 + twin] = el; }}
            className="absolute"
            style={{
              width: orb.size,
              height: orb.size,
              top: `${orb.topPct}%`,
              left: orb.left,
              willChange: 'transform',
            }}
          >
            <div
              className="w-full h-full rounded-full liquid-orb"
              style={{
                opacity: orb.opacity,
                animationDuration: orb.duration,
                animationDelay: orb.delay,
                background: 'radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)',
                filter: `blur(${orb.blur}px)`,
              }}
            />
          </div>
        ))
      ))}
    </div>
  );
};
