import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BookCard from "@/components/BookCard";
import { getDict, getLocale, pickText } from "@/lib/i18n";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");
  const d = await getDict();
  const locale = await getLocale();

  const { category } = await searchParams;

  const books = await prisma.book.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.book.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-brand-purple">
        {d.library.title}
      </h1>

      <form method="get" className="mb-8 flex flex-wrap justify-center gap-2">
        <a
          href="/library"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            !category ? "bg-brand-purple text-white" : "bg-white text-brand-purple"
          }`}
        >
          {d.library.all}
        </a>
        {categories.map((c) => (
          <a
            key={c.category}
            href={`/library?category=${encodeURIComponent(c.category)}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === c.category
                ? "bg-brand-purple text-white"
                : "bg-white text-brand-purple"
            }`}
          >
            {c.category}
          </a>
        ))}
      </form>

      {books.length === 0 ? (
        <p className="text-center text-foreground/60">{d.library.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={pickText(locale, book.title, book.titleEn)}
              coverImage={book.coverImage}
              ageMin={book.ageMin}
              ageMax={book.ageMax}
              category={book.category}
              priceCents={book.priceCents}
              agesLabel={d.library.ages}
            />
          ))}
        </div>
      )}
    </div>
  );
}
