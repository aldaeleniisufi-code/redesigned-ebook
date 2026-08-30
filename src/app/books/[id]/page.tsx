import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateProfileId } from "@/lib/profile";
import { hasPurchased, recordPurchase } from "@/lib/purchases";
import { hasActiveSubscription } from "@/lib/subscription";
import { getStripeClient } from "@/lib/stripe";
import BookReader from "@/components/BookReader";
import Paywall from "@/components/Paywall";
import { getDict, getLocale, pickText } from "@/lib/i18n";
import { createCheckoutAction } from "./actions";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");

  const profileId = await getOrCreateProfileId(session.user.id);

  const { id } = await params;
  const { session_id } = await searchParams;
  const d = await getDict();
  const locale = await getLocale();

  const book = await prisma.book.findUnique({
    where: { id },
    include: { pages: { orderBy: { order: "asc" } } },
  });

  if (!book || !book.published) notFound();

  const displayTitle = pickText(locale, book.title, book.titleEn);
  const displayDescription = pickText(locale, book.description, book.descriptionEn);

  const isFree = book.priceCents === 0;
  let purchased =
    isFree ||
    (await hasActiveSubscription(session.user.id)) ||
    (await hasPurchased(session.user.id, book.id));

  if (!purchased && session_id) {
    const stripe = getStripeClient();
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    if (
      checkoutSession.payment_status === "paid" &&
      checkoutSession.metadata?.bookId === book.id &&
      checkoutSession.metadata?.userId === session.user.id
    ) {
      await recordPurchase(session.user.id, book.id, checkoutSession.id);
      purchased = true;
    }
  }

  if (!purchased) {
    return (
      <Paywall
        action={createCheckoutAction}
        idField="bookId"
        idValue={book.id}
        title={displayTitle}
        description={displayDescription}
        coverImage={book.coverImage}
        priceCents={book.priceCents}
        note={d.paywall.note}
        buyLabel={d.paywall.buy}
      />
    );
  }

  const progress = await prisma.readingProgress.findUnique({
    where: { childProfileId_bookId: { childProfileId: profileId, bookId: book.id } },
  });

  return (
    <BookReader
      bookId={book.id}
      title={displayTitle}
      pages={book.pages.map((p) => ({
        id: p.id,
        order: p.order,
        imageUrl: p.imageUrl,
        text: pickText(locale, p.text, p.textEn),
      }))}
      initialPage={progress?.completed ? 0 : (progress?.lastPage ?? 0)}
      labels={{
        page: d.reader.page,
        back: d.reader.back,
        next: d.reader.next,
        finish: d.reader.finish,
        pageLabel: d.reader.pageLabel,
        of: d.reader.of,
      }}
    />
  );
}
