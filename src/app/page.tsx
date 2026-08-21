import Link from "next/link";
import { auth } from "@/auth";
import { getDict } from "@/lib/i18n";

export default async function HomePage() {
  const session = await auth();
  const d = await getDict();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-16 text-center">
      <div className="text-4xl">✨📖🎨</div>

      <h1 className="text-4xl font-bold text-brand-purple sm:text-5xl">
        {d.home.welcome}
      </h1>
      <p className="text-2xl font-bold text-brand-yellow">{d.home.tagline}</p>

      <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/75">
        <p>{d.home.intro1}</p>
        <p>{d.home.intro2}</p>
        <p>{d.home.intro3}</p>
      </div>

      <p className="text-xl font-bold text-brand-purple">{d.home.cta}</p>

      <div className="mt-2 flex flex-wrap justify-center gap-4">
        {session ? (
          <Link
            href="/library"
            className="rounded-full bg-brand-yellow px-8 py-4 text-lg font-bold text-brand-purple shadow-lg transition hover:scale-105 hover:brightness-105"
          >
            {d.home.goToLibrary}
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-full bg-brand-yellow px-8 py-4 text-lg font-bold text-brand-purple shadow-lg transition hover:scale-105 hover:brightness-105"
            >
              {d.home.registerParent}
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-purple shadow-lg ring-2 ring-brand-purple transition hover:scale-105"
            >
              {d.home.login}
            </Link>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-semibold text-foreground/60">
        <span className="rounded-full bg-white px-4 py-2 shadow-sm">
          📖 {d.nav.library}
        </span>
        <span className="rounded-full bg-white px-4 py-2 shadow-sm">
          🎨 {d.nav.coloring}
        </span>
      </div>
    </div>
  );
}
