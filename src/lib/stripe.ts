import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY δεν έχει οριστεί. Πρόσθεσέ το στο .env (dashboard.stripe.com/test/apikeys)."
      );
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export function getAppUrl(): string {
  return process.env.APP_URL ?? "http://localhost:3000";
}
