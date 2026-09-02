import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-6 px-6 border-t border-border">
      <div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        <div className="eyebrow">
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="eyebrow hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="eyebrow hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
