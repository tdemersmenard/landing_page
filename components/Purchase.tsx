"use client";

import { useEffect } from "react";
import { PRICE } from "@/lib/config";
import { track } from "@/lib/pixel";

/** Purchase, une seule fois par paiement (même si la page est rechargée). eventID = PaymentIntent. */
export function Purchase({ id }: { id: string }) {
  useEffect(() => {
    const key = `achat:${id}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {}
    track("Purchase", { value: PRICE, currency: "CAD" }, { eventID: id });
  }, [id]);
  return null;
}
