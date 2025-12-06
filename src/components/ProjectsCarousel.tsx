"use client";

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const projects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A comprehensive data visualization platform with real-time analytics and intuitive user interface.',
    image: project1,
    tags: ['React', 'TypeScript', 'D3.js'],
    link: '#',
  },
  {
    id: 2,
    title: 'Luxury E-Commerce',
    description: 'Premium shopping experience for high-end fashion brands with seamless checkout flow.',
    image: project2,
    tags: ['Next.js', 'Stripe', 'Prisma'],
    link: '#',
  },
  {
    id: 3,
    title: 'Creative Agency',
    description: 'Bold and expressive portfolio website featuring dynamic animations and immersive storytelling.',
    image: project3,
    tags: ['React', 'GSAP', 'Three.js'],
    link: '#',
  },
];

export const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
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
    const normalizedDiff = ((diff + projects.length) % projects.length);
    const adjustedDiff = normalizedDiff > projects.length / 2 ? normalizedDiff - projects.length : normalizedDiff;
    
    let translateX = adjustedDiff * 320;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let rotateY = 0;
    let blur = 0;

    if (adjustedDiff === 0) {
      scale = 1;
      opacity = 1;
      zIndex = 30;
      blur = 0;
    } else if (Math.abs(adjustedDiff) === 1) {
      scale = 0.85;
      opacity = 0.5;
      zIndex = 20;
      rotateY = adjustedDiff * -8;
      blur = 2;
      translateX = adjustedDiff * 280;
    } else {
      scale = 0.7;
      opacity = 0.15;
      zIndex = 10;
      rotateY = adjustedDiff * -12;
      blur = 4;
      translateX = adjustedDiff * 200;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
    };
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-20" data-aos="fade-up">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground tracking-tight">
          SELECTED WORKS
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        className="relative w-full max-w-6xl perspective-1000"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        {/* Cards Container */}
        <div
          className="relative h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
              className="absolute w-[280px] md:w-[360px] transition-all duration-500 ease-out preserve-3d"
              style={getCardStyle(index)}
            >
              <div className="glass-card overflow-hidden">
                {/* Project Image */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    style={{ filter: 'grayscale(30%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] uppercase tracking-wider bg-accent/60 rounded text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className={cn(
                      "inline-flex items-center gap-2 text-xs uppercase tracking-wider",
                      "text-foreground hover:text-gray-300 transition-colors"
                    )}
                  >
                    View Project
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={goToPrev}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "border border-border text-muted-foreground",
              "hover:bg-accent hover:text-foreground transition-all duration-300"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
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

          <button
            onClick={goToNext}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "border border-border text-muted-foreground",
              "hover:bg-accent hover:text-foreground transition-all duration-300"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
