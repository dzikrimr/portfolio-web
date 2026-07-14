"use client";

import React, { useState } from "react";
import { Sparkles, Smartphone, Server, type LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface Skill {
  icon: LucideIcon;
  label: string;
  description: string;
}

const skills: Skill[] = [
  { icon: Server, label: "Backend Systems", description: "Scalable APIs, services, and databases with clean architecture." },
  { icon: Sparkles, label: "Artificial Intel", description: "LLM integration, neural networks, and AI-driven automation." },
  { icon: Smartphone, label: "Mobile Systems", description: "High-performance native and cross-platform mobile apps." },
];

const FlipCard = ({ skill }: { skill: Skill }) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = skill.icon;

  return (
    <button
      type="button"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      className="group perspective-1000 w-full max-w-[240px] aspect-[3/4] focus:outline-none"
      aria-label={skill.label}
    >
      <div
        className={cn(
          "relative w-full h-full preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          flipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* Front — icon only */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card/90 to-background/70 backdrop-blur-xl flex flex-col items-center justify-center gap-4 shadow-2xl">
          <Icon className="w-12 h-12 md:w-14 md:h-14 text-foreground/70 transition-transform duration-500 group-hover:scale-110" />
          <span className="eyebrow text-muted-foreground/60">Hover</span>
        </div>

        {/* Back — title + description */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl border border-white/15 bg-gradient-to-br from-card to-background/90 backdrop-blur-xl flex flex-col items-center justify-center text-center gap-3 p-6 shadow-2xl">
          <Icon className="w-8 h-8 text-foreground mb-1" />
          <h3
            className="text-xl md:text-2xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {skill.label}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <Reveal direction="up" className="text-center mb-14 md:mb-16">
          <span className="eyebrow">What I Do</span>
          <h2
            className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Areas of Expertise
          </h2>
        </Reveal>

        <Stagger
          gap={0.1}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 w-full max-w-3xl place-items-center"
        >
          {skills.map((skill) => (
            <StaggerItem key={skill.label} className="w-full flex justify-center">
              <FlipCard skill={skill} />
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 eyebrow text-muted-foreground/50">
          Hover or tap a card to flip
        </p>
      </div>
    </section>
  );
};
