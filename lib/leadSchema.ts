import { z } from "zod";
import { CHAMPS, isValid, MESSAGES, normalizePhone, type Champ, type Erreurs } from "@/lib/lead";

const champ = (c: Champ) => z.string({ error: MESSAGES[c] }).refine(isValid[c], { error: MESSAGES[c] });

/** Champs de la route /api/lead. */
export const contact = {
  prenom: champ("prenom").transform((s) => s.trim().slice(0, 100)),
  email: champ("email").transform((s) => s.trim()),
  consentement: z.boolean().catch(false), // Seul un vrai `true` compte comme un consentement.
};
export const telephone = champ("telephone").transform(normalizePhone);

export function invalidResponse(error: z.ZodError): Response {
  const erreurs: Erreurs = {};
  for (const issue of error.issues) {
    const c = CHAMPS.find((k) => k === issue.path[0]);
    if (c) erreurs[c] ??= MESSAGES[c];
  }
  return Response.json({ erreurs }, { status: 400 });
}
