import Stripe from "stripe";
import { z } from "zod";
import { OFFER_END } from "@/lib/config";
import { MESSAGES } from "@/lib/lead";
import { contact, invalidResponse, telephone } from "@/lib/leadSchema";
import { errorText } from "@/lib/make";
import { getStripe } from "@/lib/stripe";

const END = new Date(OFFER_END).getTime();
const MINUTE = 60_000;

const schema = z.object({
  ...contact,
  telephone,
  // Absente si /api/lead a planté : on en crée une, la vente continue.
  reference: z.uuid().catch(() => crypto.randomUUID()),
});

export async function POST(request: Request) {
  const now = Date.now();
  if (now >= END) return Response.json({ erreur: "offre_terminee" }, { status: 410 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidResponse(parsed.error);
  const { prenom, telephone, email, reference, consentement } = parsed.data;

  try {
    const price = process.env.STRIPE_PRICE_ID;
    if (!price) throw new Error("STRIPE_PRICE_ID n'est pas définie");
    const site = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/+$/, "");

    // La page Stripe expire avec l'offre. Stripe exige entre 30 minutes et 24 heures.
    const expires = Math.min(now + 24 * 60 * MINUTE - MINUTE, Math.max(END, now + 31 * MINUTE));

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      client_reference_id: reference,
      metadata: { prenom, telephone, reference, consentement: String(consentement) },
      success_url: `${site}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/?annule=1`,
      locale: "fr-CA",
      expires_at: Math.floor(expires / 1000),
    });
    return Response.json({ url: session.url });
  } catch (e) {
    // Stripe est parfois plus sévère que nous sur le format du courriel.
    if (e instanceof Stripe.errors.StripeInvalidRequestError && e.param === "customer_email")
      return Response.json({ erreurs: { email: MESSAGES.email } }, { status: 400 });
    console.error(`[checkout] session Stripe non créée (reference=${reference}) ${errorText(e)}`);
    return Response.json({ erreur: "stripe" }, { status: 502 });
  }
}
