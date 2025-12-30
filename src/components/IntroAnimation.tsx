"use client";

import { useEffect, useState } from 'react';

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`intro-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="intro-background" />
      <div className="intro-favicon-container">
        <img 
          src="/favicon.ico" 
          alt="Logo" 
          className="intro-favicon"
        />
      </div>
    </div>
  );
};