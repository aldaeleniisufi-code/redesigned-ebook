import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripeClient } from "@/lib/stripe";

const ACTIVE_STATUSES = ["active", "trialing"];

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.subscriptionStatus) return false;
  if (!ACTIVE_STATUSES.includes(user.subscriptionStatus)) return false;
  if (
    user.subscriptionCurrentPeriodEnd &&
    user.subscriptionCurrentPeriodEnd.getTime() < Date.now()
  ) {
    return false;
  }
  return true;
}

export async function getSubscription(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return {
    active: await hasActiveSubscription(userId),
    status: user?.subscriptionStatus ?? null,
    currentPeriodEnd: user?.subscriptionCurrentPeriodEnd ?? null,
    customerId: user?.stripeCustomerId ?? null,
  };
}

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user.id },
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  });
  return customer.id;
}

// current_period_end lives at the subscription level in older API versions and
// on the subscription item in newer ones — read whichever is present.
function periodEndOf(sub: Stripe.Subscription): Date | null {
  const anySub = sub as unknown as {
    current_period_end?: number;
    items?: { data?: { current_period_end?: number }[] };
  };
  const ts = anySub.current_period_end ?? anySub.items?.data?.[0]?.current_period_end;
  return ts ? new Date(ts * 1000) : null;
}

export async function syncSubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const userId = sub.metadata?.userId;

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: sub.id,
      subscriptionStatus: sub.status,
      subscriptionCurrentPeriodEnd: periodEndOf(sub),
    },
  });
}

// Called from the checkout.session.completed webhook for subscriptions.
export async function activateSubscriptionFromCheckout(subscriptionId: string) {
  const stripe = getStripeClient();
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  await syncSubscription(sub);
}
