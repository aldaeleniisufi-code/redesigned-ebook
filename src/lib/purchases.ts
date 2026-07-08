import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { receiptEmailHtml } from "@/lib/email-templates";

export async function hasPurchased(userId: string, bookId: string): Promise<boolean> {
  const purchase = await prisma.purchase.findUnique({
    where: { userId_bookId: { userId, bookId } },
  });
  return purchase !== null;
}

export async function recordPurchase(
  userId: string,
  bookId: string,
  stripeSessionId: string
) {
  await prisma.purchase.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: {},
    create: { userId, bookId, stripeSessionId },
  });

  const [user, book] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.book.findUnique({ where: { id: bookId } }),
  ]);
  if (!user || !book) return;

  await sendEmail({
    to: user.email,
    subject: `Η απόδειξή σου: ${book.title}`,
    html: receiptEmailHtml({
      name: user.name,
      bookTitle: book.title,
      priceCents: book.priceCents,
    }),
  });
}
