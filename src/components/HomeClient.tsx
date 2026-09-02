"use client";

import { useEffect, useRef, useState } from 'react';
import { FloatingNavbar } from '@/components/FloatingNavbar';
import { FloatingSocials } from '@/components/FloatingSocials';
import { StarBackground } from '@/components/StarBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileMenu } from '@/components/MobileMenu';
import { IntroAnimation } from '@/components/IntroAnimation';
import { useLenis } from '@/hooks/use-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SiteSettings, HeroStat, AboutSkill, TechStack } from '@/db/schema';

gsap.registerPlugin(ScrollTrigger);

interface HomeClientProps {
  settings: SiteSettings;
  heroStats: HeroStat[];
  aboutSkills: AboutSkill[];
  techStacks: TechStack[];
}

export const HomeClient = ({ settings, heroStats, aboutSkills, techStacks }: HomeClientProps) => {
  useLenis();
  const mainRef = useRef<HTMLElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const frameId = requestAnimationFrame(() => setShowContent(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <IntroAnimation />
      {showContent && (
        <div className="h-auto bg-background transition-colors duration-300">
          <StarBackground />
          <FloatingNavbar />
          <div className="hidden md:block">
            <FloatingSocials githubUrl={settings.githubUrl} linkedinUrl={settings.linkedinUrl} emailUrl={settings.emailUrl} />
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <MobileMenu githubUrl={settings.githubUrl} linkedinUrl={settings.linkedinUrl} emailUrl={settings.emailUrl} />
          </div>
          <main ref={mainRef}>
            <HeroSection settings={settings} stats={heroStats} />
            <AboutSection skills={aboutSkills} />
            <TechStackSection technologies={techStacks} />
            <ProjectsSection />
            <TimelineSection />
            <AchievementSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};
