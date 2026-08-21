import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getDict } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function Navbar() {
  const session = await auth();
  const role = session?.user?.role;
  const d = await getDict();

  return (
    <header className="bg-brand-purple text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">📚</span>
          <span>{d.brand}</span>
        </Link>

        <div className="flex items-center gap-3 text-sm sm:text-base">
          {!session && (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.login}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-orange px-4 py-2 font-semibold text-white shadow transition hover:brightness-110"
              >
                {d.nav.register}
              </Link>
            </>
          )}

          {session && role === "PARENT" && (
            <>
              <Link
                href="/library"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.library}
              </Link>
              <Link
                href="/coloring"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.coloring}
              </Link>
              <Link
                href="/parent"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.parent}
              </Link>
              <Link
                href="/profiles"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.profiles}
              </Link>
            </>
          )}

          {session && role === "ADMIN" && (
            <>
              <Link
                href="/admin"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.admin}
              </Link>
              <Link
                href="/admin/coloring"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                {d.nav.adminColoring}
              </Link>
            </>
          )}

          {session && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-full bg-white/20 px-4 py-2 font-semibold transition hover:bg-white/30"
              >
                {d.nav.logout}
              </button>
            </form>
          )}

          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
