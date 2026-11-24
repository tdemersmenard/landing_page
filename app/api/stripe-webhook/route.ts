import type Stripe from "stripe";
import { errorText, postToMake } from "@/lib/make";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET n'est pas définie");
    return new Response("Configuration manquante", { status: 500 });
  }

  let event: Stripe.Event;
  try {
    // Le corps brut est nécessaire : la signature porte sur les octets exacts.
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      request.headers.get("stripe-signature") ?? "",
      secret,
    );
  } catch (e) {
    console.error(`[stripe-webhook] événement refusé ${errorText(e)}`);
    return new Response("Signature invalide", { status: 400 });
  }

  // « async_payment_succeeded » : paiements confirmés plus tard (ex. débit bancaire).
  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded")
    return Response.json({ recu: true });

  const session = event.data.object;
  const { prenom, telephone, reference } = session.metadata ?? {};
  // Le compte Stripe peut servir à d'autres ventes : on garde seulement celles de cette page.
  if (!reference) return Response.json({ recu: true });
  // Pas encore payé : l'accès partira avec async_payment_succeeded.
  if (session.payment_status === "unpaid") return Response.json({ recu: true });

  try {
    await postToMake(
      {
        type: "achat_complete",
        prenom,
        telephone,
        email: session.customer_details?.email ?? session.customer_email,
        reference,
        montant: (session.amount_total ?? 0) / 100,
        session_id: session.id,
      },
      8000,
    );
  } catch (e) {
    // Erreur 500 voulue : Stripe réessaie plus tard, pour que l'acheteur reçoive son accès.
    console.error(`[stripe-webhook] Make en échec (session=${session.id}, reference=${reference}) ${errorText(e)}`);
    return new Response("Make en échec", { status: 500 });
  }
  return Response.json({ recu: true });
}
