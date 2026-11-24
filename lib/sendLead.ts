import { readAttribution } from "@/lib/attribution";
import type { Erreurs, LeadType } from "@/lib/lead";

export type Values = { prenom: string; telephone: string; email: string; consentement: boolean };
type Lead = Values & { type: LeadType };
export type SendResult =
  | { status: "ok"; reference: string }
  | { status: "invalid"; erreurs: Erreurs }
  | { status: "failed" };

// Un nouvel essai avec les mêmes infos (ex. double essai) ne renvoie pas le même lead à Make.
const sent = new Map<string, string>();

/** Ne lance jamais d'erreur : c'est l'appelant qui décide si un échec bloque ou pas. */
export async function sendLead(lead: Lead): Promise<SendResult> {
  const key = JSON.stringify(lead);
  const known = sent.get(key);
  if (known) return { status: "ok", reference: known };

  // Plus long que les 3 s du serveur : couvre un réseau mobile lent.
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 8000);
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        page: window.location.origin + window.location.pathname,
        ...readAttribution(),
      }),
      signal: abort.signal,
    });
    const body = await res.json();
    if (res.ok) {
      sent.set(key, body.reference);
      return { status: "ok", reference: body.reference };
    }
    if (res.status === 400 && body.erreurs && Object.keys(body.erreurs).length)
      return { status: "invalid", erreurs: body.erreurs };
    console.error("/api/lead a répondu", res.status);
  } catch (e) {
    console.error("/api/lead injoignable", e);
  } finally {
    clearTimeout(timer);
  }
  return { status: "failed" };
}
