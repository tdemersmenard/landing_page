/** Envoie un événement au webhook Make. Lance une erreur en cas d'échec : l'appelant décide quoi en faire. */
export async function postToMake(payload: Record<string, unknown>, timeoutMs: number) {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) throw new Error("MAKE_WEBHOOK_URL n'est pas définie");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`le webhook a répondu ${res.status}`);
}

/** Pour les logs : le message seulement, jamais de nom, de téléphone ni de courriel. */
export const errorText = (e: unknown) => (e instanceof Error ? `${e.name}: ${e.message}` : String(e));
