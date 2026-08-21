import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  const d = await getDict();

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

  const nothing = bookPurchases.length === 0 && coloringPurchases.length === 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-purple">{d.profile.title}</h1>
      <p className="mt-1 text-foreground/60">
        {session.user.name} · {session.user.email}
      </p>

      <h2 className="mt-8 mb-4 text-xl font-bold text-foreground">
        {d.profile.history}
      </h2>

      {nothing && (
        <p className="rounded-2xl bg-white p-6 text-center text-foreground/60 shadow-md">
          {d.profile.empty}
        </p>
      )}

      {bookPurchases.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-purple">
            📚 {d.profile.books}
          </h3>
          <div className="flex flex-col gap-3">
            {bookPurchases.map((p) => (
              <PurchaseRow
                key={p.id}
                href={`/books/${p.bookId}`}
                image={p.book.coverImage}
                title={p.book.title}
                priceCents={p.book.priceCents}
                date={p.createdAt}
                open={d.profile.open}
              />
            ))}
          </div>
        </section>
      )}

      {coloringPurchases.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-teal">
            🎨 {d.profile.coloring}
          </h3>
          <div className="flex flex-col gap-3">
            {coloringPurchases.map((p) => (
              <PurchaseRow
                key={p.id}
                href={`/coloring/${p.packId}`}
                image={p.pack.coverImage}
                title={p.pack.title.trim() || d.coloring.untitled}
                priceCents={p.pack.priceCents}
                date={p.createdAt}
                open={d.profile.open}
                contain
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PurchaseRow({
  href,
  image,
  title,
  priceCents,
  date,
  open,
  contain,
}: {
  href: string;
  image: string;
  title: string;
  priceCents: number;
  date: Date;
  open: string;
  contain?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-md">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-purple/5">
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
        <p className="text-sm text-foreground/50">
          {formatPrice(priceCents)} · {date.toLocaleDateString()}
        </p>
      </div>
      <Link
        href={href}
        className="rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white shadow transition hover:brightness-110"
      >
        {open}
      </Link>
    </div>
  );
}
