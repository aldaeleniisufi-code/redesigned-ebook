"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getActiveChildId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getStripeClient, getAppUrl } from "@/lib/stripe";

export async function saveProgressAction(
  bookId: string,
  lastPage: number,
  completed: boolean
) {
  const childProfileId = await getActiveChildId();
  if (!childProfileId) return;

  await prisma.readingProgress.upsert({
    where: { childProfileId_bookId: { childProfileId, bookId } },
    update: { lastPage, completed },
    create: { childProfileId, bookId, lastPage, completed },
  });
}

export async function createCheckoutAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const bookId = String(formData.get("bookId") ?? "");
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || !book.published) redirect("/library");

  const stripe = getStripeClient();
  const appUrl = getAppUrl();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: book.title,
            description: book.description,
          },
          unit_amount: book.priceCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/books/${book.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/books/${book.id}`,
    metadata: { bookId: book.id, userId: session.user.id },
  });

  if (!checkoutSession.url) {
    throw new Error("Το Stripe δεν επέστρεψε URL για το checkout session.");
  }

  redirect(checkoutSession.url);
}
