import { useSyncExternalStore } from "react";
import type { Values } from "@/lib/sendLead";
import { CHAMPS, isValid } from "@/lib/lead";

const KEY = "lead";
let memory: string | null = null; // Repli si le navigateur bloque sessionStorage.

/** Gardé dans l'onglet seulement, pour ne pas redemander les mêmes infos sur /ebook/merci. */
export function saveLead(lead: Values) {
  memory = JSON.stringify(lead);
  try {
    sessionStorage.setItem(KEY, memory);
  } catch {}
}

function raw(): string | null {
  try {
    return sessionStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function parse(s: string | null): Values | null {
  try {
    const l = JSON.parse(s ?? "null");
    return l && CHAMPS.every((c) => typeof l[c] === "string" && isValid[c](l[c])) ? { ...l, consentement: l.consentement === true } : null;
  } catch {
    return null;
  }
}

export const readLead = () => parse(raw());

const never = () => () => {};
/** null pendant le rendu serveur. */
export const useSavedLead = () => parse(useSyncExternalStore(never, raw, () => null));

const REF_KEY = "reference";
let refMemory = "";

/** Référence du lead achat_commence, pour la relier au paiement Stripe. */
export function saveReference(reference: string) {
  refMemory = reference;
  try {
    sessionStorage.setItem(REF_KEY, reference);
  } catch {}
}

export function readReference(): string {
  try {
    return sessionStorage.getItem(REF_KEY) ?? refMemory;
  } catch {
    return refMemory;
  }
}
