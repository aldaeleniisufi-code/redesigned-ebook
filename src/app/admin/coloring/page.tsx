import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { togglePackPublishAction, deletePackAction } from "./actions";
import { formatPrice } from "@/lib/format";
import { getDict } from "@/lib/i18n";

export default async function AdminColoringPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  const d = await getDict();

  const packs = await prisma.coloringPack.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { pages: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-brand-purple">{d.adminColoring.title}</h1>
        <div className="flex gap-2">
          <Link
            href="/admin"
            className="rounded-full bg-brand-purple/10 px-5 py-2 font-bold text-brand-purple transition hover:bg-brand-purple/20"
          >
            {d.admin.title}
          </Link>
          <Link
            href="/admin/coloring/new"
            className="rounded-full bg-brand-orange px-5 py-2 font-bold text-white shadow transition hover:brightness-110"
          >
            {d.adminColoring.newPack}
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-md"
          >
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {pack.title.trim() || d.coloring.untitled}
              </h2>
              <p className="text-sm text-foreground/60">
                {pack._count.pages} {d.admin.pages} · {formatPrice(pack.priceCents)} ·{" "}
                {pack.published ? (
                  <span className="text-green-600">{d.admin.published}</span>
                ) : (
                  <span className="text-orange-500">{d.admin.draft}</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/coloring/${pack.id}/edit`}
                className="rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/20"
              >
                {d.admin.edit}
              </Link>
              <form action={togglePackPublishAction}>
                <input type="hidden" name="id" value={pack.id} />
                <button
                  type="submit"
                  className="rounded-full bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal/20"
                >
                  {pack.published ? d.admin.unpublish : d.admin.publish}
                </button>
              </form>
              <form action={deletePackAction}>
                <input type="hidden" name="id" value={pack.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                >
                  {d.admin.delete}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
