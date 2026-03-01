"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getExperiences } from "@/app/actions";
import { Experience } from "@/db/schema";
import Image from "next/image";

export const TimelineSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        {" "}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            EXPERIENCE
          </h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
          <div 
            className="rounded-xl border border-border bg-card/50 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] text-muted-foreground tracking-wider flex-1 text-center font-mono">
                career.log
              </span>
              <div className="w-12" />
            </div>

            <div 
              className={cn(
                "p-2 md:p-4 space-y-1 font-mono overflow-y-auto overflow-x-hidden max-h-[400px]",
                "scrollbar-thin",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-white/10",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-thumb:hover]:bg-white/25",
                "scrollbar-track-transparent",
                "scrollbar-thumb-white/10"
              )}
              data-lenis-prevent
            >
              {experiences.map((exp, index) => (
                <div
                  key={exp.id || `${exp.year}-${index}`}
                  data-aos="fade-left"
                  data-aos-delay={200 + index * 100}
                >
                  <div
                    className={cn(
                      "group rounded-lg cursor-pointer transition-all duration-300",
                      index === activeIndex
                        ? "bg-accent/30"
                        : "hover:bg-accent/10",
                      index !== activeIndex && "opacity-60"
                    )}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="px-4 py-3 flex items-start gap-3">
                      <span className="text-muted-foreground text-xs shrink-0 select-none pt-0.5">
                        $
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs text-primary font-bold">
                            career --{exp.command}
                          </code>
                          <span className="text-[10px] text-muted-foreground/70">
                            [{exp.year}]
                          </span>
                          {index === activeIndex && expandedIndex !== index && (
                            <span className="w-1.5 h-3.5 bg-primary animate-pulse" />
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mt-1.5 gap-x-4 gap-y-1">
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground/80 leading-snug break-words">
                              {exp.title}
                            </span>
                          </div>

                          <div className="flex items-start gap-2 shrink-0 sm:max-w-[40%] sm:text-right self-end sm:self-start">
                            <span className="text-primary/70 font-medium leading-snug break-words">
                              {exp.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-xs transition-transform duration-300",
                          expandedIndex === index && "rotate-90 text-primary"
                        )}
                      >
                        ▸
                      </span>
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-in-out",
                        expandedIndex === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-6 pl-11 flex flex-col md:flex-row gap-6">
                          <div className="flex-1 space-y-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                                <span>// metadata</span>
                                <div className="flex-1 h-px bg-border/30" />
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed italic">
                                "{exp.description}"
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              {exp.output.map((line, i) => (
                                <div
                                  key={`output-${index}-${i}`}
                                  className="flex items-start gap-2 text-[11px]"
                                >
                                  <span className="text-primary/50">→</span>
                                  <span className="text-foreground/90">
                                    {line}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map((skill, i) => (
                                <span
                                  key={`skill-${index}-${i}`}
                                  className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary/80 border border-primary/20 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="text-[9px] text-muted-foreground/40 italic mt-2">
                              Location: {exp.location}
                            </div>
                          </div>

                          <div className="w-full md:w-48 shrink-0">
                            <div className="relative aspect-video md:aspect-square rounded-lg border border-border/50 bg-muted/20 overflow-hidden group/img">
                              {(!exp.image || imageLoading[exp.id]) && (
                                <div className="absolute inset-0 shimmer-effect flex items-center justify-center">
                                  <span className="text-[10px] text-muted-foreground/30">
                                    IMG_PREVIEW
                                  </span>
                                </div>
                              )}

                              {exp.image && (
                                <Image
                                  src={exp.image}
                                  alt={`${exp.company} preview`}
                                  fill
                                  className={cn(
                                    "object-cover transition-transform duration-500 group-hover/img:scale-110",
                                    imageLoading[exp.id]
                                      ? "opacity-0"
                                      : "opacity-100"
                                  )}
                                  onLoad={() =>
                                    setImageLoading((prev) => ({
                                      ...prev,
                                      [exp.id]: false,
                                    }))
                                  }
                                />
                              )}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2">
                                <span className="text-[8px] text-white uppercase tracking-tighter">
                                  View Source
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="px-4 py-2 flex items-center gap-3 opacity-40">
                <span className="text-xs text-primary/50">$</span>
                <span className="w-1.5 h-3.5 bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
