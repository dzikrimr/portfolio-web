"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Smartphone, Code2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";
import { cn } from "@/lib/utils";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

const skills = [
  { icon: Sparkles, label: "Artificial Intel", description: "Specializing in LLM integration, Neural Networks, and AI-driven automation." },
  { icon: Smartphone, label: "Mobile Systems", description: "Crafting high-performance native and cross-platform mobile applications." },
  { icon: Code2, label: "Web Engineering", description: "Building scalable full-stack web architectures with modern technologies." },
  { icon: Globe, label: "Blockchain", description: "Experience in decentralized protocols and smart contract integration." },
];

export const AboutSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveIndex(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section id="about" className="py-20 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        

        <div className="space-y-6 z-10">
          <div className="inline-block border-l-2 border-primary pl-4">
            <DecryptedText text="THE DEVELOPER" animateOn="view" speed={80} className="text-xs uppercase tracking-[0.5em] text-muted-foreground" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground leading-tight">
            <DecryptedText text="INTELLIGENT CODE" animateOn="view" speed={50} />
            <br />
            <DecryptedText text="SEAMLESS MOBILITY" animateOn="view" speed={60} className="text-muted-foreground/50" />
          </h2>
          <div className="max-w-md text-muted-foreground leading-relaxed space-y-4">
            <div className="text-sm md:text-base">
              <DecryptedText text="I am a software engineer focused on Artificial Intelligence, Backend Systems, and Mobile Development. I build scalable services and intelligent applications that don't just execute commands, but learn, adapt, and perform reliably in production environments." animateOn="view" speed={30} maxIterations={10} sequential={true} />
            </div>
            <div className="text-sm md:text-base">
              <DecryptedText text="My expertise spans backend architecture, API development, and mobile integration, supported by a versatile stack across web technologies and cloud deployment, with a strong emphasis on clean and maintainable system design." animateOn="view" speed={30} maxIterations={10} sequential={true} />
            </div>
          </div>
        </div>


        <div className="relative h-[400px] md:h-[500px] flex flex-col items-center justify-center lg:justify-end lg:pr-20 mt-10 lg:mt-0 group/deck">
          

          {!isMobile && (
            <div className={cn(
              "absolute bottom-0 lg:right-20 mb-4 transition-all duration-500 tracking-[0.3em] text-[10px] font-bold uppercase",
              activeIndex !== null ? "opacity-0 translate-y-4" : "opacity-40 translate-y-0 text-primary"
            )}>
              Click a card to expand
            </div>
          )}

          <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
            {skills.map((skill, index) => {
              const isSelected = activeIndex === index;
              const rotation = isSelected ? 0 : (index - (skills.length - 1) / 2) * (isMobile ? 10 : 15);
              const xOffset = isSelected ? 0 : (index - (skills.length - 1) / 2) * (isMobile ? 35 : 45);
              const yOffset = isSelected ? -50 : 0;

              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{
                    opacity: 1,
                    y: yOffset,
                    rotate: rotation,
                    x: xOffset,
                    zIndex: isSelected ? 100 : index,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(isSelected ? null : index);
                  }}
                  className={cn(
                    "group absolute flex flex-col justify-between border border-white/10 shadow-2xl cursor-pointer origin-bottom transition-colors duration-300",
                    "bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-2xl rounded-2xl p-6 md:p-8",
                    "w-44 h-64 md:w-52 md:h-72",
                    isSelected ? "border-primary/50 shadow-primary/20" : "hover:border-primary/30"
                  )}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-start justify-start">
                    <skill.icon className={cn(
                      "w-8 h-8 md:w-10 md:h-10 transition-all duration-300",
                      isSelected ? "text-primary opacity-100 scale-110" : "text-foreground opacity-60"
                    )} />
                  </div>

                  <div className="space-y-2 md:space-y-3 pointer-events-none">
                    <h3 className={cn("font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300", isSelected ? "text-primary" : "text-foreground")}>
                      {skill.label}
                    </h3>
                    <p className={cn("text-[9px] md:text-[10px] leading-relaxed uppercase tracking-[0.15em] font-medium transition-opacity duration-300", isSelected ? "opacity-100" : "opacity-60")}>
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>


          {isMobile && activeIndex === null && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-primary animate-pulse tracking-widest uppercase font-bold">
              Tap to expand
            </div>
          )}
        </div>
      </div>
    </section>
  );
};