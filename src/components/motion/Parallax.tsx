"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Positive moves slower (up), negative moves faster. Range roughly -100..100 px. */
  offset?: number;
}

export const Parallax = ({
  children,
  className,
  offset = 60,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: prefersReduced ? 0 : y }}>{children}</motion.div>
    </div>
  );
};
