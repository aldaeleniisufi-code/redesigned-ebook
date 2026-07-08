import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createBookAction } from "../../actions";

export default async function NewBookPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-brand-purple">Νέο Βιβλίο 📖</h1>

      {error && (
        <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
          Συμπλήρωσε τίτλο και ανέβασε εξώφυλλο.
        </p>
      )}

      <form
        action={createBookAction}
        className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md"
      >
        <Field label="Τίτλος">
          <input name="title" required className="input" />
        </Field>
        <Field label="Συγγραφέας">
          <input name="author" className="input" />
        </Field>
        <Field label="Περιγραφή">
          <textarea name="description" rows={3} className="input" />
        </Field>
        <Field label="Κατηγορία">
          <input name="category" defaultValue="Παραμύθι" className="input" />
        </Field>
        <div className="flex gap-4">
          <Field label="Ελάχιστη ηλικία">
            <input type="number" name="ageMin" defaultValue={3} className="input" />
          </Field>
          <Field label="Μέγιστη ηλικία">
            <input type="number" name="ageMax" defaultValue={8} className="input" />
          </Field>
        </div>
        <Field label="Τιμή (€)">
          <input type="number" name="price" step="0.01" min="0" defaultValue="2.99" className="input" />
        </Field>
        <Field label="Εξώφυλλο (εικόνα)">
          <input type="file" name="cover" accept="image/*" required className="input" />
        </Field>
        <button
          type="submit"
          className="mt-2 rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
        >
          Δημιουργία & προσθήκη σελίδων
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
