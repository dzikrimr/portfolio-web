"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getAllImages = (project: Project) => project.images || [];
  const getPrimaryImage = (project: Project) => {
    const images = getAllImages(project);
    return images.length > 0 ? images[0] : '/file.svg';
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjects(data);
      if (data.length > 0) setCurrentIndex(Math.floor(data.length / 2));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
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
          setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
          break;
      }
    };
    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedProject]);

  const goToNext = () => setCurrentIndex(prev => (prev + 1) % projects.length);
  const goToPrev = () => setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    const adjustedDiff = normalizedDiff > projects.length / 2 ? normalizedDiff - projects.length : normalizedDiff;
    const absDiff = Math.abs(adjustedDiff);
    const isCrossing = absDiff > projects.length / 2 - 0.1;
    const shouldAnimate = absDiff <= 2;
    const isFarAway = absDiff > 3;

    let translateX = adjustedDiff * 320;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let rotateY = 0;
    let blur = 0;

    if (adjustedDiff === 0) { zIndex = 40; scale = 1; opacity = 1; }
    else if (absDiff === 1) { scale = 0.85; opacity = 0.6; zIndex = 30; rotateY = adjustedDiff * -12; blur = 1; translateX = adjustedDiff * 280; }
    else if (absDiff === 2) { scale = 0.7; opacity = 0.2; zIndex = 20; rotateY = adjustedDiff * -20; blur = 4; translateX = adjustedDiff * 240; }
    else { scale = 0.5; opacity = 0; zIndex = 10; translateX = adjustedDiff * 200; }

    let transition = "none";
    if (!isFarAway && shouldAnimate) {
      transition = isCrossing
        ? "opacity 300ms ease-in-out"
        : "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease, filter 600ms ease";
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: isCrossing ? 0 : opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      transition,
      pointerEvents: (adjustedDiff === 0 ? "auto" : "none") as React.CSSProperties["pointerEvents"],
      backfaceVisibility: "hidden" as const,
      willChange: shouldAnimate ? "transform, opacity" : "auto",
    };
  };

  const truncateText = (text: string, maxLength: number) => text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 w-full flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-foreground/3 via-background to-background pointer-events-none" />

      <div ref={headerRef} className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Selected Projects
        </h2>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          A curated showcase of my best work
        </p>
      </div>

      <div className="relative w-full max-w-6xl px-4" ref={carouselRef}>
        {/* Navigation */}
        <button onClick={goToPrev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground hover:border-foreground/30 transition-all duration-300 bg-background/80 backdrop-blur-sm cursor-pointer">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button onClick={goToNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground hover:border-foreground/30 transition-all duration-300 bg-background/80 backdrop-blur-sm cursor-pointer">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Carousel */}
        <div className="relative h-[380px] md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing px-12 md:px-20">
          {projects.map((project, index) => (
            <div key={project.id} className="absolute w-[280px] md:w-[340px] preserve-3d" style={getCardStyle(index)}>
              <div className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm shadow-xl hover:shadow-float transition-shadow duration-500">
                {/* Image */}
                <div className="relative h-40 md:h-44 flex-shrink-0 overflow-hidden">
                  <Image src={getPrimaryImage(project)} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: "grayscale(40%)" }} />
                  {getAllImages(project).length > 1 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <ImageIcon className="w-3 h-3 text-white/80" />
                      <span className="text-[10px] text-white/80 font-medium">{getAllImages(project).length}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-accent/50 rounded text-foreground/80 border border-border/30">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5 tracking-tight">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{truncateText(project.description, 110)}</p>
                  
                  <div className="flex gap-2">
                    <Dialog onOpenChange={(open) => { if (!open) { setSelectedProject(null); setCurrentImageIndex(0); } }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 text-[10px] uppercase tracking-wider h-9 cursor-pointer hover:bg-accent hover:border-foreground/30 transition-all duration-200"
                          onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }}>
                          View Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-xl border-border">
                        <DialogHeader className="p-6 border-b border-border">
                          <DialogTitle className="text-2xl font-bold tracking-tight">{project.title}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[70vh]">
                          <div className="p-6 pt-0">
                            <div className="relative mb-6">
                              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                                {getAllImages(project).length > 0 ? (
                                  <Image src={getAllImages(project)[currentImageIndex]} alt={`${project.title} - Image ${currentImageIndex + 1}`} fill className="object-contain" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted"><ImageIcon className="w-16 h-16 text-muted-foreground" /></div>
                                )}
                                {getAllImages(project).length > 1 && (
                                  <>
                                    <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? getAllImages(project).length - 1 : prev - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                                    <button onClick={() => setCurrentImageIndex(prev => prev === getAllImages(project).length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                                      {getAllImages(project).map((_, idx) => (
                                        <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={cn("w-2 h-2 rounded-full transition-all", idx === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/70")} />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (<span key={tag} className="px-3 py-1 text-xs uppercase tracking-wider bg-accent/60 rounded text-foreground">{tag}</span>))}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                          </div>
                        </ScrollArea>
                        <div className="p-6 border-t border-border">
                          {project.link && project.link.trim() !== '' && project.link !== '#' ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider transition-colors duration-200 text-foreground hover:text-gray-300 w-full justify-center cursor-pointer">View Project <ExternalLink className="w-3 h-3" /></a>
                          ) : (
                            <Link href="/private-repo" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider transition-colors duration-200 text-foreground hover:text-gray-300 w-full justify-center cursor-pointer">View Project <ExternalLink className="w-3 h-3" /></Link>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Link href={project.link && project.link.trim() !== '' && project.link !== '#' ? project.link : '/private-repo'} target={project.link && project.link.trim() !== '' && project.link !== '#' ? "_blank" : "_self"} className="inline-flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider px-3 h-9 text-foreground hover:text-gray-300 transition-colors duration-200 border border-border/60 rounded-md hover:bg-accent/50 hover:border-foreground/30"><ExternalLink className="w-3 h-3" /></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 flex items-center gap-2">
            {projects.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={cn("h-1.5 rounded-full transition-all duration-300", index === currentIndex ? "w-8 bg-foreground" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};