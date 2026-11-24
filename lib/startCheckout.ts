import type { Erreurs } from "@/lib/lead";
import type { Values } from "@/lib/sendLead";

export type CheckoutResult =
  | { status: "ok"; url: string }
  | { status: "invalid"; erreurs: Erreurs }
  | { status: "ended" }
  | { status: "failed" };

export async function startCheckout(lead: Values & { reference?: string }): Promise<CheckoutResult> {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 25000);
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: abort.signal,
    });
    const body = await res.json();
    if (res.ok && body.url) return { status: "ok", url: body.url };
    if (res.status === 410) return { status: "ended" };
    if (res.status === 400 && body.erreurs && Object.keys(body.erreurs).length)
      return { status: "invalid", erreurs: body.erreurs };
    console.error("/api/checkout a répondu", res.status);
  } catch (e) {
    console.error("/api/checkout injoignable", e);
  } finally {
    clearTimeout(timer);
  }
  return { status: "failed" };
}
