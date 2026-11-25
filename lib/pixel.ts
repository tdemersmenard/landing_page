/** Pixel Meta. Rien ne charge si NEXT_PUBLIC_META_PIXEL_ID est vide. */
import { PRICE } from "@/lib/config";
import { normalizePhone } from "@/lib/lead";
import { readLead } from "@/lib/savedLead";

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const DEBUG_KEY = "debug_pixel";

type Fbq = {
  (...args: unknown[]): void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
  callMethod?: (...args: unknown[]) => void;
};
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Le mode debug reste actif d'une page à l'autre, jusqu'à la fermeture de l'onglet. */
function debugOn(): boolean {
  try {
    if (new URLSearchParams(location.search).get(DEBUG_KEY) === "1") sessionStorage.setItem(DEBUG_KEY, "1");
    return sessionStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    return location.search.includes(`${DEBUG_KEY}=1`);
  }
}

/** File d'attente standard de Meta : les événements partent quand fbevents.js est chargé. */
function getFbq(): Fbq {
  if (!window.fbq) {
    const f = function (...args: unknown[]) {
      if (f.callMethod) f.callMethod(...args);
      else f.queue.push(args);
    } as Fbq;
    f.queue = [];
    f.push = f;
    f.loaded = true;
    f.version = "2.0";
    f.disablePushState = true; // On envoie PageView nous-mêmes à chaque page.
    window.fbq = f;
    window._fbq ??= f;
  }
  return window.fbq;
}

/** Correspondance avancée : le pixel hache ces valeurs avant de les envoyer. */
function matching(): Record<string, string> {
  const lead = readLead();
  const out: Record<string, string> = {};
  if (lead?.email) out.em = lead.email.trim().toLowerCase();
  if (lead?.telephone) out.ph = `1${normalizePhone(lead.telephone)}`;
  return out;
}

let sentMatching: string | undefined;

export function track(event: "PageView" | "Lead" | "InitiateCheckout", params: Record<string, unknown> = {}) {
  const match = matching();
  if (debugOn())
    console.log("[pixel]", event, JSON.stringify(params), "correspondance:", Object.keys(match).join(",") || "aucune", PIXEL_ID ? "envoyé" : "PAS envoyé (aucun ID)");
  if (!PIXEL_ID) return;
  const fbq = getFbq();
  const key = JSON.stringify(match);
  if (key !== sentMatching) {
    fbq("init", PIXEL_ID, match);
    sentMatching = key;
  }
  fbq("track", event, params);
}

export const trackCheckout = () => track("InitiateCheckout", { value: PRICE, currency: "CAD" });

/** Laisse à Meta le temps de partir avant qu'on quitte la page. */
export const pixelDelay = () => (PIXEL_ID ? new Promise((r) => setTimeout(r, 400)) : Promise.resolve());
