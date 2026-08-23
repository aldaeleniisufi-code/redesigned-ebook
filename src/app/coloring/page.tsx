import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ColoringCard from "@/components/ColoringCard";
import { getDict, getLocale, pickText } from "@/lib/i18n";

export default async function ColoringGalleryPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin/coloring");
  const d = await getDict();
  const locale = await getLocale();

  const packs = await prisma.coloringPack.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });

  // Group packs by their (localized) category, keeping first-seen order.
  const groups: { category: string; packs: typeof packs }[] = [];
  for (const pack of packs) {
    const category = pickText(locale, pack.category, pack.categoryEn);
    let group = groups.find((g) => g.category === category);
    if (!group) {
      group = { category, packs: [] };
      groups.push(group);
    }
    group.packs.push(pack);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-10 text-center text-3xl font-bold text-brand-purple">
        {d.coloring.galleryTitle}
      </h1>

      {packs.length === 0 ? (
        <p className="text-center text-foreground/60">{d.coloring.empty}</p>
      ) : (
        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <section key={group.category}>
              <div className="mb-5 flex items-center gap-3">
                <h2 className="text-xl font-bold text-brand-purple sm:text-2xl">
                  {group.category}
                </h2>
                <span className="h-px flex-1 bg-brand-purple/15" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.packs.map((pack) => (
                  <ColoringCard
                    key={pack.id}
                    id={pack.id}
                    title={pickText(locale, pack.title, pack.titleEn)}
                    coverImage={pack.coverImage}
                    category={pickText(locale, pack.category, pack.categoryEn)}
                    priceCents={pack.priceCents}
                    freeLabel={d.coloring.free}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
