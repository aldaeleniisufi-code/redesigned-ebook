import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDict } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import { getSubscription } from "@/lib/subscription";
import {
  createSubscriptionCheckoutAction,
  createPortalSessionAction,
} from "./actions";

export default async function PremiumPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  const d = await getDict();
  const p = d.premium;
  const { success } = await searchParams;
  const sub = await getSubscription(session.user.id);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-4">
      <Link
        href="/app"
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        ← Kidleido
      </Link>

      <div className="py-6">
        <div className="mb-6 text-center">
          <div className="text-5xl">✨</div>
          <h1 className="mt-2 text-2xl font-bold text-brand-purple sm:text-3xl">
            {p.title}
          </h1>
          <p className="mt-1 text-foreground/70">{p.subtitle}</p>
        </div>

        {success && !sub.active && (
          <p className="mb-6 rounded-2xl bg-brand-teal/20 p-4 text-center font-bold text-brand-purple">
            {p.successMsg}
          </p>
        )}

        {/* features */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {[p.feature1, p.feature2, p.feature3, p.feature4].map((f) => (
            <div
              key={f}
              className="rounded-2xl bg-white p-4 text-center text-sm font-bold text-brand-purple shadow-sm"
            >
              {f}
            </div>
          ))}
        </div>

        {sub.active ? (
          <div className="rounded-3xl bg-brand-purple p-8 text-center text-white shadow-lg">
            <div className="text-4xl">👑</div>
            <h2 className="mt-2 text-xl font-bold text-brand-yellow">{p.activeTitle}</h2>
            <p className="mt-2 opacity-90">{p.activeText}</p>
            {sub.currentPeriodEnd && (
              <p className="mt-2 text-sm opacity-70">
                {p.renews}: {sub.currentPeriodEnd.toLocaleDateString()}
              </p>
            )}
            <form action={createPortalSessionAction} className="mt-5">
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-2.5 font-bold text-brand-purple shadow transition hover:brightness-105"
              >
                {p.manage}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Monthly */}
              <form
                action={createSubscriptionCheckoutAction}
                className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-md"
              >
                <input type="hidden" name="plan" value="monthly" />
                <span className="text-sm font-bold uppercase tracking-wide text-brand-purple/60">
                  {p.monthly}
                </span>
                <span className="text-3xl font-bold text-brand-purple">
                  {formatPrice(499)}
                  <span className="text-base font-semibold text-foreground/50">
                    {p.perMonth}
                  </span>
                </span>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
                >
                  {p.subscribe}
                </button>
              </form>

              {/* Yearly */}
              <form
                action={createSubscriptionCheckoutAction}
                className="relative flex flex-col items-center gap-3 rounded-3xl bg-brand-yellow p-6 text-center shadow-lg"
              >
                <input type="hidden" name="plan" value="yearly" />
                <span className="absolute -top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                  {p.yearlyHint}
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-brand-purple/70">
                  {p.yearly}
                </span>
                <span className="text-3xl font-bold text-brand-purple">
                  {formatPrice(3999)}
                  <span className="text-base font-semibold text-brand-purple/60">
                    {p.perYear}
                  </span>
                </span>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
                >
                  {p.subscribe}
                </button>
              </form>
            </div>
            <p className="mt-5 text-center text-sm text-foreground/50">{p.note}</p>
          </>
        )}
      </div>
    </div>
  );
}
