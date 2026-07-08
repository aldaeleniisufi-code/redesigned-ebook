import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { recordPurchase } from "@/lib/purchases";

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
    const bookId = checkoutSession.metadata?.bookId;
    const userId = checkoutSession.metadata?.userId;

    if (bookId && userId && checkoutSession.payment_status === "paid") {
      await recordPurchase(userId, bookId, checkoutSession.id);
    }
  }

  return new Response(null, { status: 200 });
}
