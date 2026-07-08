import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  updateBookAction,
  addPageAction,
  updatePageAction,
  deletePageAction,
} from "../../../actions";

export default async function EditBookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  const { id } = await params;
  const { error } = await searchParams;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { pages: { orderBy: { order: "asc" } } },
  });
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-brand-purple">
        Επεξεργασία: {book.title}
      </h1>

      <section className="mb-10 rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-foreground">Στοιχεία βιβλίου</h2>
        <form
          action={updateBookAction}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={book.id} />
          <Field label="Τίτλος">
            <input name="title" defaultValue={book.title} required className="input" />
          </Field>
          <Field label="Συγγραφέας">
            <input name="author" defaultValue={book.author} className="input" />
          </Field>
          <Field label="Περιγραφή">
            <textarea
              name="description"
              defaultValue={book.description}
              rows={3}
              className="input"
            />
          </Field>
          <Field label="Κατηγορία">
            <input name="category" defaultValue={book.category} className="input" />
          </Field>
          <div className="flex gap-4">
            <Field label="Ελάχιστη ηλικία">
              <input
                type="number"
                name="ageMin"
                defaultValue={book.ageMin}
                className="input"
              />
            </Field>
            <Field label="Μέγιστη ηλικία">
              <input
                type="number"
                name="ageMax"
                defaultValue={book.ageMax}
                className="input"
              />
            </Field>
          </div>
          <Field label="Τιμή (€)">
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              defaultValue={(book.priceCents / 100).toFixed(2)}
              className="input"
            />
          </Field>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-24 overflow-hidden rounded-xl">
              <Image src={book.coverImage} alt={book.title} fill className="object-cover" unoptimized />
            </div>
            <Field label="Νέο εξώφυλλο (προαιρετικό)">
              <input type="file" name="cover" accept="image/*" className="input" />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-2 w-fit rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Αποθήκευση
          </button>
        </form>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Σελίδες ({book.pages.length})
        </h2>

        <div className="flex flex-col gap-4">
          {book.pages.map((page) => (
            <div key={page.id} className="rounded-2xl bg-white p-4 shadow-md">
              <form
                action={updatePageAction}
                      className="flex flex-wrap items-start gap-4"
              >
                <input type="hidden" name="id" value={page.id} />
                <input type="hidden" name="bookId" value={book.id} />
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                  <Image src={page.imageUrl} alt={`Σελίδα ${page.order}`} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-1 flex-col gap-2 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-foreground/60">Σειρά</label>
                    <input
                      type="number"
                      name="order"
                      defaultValue={page.order}
                      className="input w-20 py-1"
                    />
                  </div>
                  <textarea
                    name="text"
                    defaultValue={page.text}
                    rows={2}
                    className="input"
                  />
                  <input type="file" name="image" accept="image/*" className="input" />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal/20"
                >
                  Αποθήκευση
                </button>
              </form>
              <form action={deletePageAction} className="mt-2 flex justify-end">
                <input type="hidden" name="id" value={page.id} />
                <input type="hidden" name="bookId" value={book.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                >
                  Διαγραφή σελίδας
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-foreground">➕ Νέα σελίδα</h2>
        {error && (
          <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
            Χρειάζεται εικόνα για τη σελίδα.
          </p>
        )}
        <form
          action={addPageAction}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="bookId" value={book.id} />
          <Field label="Κείμενο σελίδας">
            <textarea name="text" rows={2} className="input" />
          </Field>
          <Field label="Εικόνα σελίδας">
            <input type="file" name="image" accept="image/*" required className="input" />
          </Field>
          <button
            type="submit"
            className="w-fit rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Προσθήκη σελίδας
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-foreground/80">
      {label}
      {children}
    </label>
  );
}
