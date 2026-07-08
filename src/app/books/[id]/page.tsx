import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getActiveChildId } from "@/lib/session";
import { hasPurchased, recordPurchase } from "@/lib/purchases";
import { getStripeClient } from "@/lib/stripe";
import BookReader from "@/components/BookReader";
import Paywall from "@/components/Paywall";

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

  const activeChildId = await getActiveChildId();
  if (!activeChildId) redirect("/profiles");

  const { id } = await params;
  const { session_id } = await searchParams;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { pages: { orderBy: { order: "asc" } } },
  });

  if (!book || !book.published) notFound();

  let purchased = await hasPurchased(session.user.id, book.id);

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
        bookId={book.id}
        title={book.title}
        description={book.description}
        coverImage={book.coverImage}
        priceCents={book.priceCents}
      />
    );
  }

  const progress = await prisma.readingProgress.findUnique({
    where: { childProfileId_bookId: { childProfileId: activeChildId, bookId: book.id } },
  });

  return (
    <BookReader
      bookId={book.id}
      title={book.title}
      pages={book.pages}
      initialPage={progress?.completed ? 0 : (progress?.lastPage ?? 0)}
    />
  );
}
