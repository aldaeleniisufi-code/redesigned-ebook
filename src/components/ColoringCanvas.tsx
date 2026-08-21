"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { ColoringLabels } from "@/components/ColoringViewer";

const PALETTE = [
  "#EF4444", "#F97316", "#FACC15", "#22C55E", "#14B8A6",
  "#3B82F6", "#6366F1", "#A855F7", "#EC4899", "#92400E",
  "#000000", "#9CA3AF",
];

const MAX_DIM = 1200;

export default function ColoringCanvas({
  imageUrl,
  order,
  labels,
  onClose,
}: {
  imageUrl: string;
  order: number;
  labels: ColoringLabels;
  onClose: () => void;
}) {
  const paintRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [brush, setBrush] = useState(24);
  const [erasing, setErasing] = useState(false);
  const [ready, setReady] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 3, h: 4 });
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = paintRef.current;
      if (!canvas) return;
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      setDims({ w: img.width, h: img.height });
      setReady(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  function pointFromEvent(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = paintRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function stroke(from: { x: number; y: number }, to: { x: number; y: number }) {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function onPointerDown(e: PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = pointFromEvent(e);
    last.current = p;
    stroke(p, { x: p.x + 0.1, y: p.y + 0.1 });
  }

  function onPointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current) return;
    const p = pointFromEvent(e);
    stroke(last.current, p);
    last.current = p;
  }

  function onPointerUp() {
    drawing.current = false;
    last.current = null;
  }

  function clearCanvas() {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function downloadDrawing() {
    const paint = paintRef.current;
    if (!paint) return;
    const out = document.createElement("canvas");
    out.width = paint.width;
    out.height = paint.height;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(paint, 0, 0);
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(img, 0, 0, out.width, out.height);
      try {
        const a = document.createElement("a");
        a.href = out.toDataURL("image/png");
        a.download = `zografia-${order}.png`;
        a.click();
      } catch {
        window.open(imageUrl, "_blank");
      }
    };
    img.onerror = () => {
      try {
        const a = document.createElement("a");
        a.href = out.toDataURL("image/png");
        a.download = `zografia-${order}.png`;
        a.click();
      } catch {
        /* ignore */
      }
    };
    img.src = imageUrl;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 p-2 sm:p-4">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3 overflow-auto rounded-3xl bg-[#fffdf2] p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {PALETTE.map((c) => (
              <button
                key={c}
                aria-label={c}
                onClick={() => {
                  setColor(c);
                  setErasing(false);
                }}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  color === c && !erasing ? "border-brand-purple scale-110" : "border-white"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-bold text-brand-purple hover:bg-brand-purple/20"
          >
            ✕ {labels.close}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setErasing(false)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              !erasing ? "bg-brand-teal text-white" : "bg-white text-foreground"
            }`}
          >
            🖌 {labels.brush}
          </button>
          <button
            onClick={() => setErasing(true)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              erasing ? "bg-brand-teal text-white" : "bg-white text-foreground"
            }`}
          >
            🩹 {labels.eraser}
          </button>
          <input
            type="range"
            min={6}
            max={60}
            value={brush}
            onChange={(e) => setBrush(Number(e.target.value))}
            className="w-28"
          />
          <button
            onClick={clearCanvas}
            className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
          >
            🧽 {labels.clear}
          </button>
          <button
            onClick={downloadDrawing}
            className="ml-auto rounded-full bg-brand-orange px-4 py-2 text-sm font-bold text-white shadow hover:brightness-110"
          >
            {labels.downloadDrawing}
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-auto">
          <div
            className="relative mx-auto w-full max-w-md"
            style={{ touchAction: "none", aspectRatio: `${dims.w} / ${dims.h}` }}
          >
            <canvas
              ref={paintRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="absolute inset-0 h-full w-full rounded-xl bg-white"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ mixBlendMode: "multiply" }}
            />
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50">
                …
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
