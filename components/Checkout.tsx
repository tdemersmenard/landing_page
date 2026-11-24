"use client";

import { createContext, type MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { Field } from "@/components/Field";
import { captureAttribution } from "@/lib/attribution";
import { useRemaining } from "@/lib/clock";
import { PRICE } from "@/lib/config";
import { CHAMPS } from "@/lib/lead";
import { startCheckout } from "@/lib/startCheckout";
import { money, t } from "@/lib/text";
import { useLeadForm } from "@/lib/useLeadForm";

const CheckoutContext = createContext<() => void>(() => {});
export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const pressedOutside = useRef(false);
  const ended = useRemaining() === 0;
  const [message, setMessage] = useState("");

  useEffect(captureAttribution, []);

  const { onSubmit, pending, field } = useLeadForm("achat_commence", CHAMPS, async (lead, values) => {
    // Fenêtre fermée pendant l'envoi : la personne a changé d'idée, on ne la redirige pas.
    if (!dialog.current?.open) return;
    setMessage("");
    // On continue même si le lead n'est pas parti : rien ne bloque une vente.
    const r = await startCheckout({ ...values, reference: lead.status === "ok" ? lead.reference : undefined });
    if (r.status === "invalid") return r.erreurs;
    if (r.status === "ok") {
      if (!dialog.current?.open) return;
      window.location.assign(r.url);
      return "leaving";
    }
    setMessage(
      r.status === "ended"
        ? "L'offre Black Friday est terminée."
        : "La page de paiement n'a pas pu s'ouvrir. Rien n'a été facturé. Réessaie dans un instant.",
    );
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
        className="feuille mx-0 mt-auto mb-0 max-h-[94dvh] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-2xl bg-peinture text-encre sm:m-auto sm:max-w-lg sm:rounded-2xl"
      >
        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="achat-titre" className="text-4xl">
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
          <p className="mt-2 flex items-center justify-between gap-4 border-y-2 border-encre/20 py-3 font-semibold">
            <span>{t("Touch Grass Academy, les 8 modules :")}</span>{" "}
            <span className="chiffre text-6xl text-gazon">{money(PRICE)}</span>
          </p>

          <form noValidate onSubmit={onSubmit} className="mt-4 grid gap-4">
            <Field ref={first} label="Prénom" autoComplete="given-name" {...field("prenom")} />
            <Field label="Téléphone" type="tel" autoComplete="tel" {...field("telephone")} />
            <Field label="Courriel" type="email" autoComplete="email" {...field("email")} />
            <label className="flex gap-3 text-[0.95rem] leading-snug">
              <input type="checkbox" name="consentement" className="mt-0.5 size-5 shrink-0 accent-gazon" />
              <span>
                J&apos;accepte de recevoir des courriels et des textos de Touch Grass Academy. Je peux me désabonner
                n&apos;importe quand.
              </span>
            </label>
            <button type="submit" disabled={pending || ended} className="btn">
              {ended ? "Offre terminée" : pending ? "Un instant…" : "Continuer vers le paiement"}
            </button>
            <p role="alert" className="font-semibold text-[#b3261e] empty:hidden">
              {message}
            </p>
          </form>
        </div>
      </dialog>
    </CheckoutContext>
  );
}
