"use client";

import { useEffect, useState } from "react";
import { useCheckout } from "@/components/Checkout";
import { useRemaining } from "@/lib/clock";
import { PRICE, PRICE_COACHING_TXT, SKOOL_PRICE_USD } from "@/lib/config";
import { money, t } from "@/lib/text";

export const CTA = `J'embarque à ${money(PRICE)}`;
const coaching = t(PRICE_COACHING_TXT);

export function Countdown() {
  const s = useRemaining();
  if (s === 0) return <p className="font-bold">{"Black Friday : offre terminée"}</p>;
  const parts: [string, number | null][] = [
    ["j", s && Math.floor(s / 86400)],
    ["h", s && Math.floor(s / 3600) % 24],
    ["min", s && Math.floor(s / 60) % 60],
    ["s", s && s % 60],
  ];
  return (
    <p className="font-semibold">
      {"Black Friday : finit dans "}
      <span role="timer" className="inline-block font-extrabold whitespace-nowrap tabular-nums">
        {parts.map(([unit, v]) => `${v === null ? "--" : String(v).padStart(2, "0")} ${unit}`).join(" ")}
      </span>
    </p>
  );
}

/** Affiche son contenu seulement pendant l'offre. */
export function DuringOffer({ children, after = null }: { children: React.ReactNode; after?: React.ReactNode }) {
  return useRemaining() === 0 ? after : children;
}

export const Prix = ({ className = "" }: { className?: string }) => (
  <span role="img" aria-label={`${PRICE} dollars canadiens`} className={`chiffre inline-block ${className}`}>
    {money(PRICE)}
  </span>
);

/** Le prix barré ne sort jamais sans « avec coaching 1-on-1 ». */
const Barre = () => (
  <>
    avec coaching 1-on-1 :{" "}
    <s className="whitespace-nowrap">{coaching}</s>
  </>
);

export function Ancrage({ taille, etiquette = false, note = false }: { taille: string; etiquette?: boolean; note?: boolean }) {
  return (
    <div>
      {etiquette && (
        <DuringOffer>
          <p className="etiquette">Black Friday</p>
        </DuringOffer>
      )}
      <p className="text-doux">
        Le programme <Barre />
      </p>
      <p className="font-bold">Les 8 modules seuls :</p>
      <Prix className={`mt-3 ${taille}`} />
      {note && (
        <p className="mt-4 text-sm leading-snug text-doux">
          {t(`Préenregistré, sans appels de coaching. Un seul paiement : ${PRICE} $ CAD, facturé ${SKOOL_PRICE_USD} par Skool.`)}
        </p>
      )}
    </div>
  );
}

export function BuyButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ended = useRemaining() === 0;
  const openCheckout = useCheckout();
  return (
    <button type="button" disabled={ended} onClick={openCheckout} className={`btn btn-achat ${className}`}>
      {ended ? "Offre terminée" : children}
    </button>
  );
}

/** Barre collée en bas, visible une fois le hero dépassé. */
export function StickyBar({ heroId }: { heroId: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.bottom <= 0));
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  return (
    <div
      hidden={!show}
      role="region"
      aria-label="Offre Black Friday"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-trait bg-nuit pb-[env(safe-area-inset-bottom)] text-clair"
    >
      <div className="wrap flex items-center justify-between gap-3 py-2">
        <div className="min-w-0 text-xs leading-tight">
          <p className="text-doux">
            Programme <Barre />
          </p>
          <p className="mt-1.5 flex items-center gap-2">
            <Prix className="text-4xl" />
            <span className="font-semibold">8 modules seuls</span>
          </p>
        </div>
        <BuyButton className="shrink-0 !px-4 !py-3 !text-base sm:!px-8">J&apos;embarque</BuyButton>
      </div>
    </div>
  );
}
