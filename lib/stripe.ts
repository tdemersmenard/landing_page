import { createHmac, timingSafeEqual } from "node:crypto";

/** Serveur seulement. Appels directs à l'API Stripe, sans SDK. */

export type PaymentIntent = {
  id: string;
  status: string;
  amount: number;
  amount_received: number;
  currency: string;
  client_secret: string;
  receipt_email: string | null;
  created: number;
  metadata: Record<string, string>;
};

/** `{ metadata: { a: "1" } }` devient `metadata[a]=1`, le format attendu par Stripe. */
function encode(value: unknown, prefix: string, out: URLSearchParams) {
  if (value === undefined || value === null) return out;
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) encode(v, prefix ? `${prefix}[${k}]` : k, out);
  } else out.append(prefix, String(value));
  return out;
}

export async function stripeApi<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY n'est pas définie");
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: params ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params ? encode(params, "", new URLSearchParams()).toString() : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`Stripe a répondu ${res.status} (${body?.error?.code ?? body?.error?.type ?? "?"})`);
  return body as T;
}

export type StripeEvent = { id: string; type: string; created: number; data: { object: { id: string } } };

/** Vérifie l'en-tête Stripe-Signature (HMAC SHA-256), avec 5 minutes de tolérance. null = refusé. */
export function verifyWebhook(payload: string, header: string | null, secret: string): StripeEvent | null {
  if (!header) return null;
  let t = "";
  const v1: string[] = [];
  for (const part of header.split(",")) {
    const [k, v] = part.split("=");
    if (k === "t") t = v;
    if (k === "v1" && v) v1.push(v);
  }
  if (!t || !v1.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return null;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex"));
  const ok = v1.some((s) => s.length === expected.length && timingSafeEqual(Buffer.from(s), expected));
  if (!ok) return null;
  try {
    return JSON.parse(payload) as StripeEvent;
  } catch {
    return null;
  }
}
