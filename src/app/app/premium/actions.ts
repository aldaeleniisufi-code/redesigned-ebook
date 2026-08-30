"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getStripeClient, getAppUrl } from "@/lib/stripe";
import { getOrCreateStripeCustomer } from "@/lib/subscription";

const PLANS = {
  monthly: { amount: 499, interval: "month" as const, name: "Kidleido Premium — Μηνιαία" },
  yearly: { amount: 3999, interval: "year" as const, name: "Kidleido Premium — Ετήσια" },
};

export async function createSubscriptionCheckoutAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const planKey = String(formData.get("plan") ?? "monthly");
  const plan = PLANS[planKey as keyof typeof PLANS] ?? PLANS.monthly;

  const stripe = getStripeClient();
  const appUrl = getAppUrl();
  const customerId = await getOrCreateStripeCustomer(session.user.id);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: plan.name },
          unit_amount: plan.amount,
          recurring: { interval: plan.interval },
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/app/premium?success=1`,
    cancel_url: `${appUrl}/app/premium`,
    metadata: { userId: session.user.id, type: "subscription" },
    subscription_data: { metadata: { userId: session.user.id } },
  });

  if (!checkoutSession.url) {
    throw new Error("Το Stripe δεν επέστρεψε URL για τη συνδρομή.");
  }

  redirect(checkoutSession.url);
}

export async function createPortalSessionAction() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const customerId = await getOrCreateStripeCustomer(session.user.id);
  const stripe = getStripeClient();
  const appUrl = getAppUrl();

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/app/premium`,
  });

  redirect(portal.url);
}
