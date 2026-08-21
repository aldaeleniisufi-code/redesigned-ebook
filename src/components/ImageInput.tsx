"use client";

import { useRef, useState, type ChangeEvent } from "react";

async function compressImage(
  file: File,
  maxSize = 1600,
  quality = 0.85
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob || blob.size >= file.size) return file;
    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function ImageInput({
  name,
  required,
  className,
}: {
  name: string;
  required?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size < 800_000) return;

    setBusy(true);
    try {
      const compressed = await compressImage(file);
      if (compressed !== file && ref.current) {
        const dt = new DataTransfer();
        dt.items.add(compressed);
        ref.current.files = dt.files;
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={ref}
        type="file"
        name={name}
        accept="image/*"
        required={required}
        onChange={onChange}
        className={className}
      />
      {busy && (
        <span className="text-xs text-foreground/50">⏳ …</span>
      )}
    </div>
  );
}
