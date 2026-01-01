"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

const Index = () => {
  useLenis(); 
  
  useEffect(() => {
    window.scrollTo(0, 0);

    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 80,
      delay: 0,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <>
      <IntroAnimation />
      <div className="min-h-screen bg-background transition-colors duration-300">
        <StarBackground />
      <FloatingNavbar />
      <div className="hidden md:block">
        <FloatingSocials />
        <ThemeToggle />
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
      <main>
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <TimelineSection />
        <AchievementSection />
        <ContactSection />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Index;
