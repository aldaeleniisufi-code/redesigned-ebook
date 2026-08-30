"use client";

import { useState } from "react";

export default function MathChallenge({
  prompt,
  error,
  button,
  onSolved,
}: {
  prompt: string;
  error: string;
  button: string;
  onSolved: () => void;
}) {
  const [a] = useState(() => 2 + Math.floor(Math.random() * 7));
  const [b] = useState(() => 2 + Math.floor(Math.random() * 7));
  const [val, setVal] = useState("");
  const [wrong, setWrong] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (parseInt(val, 10) === a + b) {
      onSolved();
    } else {
      setWrong(true);
      setVal("");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-foreground/70">{prompt}</p>
      <div className="text-3xl font-bold text-brand-purple">
        {a} + {b} = ?
      </div>
      <input
        autoFocus
        inputMode="numeric"
        pattern="[0-9]*"
        value={val}
        onChange={(e) => {
          setVal(e.target.value.replace(/\D/g, ""));
          setWrong(false);
        }}
        className="w-24 rounded-2xl border-2 border-brand-purple/20 bg-white px-4 py-2 text-center text-2xl font-bold text-brand-purple focus:border-brand-pink focus:outline-none"
      />
      {wrong && <p className="text-sm font-semibold text-brand-orange">{error}</p>}
      <button
        type="submit"
        className="rounded-full bg-brand-purple px-8 py-2.5 font-bold text-white shadow transition hover:brightness-110"
      >
        {button}
      </button>
    </form>
  );
}
