"use client";

import { useEffect, useState } from 'react';

const ROLL_IN_MS = 2000;
const HOLD_MS = 2000;
const ROLL_OUT_MS = 2000;
const FADE_OUT_MS = 500;

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, ROLL_IN_MS + HOLD_MS + ROLL_OUT_MS);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, ROLL_IN_MS + HOLD_MS + ROLL_OUT_MS + FADE_OUT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`intro-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="intro-logo-track">
        <img
          src="/favicon.ico"
          alt="Logo"
          className="intro-favicon"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
    </div>
  );
};
