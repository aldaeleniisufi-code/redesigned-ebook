import Link from "next/link";
import { getDict } from "@/lib/i18n";
import FashionStudio from "@/components/FashionStudio";

export default async function FashionPage() {
  const d = await getDict();
  const f = d.fashion;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4">
      <Link
        href="/app"
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        ← Kidleido
      </Link>
      <FashionStudio
        labels={{
          title: f.title,
          subtitle: f.subtitle,
          tabFace: f.tabFace,
          tabHair: f.tabHair,
          tabOutfit: f.tabOutfit,
          tabShoes: f.tabShoes,
          tabAccessory: f.tabAccessory,
          tabBackground: f.tabBackground,
          color: f.color,
          surprise: f.surprise,
          reset: f.reset,
          save: f.save,
          girl: f.girl,
          boy: f.boy,
        }}
      />
    </div>
  );
}
