import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function BookCard({
  id,
  title,
  coverImage,
  ageMin,
  ageMax,
  category,
  priceCents,
}: {
  id: string;
  title: string;
  coverImage: string;
  ageMin: number;
  ageMax: number;
  category: string;
  priceCents: number;
}) {
  return (
    <Link
      href={`/books/${id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[9/7] w-full overflow-hidden bg-brand-purple/10">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="w-fit rounded-full bg-brand-yellow/30 px-3 py-1 text-xs font-bold text-brand-purple">
          {category}
        </span>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm text-foreground/60">
            Ηλικίες {ageMin}-{ageMax}
          </p>
          <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-bold text-brand-orange">
            {formatPrice(priceCents)}
          </span>
        </div>
      </div>
    </Link>
  );
}
