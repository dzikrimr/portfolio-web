"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Extra style applied to the tilting inner wrapper. */
  style?: MotionStyle;
  /** Class applied to the glare layer so it follows a non-rectangular card shape (e.g. a clip-path class). */
  glareClipClassName?: string;
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.3 };

export const TiltCard = ({
  children,
  className,
  max = 14,
  style,
  glareClipClassName,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Normalized cursor position within the card: -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [max, -max]),
    SPRING
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-max, max]),
    SPRING
  );

  // Glare position follows the cursor
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glareRaw = useMotionValue(0);
  const glareOpacity = useSpring(glareRaw, SPRING);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.9), rgba(255,255,255,0.15) 35%, transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
    glareRaw.set(0.35);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    glareRaw.set(0);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}

      {/* Moving glare / holographic sheen — clipped to the card's own shape */}
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-30 mix-blend-overlay ${glareClipClassName ?? ""}`}
        style={{
          opacity: glareOpacity,
          background: glareBackground,
        }}
      />
    </motion.div>
  );
};
