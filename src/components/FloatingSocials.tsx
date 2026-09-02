"use client";

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingSocialsProps {
  githubUrl: string;
  linkedinUrl: string;
  emailUrl: string;
}

export const FloatingSocials = ({ githubUrl, linkedinUrl, emailUrl }: FloatingSocialsProps) => {
  const socials = [
    { icon: Github, href: githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
    { icon: Mail, href: emailUrl, label: 'Email' },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 600);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col transition-all duration-700 ease-out",
        "right-0 top-[calc(50%-60px)]",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      {socials.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center w-10 h-10",
            "bg-card/80 backdrop-blur-sm border-l border-t border-border/40",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent/50 transition-all duration-300",
            index === socials.length - 1 && "rounded-bl-xl border-b"
          )}
          style={{ transitionDelay: `${index * 80}ms` }}
          aria-label={social.label}
        >
          <social.icon size={18} />
        </a>
      ))}
    </div>
  );
};