import Link from "next/link";
import { getDict } from "@/lib/i18n";
import FreeDrawStudio from "@/components/FreeDrawStudio";

export default async function DrawPage() {
  const d = await getDict();
  const w = d.draw;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4">
      <Link
        href="/app"
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        ← Kidleido
      </Link>
      <FreeDrawStudio
        labels={{
          title: w.title,
          subtitle: w.subtitle,
          brush: w.brush,
          eraser: w.eraser,
          stickers: w.stickers,
          size: w.size,
          clear: w.clear,
          save: w.save,
        }}
      />
    </div>
  );
}
