import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLegalPage } from "@/app/actions";

export const revalidate = 60;

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy");

  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {page?.title || "Privacy Policy"}
        </h1>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {(page?.content || "").split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
