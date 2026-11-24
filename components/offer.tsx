"use client";

import { useEffect, useState } from "react";
import { useCheckout } from "@/components/Checkout";
import { useRemaining } from "@/lib/clock";
import { PRICE } from "@/lib/config";
import { money } from "@/lib/text";

export function Countdown() {
  const s = useRemaining();
  if (s === 0) return <p className="font-bold">{"Black Friday : offre terminée"}</p>;
  const parts: [string, number | null][] = [
    ["j", s && Math.floor(s / 86400)],
    ["h", s && Math.floor(s / 3600) % 24],
    ["min", s && Math.floor(s / 60) % 60],
    ["s", s && s % 60],
  ];
  return (
    <p className="font-semibold">
      {"Black Friday : finit dans "}
      <span role="timer" className="inline-block font-extrabold whitespace-nowrap tabular-nums">
        {parts.map(([unit, v]) => `${v === null ? "--" : String(v).padStart(2, "0")} ${unit}`).join(" ")}
      </span>
    </p>
  );
}

export function BuyButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ended = useRemaining() === 0;
  const openCheckout = useCheckout();
  return (
    <button type="button" disabled={ended} onClick={openCheckout} className={`btn ${className}`}>
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
    const io = new IntersectionObserver(([e]) =>
      setShow(!e.isIntersecting && e.boundingClientRect.bottom <= 0),
    );
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
        <div className="min-w-0">
          <div className="flex items-center gap-4 pt-1">
            <span role="img" aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`} className="chiffre text-5xl">
              {money(PRICE)}
            </span>
          </div>
          <p className="mt-2.5 text-xs leading-tight">
            Le programme au complet, préenregistré.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <BuyButton className="!px-4 !py-3 !text-base sm:!px-8">J&apos;embarque</BuyButton>
        </div>
      </div>
    </div>
  );
}
