import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { receiptEmailHtml } from "@/lib/email-templates";

export async function hasColoringPurchase(
  userId: string,
  packId: string
): Promise<boolean> {
  const purchase = await prisma.coloringPurchase.findUnique({
    where: { userId_packId: { userId, packId } },
  });
  return purchase !== null;
}

export async function recordColoringPurchase(
  userId: string,
  packId: string,
  stripeSessionId: string
) {
  await prisma.coloringPurchase.upsert({
    where: { userId_packId: { userId, packId } },
    update: {},
    create: { userId, packId, stripeSessionId },
  });

  const [user, pack] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.coloringPack.findUnique({ where: { id: packId } }),
  ]);
  if (!user || !pack) return;

  await sendEmail({
    to: user.email,
    subject: `Η απόδειξή σου: ${pack.title}`,
    html: receiptEmailHtml({
      name: user.name,
      bookTitle: pack.title,
      priceCents: pack.priceCents,
    }),
  });
}
