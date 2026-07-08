import Link from "next/link";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-16 text-center">
      <div className="text-7xl">🦁📖🚀</div>
      <h1 className="text-4xl font-bold text-brand-purple sm:text-5xl">
        Μαγικές ιστορίες για μικρούς αναγνώστες!
      </h1>
      <p className="max-w-2xl text-lg text-foreground/80">
        Ανακάλυψε δεκάδες ψηφιακά παραμύθια, γεμάτα χρώματα, ήρωες και
        περιπέτειες. Διάβασε, γύρνα σελίδες και ζήσε κάθε ιστορία σαν παιχνίδι!
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {session ? (
          <Link
            href="/library"
            className="rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
          >
            Πήγαινε στη Βιβλιοθήκη 📚
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-full bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
            >
              Εγγραφή Γονέα
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-purple shadow-lg ring-2 ring-brand-purple transition hover:scale-105"
            >
              Είσοδος
            </Link>
          </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FeatureCard emoji="🎨" title="Πολύχρωμες ιστορίες" text="Εικονογραφημένα παραμύθια για κάθε ηλικία." />
        <FeatureCard emoji="👨‍👩‍👧" title="Προφίλ για κάθε παιδί" text="Κάθε παιδί έχει το δικό του avatar και πρόοδο." />
        <FeatureCard emoji="✨" title="Διαδραστική ανάγνωση" text="Γύρισμα σελίδων με ζωντανή κίνηση." />
      </div>
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl bg-white p-6 shadow-md">
      <span className="text-4xl">{emoji}</span>
      <h3 className="text-lg font-bold text-brand-purple">{title}</h3>
      <p className="text-sm text-foreground/70">{text}</p>
    </div>
  );
}
