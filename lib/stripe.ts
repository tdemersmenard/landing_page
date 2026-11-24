import Stripe from "stripe";

let client: Stripe | undefined;

/** Créé à la première utilisation, pour que `next build` marche sans les clés. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY n'est pas définie");
  return (client ??= new Stripe(key, { timeout: 8000, maxNetworkRetries: 1 }));
}
