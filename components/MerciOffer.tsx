"use client";

import { Ancrage, BuyButton, Countdown, CTA, DuringOffer } from "@/components/offer";
import { useSavedLead } from "@/lib/savedLead";

/** Lien vers /paiement, avec le prénom et le courriel donnés sur /ebook pour préremplir. */
export function MerciButton({ className = "" }: { className?: string }) {
  const lead = useSavedLead();
  const params = new URLSearchParams({ utm_source: "merci" });
  if (lead) {
    params.set("prenom", lead.prenom);
    params.set("email", lead.email);
  }
  const href = `/paiement?${params}`;
  return (
    <DuringOffer>
      <div className={className}>
        <BuyButton href={href} className="w-full">
          {CTA}
        </BuyButton>
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
