"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import portraitImage from "@/assets/portrait.png";
import { Magnetic } from "@/components/motion/MagneticButton";
import { TiltCard } from "@/components/motion/TiltCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-screen py-24 lg:py-20">
          {/* Left */}
          <div className="relative z-20 space-y-7 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
            <div ref={titleRef}>
              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.92] overflow-hidden">
                <span className="block" style={{ fontFamily: "var(--font-display)" }}>
                  {splitChars("Dzikri")}
                </span>
              </h1>
              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.92] mt-1 overflow-hidden">
                <span className="block text-foreground/45" style={{ fontFamily: "var(--font-display)" }}>
                  {splitChars("Murtadlo")}
                </span>
              </h1>
            </div>

            <div ref={descriptionRef} className="overflow-hidden">
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Software engineer focused on{" "}
                <span className="text-foreground/90">Backend Systems</span>,{" "}
                <span className="text-foreground/90">Artificial Intelligence</span>, and{" "}
                <span className="text-foreground/90">Mobile Development</span>. I build scalable services and intelligent applications that don&apos;t just execute commands, but learn, adapt, and perform reliably in production.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Magnetic
                as="a"
                href={process.env.CV_DOWNLOAD_URL || "#"}
                className="group relative px-8 py-4 overflow-hidden rounded-full inline-block"
              >
                <span className="absolute inset-0 bg-foreground transition-transform duration-500 group-hover:scale-110" />
                <span className="relative font-mono text-xs uppercase tracking-[0.2em] font-semibold text-background">
                  Download CV
                </span>
              </Magnetic>
              <Magnetic
                as="a"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-4 overflow-hidden rounded-full border border-border inline-block"
              >
                <span className="absolute inset-0 bg-foreground/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative font-mono text-xs uppercase tracking-[0.2em] font-semibold text-foreground group-hover:text-background transition-colors duration-300">
                  Get in Touch
                </span>
              </Magnetic>
            </div>
          </div>

          {/* Right — FIFA-style player card */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            <div
              ref={portraitContainerRef}
              className="fifa-card group relative w-[300px] md:w-[340px] lg:w-[380px] aspect-[3/4.35] select-none [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]"
            >
             <TiltCard max={16} className="relative w-full h-full" glareClipClassName="fifa-card-shape">
              {/* Outline layer following the silhouette */}
              <div className="fifa-card-shape absolute inset-0 bg-foreground/15" />
              {/* Card body with FIFA silhouette */}
              <div className="fifa-card-shape fifa-card-body absolute inset-[1.5px] overflow-hidden">
                {/* Subtle diagonal sheen — background layer, behind everything */}
                <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(115deg,transparent,transparent_22px,#fff_22px,#fff_23px)] pointer-events-none" />

                {/* Portrait — top zone only, does not reach the stats area */}
                <div className="absolute inset-x-0 top-0 bottom-[40%] overflow-hidden">
                  <Image
                    src={portraitImage}
                    alt="Dzikri Murtadlo"
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 380px"
                    className="hero-portrait-img object-cover object-top select-none grayscale contrast-[1.1] brightness-95"
                    draggable={false}
                  />
                  {/* Fade the bottom of the photo into the card */}
                  <div className="fifa-card-fade absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Rating + position (top-left) */}
              <div className="absolute top-[7%] left-[10%] z-20 flex flex-col items-center leading-none">
                <span className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>92</span>
                <span className="font-mono text-[11px] md:text-xs tracking-[0.15em] text-foreground/80 mt-1">BE</span>
                <span className="mt-2 w-7 h-px bg-foreground/30" />
                {/* Indonesian flag */}
                <span className="mt-2 flex flex-col w-6 h-4 overflow-hidden rounded-[2px] border border-foreground/20 shadow-sm">
                  <span className="flex-1 bg-[#e70011]" />
                  <span className="flex-1 bg-white" />
                </span>
              </div>

              {/* Bottom info: name + stats (clean zone, no photo behind) */}
              <div ref={statsPanelRef} className="absolute inset-x-0 bottom-[9%] z-20 px-[14%] flex flex-col items-center">
                <span className="stat-item text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  Dzikri M.
                </span>
                <span className="stat-item mt-1.5 mb-3 w-full h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full">
                  {[
                    ["01", "YRS"],
                    ["10", "PRJ"],
                    ["92", "BCK"],
                    ["85", "AI"],
                    ["88", "MOB"],
                    ["90", "SYS"],
                  ].map(([val, label]) => (
                    <div key={label} className="stat-item flex items-center justify-center gap-2">
                      <span className="text-base md:text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>{val}</span>
                      <span className="font-mono text-[10px] md:text-[11px] tracking-wider text-muted-foreground/80">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
             </TiltCard>
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
          <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="relative w-6 h-10 border-2 border-current rounded-full p-1.5">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce mx-auto" />
          </div>
        </a>
      </div>
    </section>
  );
};