import Link from "next/link";
import { getDict } from "@/lib/i18n";

export default async function ShopPage() {
  const d = await getDict();
  const s = d.shop;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-20 text-center">
      <div className="text-6xl">🛍️✨</div>
      <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">{s.title}</h1>
      <p className="rounded-full bg-brand-yellow px-6 py-2 text-lg font-bold text-brand-purple shadow">
        {s.soon}
      </p>
      <p className="max-w-md text-lg leading-relaxed text-foreground/70">
        {s.subtitle}
      </p>
      <Link
        href="/app"
        className="mt-2 rounded-full bg-brand-teal px-8 py-4 text-lg font-bold text-brand-purple shadow-lg transition hover:scale-105"
      >
        {d.app.openApp}
      </Link>
    </div>
  );
}
