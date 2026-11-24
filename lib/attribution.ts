import { ATTRIBUTION, type Attribution } from "@/lib/lead";

const KEY = "attribution";
let memory: Attribution = {}; // Repli si le navigateur bloque sessionStorage.

/** À appeler au chargement. Une nouvelle URL de campagne remplace la précédente au complet. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const k of ATTRIBUTION) {
    const v = params.get(k);
    if (v) found[k] = v;
  }
  if (!Object.keys(found).length) return;
  memory = found;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {}
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "null") ?? memory;
  } catch {
    return memory;
  }
}
