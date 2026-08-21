"use client";

import { useState } from "react";
import Image from "next/image";
import ColoringCanvas from "@/components/ColoringCanvas";

type Sheet = { id: string; order: number; imageUrl: string };

export type ColoringLabels = {
  sheet: string;
  download: string;
  print: string;
  colorDigitally: string;
  close: string;
  brush: string;
  eraser: string;
  clear: string;
  downloadDrawing: string;
};

async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank");
  }
}

function printImage(url: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(
    `<html><head><title>Print</title><style>body{margin:0}img{width:100%;height:auto}</style></head><body><img src="${url}" onload="window.focus();window.print();" /></body></html>`
  );
  w.document.close();
}

export default function ColoringViewer({
  title,
  pages,
  labels,
}: {
  title: string;
  pages: Sheet[];
  labels: ColoringLabels;
}) {
  const [active, setActive] = useState<Sheet | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold text-brand-purple">
        {title}
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {pages.map((sheet) => (
          <div
            key={sheet.id}
            className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-md"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-brand-purple/10 bg-white">
              <Image
                src={sheet.imageUrl}
                alt={`${labels.sheet} ${sheet.order}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActive(sheet)}
                className="rounded-full bg-brand-teal px-4 py-2 text-sm font-bold text-white shadow transition hover:brightness-110"
              >
                {labels.colorDigitally}
              </button>
              <button
                onClick={() =>
                  downloadImage(sheet.imageUrl, `zografia-${sheet.order}.png`)
                }
                className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/20"
              >
                {labels.download}
              </button>
              <button
                onClick={() => printImage(sheet.imageUrl)}
                className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/20"
              >
                {labels.print}
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <ColoringCanvas
          imageUrl={active.imageUrl}
          order={active.order}
          labels={labels}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
