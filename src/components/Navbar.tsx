import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <header className="bg-brand-purple text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">📚</span>
          <span>Παιδικά Βιβλία</span>
        </Link>

        <div className="flex items-center gap-3 text-sm sm:text-base">
          {!session && (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                Σύνδεση
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-orange px-4 py-2 font-semibold text-white shadow transition hover:brightness-110"
              >
                Εγγραφή
              </Link>
            </>
          )}

          {session && role === "PARENT" && (
            <>
              <Link
                href="/library"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                Βιβλιοθήκη
              </Link>
              <Link
                href="/parent"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                Γονική Πύλη
              </Link>
              <Link
                href="/profiles"
                className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
              >
                Προφίλ
              </Link>
            </>
          )}

          {session && role === "ADMIN" && (
            <Link
              href="/admin"
              className="rounded-full px-4 py-2 font-semibold transition hover:bg-white/20"
            >
              Διαχείριση
            </Link>
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
                Αποσύνδεση
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
