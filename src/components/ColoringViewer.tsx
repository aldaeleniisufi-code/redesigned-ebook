"use client";

import { useState } from "react";
import Image from "next/image";
import ColoringCanvas from "@/components/ColoringCanvas";
import { formatPrice } from "@/lib/format";

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
  downloadsRemaining: string;
  limitReached: string;
  buyAgain: string;
};

function blobProxyUrl(url: string) {
  return `/api/blob?${new URLSearchParams({ u: url }).toString()}`;
}

// Prints via a hidden iframe instead of window.open, which pop-up blockers stop.
// Printing is unlimited — only file downloads are counted.
// The image is preloaded (and decoded) first so large sheets never print blank.
function printImage(url: string) {
  const proxied = blobProxyUrl(url);
  const pre = new window.Image();
  const openPrintFrame = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.srcdoc = `<!doctype html><html><head><style>@page{margin:1cm}html,body{margin:0}img{width:100%;height:auto}</style></head><body><img src="${proxied}" /></body></html>`;
    iframe.onload = () => {
      const win = iframe.contentWindow;
      if (!win) return;
      const img = iframe.contentDocument?.querySelector("img");
      const doPrint = () => {
        win.focus();
        win.print();
        setTimeout(() => iframe.remove(), 1000);
      };
      const ready = () =>
        img?.decode ? img.decode().then(doPrint).catch(doPrint) : doPrint();
      if (img && img.complete && img.naturalWidth > 0) {
        ready();
      } else if (img) {
        img.addEventListener("load", ready, { once: true });
        img.addEventListener("error", doPrint, { once: true });
      } else {
        doPrint();
      }
    };
    document.body.appendChild(iframe);
  };
  // Warm the cache in the parent first, then open the print frame.
  pre.onload = openPrintFrame;
  pre.onerror = openPrintFrame;
  pre.src = proxied;
}

export default function ColoringViewer({
  title,
  pages,
  labels,
  packId,
  isFree,
  downloadsUsed,
  downloadLimit,
  priceCents,
  buyAgainAction,
}: {
  title: string;
  pages: Sheet[];
  labels: ColoringLabels;
  packId: string;
  isFree: boolean;
  downloadsUsed: number;
  downloadLimit: number;
  priceCents: number;
  buyAgainAction: (formData: FormData) => void | Promise<void>;
}) {
  const [active, setActive] = useState<Sheet | null>(null);
  const [remaining, setRemaining] = useState(
    Math.max(0, downloadLimit - downloadsUsed)
  );
  const [busy, setBusy] = useState(false);

  const limited = !isFree;
  const limitReached = limited && remaining <= 0;

  async function handleDownload(sheet: Sheet) {
    if (busy || limitReached) return;
    setBusy(true);
    try {
      const res = await fetch(
        `/api/coloring/${packId}/download?u=${encodeURIComponent(
          sheet.imageUrl
        )}&order=${sheet.order}`
      );
      if (res.status === 429) {
        setRemaining(0);
        return;
      }
      if (!res.ok) return;
      const rem = res.headers.get("X-Downloads-Remaining");
      if (rem !== null) setRemaining(Number(rem));
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `zografia-${sheet.order}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-3 text-center text-3xl font-bold text-brand-purple">
        {title}
      </h1>

      {limited && (
        <div className="mb-8 flex flex-col items-center gap-3 text-center text-sm font-semibold">
          {limitReached ? (
            <>
              <span className="text-brand-orange">{labels.limitReached}</span>
              <form action={buyAgainAction}>
                <input type="hidden" name="packId" value={packId} />
                <button
                  type="submit"
                  className="rounded-full bg-brand-orange px-6 py-2.5 font-bold text-white shadow transition hover:brightness-110"
                >
                  {labels.buyAgain} · {formatPrice(priceCents)}
                </button>
              </form>
            </>
          ) : (
            <span className="text-foreground/60">
              {labels.downloadsRemaining.replace("{n}", String(remaining))}
            </span>
          )}
        </div>
      )}

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
                onClick={() => handleDownload(sheet)}
                disabled={limitReached || busy}
                className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/20 disabled:cursor-not-allowed disabled:opacity-40"
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
