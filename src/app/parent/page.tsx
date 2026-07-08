import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteChildAction } from "./actions";

export default async function ParentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");

  const children = await prisma.childProfile.findMany({
    where: { parentId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: {
      progress: {
        include: { book: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-brand-purple">Γονική Πύλη 👨‍👩‍👧</h1>
        <Link
          href="/profiles"
          className="rounded-full bg-brand-teal px-5 py-2 font-bold text-white shadow transition hover:brightness-110"
        >
          ➕ Νέο προφίλ παιδιού
        </Link>
      </div>

      {children.length === 0 && (
        <p className="text-center text-foreground/60">
          Δεν έχεις δημιουργήσει ακόμα κανένα παιδικό προφίλ.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {children.map((child) => (
          <div key={child.id} className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ backgroundColor: child.avatarColor }}
                >
                  {child.avatarEmoji}
                </span>
                <h2 className="text-xl font-bold text-foreground">{child.name}</h2>
              </div>
              <form action={deleteChildAction}>
                <input type="hidden" name="childId" value={child.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                >
                  Διαγραφή προφίλ
                </button>
              </form>
            </div>

            {child.progress.length === 0 ? (
              <p className="text-sm text-foreground/60">
                Δεν έχει διαβάσει ακόμα κανένα βιβλίο.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {child.progress.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between rounded-xl bg-brand-purple/5 px-4 py-2 text-sm"
                  >
                    <span className="font-semibold">{p.book.title}</span>
                    <span className="text-foreground/60">
                      {p.completed
                        ? "✅ Ολοκληρώθηκε"
                        : `Σελίδα ${p.lastPage + 1}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
