import type { LegalPage } from '@/db/schema';

interface FooterProps {
  legalPages: LegalPage[];
}

export const Footer = ({ legalPages }: FooterProps) => {
  const privacy = legalPages.find((p) => p.slug === 'privacy');
  const terms = legalPages.find((p) => p.slug === 'terms');

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
          {privacy && (
            <a
              href={privacy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow hover:text-foreground transition-colors"
            >
              {privacy.title || 'Privacy'}
            </a>
          )}
          {terms && (
            <a
              href={terms.url}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow hover:text-foreground transition-colors"
            >
              {terms.title || 'Terms'}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};
