/** Règles et messages partagés par les formulaires (navigateur) et la route /api/lead (serveur). */
export const CHAMPS = ["prenom", "telephone", "email"] as const;
export type Champ = (typeof CHAMPS)[number];
export type Erreurs = Partial<Record<Champ, string>>;
export type LeadType = "achat_commence" | "ebook";

export const ATTRIBUTION = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
export type Attribution = Partial<Record<(typeof ATTRIBUTION)[number], string>>;

export const MESSAGES: Record<Champ, string> = {
  prenom: "Entre ton prénom.",
  telephone: "Entre un numéro à 10 chiffres, comme 514 555-1234.",
  email: "Entre un courriel valide, comme toi@gmail.com.",
};

/** Garde seulement les chiffres, sans le 1 du début s'il y en a 11. */
export function normalizePhone(s: string): string {
  const digits = s.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

const EMAIL = /^[a-z0-9_%+'-]+(\.[a-z0-9_%+'-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

export const isValid: Record<Champ, (v: string) => boolean> = {
  prenom: (v) => v.trim() !== "",
  telephone: (v) => normalizePhone(v).length === 10,
  email: (v) => v.trim().length <= 254 && EMAIL.test(v.trim()),
};

export function validate(values: Partial<Record<Champ, string>>, champs: readonly Champ[]): Erreurs {
  const erreurs: Erreurs = {};
  for (const c of champs) if (!isValid[c](values[c] ?? "")) erreurs[c] = MESSAGES[c];
  return erreurs;
}
