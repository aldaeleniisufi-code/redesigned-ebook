import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createBookAction } from "../../actions";
import { getDict } from "@/lib/i18n";
import ImageInput from "@/components/ImageInput";

export default async function NewBookPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  const d = await getDict();

  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-brand-purple">{d.admin.newBookTitle}</h1>

      {error && (
        <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
          {d.admin.errorTitleCover}
        </p>
      )}

      <form
        action={createBookAction}
        className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md"
      >
        <Field label={d.admin.fieldTitle}>
          <input name="title" required className="input" />
        </Field>
        <Field label={d.admin.fieldAuthor}>
          <input name="author" className="input" />
        </Field>
        <Field label={d.admin.fieldDescription}>
          <textarea name="description" rows={3} className="input" />
        </Field>
        <Field label={d.admin.fieldCategory}>
          <input name="category" defaultValue="Παραμύθι" className="input" />
        </Field>
        <div className="flex gap-4">
          <Field label={d.admin.fieldAgeMin}>
            <input type="number" name="ageMin" defaultValue={3} className="input" />
          </Field>
          <Field label={d.admin.fieldAgeMax}>
            <input type="number" name="ageMax" defaultValue={8} className="input" />
          </Field>
        </div>
        <Field label={d.admin.fieldPrice}>
          <input type="number" name="price" step="0.01" min="0" defaultValue="2.99" className="input" />
        </Field>
        <Field label={d.admin.fieldCover}>
          <ImageInput name="cover" required className="input" />
        </Field>
        <button
          type="submit"
          className="mt-2 rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
        >
          {d.admin.createAddPages}
        </button>
      </form>
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
