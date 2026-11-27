import { z } from "zod";
import { normalizePhone } from "@/lib/lead";
import { contact, invalidResponse, telephone } from "@/lib/leadSchema";
import { errorText, postToMake } from "@/lib/make";

const WEBHOOK_TIMEOUT_MS = 3000;

// Les champs de suivi ne doivent jamais faire refuser un lead : une valeur bizarre devient "".
const suivi = z.string().catch("").transform((s) => s.slice(0, 1000));

const commun = {
  ...contact,
  page: suivi,
  utm_source: suivi,
  utm_medium: suivi,
  utm_campaign: suivi,
  utm_content: suivi,
  utm_term: suivi,
  fbclid: suivi,
};

// Ebook : les 3 champs sont obligatoires.
const ebook = z.object({ type: z.literal("ebook"), telephone, ...commun });

// Panier abandonné : envoyé dès que le courriel est valide sur /paiement, souvent avant le prénom ou le téléphone.
const achatCommence = z.object({
  type: z.literal("achat_commence"),
  ...commun,
  prenom: z.string().catch("").transform((s) => s.trim().slice(0, 100)),
  telephone: z.string().catch("").transform((s) => (normalizePhone(s).length === 10 ? normalizePhone(s) : "")),
});

const schema = z.discriminatedUnion("type", [ebook, achatCommence]);

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidResponse(parsed.error);

  const { type, prenom, telephone, email, consentement, page, ...utm } = parsed.data;
  const reference = crypto.randomUUID();
  const date = new Date().toISOString();
  try {
    await postToMake(
      { type, prenom, telephone, email, consentement, reference, date, page, ...utm },
      WEBHOOK_TIMEOUT_MS,
    );
  } catch (e) {
    // Un problème de webhook ne doit JAMAIS bloquer une vente : on log et on continue.
    console.error(`[lead] webhook Make en échec (type=${type}, reference=${reference}) ${errorText(e)}`);
  }
  return Response.json({ reference });
}
