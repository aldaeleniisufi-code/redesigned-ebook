"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Shrinks a big photo before upload so each request stays small and fast.
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
    if (!blob) return file;
    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function BulkPageUpload({
  endpoint,
  showLanguage = true,
}: {
  endpoint: string;
  showLanguage?: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [locale, setLocale] = useState<"el" | "en">("el");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(0);
  const [failed, setFailed] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    // natural sort so page-2 comes before page-10
    list.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
    setFiles(list);
    setDone(0);
    setFailed([]);
    setFinished(false);
  }

  async function uploadAll() {
    if (!files.length || busy) return;
    setBusy(true);
    setDone(0);
    setFailed([]);
    setFinished(false);
    const fails: number[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        const fd = new FormData();
        fd.append("image", compressed);
        if (showLanguage) fd.append("locale", locale);
        const res = await fetch(endpoint, {
          method: "POST",
          body: fd,
        });
        if (!res.ok) fails.push(i + 1);
      } catch {
        fails.push(i + 1);
      }
      setDone(i + 1);
      setFailed([...fails]);
    }
    setBusy(false);
    setFinished(true);
    router.refresh();
  }

  const pct = files.length ? Math.round((done / files.length) * 100) : 0;
  const ok = done - failed.length;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-foreground/70">
        Διάλεξε <strong>όλες τις εικόνες μαζί</strong>. Μπαίνουν αυτόματα με τη
        σειρά του ονόματος αρχείου (π.χ. page-001, page-002…). Ιδανικό για
        βιβλία με πολλές σελίδες.
      </p>

      {showLanguage && (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-foreground/80">
          Γλώσσα σελίδων:
        </span>
        <div className="flex gap-3">
          {(["el", "en"] as const).map((lng) => (
            <button
              key={lng}
              type="button"
              onClick={() => setLocale(lng)}
              disabled={busy}
              className={`rounded-full px-5 py-2 text-sm font-bold shadow-sm transition ${
                locale === lng
                  ? "bg-brand-purple text-white"
                  : "bg-white text-brand-purple ring-1 ring-brand-purple/20"
              }`}
            >
              {lng === "el" ? "🇬🇷 Ελληνικά" : "🇬🇧 Αγγλικά"}
            </button>
          ))}
        </div>
        <p className="text-xs text-foreground/50">
          Ανέβασε το ελληνικό σετ ως «Ελληνικά» και το αγγλικό ως «Αγγλικά» —
          στο <strong>ίδιο</strong> βιβλίο. Ο αναγνώστης δείχνει το σωστό σετ
          ανάλογα με τη γλώσσα του site.
        </p>
      </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onSelect}
        disabled={busy}
        className="input"
      />

      {files.length > 0 && (
        <p className="text-sm font-semibold text-foreground">
          {files.length} εικόνες επιλεγμένες
        </p>
      )}

      {busy || finished ? (
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full overflow-hidden rounded-full bg-brand-purple/10">
            <div
              className="h-full rounded-full bg-brand-teal transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {busy
              ? `Ανέβασμα… ${done}/${files.length}`
              : `Ολοκληρώθηκε: ${ok}/${files.length} σελίδες ανέβηκαν ✅`}
          </p>
          {finished && failed.length > 0 && (
            <p className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              Απέτυχαν {failed.length} (σειρές επιλογής: {failed.join(", ")}).
              Ανέβασέ τες ξανά μεμονωμένα από την πιο πάνω φόρμα.
            </p>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={uploadAll}
        disabled={!files.length || busy}
        className="w-fit rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? "Ανεβαίνει…" : `Ανέβασε ${files.length || ""} σελίδες`}
      </button>
    </div>
  );
}
