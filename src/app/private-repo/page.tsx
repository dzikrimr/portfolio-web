import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function PrivateRepoPage() {
  const contactEmail = process.env.EMAIL_URL;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03)_0%,transparent_50%)]" />
      
      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="glass-card w-24 h-24 rounded-full flex items-center justify-center group hover:scale-105 transition-all duration-300">
            <Lock className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="eyebrow">Access Restricted</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Private Repository
          </h1>
          <p className="text-muted-foreground text-lg">
            Sorry, this repository is private
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-6 hover-lift">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This repository is private and not publicly accessible.
            Please contact the owner for permission to view the code.
          </p>
          
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}?subject=Repository Access Request&body=Hello,%0D%0A%0D%0AI would like to request access to view the repository code.%0D%0A%0D%0AThank you!`}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 font-mono text-sm uppercase tracking-wider hover-lift group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Contact Owner
            </a>
          )}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}