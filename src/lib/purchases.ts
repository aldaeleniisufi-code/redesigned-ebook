import { prisma } from "@/lib/prisma";

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
}
