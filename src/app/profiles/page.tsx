import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { selectChildAction, createChildAction } from "./actions";
import { EMOJI_CHOICES } from "@/lib/constants";

export default async function ProfilesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");

  const children = await prisma.childProfile.findMany({
    where: { parentId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-4 py-16">
      <h1 className="text-3xl font-bold text-brand-purple">Ποιος διαβάζει; 🧒</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {children.map((child) => (
          <form key={child.id} action={selectChildAction}>
            <input type="hidden" name="childId" value={child.id} />
            <button
              type="submit"
              className="flex flex-col items-center gap-2 transition hover:scale-105"
            >
              <span
                className="flex h-28 w-28 items-center justify-center rounded-full text-5xl shadow-lg"
                style={{ backgroundColor: child.avatarColor }}
              >
                {child.avatarEmoji}
              </span>
              <span className="font-bold text-foreground">{child.name}</span>
            </button>
          </form>
        ))}
      </div>

      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-lg font-bold text-brand-purple">
          ➕ Νέο παιδικό προφίλ
        </h2>
        <form action={createChildAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
            Όνομα παιδιού
            <input
              type="text"
              name="name"
              required
              className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
            />
          </label>
          <fieldset className="flex flex-wrap justify-center gap-2">
            {EMOJI_CHOICES.map((emoji, i) => (
              <label key={emoji} className="cursor-pointer">
                <input
                  type="radio"
                  name="emoji"
                  value={emoji}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-transparent text-2xl peer-checked:border-brand-purple peer-checked:bg-brand-purple/10">
                  {emoji}
                </span>
              </label>
            ))}
          </fieldset>
          <button
            type="submit"
            className="rounded-full bg-brand-teal px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Δημιουργία προφίλ
          </button>
        </form>
      </div>
    </div>
  );
}
