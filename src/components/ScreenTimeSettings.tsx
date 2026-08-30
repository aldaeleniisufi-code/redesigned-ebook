"use client";

import { useEffect, useState } from "react";

const KEY = "kidleido-timelimit";
const OPTIONS = [15, 30, 60, 0]; // 0 = unlimited

export default function ScreenTimeSettings({
  minutesLabel,
  unlimitedLabel,
  savedLabel,
}: {
  minutesLabel: string;
  unlimitedLabel: string;
  savedLabel: string;
}) {
  const [limit, setLimit] = useState<number | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem(KEY) ?? "0", 10);
      setLimit(Number.isNaN(v) ? 0 : v);
    } catch {
      setLimit(0);
    }
  }, []);

  function choose(v: number) {
    setLimit(v);
    try {
      localStorage.setItem(KEY, String(v));
    } catch {
      /* ignore */
    }
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {OPTIONS.map((v) => (
        <button
          key={v}
          onClick={() => choose(v)}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${
            limit === v
              ? "bg-brand-purple text-white"
              : "bg-brand-purple/8 text-brand-purple hover:bg-brand-purple/15"
          }`}
        >
          {v === 0 ? unlimitedLabel : `${v} ${minutesLabel}`}
        </button>
      ))}
      {justSaved && (
        <span className="text-sm font-bold text-brand-teal">{savedLabel}</span>
      )}
    </div>
  );
}
