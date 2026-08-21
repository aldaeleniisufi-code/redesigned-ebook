import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  updatePackAction,
  addColoringPageAction,
  updateColoringPageAction,
  deleteColoringPageAction,
  togglePackPublishAction,
} from "../../actions";
import { getDict } from "@/lib/i18n";
import ImageInput from "@/components/ImageInput";

export default async function EditPackPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  const d = await getDict();

  const { id } = await params;
  const { error } = await searchParams;

  const pack = await prisma.coloringPack.findUnique({
    where: { id },
    include: { pages: { orderBy: { order: "asc" } } },
  });
  if (!pack) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-brand-purple">
        {d.adminColoring.editTitle} {pack.title}
      </h1>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-md">
        <div>
          <p className="text-sm font-semibold text-foreground/80">
            {d.admin.status}{" "}
            {pack.published ? (
              <span className="text-green-600">{d.admin.published}</span>
            ) : (
              <span className="text-orange-500">{d.admin.draft}</span>
            )}
          </p>
          {!pack.published && (
            <p className="mt-1 text-xs text-foreground/50">{d.admin.publishHint}</p>
          )}
        </div>
        <form action={togglePackPublishAction}>
          <input type="hidden" name="id" value={pack.id} />
          <button
            type="submit"
            className={`rounded-full px-6 py-3 font-bold text-white shadow transition hover:brightness-110 ${
              pack.published ? "bg-orange-400" : "bg-brand-teal"
            }`}
          >
            {pack.published ? d.admin.unpublish : d.admin.publish}
          </button>
        </form>
      </div>

      <section className="mb-10 rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-foreground">{d.adminColoring.packDetails}</h2>
        <form action={updatePackAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={pack.id} />
          <Field label={d.admin.fieldTitle}>
            <input name="title" defaultValue={pack.title} required className="input" />
          </Field>
          <Field label={d.admin.fieldDescription}>
            <textarea name="description" defaultValue={pack.description} rows={3} className="input" />
          </Field>
          <Field label={d.admin.fieldCategory}>
            <input name="category" defaultValue={pack.category} className="input" />
          </Field>
          <Field label={d.admin.fieldPrice}>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              defaultValue={(pack.priceCents / 100).toFixed(2)}
              className="input"
            />
          </Field>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-24 overflow-hidden rounded-xl">
              <Image src={pack.coverImage} alt={pack.title} fill className="object-cover" unoptimized />
            </div>
            <Field label={d.admin.fieldCoverNew}>
              <ImageInput name="cover" className="input" />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-2 w-fit rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            {d.admin.save}
          </button>
        </form>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          {d.admin.pagesCount} ({pack.pages.length})
        </h2>

        <div className="flex flex-col gap-4">
          {pack.pages.map((page) => (
            <div key={page.id} className="rounded-2xl bg-white p-4 shadow-md">
              <form action={updateColoringPageAction} className="flex flex-wrap items-start gap-4">
                <input type="hidden" name="id" value={page.id} />
                <input type="hidden" name="packId" value={pack.id} />
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-brand-purple/10">
                  <Image src={page.imageUrl} alt={`${d.admin.order} ${page.order}`} fill className="object-contain" unoptimized />
                </div>
                <div className="flex flex-1 flex-col gap-2 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-foreground/60">{d.admin.order}</label>
                    <input type="number" name="order" defaultValue={page.order} className="input w-20 py-1" />
                  </div>
                  <ImageInput name="image" className="input" />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal/20"
                >
                  {d.admin.save}
                </button>
              </form>
              <form action={deleteColoringPageAction} className="mt-2 flex justify-end">
                <input type="hidden" name="id" value={page.id} />
                <input type="hidden" name="packId" value={pack.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                >
                  {d.admin.deletePage}
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-foreground">{d.adminColoring.newPage}</h2>
        {error && (
          <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
            {d.adminColoring.errorPageImage}
          </p>
        )}
        <form action={addColoringPageAction} className="flex flex-col gap-4">
          <input type="hidden" name="packId" value={pack.id} />
          <Field label={d.adminColoring.pageImage}>
            <ImageInput name="image" required className="input" />
          </Field>
          <button
            type="submit"
            className="w-fit rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            {d.adminColoring.addPage}
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
