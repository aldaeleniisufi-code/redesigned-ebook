import Link from "next/link";
import { auth } from "@/auth";
import { getDict } from "@/lib/i18n";
import AgeLevelToggle from "@/components/AgeLevelToggle";

type Tile = {
  key: string;
  emoji: string;
  title: string;
  desc: string;
  href?: string;
  soon?: boolean;
  className: string;
};

export default async function AppHubPage() {
  const session = await auth();
  const d = await getDict();
  const a = d.app;

  const tiles: Tile[] = [
    {
      key: "stories",
      emoji: "📖",
      title: a.stories,
      desc: a.storiesDesc,
      href: "/library",
      className: "bg-brand-yellow text-brand-purple",
    },
    {
      key: "coloring",
      emoji: "🎨",
      title: a.coloring,
      desc: a.coloringDesc,
      href: "/coloring",
      className: "bg-brand-teal text-brand-purple",
    },
    {
      key: "fashion",
      emoji: "👗",
      title: a.fashion,
      desc: a.fashionDesc,
      href: "/app/fashion",
      className: "bg-brand-pink text-white",
    },
    {
      key: "magazine",
      emoji: "📰",
      title: a.magazine,
      desc: a.magazineDesc,
      href: "/app/magazine",
      className: "bg-brand-blue text-white",
    },
    {
      key: "activities",
      emoji: "🖍️",
      title: a.activities,
      desc: a.activitiesDesc,
      href: "/app/draw",
      className: "bg-white text-brand-purple ring-2 ring-brand-yellow",
    },
    {
      key: "profile",
      emoji: "⭐",
      title: a.profile,
      desc: a.profileDesc,
      href: "/profile",
      className: "bg-brand-purple text-white",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* header */}
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">
          {a.hubTitle}
        </h1>
        <p className="text-lg text-foreground/70">{a.hubSubtitle}</p>
        <AgeLevelToggle
          levelLabel={a.level}
          smallLabel={a.levelSmall}
          bigLabel={a.levelBig}
        />
      </div>

      {/* login prompt for guests */}
      {!session && (
        <div className="mb-8 flex flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center shadow-md sm:flex-row sm:justify-center">
          <span className="font-bold text-brand-purple">{a.loginPrompt}</span>
          <div className="flex gap-2">
            <Link
              href="/register"
              className="rounded-full bg-brand-yellow px-5 py-2 text-sm font-bold text-brand-purple shadow transition hover:scale-105"
            >
              {a.register}
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-purple ring-2 ring-brand-purple transition hover:scale-105"
            >
              {a.login}
            </Link>
          </div>
        </div>
      )}

      {/* tile grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tiles.map((tile) => {
          const inner = (
            <>
              <span className="text-5xl sm:text-6xl" aria-hidden="true">
                {tile.emoji}
              </span>
              <span className="mt-3 text-lg font-bold leading-tight">
                {tile.title}
              </span>
              <span className="mt-1 text-sm opacity-80">{tile.desc}</span>
              {tile.soon && (
                <span className="mt-3 rounded-full bg-black/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {a.soon}
                </span>
              )}
            </>
          );

          const base =
            "flex aspect-square flex-col items-center justify-center rounded-3xl p-4 text-center shadow-md transition";

          if (tile.soon || !tile.href) {
            return (
              <div
                key={tile.key}
                className={`${base} ${tile.className} cursor-default opacity-90`}
              >
                {inner}
              </div>
            );
          }

          return (
            <Link
              key={tile.key}
              href={tile.href}
              className={`${base} ${tile.className} hover:-translate-y-1 hover:shadow-xl`}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {/* parents area link */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow-md"
        >
          🔒 {a.parents}
          <span className="font-normal text-foreground/50">· {a.parentsDesc}</span>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-foreground/50">{a.installHint}</p>
    </div>
  );
}
