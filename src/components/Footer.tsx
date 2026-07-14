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
          <a href="https://www.termsfeed.com/live/0126f2e0-5a61-4502-817c-010970cd8e58" className="eyebrow hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="https://www.termsfeed.com/live/de51afea-4d68-4a7b-9105-faecdfa641f0" className="eyebrow hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
