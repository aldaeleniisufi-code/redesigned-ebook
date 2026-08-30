"use client";

import { useState } from "react";
import MathChallenge from "@/components/MathChallenge";

export default function ParentGate({
  title,
  prompt,
  error,
  button,
  children,
}: {
  title: string;
  prompt: string;
  error: string;
  button: string;
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) return <>{children}</>;

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-3xl bg-white p-8 text-center shadow-lg">
      <div className="mb-4 text-5xl">🔒</div>
      <h2 className="mb-5 text-xl font-bold text-brand-purple">{title}</h2>
      <MathChallenge
        prompt={prompt}
        error={error}
        button={button}
        onSolved={() => setUnlocked(true)}
      />
    </div>
  );
}
