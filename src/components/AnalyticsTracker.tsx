"use client";

import { useEffect, useRef } from "react";

const VISITOR_ID_KEY = "dspace_visitor_id";

const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
};

export const AnalyticsTracker = () => {
  const viewIdRef = useRef<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    const path = window.location.pathname;
    let visitorId: string;

    try {
      visitorId = getVisitorId();
    } catch {
      return;
    }

    fetch("/api/log-page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, path }),
      keepalive: true,
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.viewId === "number") viewIdRef.current = data.viewId;
      })
      .catch(() => {});

    fetch("/api/log-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, statusCode: 200, durationMs: Date.now() - start }),
      keepalive: true,
    }).catch(() => {});

    const sendDuration = () => {
      if (viewIdRef.current === null) return;
      const durationMs = Date.now() - start;
      const payload = JSON.stringify({ viewId: viewIdRef.current, durationMs });
      navigator.sendBeacon?.("/api/log-page-view", new Blob([payload], { type: "application/json" }));
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendDuration();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendDuration);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendDuration);
    };
  }, []);

  return null;
};
