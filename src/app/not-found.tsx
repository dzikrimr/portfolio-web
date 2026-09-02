"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    fetch("/api/log-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname, statusCode: 404, durationMs: 0 }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground px-6">
      <h1 className="text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>404</h1>
      <p className="text-muted-foreground">Halaman tidak ditemukan.</p>
      <Link href="/" className="text-sm underline hover:text-foreground/80">
        Kembali ke beranda
      </Link>
    </div>
  );
}
