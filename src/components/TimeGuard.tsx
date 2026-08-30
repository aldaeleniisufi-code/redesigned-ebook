"use client";

import { useEffect, useState } from "react";
import MathChallenge from "@/components/MathChallenge";

const LIMIT_KEY = "kidleido-timelimit";
const usageKey = () => "kidleido-usage-" + new Date().toISOString().slice(0, 10);

function readInt(key: string) {
  try {
    const v = parseInt(localStorage.getItem(key) ?? "0", 10);
    return Number.isNaN(v) ? 0 : v;
  } catch {
    return 0;
  }
}

export default function TimeGuard({
  labels,
}: {
  labels: { title: string; text: string; extend: string; prompt: string; error: string; button: string };
}) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    function check() {
      const limit = readInt(LIMIT_KEY);
      if (limit > 0 && readInt(usageKey()) >= limit) setBlocked(true);
    }
    check();
    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      const limit = readInt(LIMIT_KEY);
      if (limit <= 0) return; // unlimited
      const next = readInt(usageKey()) + 1;
      try {
        localStorage.setItem(usageKey(), String(next));
      } catch {
        /* ignore */
      }
      if (next >= limit) setBlocked(true);
    }, 60000);
    return () => clearInterval(id);
  }, []);

  function extend() {
    try {
      const current = readInt(usageKey());
      localStorage.setItem(usageKey(), String(Math.max(0, current - 15)));
    } catch {
      /* ignore */
    }
    setBlocked(false);
  }

  if (!blocked) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-purple/95 p-6 text-center backdrop-blur-sm">
      <div className="flex max-w-sm flex-col items-center gap-5 rounded-3xl bg-white p-8 shadow-2xl">
        <div className="text-6xl">🌙</div>
        <h2 className="text-2xl font-bold text-brand-purple">{labels.title}</h2>
        <p className="text-foreground/70">{labels.text}</p>
        <div className="mt-2 w-full border-t border-brand-purple/10 pt-5">
          <MathChallenge
            prompt={labels.prompt}
            error={labels.error}
            button={labels.extend}
            onSolved={extend}
          />
        </div>
      </div>
    </div>
  );
}
