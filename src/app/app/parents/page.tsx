import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getDict, getLocale, pickText } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";
import ParentGate from "@/components/ParentGate";
import ScreenTimeSettings from "@/components/ScreenTimeSettings";

export default async function ParentsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  const d = await getDict();
  const locale = await getLocale();
  const p = d.parents;

  const [bookPurchases, coloringPurchases] = await Promise.all([
    prisma.purchase.findMany({
      where: { userId: session.user.id },
      include: { book: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.coloringPurchase.findMany({
      where: { userId: session.user.id },
      include: { pack: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const noPurchases = bookPurchases.length === 0 && coloringPurchases.length === 0;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-4">
      <Link
        href="/app"
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        ← Kidleido
      </Link>

      <h1 className="mt-4 mb-2 text-center text-2xl font-bold text-brand-purple sm:text-3xl">
        {p.title}
      </h1>

      <ParentGate
        title={p.gateTitle}
        prompt={p.gatePrompt}
        error={p.gateError}
        button={p.gateButton}
      >
        <div className="flex flex-col gap-5 pb-12 pt-4">
          {/* Screen time */}
          <section className="rounded-3xl bg-white p-5 shadow-md">
            <h2 className="text-lg font-bold text-brand-purple">{p.screenTime}</h2>
            <p className="mb-4 text-sm text-foreground/60">{p.screenTimeDesc}</p>
            <ScreenTimeSettings
              minutesLabel={p.minutes}
              unlimitedLabel={p.unlimited}
              savedLabel={p.saved}
            />
          </section>

          {/* Purchases */}
          <section className="rounded-3xl bg-white p-5 shadow-md">
            <h2 className="mb-4 text-lg font-bold text-brand-purple">
              {p.purchasesTitle}
            </h2>
            {noPurchases ? (
              <p className="text-sm text-foreground/50">{p.noPurchases}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {bookPurchases.map((row) => (
                  <PurchaseRow
                    key={row.id}
                    href={`/books/${row.bookId}`}
                    image={row.book.coverImage}
                    title={pickText(locale, row.book.title, row.book.titleEn)}
                    subtitle={`${formatPrice(row.book.priceCents)} · ${row.createdAt.toLocaleDateString()}`}
                    open={p.open}
                  />
                ))}
                {coloringPurchases.map((row) => (
                  <PurchaseRow
                    key={row.id}
                    href={`/coloring/${row.packId}`}
                    image={row.pack.coverImage}
                    title={
                      pickText(locale, row.pack.title, row.pack.titleEn).trim() ||
                      d.coloring.untitled
                    }
                    subtitle={`${formatPrice(row.pack.priceCents)} · ${p.downloadsLeft.replace(
                      "{n}",
                      String(Math.max(0, 5 - row.downloads)),
                    )}`}
                    open={p.open}
                    contain
                  />
                ))}
              </div>
            )}
          </section>

          {/* Safety */}
          <section className="rounded-3xl bg-brand-teal/15 p-5">
            <h2 className="text-lg font-bold text-brand-purple">{p.safetyTitle}</h2>
            <p className="mt-2 text-sm text-foreground/70">{p.safetyText}</p>
          </section>

          {/* Account */}
          <section className="rounded-3xl bg-white p-5 shadow-md">
            <h2 className="mb-2 text-lg font-bold text-brand-purple">
              {p.accountTitle}
            </h2>
            <p className="mb-4 text-sm text-foreground/60">
              {session.user.name} · {session.user.email}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-full bg-brand-purple/10 px-6 py-2.5 text-sm font-bold text-brand-purple transition hover:bg-brand-purple/20"
              >
                {p.logout}
              </button>
            </form>
          </section>
        </div>
      </ParentGate>
    </div>
  );
}

function PurchaseRow({
  href,
  image,
  title,
  subtitle,
  open,
  contain,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
  open: string;
  contain?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-brand-purple/5 p-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
        <Image
          src={image}
          alt={title}
          fill
          className={contain ? "object-contain" : "object-cover"}
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-foreground">{title}</p>
        <p className="text-xs text-foreground/50">{subtitle}</p>
      </div>
      <Link
        href={href}
        className="rounded-full bg-brand-orange px-4 py-1.5 text-sm font-bold text-white shadow transition hover:brightness-110"
      >
        {open}
      </Link>
    </div>
  );
}
