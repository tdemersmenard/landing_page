"use client";

import { useEffect, useState } from "react";
import { useRemaining } from "@/lib/clock";
import { PRICE, PRICE_COACHING_TXT } from "@/lib/config";
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

export function Ancrage({
  taille,
  etiquette = false,
  note = false,
  devise = false,
}: {
  taille: string;
  etiquette?: boolean;
  note?: boolean;
  devise?: boolean;
}) {
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
      <p className="mt-3">
        <Prix className={taille} />
        {devise && <span className="large ml-3 text-3xl">CAD</span>}
      </p>
      {note && (
        <p className="mt-4 text-sm leading-snug text-doux">
          {t(`Préenregistré, sans appels de coaching. Un seul paiement : ${PRICE} $ CAD.`)}
        </p>
      )}
    </div>
  );
}

/** Lien simple vers /paiement. Après la fin de l'offre : bouton désactivé. */
export function BuyButton({
  children,
  className = "",
  href = "/paiement",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  if (useRemaining() === 0)
    return (
      <button type="button" disabled className={`btn ${className}`}>
        Offre terminée
      </button>
    );
  return (
    <a href={href} className={`btn ${className}`}>
      {children}
    </a>
  );
}

/** Compte à rebours compact pour la barre collante : « 02j 05h 12min » ou « 05h 12min 30s ». */
function Compact({ s }: { s: number }) {
  const d = Math.floor(s / 86400);
  const parts: [number, string][] = d
    ? [[d, "j"], [Math.floor(s / 3600) % 24, "h"], [Math.floor(s / 60) % 60, "min"]]
    : [[Math.floor(s / 3600), "h"], [Math.floor(s / 60) % 60, "min"], [s % 60, "s"]];
  return <span className="font-bold tabular-nums whitespace-nowrap">{parts.map(([v, u]) => `${String(v).padStart(2, "0")} ${u}`).join(" ")}</span>;
}

/** Barre collée en bas sur mobile (< 768 px), visible une fois le premier bouton d'achat dépassé. */
export function StickyBar({ heroId }: { heroId: string }) {
  const [show, setShow] = useState(false);
  const s = useRemaining();
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.bottom <= 0));
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  if (!s) return null; // Offre terminée (0) ou pas encore calculée (null) : pas de barre.

  return (
    <div
      hidden={!show}
      role="region"
      aria-label="Offre Black Friday"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-trait bg-nuit pb-[env(safe-area-inset-bottom)] text-clair md:hidden"
    >
      <div className="wrap flex items-center justify-between gap-3 py-2.5">
        <p className="flex min-w-0 items-baseline gap-2 leading-none">
          <Prix className="text-3xl" />
          <span className="truncate text-xs text-doux">
            {"· finit dans "}
            <Compact s={s} />
          </span>
        </p>
        <BuyButton className="shrink-0 !px-5 !py-3 !text-base">J&apos;embarque</BuyButton>
      </div>
    </div>
  );
}
