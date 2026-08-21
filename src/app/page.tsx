import Link from "next/link";
import { auth } from "@/auth";
import { getDict } from "@/lib/i18n";

export default async function HomePage() {
  const session = await auth();
  const d = await getDict();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-purple/10 text-5xl">
        📚
      </div>

      <h1 className="text-4xl font-bold text-brand-purple sm:text-5xl">
        {d.home.heading}
      </h1>
      <p className="max-w-xl text-lg text-foreground/70">{d.home.subtitle}</p>

      <div className="flex flex-wrap justify-center gap-4">
        {session ? (
          <Link
            href="/library"
            className="rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
          >
            {d.home.goToLibrary}
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
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

      <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-foreground/60">
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
