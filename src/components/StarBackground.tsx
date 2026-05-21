"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { 
      x: number; y: number; size: number; opacity: number; 
      baseSpeed: number; twinkleSpeed: number; twinklePhase: number;
      scrollBoost: number;
    }[] = [];
    let mouseX = 0;
    let mouseY = 0;
    const mouseInfluence = 100;
    const lenis = new Lenis({ smoothWheel: true });
    let lenisVelocity = 0; // tracks Lenis's current velocity

    const resizeCanvas = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      canvas!.width = width;
      canvas!.height = height;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas!.width * canvas!.height) / 6000);
      stars = [];
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          baseSpeed: Math.random() * 0.3 + 0.1,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          scrollBoost: 0,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = (time: number) => {
      // Run Lenis and capture its velocity
      lenis.raf(time);
      lenisVelocity = lenis.velocity;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      stars.forEach((star) => {
        // Twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.25 + 0.75;
        
        // Base upward movement
        let totalSpeed = star.baseSpeed;

        // Scroll boost follows Lenis velocity proportionally
        // abs(velocity) gives us a smooth curve that matches scroll deceleration
        const boostTarget = Math.abs(lenisVelocity) * 0.8;
        star.scrollBoost += (boostTarget - star.scrollBoost) * 0.15; // smooth lerp
        totalSpeed += star.scrollBoost;

        star.y -= totalSpeed;
        if (star.y < -10) {
          star.y = canvas!.height + 10;
          star.x = Math.random() * canvas!.width;
        }

        // Mouse glow
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let glowEffect = 0;
        if (distance < mouseInfluence) {
          glowEffect = 1 - (distance / mouseInfluence);
        }

        const currentSize = star.size + (glowEffect * 2);
        const currentOpacity = star.opacity * twinkle + (glowEffect * 0.5);

        if (glowEffect > 0) {
          const gradient = ctx!.createRadialGradient(star.x, star.y, 0, star.x, star.y, currentSize * 5);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.5})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, currentSize * 5, 0, Math.PI * 2);
          ctx!.fillStyle = gradient;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx!.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};