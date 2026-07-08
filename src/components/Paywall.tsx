import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { createCheckoutAction } from "@/app/books/[id]/actions";

export default function Paywall({
  bookId,
  title,
  description,
  coverImage,
  priceCents,
}: {
  bookId: string;
  title: string;
  description: string;
  coverImage: string;
  priceCents: number;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-12 text-center">
      <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
        <Image src={coverImage} alt={title} fill className="object-cover" unoptimized />
      </div>
      <h1 className="text-3xl font-bold text-brand-purple">{title}</h1>
      <p className="text-foreground/70">{description}</p>

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-md">
        <p className="text-sm text-foreground/60">
          Αγόρασε αυτό το βιβλίο για να το διαβάσεις — η αγορά ισχύει για όλα τα
          παιδικά προφίλ του λογαριασμού σου.
        </p>
        <span className="text-3xl font-bold text-brand-orange">
          {formatPrice(priceCents)}
        </span>
        <form action={createCheckoutAction}>
          <input type="hidden" name="bookId" value={bookId} />
          <button
            type="submit"
            className="rounded-full bg-brand-orange px-8 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Αγόρασε 🛒
          </button>
        </form>
      </div>
    </div>
  );
}
