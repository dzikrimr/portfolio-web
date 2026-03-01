"use client";

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#techstack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const FloatingNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);

    const handleScroll = () => {

      setIsScrolling(true);


      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };


  const isOpen = isHovered || isScrolling;

  return (
    <nav 
      className={cn(
        "fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      )}
    >

      <div
        className={cn(
          "hidden md:flex items-center justify-center relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "bg-black/40 backdrop-blur-xl text-white shadow-2xl border border-white/10",
          "h-[44px] rounded-[22px] overflow-hidden", 
          isOpen ? "w-[560px]" : "w-[100px]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <div
          className={cn(
            "flex items-center justify-between w-full px-8 transition-opacity duration-300",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>


        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="w-8 h-[4px] bg-white/20 rounded-full" />
        </div>
      </div>


      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "relative flex items-center justify-center bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-500",
            "h-[44px] rounded-[22px] border border-white/10",
            isMobileMenuOpen ? "w-[280px]" : "w-[80px]"
          )}
        >
          <div className={cn(
            "flex items-center justify-between w-full px-6 transition-all duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 invisible"
          )}>
            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Menu</span>
            <X className="w-4 h-4 text-white" />
          </div>
          <Menu className={cn(
            "absolute w-4 h-4 text-white transition-opacity",
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          )} />
        </button>


        <div
          className={cn(
            "absolute top-14 left-1/2 -translate-x-1/2 w-[280px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl transition-all duration-500",
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="p-2 flex flex-col">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-[18px] text-[10px] uppercase tracking-widest font-bold transition-all",
                    isActive ? "bg-white/10 text-white" : "text-white/40"
                  )}
                >
                  <span className={cn(
                    "w-1 h-1 rounded-full bg-white",
                    isActive ? "opacity-100" : "opacity-0"
                  )} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};