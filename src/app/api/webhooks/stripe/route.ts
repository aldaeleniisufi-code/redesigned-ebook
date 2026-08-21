import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { hasPurchased, recordPurchase } from "@/lib/purchases";
import {
  hasColoringPurchase,
  recordColoringPurchase,
} from "@/lib/coloring-purchases";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Webhook not configured", { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;
    const meta = checkoutSession.metadata ?? {};
    const userId = meta.userId;
    const paid = checkoutSession.payment_status === "paid";

    if (userId && paid && meta.type === "coloring" && meta.packId) {
      if (!(await hasColoringPurchase(userId, meta.packId))) {
        await recordColoringPurchase(userId, meta.packId, checkoutSession.id);
      }
    } else if (userId && paid && meta.bookId) {
      if (!(await hasPurchased(userId, meta.bookId))) {
        await recordPurchase(userId, meta.bookId, checkoutSession.id);
      }
    }
  }

  return new Response(null, { status: 200 });
}
