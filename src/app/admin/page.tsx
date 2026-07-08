import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { togglePublishAction, deleteBookAction } from "./actions";
import { formatPrice } from "@/lib/format";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { pages: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-brand-purple">Διαχείριση Βιβλίων 🛠️</h1>
        <Link
          href="/admin/books/new"
          className="rounded-full bg-brand-orange px-5 py-2 font-bold text-white shadow transition hover:brightness-110"
        >
          ➕ Νέο βιβλίο
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-md"
          >
            <div>
              <h2 className="text-lg font-bold text-foreground">{book.title}</h2>
              <p className="text-sm text-foreground/60">
                {book.category} · {book._count.pages} σελίδες · {formatPrice(book.priceCents)} ·{" "}
                {book.published ? (
                  <span className="text-green-600">Δημοσιευμένο</span>
                ) : (
                  <span className="text-orange-500">Πρόχειρο</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/books/${book.id}/edit`}
                className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/20"
              >
                Επεξεργασία
              </Link>
              <form action={togglePublishAction}>
                <input type="hidden" name="id" value={book.id} />
                <button
                  type="submit"
                  className="rounded-full bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal/20"
                >
                  {book.published ? "Απόσυρση" : "Δημοσίευση"}
                </button>
              </form>
              <form action={deleteBookAction}>
                <input type="hidden" name="id" value={book.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                >
                  Διαγραφή
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
