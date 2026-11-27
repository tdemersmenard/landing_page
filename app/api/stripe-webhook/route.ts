import { normalizePhone } from "@/lib/lead";
import { errorText, postToMake } from "@/lib/make";
import { type PaymentIntent, stripeApi, verifyWebhook } from "@/lib/stripe";

const WEBHOOK_TIMEOUT_MS = 8000;
/** Marque posée sur le PaymentIntent une fois l'achat envoyé à Make. */
const MARQUE = "make_envoye";

// Même instance qui reçoit 2 fois le même paiement en même temps : un seul envoi.
const enCours = new Set<string>();

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET n'est pas définie");
    return new Response("Pas configuré", { status: 500 });
  }
  const payload = await request.text();
  const event = verifyWebhook(payload, request.headers.get("stripe-signature"), secret);
  if (!event) return new Response("Signature invalide", { status: 400 });
  if (event.type !== "payment_intent.succeeded") return Response.json({ recu: true });

  const id = event.data.object.id;
  if (enCours.has(id)) return Response.json({ recu: true, doublon: true });
  enCours.add(id);
  try {
    // Relu chez Stripe : la marque dit si un envoi précédent a déjà réussi.
    const pi = await stripeApi<PaymentIntent>(`payment_intents/${encodeURIComponent(id)}`);
    if (pi.metadata[MARQUE]) return Response.json({ recu: true, doublon: true });

    const m = pi.metadata;
    const tel = normalizePhone(m.telephone ?? "");
    await postToMake(
      {
        type: "achat_complete",
        prenom: m.prenom ?? "",
        email: m.email || pi.receipt_email || "",
        telephone: tel.length === 10 ? tel : "",
        montant: pi.amount_received / 100,
        reference: m.reference ?? "",
        payment_intent_id: pi.id,
        date: new Date(event.created * 1000).toISOString(),
      },
      WEBHOOK_TIMEOUT_MS,
    );

    try {
      await stripeApi(`payment_intents/${encodeURIComponent(id)}`, { metadata: { [MARQUE]: new Date().toISOString() } });
    } catch (e) {
      // Make a reçu l'achat : on répond 200 quand même, sinon Stripe renverrait l'événement.
      console.error(`[stripe-webhook] marque pas posée (pi=${id}) ${errorText(e)}`);
    }
    return Response.json({ recu: true });
  } catch (e) {
    // 500 : Stripe réessaie plus tard. Aucune marque posée, donc le prochain essai renvoie à Make.
    console.error(`[stripe-webhook] achat pas envoyé à Make (pi=${id}) ${errorText(e)}`);
    return new Response("Erreur", { status: 500 });
  } finally {
    enCours.delete(id);
  }
}
