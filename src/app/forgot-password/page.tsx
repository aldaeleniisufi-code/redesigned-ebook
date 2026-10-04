import Link from "next/link";
import { getLocale } from "@/lib/i18n";
import { requestPasswordResetAction } from "./actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; expired?: string }>;
}) {
  const { sent, expired } = await searchParams;
  const en = (await getLocale()) === "en";

  const t = en
    ? {
        title: "Forgot your password?",
        intro:
          "Enter your email and we'll send you a link to set a new password.",
        email: "Email",
        submit: "Send reset link",
        sent: "If an account exists with this email, we've sent a reset link. Check your inbox (and spam).",
        back: "Back to login",
        expired: "That reset link is invalid or has expired. Request a new one below.",
      }
    : {
        title: "Ξέχασες τον κωδικό σου;",
        intro:
          "Γράψε το email σου και θα σου στείλουμε σύνδεσμο για να ορίσεις νέο κωδικό.",
        email: "Email",
        submit: "Στείλε σύνδεσμο επαναφοράς",
        sent: "Αν υπάρχει λογαριασμός με αυτό το email, στείλαμε σύνδεσμο επαναφοράς. Έλεγξε το email σου (και τα spam).",
        back: "Πίσω στη σύνδεση",
        expired: "Ο σύνδεσμος επαναφοράς δεν ισχύει ή έληξε. Ζήτησε νέον παρακάτω.",
      };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-brand-purple">
        {t.title}
      </h1>

      {sent ? (
        <p className="rounded-xl bg-brand-teal/20 px-4 py-4 text-center text-sm font-semibold text-brand-purple">
          ✅ {t.sent}
        </p>
      ) : (
        <form
          action={requestPasswordResetAction}
          className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md"
        >
          {expired && (
            <p className="rounded-xl bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-700">
              {t.expired}
            </p>
          )}
          <p className="text-sm text-foreground/70">{t.intro}</p>
          <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
            {t.email}
            <input
              type="email"
              name="email"
              required
              className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            {t.submit}
          </button>
        </form>
      )}

      <p className="text-center text-sm">
        <Link href="/login" className="font-semibold text-brand-purple underline">
          {t.back}
        </Link>
      </p>
    </div>
  );
}
