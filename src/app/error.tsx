"use client";

import { useEffect } from "react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    fetch("/api/log-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname, statusCode: 500, durationMs: 0 }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground px-6">
      <h1 className="text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>500</h1>
      <p className="text-muted-foreground">Terjadi kesalahan pada server.</p>
      <button
        onClick={reset}
        className="text-sm underline hover:text-foreground/80"
      >
        Coba lagi
      </button>
    </div>
  );
}
