"use client";

import { useEffect, useState } from "react";
import { useRemaining } from "@/lib/clock";
import { t } from "@/lib/text";

/** Retour de Stripe avec ?annule=1. Caché une fois l'offre finie : le message ne serait plus vrai. */
export function CancelBanner() {
  const remaining = useRemaining();
  const [cancelled, setCancelled] = useState(false);
  useEffect(() => setCancelled(new URLSearchParams(window.location.search).get("annule") === "1"), []);

  if (!cancelled || !remaining) return null;
  return (
    <p role="status" className="bg-cone px-4 py-3 text-center font-bold text-encre">
      {t("Ton paiement n'est pas passé. Ta place à 87 $ est encore là jusqu'à lundi 23 h 59.")}
    </p>
  );
}
