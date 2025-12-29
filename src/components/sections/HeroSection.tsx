"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import portraitImage from "@/assets/portrait.png";
import TextType from "@/components/TextType";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringName, setIsHoveringName] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 16, y: y * 16 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      />

      <div className="relative text-center max-w-4xl mx-auto">

        <h1
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]",
            "relative z-10 transition-all duration-700 ease-out",
            isHoveringName ? "opacity-60 z-50" : "opacity-100 z-10"
          )}
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
        >
          <span className="block">DZIKRI</span>
        </h1>


        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="relative w-[280px] md:w-[380px] lg:w-[460px] h-[373px] md:h-[507px] lg:h-[614px]">
            <Image
              src={portraitImage}
              alt="Dzikri Murtadlo"
              fill
              priority
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 460px"
              className="object-cover select-none
                         grayscale contrast-[1.05] brightness-95
                         [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)]"
              draggable={false}
            />
          </div>
        </div>


        <h1
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mt-1",
            "text-gradient relative z-30"
          )}
        >
          <span className="block">MURTADLO</span>
        </h1>


        <div className="mt-8 relative z-30">
          <div
            className={cn(
              "text-[18px] md:text-sm uppercase tracking-[0.4em] font-medium",
              "text-muted-foreground relative inline-block py-2 px-6"
            )}
          >

            <span className="absolute inset-0 bg-background/80 blur-xl rounded-full -z-10" />
            <TextType
              text="AI & Mobile Dev Enthusiast"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
              loop={false}
              hideCursorWhileTyping={false}
              className="text-foreground"
            />
          </div>
        </div>


        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap relative z-30">
          <a
            href={process.env.CV_DOWNLOAD_URL || "#"}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold
                       bg-foreground text-background hover:bg-gray-200
                       transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Download CV
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollClick(e, "#contact")}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold
                       border border-border text-foreground
                       hover:bg-accent hover:border-accent transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>


      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <a
          href="#projects"
          onClick={(e) => handleScrollClick(e, "#projects")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
