"use client";

import { useState } from "react";
import { goToPaiement, offerEnded, useCheckout } from "@/components/Checkout";
import { Ancrage, Countdown, CTA, DuringOffer } from "@/components/offer";
import { saveReference, useSavedLead } from "@/lib/savedLead";
import { sendLead } from "@/lib/sendLead";

/** Infos déjà données sur /ebook : on va direct sur /paiement. Sinon, la modale d'achat. */
export function MerciButton({ className = "" }: { className?: string }) {
  const lead = useSavedLead();
  const openCheckout = useCheckout();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy || offerEnded()) return;
    if (!lead) return openCheckout();
    setBusy(true);
    // Le lead ne retient jamais une vente plus de 3,5 s.
    const r = await Promise.race([
      sendLead({ type: "achat_commence", ...lead }),
      new Promise<null>((done) => setTimeout(() => done(null), 3500)),
    ]);
    if (r?.status === "invalid") {
      setBusy(false);
      return openCheckout();
    }
    if (r?.status === "ok") saveReference(r.reference);
    await goToPaiement();
    setTimeout(() => setBusy(false), 4000); // Retour arrière.
  }

  return (
    <DuringOffer>
      <div className={className}>
        <button type="button" onClick={onClick} disabled={busy} className="btn w-full">
          {busy ? "Un instant…" : CTA}
        </button>
      </div>
    </DuringOffer>
  );
}

export function MerciOffer() {
  return (
    <DuringOffer>
      <div>
        <Ancrage etiquette note taille="text-[min(26vw,8rem)]" />
        <div className="mt-3 text-sm">
          <Countdown />
        </div>
        <MerciButton className="mt-3" />
      </div>
    </DuringOffer>
  );
}
