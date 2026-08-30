"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

export type DrawLabels = {
  title: string;
  subtitle: string;
  brush: string;
  eraser: string;
  stickers: string;
  size: string;
  clear: string;
  save: string;
};

const COLORS = [
  "#111827", "#EF4444", "#F97316", "#F4C95D", "#22C55E", "#14B8A6",
  "#2E6DB4", "#8B5CF6", "#EC4899", "#8B5A2B", "#9CA3AF", "#FFFFFF",
];
const SIZES = [8, 18, 34];
const STAMPS = ["⭐", "❤️", "🌈", "🌸", "🦋", "🐱", "🌟", "🍭", "🎈", "☀️", "🦄", "🌼"];

const W = 1000;
const H = 750;

type Mode = "draw" | "erase" | "stamp";

export default function FreeDrawStudio({ labels }: { labels: DrawLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(COLORS[1]);
  const [size, setSize] = useState(SIZES[1]);
  const [mode, setMode] = useState<Mode>("draw");
  const [stamp, setStamp] = useState(STAMPS[0]);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  function ctxOf() {
    return canvasRef.current?.getContext("2d") ?? null;
  }

  function fillWhite() {
    const ctx = ctxOf();
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
  }

  useEffect(() => {
    fillWhite();
  }, []);

  function pointFrom(e: PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  }

  function placeStamp(p: { x: number; y: number }) {
    const ctx = ctxOf();
    if (!ctx) return;
    ctx.font = `${size * 3}px system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(stamp, p.x, p.y);
  }

  function stroke(a: { x: number; y: number }, b: { x: number; y: number }) {
    const ctx = ctxOf();
    if (!ctx) return;
    ctx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    // erasing reveals white (canvas has no transparency after fill), so repaint white under
    if (mode === "erase") {
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function onDown(e: PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointFrom(e);
    if (mode === "stamp") {
      placeStamp(p);
      return;
    }
    drawing.current = true;
    last.current = p;
    stroke(p, { x: p.x + 0.1, y: p.y + 0.1 });
  }

  function onMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current) return;
    const p = pointFrom(e);
    stroke(last.current, p);
    last.current = p;
  }

  function onUp() {
    drawing.current = false;
    last.current = null;
  }

  function clear() {
    fillWhite();
  }

  function save() {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "kidleido-drawing.png";
    a.click();
  }

  const toolBtn = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition ${
      active ? "bg-brand-purple text-white" : "bg-brand-purple/8 text-brand-purple hover:bg-brand-purple/15"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-brand-purple sm:text-3xl">{labels.title}</h1>
        <p className="text-foreground/70">{labels.subtitle}</p>
      </div>

      {/* toolbar */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <button className={toolBtn(mode === "draw")} onClick={() => setMode("draw")}>
          🖌 {labels.brush}
        </button>
        <button className={toolBtn(mode === "erase")} onClick={() => setMode("erase")}>
          🩹 {labels.eraser}
        </button>
        <button className={toolBtn(mode === "stamp")} onClick={() => setMode("stamp")}>
          ✨ {labels.stickers}
        </button>
        <button
          className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-200"
          onClick={clear}
        >
          {labels.clear}
        </button>
        <button
          className="rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-purple shadow transition hover:brightness-105"
          onClick={save}
        >
          {labels.save}
        </button>
      </div>

      {/* colors + size (hidden in stamp mode) */}
      {mode !== "stamp" ? (
        <div className="mb-3 flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                aria-label={c}
                onClick={() => {
                  setColor(c);
                  setMode("draw");
                }}
                className={`h-8 w-8 rounded-full transition ${
                  color === c && mode === "draw" ? "ring-4 ring-brand-pink/40 scale-110" : "ring-2 ring-white hover:scale-105"
                }`}
                style={{ backgroundColor: c, boxShadow: "0 0 0 1px rgba(0,0,0,0.1)" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-foreground/50">
              {labels.size}
            </span>
            {SIZES.map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`grid h-9 w-9 place-items-center rounded-full transition ${
                  size === sz ? "bg-brand-purple/15 ring-2 ring-brand-pink" : "bg-brand-purple/5"
                }`}
              >
                <span
                  className="rounded-full bg-brand-purple"
                  style={{ width: sz / 2 + 4, height: sz / 2 + 4 }}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          {STAMPS.map((st) => (
            <button
              key={st}
              onClick={() => setStamp(st)}
              className={`grid h-11 w-11 place-items-center rounded-2xl text-2xl transition ${
                stamp === st ? "bg-brand-pink/15 ring-2 ring-brand-pink" : "bg-brand-purple/5 hover:bg-brand-purple/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      )}

      {/* canvas */}
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-purple/10">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="block w-full touch-none"
          style={{ aspectRatio: `${W} / ${H}`, cursor: "crosshair" }}
        />
      </div>
    </div>
  );
}
