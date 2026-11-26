"use client";

import { createContext, type MouseEvent, useContext, useRef, useState } from "react";
import { Consent } from "@/components/Consent";
import { Field } from "@/components/Field";
import { useRemaining } from "@/lib/clock";
import { BRAND, OFFER_END, PRICE, SKOOL_PRICE_USD, SKOOL_URL } from "@/lib/config";
import { CHAMPS, isValid } from "@/lib/lead";
import { pixelDelay, trackCheckout } from "@/lib/pixel";
import { money, t } from "@/lib/text";
import { useLeadForm } from "@/lib/useLeadForm";

const END = new Date(OFFER_END).getTime();
export const offerEnded = () => Date.now() >= END;

/** Le seul chemin vers Skool : InitiateCheckout, puis la redirection. */
export async function goToSkool() {
  trackCheckout();
  await pixelDelay();
  window.location.assign(SKOOL_URL);
}

export function SkoolEmail({ email, className = "" }: { email?: string; className?: string }) {
  return (
    <p className={`text-[0.95rem] leading-snug ${className}`}>
      {"Sur Skool, utilise le même courriel"}
      {email && (
        <>
          {" ("}
          <strong className="[overflow-wrap:anywhere]">{email}</strong>)
        </>
      )}
      {t(" : c'est comme ça qu'on retrouve ton achat.")}
    </p>
  );
}

const CheckoutContext = createContext<() => void>(() => {});
export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const pressedOutside = useRef(false);
  const ended = useRemaining() === 0;
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [leaving, setLeaving] = useState(false);

  const { onSubmit, pending, field } = useLeadForm("achat_commence", CHAMPS, async () => {
    // Fenêtre fermée pendant l'envoi : la personne a changé d'idée, on ne la redirige pas.
    if (!dialog.current?.open) return;
    if (offerEnded()) return setMessage("L'offre Black Friday est terminée.");
    // On redirige même si le lead n'est pas parti : rien ne bloque une vente.
    setLeaving(true);
    await goToSkool();
    setTimeout(() => setLeaving(false), 4000); // Retour arrière, ou navigation bloquée.
  });

  // Synchrone dans le clic : iOS n'ouvre le clavier que dans ce cas.
  function open() {
    setMessage("");
    if (!dialog.current?.open) dialog.current?.showModal();
    first.current?.focus();
  }

  const isOutside = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target !== e.currentTarget) return false;
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  const busy = pending || leaving;
  return (
    <CheckoutContext value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="achat-titre"
        onPointerDown={(e) => {
          pressedOutside.current = isOutside(e);
        }}
        onClick={(e) => {
          if (pressedOutside.current && isOutside(e)) dialog.current?.close();
        }}
        className="feuille carte mx-0 mt-auto mb-0 max-h-[94dvh] w-full max-w-none overflow-y-auto overscroll-contain !rounded-b-none !bg-panneau text-clair sm:m-auto sm:max-w-lg sm:!rounded-b-[22px]"
      >
        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="achat-titre" className="large text-3xl">
              Presque fini.
            </h2>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => dialog.current?.close()}
              className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center text-3xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-trait bg-nuit px-4 py-3 font-semibold">
            <span>
              {t(`${BRAND}, les 8 modules`)}
              <span className="block text-sm font-normal text-doux">{t(`CAD, facturé ${SKOOL_PRICE_USD} par Skool`)}</span>
            </span>
            <span className="chiffre text-5xl">{money(PRICE)}</span>
          </p>
          <form
            noValidate
            onSubmit={onSubmit}
            onInput={(e) => {
              const i = e.target as HTMLInputElement;
              if (i.name === "email") setEmail(i.value.trim());
            }}
            className="mt-4 grid gap-4"
          >
            <Field ref={first} label="Prénom" autoComplete="given-name" {...field("prenom")} />
            <Field label="Téléphone" type="tel" autoComplete="tel" {...field("telephone")} />
            <Field label="Courriel" type="email" autoComplete="email" {...field("email")} />
            <Consent />
            <SkoolEmail email={isValid.email(email) ? email : undefined} />
            <button type="submit" disabled={busy || ended} className="btn">
              {ended ? "Offre terminée" : busy ? "Un instant…" : "Continuer vers le paiement"}
            </button>
            <p role="alert" className="font-semibold text-erreur empty:hidden">
              {message}
            </p>
          </form>
        </div>
      </dialog>
    </CheckoutContext>
  );
}
