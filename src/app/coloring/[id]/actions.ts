"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripeClient, getAppUrl } from "@/lib/stripe";

export async function createColoringCheckoutAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const packId = String(formData.get("packId") ?? "");
  const pack = await prisma.coloringPack.findUnique({ where: { id: packId } });
  if (!pack || !pack.published) redirect("/coloring");

  const stripe = getStripeClient();
  const appUrl = getAppUrl();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: pack.title,
            description: pack.description,
          },
          unit_amount: pack.priceCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/coloring/${pack.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/coloring/${pack.id}`,
    metadata: { packId: pack.id, userId: session.user.id, type: "coloring" },
  });

  if (!checkoutSession.url) {
    throw new Error("Το Stripe δεν επέστρεψε URL για το checkout session.");
  }

  redirect(checkoutSession.url);
}
