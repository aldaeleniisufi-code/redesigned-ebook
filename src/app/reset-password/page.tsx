import Link from "next/link";
import { getLocale } from "@/lib/i18n";
import { resetPasswordAction } from "./actions";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;
  const en = (await getLocale()) === "en";

  const t = en
    ? {
        title: "Set a new password",
        newPassword: "New password",
        confirm: "Confirm password",
        submit: "Save new password",
        short: "Password must be at least 6 characters.",
        mismatch: "The passwords don't match.",
        invalidLink: "This link is invalid. Please request a new one.",
        request: "Request a new link",
      }
    : {
        title: "Όρισε νέο κωδικό",
        newPassword: "Νέος κωδικός",
        confirm: "Επιβεβαίωση κωδικού",
        submit: "Αποθήκευση νέου κωδικού",
        short: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.",
        mismatch: "Οι κωδικοί δεν ταιριάζουν.",
        invalidLink: "Ο σύνδεσμος δεν είναι έγκυρος. Ζήτησε νέον.",
        request: "Ζήτησε νέο σύνδεσμο",
      };

  if (!token) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-purple">{t.title}</h1>
        <p className="rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
          {t.invalidLink}
        </p>
        <Link
          href="/forgot-password"
          className="font-semibold text-brand-purple underline"
        >
          {t.request}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-brand-purple">
        {t.title}
      </h1>

      {error && (
        <p className="rounded-xl bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {error === "mismatch" ? t.mismatch : t.short}
        </p>
      )}

      <form
        action={resetPasswordAction}
        className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md"
      >
        <input type="hidden" name="token" value={token} />
        <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
          {t.newPassword}
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
          {t.confirm}
          <input
            type="password"
            name="confirm"
            required
            minLength={6}
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
    </div>
  );
}
