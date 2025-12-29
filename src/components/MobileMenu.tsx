"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Twitter, Mail, Sun, Moon, Menu, X } from 'lucide-react';

const socials = [
  { icon: Github, href: process.env.GITHUB_URL!, label: 'GitHub' },
  { icon: Linkedin, href: process.env.LINKEDIN_URL!, label: 'LinkedIn' },
  { icon: Mail, href: process.env.EMAIL_URL!, label: 'Email' },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle('light', !initialDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('light', !newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

      <button
        onClick={toggleMenu}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full",
          "bg-card/80 backdrop-blur-sm border border-border/40",
          "flex items-center justify-center",
          "hover:bg-accent/50 transition-all duration-300",
          "hover:shadow-[0_0_20px_hsl(var(--foreground)/0.1)]"
        )}
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>


      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}


      <div
        className={cn(
          "fixed bottom-18 right-4 z-50 flex flex-col gap-2 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >

        <button
          onClick={toggleTheme}
          className={cn(
            "w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/40",
            "flex items-center justify-center",
            "hover:bg-accent/50 transition-all duration-300",
            "hover:shadow-[0_0_15px_hsl(var(--foreground)/0.08)]"
          )}
          aria-label="Toggle theme"
        >
          <div className="relative w-5 h-5 rounded-full bg-muted/60 border border-border/50 transition-colors duration-300 flex items-center justify-center">
            {isDark ? (
              <Moon size={12} className="text-background" />
            ) : (
              <Sun size={12} className="text-background" />
            )}
          </div>
        </button>


        {socials.map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/40",
              "flex items-center justify-center",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-accent/50 transition-all duration-300",
              "hover:shadow-[0_0_15px_hsl(var(--foreground)/0.08)]"
            )}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </>
  );
};