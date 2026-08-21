import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ColoringCard from "@/components/ColoringCard";
import { getDict } from "@/lib/i18n";

export default async function ColoringGalleryPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin/coloring");
  const d = await getDict();

  const packs = await prisma.coloringPack.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-brand-purple">
        {d.coloring.galleryTitle}
      </h1>

      {packs.length === 0 ? (
        <p className="text-center text-foreground/60">{d.coloring.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack) => (
            <ColoringCard key={pack.id} {...pack} />
          ))}
        </div>
      )}
    </div>
  );
}
