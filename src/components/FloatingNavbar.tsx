"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const FloatingNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide in after mount
    setTimeout(() => setIsVisible(true), 300);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}
    >
      {/* Desktop Navigation */}
      <div
        className={cn(
          "hidden md:flex items-center gap-1 rounded-full transition-all duration-500 ease-out",
          "glass-panel",
          isExpanded || isScrolled
            ? "px-8 py-3"
            : "px-3 py-3"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className={cn(
            "flex items-center gap-6 overflow-hidden transition-all duration-500",
            isExpanded || isScrolled
              ? "max-w-[500px] opacity-100"
              : "max-w-0 opacity-0"
          )}
        >
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link whitespace-nowrap text-xs font-normal uppercase tracking-wider"
              style={{
                opacity: isExpanded || isScrolled ? 1 : 0,
                transform: isExpanded || isScrolled ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.3s ${isExpanded ? `${index * 40}ms` : '0ms'}, transform 0.3s ${isExpanded ? `${index * 40}ms` : '0ms'}`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div
          className={cn(
            "w-2 h-2 rounded-full bg-foreground transition-all duration-300",
            isExpanded || isScrolled ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100"
          )}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "flex items-center justify-center w-11 h-11 rounded-full",
            "glass-panel transition-all duration-300"
          )}
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4 text-foreground" />
          ) : (
            <Menu className="w-4 h-4 text-foreground" />
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-14 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-xs",
            "glass-panel rounded-xl",
            "transition-all duration-300 overflow-hidden",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="p-3 flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "px-4 py-3 rounded-lg text-xs uppercase tracking-wider",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-accent/40"
                )}
                style={{
                  transition: `all 200ms ${isMobileMenuOpen ? `${index * 40}ms` : '0ms'}`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
