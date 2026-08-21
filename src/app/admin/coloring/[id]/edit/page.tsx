import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updatePackAction, togglePackPublishAction } from "../../actions";
import { getDict } from "@/lib/i18n";
import ImageInput from "@/components/ImageInput";

export default async function EditPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  const d = await getDict();

  const { id } = await params;

  const pack = await prisma.coloringPack.findUnique({ where: { id } });
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

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-foreground">{d.adminColoring.packDetails}</h2>
        <form action={updatePackAction} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={pack.id} />
          <Field label={d.admin.fieldTitle}>
            <input name="title" defaultValue={pack.title} className="input" />
          </Field>
          <Field label={d.adminColoring.titleEn}>
            <input name="titleEn" defaultValue={pack.titleEn ?? ""} className="input" />
          </Field>
          <Field label={d.admin.fieldDescription}>
            <textarea name="description" defaultValue={pack.description} rows={3} className="input" />
          </Field>
          <Field label={d.adminColoring.descriptionEn}>
            <textarea name="descriptionEn" defaultValue={pack.descriptionEn ?? ""} rows={3} className="input" />
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
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-brand-purple/10">
              <Image src={pack.coverImage} alt={pack.title} fill className="object-contain" unoptimized />
            </div>
            <Field label={d.adminColoring.sheetImageNew}>
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
