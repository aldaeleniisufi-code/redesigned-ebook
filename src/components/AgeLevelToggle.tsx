"use client";

import { useEffect, useState } from "react";

type Level = "small" | "big";
const KEY = "kidleido-level";

export default function AgeLevelToggle({
  smallLabel,
  bigLabel,
  levelLabel,
}: {
  smallLabel: string;
  bigLabel: string;
  levelLabel: string;
}) {
  const [level, setLevel] = useState<Level>("small");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "small" || saved === "big") setLevel(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function choose(next: Level) {
    setLevel(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-brand-purple/60">{levelLabel}:</span>
      <div className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-brand-purple/10">
        <button
          onClick={() => choose("small")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            level === "small"
              ? "bg-brand-yellow text-brand-purple"
              : "text-brand-purple/60"
          }`}
        >
          {smallLabel}
        </button>
        <button
          onClick={() => choose("big")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            level === "big"
              ? "bg-brand-teal text-brand-purple"
              : "text-brand-purple/60"
          }`}
        >
          {bigLabel}
        </button>
      </div>
    </div>
  );
}
