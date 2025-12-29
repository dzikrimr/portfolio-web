"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Grid, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getProjects } from "@/app/actions";
import { Project } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Helper function to get all images for a project
  const getAllImages = (project: Project) => {
    return project.images || [];
  };

  // Helper function to get the primary image (first image or fallback)
  const getPrimaryImage = (project: Project) => {
    const images = getAllImages(project);
    return images.length > 0 ? images[0] : '/file.svg';
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjects(data);

      if (data.length > 0) {
        setCurrentIndex(Math.floor(data.length / 2));
      }
    };
    fetchData();
  }, []);

  // Keyboard navigation for modal images
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedProject) return;
      
      const allImages = getAllImages(selectedProject);
      if (allImages.length <= 1) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentImageIndex(prev => 
            prev === 0 ? allImages.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentImageIndex(prev => 
            prev === allImages.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedProject]);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= projects.length) {
        return 0;
      }
      return next;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        return projects.length - 1;
      }
      return prevIndex;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = (diff + projects.length) % projects.length;
    const adjustedDiff =
      normalizedDiff > projects.length / 2
        ? normalizedDiff - projects.length
        : normalizedDiff;

    const absDiff = Math.abs(adjustedDiff);
    const isCrossing = absDiff > projects.length / 2 - 0.1;

    let translateX = adjustedDiff * 320;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let rotateY = 0;
    let blur = 0;

    if (adjustedDiff === 0) {
      zIndex = 40;
      scale = 1;
      opacity = 1;
    } else if (absDiff === 1) {
      scale = 0.85;
      opacity = 0.6;
      zIndex = 30;
      rotateY = adjustedDiff * -12;
      blur = 1;
      translateX = adjustedDiff * 280;
    } else if (absDiff === 2) {
      scale = 0.7;
      opacity = 0.2;
      zIndex = 20;
      rotateY = adjustedDiff * -20;
      blur = 4;
      translateX = adjustedDiff * 240;
    } else {
      scale = 0.5;
      opacity = 0;
      zIndex = 10;
      translateX = adjustedDiff * 200;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: isCrossing ? 0 : opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      transition: isCrossing
        ? "opacity 300ms ease-in-out" 
        : "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease, filter 600ms ease",

      pointerEvents: (adjustedDiff === 0
        ? "auto"
        : "none") as React.CSSProperties["pointerEvents"],
      backfaceVisibility: "hidden" as const,
      willChange: "transform, opacity",
    };
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-24 min-h-screen w-full flex flex-col items-center justify-center overflow-visible"
    >

      <div className="text-center mb-8" data-aos="fade-up">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground tracking-tight">
          SELECTED PROJECTS
        </h2>
      </div>


      <div
        className="relative w-full max-w-6xl perspective-1000"
        data-aos="zoom-in"
        data-aos-delay="200"
      >

        <button
          onClick={goToPrev}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-50",
            "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full",
            "border border-border text-muted-foreground",
            "hover:bg-accent hover:text-foreground transition-all duration-300",
            "bg-background/90 backdrop-blur-sm hover:scale-110 cursor-pointer"
          )}
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={goToNext}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-50",
            "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full",
            "border border-border text-muted-foreground",
            "hover:bg-accent hover:text-foreground transition-all duration-300",
            "bg-background/90 backdrop-blur-sm hover:scale-110 cursor-pointer"
          )}
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>


        <div
          className="relative h-[320px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing px-12 md:px-16"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute w-[260px] md:w-[320px] transition-all duration-500 ease-out preserve-3d"
              style={getCardStyle(index)}
            >
              <div className="glass-card overflow-hidden flex flex-col h-full">

                <div className="relative h-36 md:h-40 flex-shrink-0 overflow-hidden">
                  <Image
                    src={getPrimaryImage(project)}
                    alt={project.title}
                    fill
                    className="object-cover"
                    style={{ filter: "grayscale(30%)" }}
                  />
                  {getAllImages(project).length > 1 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <ImageIcon className="w-3 h-3 text-white" />
                      <span className="text-xs text-white font-medium">{getAllImages(project).length}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>


                <div className="p-4 md:p-5 flex flex-col flex-1 min-h-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-accent/60 rounded text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed flex-1">
                    {truncateText(project.description, 100)}
                  </p>
                  <div className="flex gap-2">
                    <Dialog onOpenChange={(open) => {
                      if (!open) {
                        setSelectedProject(null);
                        setCurrentImageIndex(0);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 text-[10px] uppercase tracking-wider px-3 py-2 h-auto cursor-pointer"
                          onClick={() => {
                            setSelectedProject(project);
                            setCurrentImageIndex(0);
                          }}
                        >
                          View Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-xl border-border">
                        <DialogHeader className="p-6 border-b border-border">
                          <DialogTitle className="text-2xl font-bold tracking-tight">
                            {project.title}
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[70vh]">
                          <div className="p-6 pt-0">
                            {/* Image Gallery */}
                            <div className="relative mb-6">
                              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                                {getAllImages(project).length > 0 ? (
                                  <Image
                                    src={getAllImages(project)[currentImageIndex]}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-contain"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <ImageIcon className="w-16 h-16 text-muted-foreground" />
                                  </div>
                                )}
                                
                                {/* Image Navigation */}
                                {getAllImages(project).length > 1 && (
                                  <>
                                    <button
                                      onClick={() => setCurrentImageIndex(prev => 
                                        prev === 0 ? getAllImages(project).length - 1 : prev - 1
                                      )}
                                      className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                                    >
                                      <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => setCurrentImageIndex(prev => 
                                        prev === getAllImages(project).length - 1 ? 0 : prev + 1
                                      )}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                    
                                    {/* Image Indicators */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                                      {getAllImages(project).map((_, index) => (
                                        <button
                                          key={index}
                                          onClick={() => setCurrentImageIndex(index)}
                                          className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            index === currentImageIndex
                                              ? "bg-white"
                                              : "bg-white/50 hover:bg-white/70"
                                          )}
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs uppercase tracking-wider bg-accent/60 rounded text-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </ScrollArea>
                        <div className="p-6 border-t border-border">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "inline-flex items-center gap-2 text-xs uppercase tracking-wider",
                              "text-foreground hover:text-gray-300 transition-colors w-full justify-center cursor-pointer"
                            )}
                          >
                            View Project
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <a
                      href={project.link}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider px-3 py-2",
                        "text-foreground hover:text-gray-300 transition-colors border border-border rounded-md hover:bg-accent"
                      )}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}


          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-foreground"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
