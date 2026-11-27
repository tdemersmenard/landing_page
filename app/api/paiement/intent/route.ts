import { z } from "zod";
import { BRAND, CURRENCY, OFFER_END, PRICE_CENTS } from "@/lib/config";
import { normalizePhone } from "@/lib/lead";
import { contact, invalidResponse, telephone } from "@/lib/leadSchema";
import { errorText } from "@/lib/make";
import { type PaymentIntent, stripeApi } from "@/lib/stripe";

const END = new Date(OFFER_END).getTime();
const court = (max: number) => z.string().catch("").transform((s) => s.trim().slice(0, max));

const suivi = { reference: court(100), utm_content: court(450) };

// Formulaire : les 3 champs sont validés comme partout ailleurs sur le site.
const formulaire = z.object({ source: z.literal("form"), prenom: contact.prenom, email: contact.email, telephone, ...suivi });

// Apple Pay / Google Pay : le portefeuille fournit les infos. Un téléphone bizarre ne bloque pas la vente.
const portefeuille = z.object({
  source: z.literal("express"),
  prenom: court(100),
  email: contact.email,
  telephone: z.string().catch("").transform((s) => (normalizePhone(s).length === 10 ? normalizePhone(s) : "")),
  ...suivi,
});

const schema = z.discriminatedUnion("source", [formulaire, portefeuille]);

/** Crée le PaymentIntent. Le montant vient de lib/config.ts, jamais du navigateur. */
export async function POST(request: Request) {
  if (Date.now() >= END) return Response.json({ error: "L'offre Black Friday est terminée." }, { status: 409 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidResponse(parsed.error);

  const { prenom, email, telephone: tel, utm_content } = parsed.data;
  const reference = parsed.data.reference || crypto.randomUUID();
  try {
    const pi = await stripeApi<PaymentIntent>("payment_intents", {
      amount: PRICE_CENTS,
      currency: CURRENCY,
      automatic_payment_methods: { enabled: true },
      description: `${BRAND}, les 8 modules`,
      receipt_email: email,
      metadata: { prenom, telephone: tel, email, reference, utm_content },
    });
    return Response.json({ clientSecret: pi.client_secret });
  } catch (e) {
    console.error(`[paiement] PaymentIntent pas créé (reference=${reference}) ${errorText(e)}`);
    return Response.json({ error: "Le paiement n'a pas pu démarrer. Réessaie dans un instant." }, { status: 502 });
  }
}
