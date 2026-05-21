"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import portraitImage from "@/assets/portrait.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const boundingBoxRef = useRef<HTMLDivElement>(null);
  const statsPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-title .char",
        { y: 120, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.035 },
        0.2
      )
      .fromTo(
        portraitContainerRef.current,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
        0.6
      )
      .fromTo(
        ".hero-portrait-img",
        { scale: 1.3, filter: "grayscale(100%) brightness(0.5)" },
        { scale: 1, filter: "grayscale(100%) brightness(0.95)", duration: 1.4, ease: "power2.out" },
        0.8
      )
      // Bounding box on top layer
      .fromTo(
        boundingBoxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.9
      )
      .fromTo(
        ".bbox-corner",
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        1.0
      )
      .fromTo(
        statsPanelRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        1.2
      )
      .fromTo(
        ".stat-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        1.4
      )
      .fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.6
      )
      .fromTo(
        ctaRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.8
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.0
      );

      // Mouse parallax - only bounding box and stats panel
      heroRef.current?.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = heroRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(boundingBoxRef.current, {
          x: x * 12,
          y: y * 12,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(statsPanelRef.current, {
          x: x * 10 + 60,
          y: y * 10,
          duration: 1,
          ease: "power2.out",
        });
      });

      heroRef.current?.addEventListener("mouseleave", () => {
        gsap.to(boundingBoxRef.current, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
        gsap.to(statsPanelRef.current, { x: 60, y: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        animation: gsap.to(heroRef.current, { opacity: 0, scale: 0.95, duration: 1 }),
        scrub: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
          {/* Left */}
          <div className="relative z-20 space-y-6">
            <div ref={titleRef}>
              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.9] overflow-hidden">
                <span className="block" style={{ fontFamily: "var(--font-display)" }}>
                  {splitChars("DZIKRI")}
                </span>
              </h1>
              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-wide leading-[0.9] mt-1 overflow-hidden">
                <span className="block text-foreground/70" style={{ fontFamily: "var(--font-display)" }}>
                  {splitChars("MURTADLO")}
                </span>
              </h1>
            </div>

            <div ref={descriptionRef} className="overflow-hidden">
              <p className="text-sm md:text-base text-muted-foreground/80 max-w-md leading-relaxed">
                I am a software engineer focused on Backend Systems, Artificial Intelligence, and Mobile Development. I build scalable services and intelligent applications that don't just execute commands, but learn, adapt, and perform reliably in production environments.
              </p>
            </div>

            <div ref={ctaRef} className="flex items-center gap-4 pt-2">
              <a
                href={process.env.CV_DOWNLOAD_URL || "#"}
                className="group relative px-8 py-4 overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-foreground transition-transform duration-500 group-hover:scale-110" />
                <span className="relative text-xs uppercase tracking-[0.25em] font-bold text-background">
                  Download CV
                </span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-4 overflow-hidden rounded-full border border-border"
              >
                <span className="absolute inset-0 bg-foreground/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative text-xs uppercase tracking-[0.25em] font-bold text-foreground group-hover:text-background transition-colors duration-300">
                  Get in Touch
                </span>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex items-center justify-center h-[60vh] lg:h-[80vh]">
            <div className="absolute inset-0 bg-gradient-radial from-foreground/8 via-transparent to-transparent rounded-full scale-75" />

            {/* Portrait - keeps full size */}
            <div ref={portraitContainerRef} className="relative w-[320px] md:w-[400px] lg:w-[480px] h-[100%] max-h-[600px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={portraitImage}
                  alt="Dzikri Murtadlo"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                  className="hero-portrait-img object-cover select-none grayscale contrast-[1.1] brightness-95"
                  draggable={false}
                />
                {/* Top gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/10" />
                {/* Bottom fade to blend with background */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* YOLO Bounding Box - shifted upward, on top layer (z-40) */}
            <div
              ref={boundingBoxRef}
              className="absolute inset-0 z-40 pointer-events-none flex items-start justify-center pt-[5%]"
            >
              <div className="relative w-[320px] md:w-[400px] lg:w-[300px] h-[40%]">
                <div className="bbox-corner absolute top-0 left-0 w-8 h-[2px] bg-foreground/60 origin-left" />
                <div className="bbox-corner absolute top-0 left-0 w-[2px] h-8 bg-foreground/60 origin-top" />
                <div className="bbox-corner absolute top-0 right-0 w-8 h-[2px] bg-foreground/60 origin-right" />
                <div className="bbox-corner absolute top-0 right-0 w-[2px] h-8 bg-foreground/60 origin-top" />
                <div className="bbox-corner absolute bottom-0 left-0 w-8 h-[2px] bg-foreground/60 origin-left" />
                <div className="bbox-corner absolute bottom-0 left-0 w-[2px] h-8 bg-foreground/60 origin-bottom" />
                <div className="bbox-corner absolute bottom-0 right-0 w-8 h-[2px] bg-foreground/60 origin-right" />
                <div className="bbox-corner absolute bottom-0 right-0 w-[2px] h-8 bg-foreground/60 origin-bottom" />
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
                <div className="absolute right-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
              </div>
            </div>

            {/* Stats Panel - smaller, more glass, aligned with bounding box */}
            <div
              ref={statsPanelRef}
              className="absolute right-0 top-[150] translate-x-[30%] md:translate-x-[40%] z-50 w-[150px] md:w-[190px]"
            >
              <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-4 md:p-5 shadow-2xl space-y-3">
                <div className="stat-item text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/90 font-mono leading-relaxed">
                  Software Engineer
                </div>
                <div className="h-px bg-border/50" />
                <div className="space-y-3">
                  <div className="stat-item flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground/80 font-mono uppercase tracking-wider">Years</span>
                    <span className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>1+</span>
                  </div>
                  <div className="stat-item flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground/80 font-mono uppercase tracking-wider">Projects</span>
                    <span className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>10+</span>
                  </div>
                  <div className="stat-item flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground/80 font-mono uppercase tracking-wider">Focus</span>
                    <span className="text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Backend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-current rounded-full p-1.5">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce mx-auto" />
          </div>
        </a>
      </div>
    </section>
  );
};