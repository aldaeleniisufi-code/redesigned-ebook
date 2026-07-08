import Link from "next/link";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-brand-purple">
        Είσοδος 👋
      </h1>

      {error && (
        <p className="rounded-xl bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Λάθος email ή κωδικός. Δοκίμασε ξανά.
        </p>
      )}

      <form action={loginAction} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md">
        <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
          Κωδικός
          <input
            type="password"
            name="password"
            required
            className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
        >
          Σύνδεση
        </button>
      </form>

      <p className="text-center text-sm text-foreground/70">
        Δεν έχεις λογαριασμό;{" "}
        <Link href="/register" className="font-semibold text-brand-purple underline">
          Εγγράψου εδώ
        </Link>
      </p>
    </div>
  );
}
