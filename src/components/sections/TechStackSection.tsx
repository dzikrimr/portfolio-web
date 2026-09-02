"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TechStack } from "@/db/schema";

gsap.registerPlugin(ScrollTrigger);

interface TechStackSectionProps {
  technologies: TechStack[];
}

export const TechStackSection = ({ technologies }: TechStackSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header stagger
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Grid items stagger with 3D rotation
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 60, opacity: 0, scale: 0.8, rotateX: 30 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mainGrid = technologies.slice(0, 10);
  const bottomGrid = technologies.slice(10);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Tech Stack
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            Technologies I work with most confidently
          </p>
        </div>

        <div ref={gridRef} className="flex flex-col gap-6">
          <div className="grid grid-cols-5 gap-4">
            {mainGrid.map((tech, index) => (
              <TechCard
                key={tech.id}
                tech={tech}
                ref={(el) => { itemsRef.current[index] = el; }}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center gap-4">
            {bottomGrid.map((tech, index) => (
              <div
                key={tech.id}
                className="w-[calc(20%-1rem)] max-w-none"
                ref={(el) => { itemsRef.current[index + 10] = el; }}
              >
                <TechCard tech={tech} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TechCard = React.forwardRef<HTMLDivElement, { tech: TechStack }>(({ tech }, ref) => (
  <div
    ref={ref}
    className="group flex flex-col items-center justify-center p-6 rounded-xl aspect-square w-full border border-border/40 bg-card/30 hover:border-foreground/20 hover:bg-card/60 hover:shadow-float transition-all duration-500 cursor-default"
  >
    <div
      className="text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:scale-110 [&_svg]:w-10 [&_svg]:h-10"
      dangerouslySetInnerHTML={{ __html: tech.logoSvg }}
    />
    <span className="mt-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 text-center font-mono">
      {tech.name}
    </span>
  </div>
));
TechCard.displayName = 'TechCard';
