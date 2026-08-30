import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { hasPurchased, recordPurchase } from "@/lib/purchases";
import {
  hasColoringPurchase,
  recordColoringPurchase,
} from "@/lib/coloring-purchases";
import {
  activateSubscriptionFromCheckout,
  syncSubscription,
} from "@/lib/subscription";

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

    if (meta.type === "subscription" && checkoutSession.subscription) {
      const subId =
        typeof checkoutSession.subscription === "string"
          ? checkoutSession.subscription
          : checkoutSession.subscription.id;
      await activateSubscriptionFromCheckout(subId);
    } else if (checkoutSession.payment_status === "paid" && userId) {
      if (meta.type === "coloring" && meta.packId) {
        if (!(await hasColoringPurchase(userId, meta.packId))) {
          await recordColoringPurchase(userId, meta.packId, checkoutSession.id);
        }
      } else if (meta.bookId) {
        if (!(await hasPurchased(userId, meta.bookId))) {
          await recordPurchase(userId, meta.bookId, checkoutSession.id);
        }
      }
    }
  } else if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.created"
  ) {
    await syncSubscription(event.data.object);
  } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
    if (invoice.subscription) {
      const sub = await stripe.subscriptions.retrieve(invoice.subscription);
      await syncSubscription(sub);
    }
  }

  return new Response(null, { status: 200 });
}
