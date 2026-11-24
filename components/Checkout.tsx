"use client";

import { createContext, type MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { Consent } from "@/components/Consent";
import { Field } from "@/components/Field";
import { captureAttribution } from "@/lib/attribution";
import { useRemaining } from "@/lib/clock";
import { OFFER_END, PRICE, SKOOL_COURSE, SKOOL_PRICE_USD, SKOOL_URL } from "@/lib/config";
import { CHAMPS } from "@/lib/lead";
import { money, t } from "@/lib/text";
import { useLeadForm } from "@/lib/useLeadForm";

const END = new Date(OFFER_END).getTime();

const CheckoutContext = createContext<() => void>(() => {});
export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const pressedOutside = useRef(false);
  const ended = useRemaining() === 0;
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false); // Formulaire envoyé : on montre les étapes Skool.
  const skoolLink = useRef<HTMLAnchorElement>(null);

  useEffect(captureAttribution, []);
  useEffect(() => {
    if (ready) skoolLink.current?.focus();
  }, [ready]);

  const { onSubmit, pending, field } = useLeadForm("achat_commence", CHAMPS, () => {
    // Fenêtre fermée pendant l'envoi : la personne a changé d'idée, on ne la redirige pas.
    if (!dialog.current?.open) return;
    setMessage("");
    // Étapes Skool, même si le lead n'est pas parti : rien ne bloque une vente.
    if (Date.now() >= END) return setMessage("L'offre Black Friday est terminée.");
    setReady(true);
  });

  // Synchrone dans le clic : iOS n'ouvre le clavier que dans ce cas.
  function open() {
    setMessage("");
    if (!dialog.current?.open) dialog.current?.showModal();
    (first.current ?? skoolLink.current)?.focus();
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

          {ready ? (
            <div className="mt-4">
              <h3 className="text-xl font-extrabold">Il te reste 3 étapes sur Skool</h3>
              <ol className="mt-3 list-decimal space-y-3 pl-6 text-lg leading-snug">
                <li>Rejoins la communauté. C&apos;est gratuit.</li>
                <li>
                  Va dans la salle de classe et choisis <strong>{SKOOL_COURSE}</strong>.
                </li>
                <li>
                  {"Clique sur « Débloquer » et paie "}
                  <strong>{t(SKOOL_PRICE_USD)}</strong>
                  {". Ton accès s'ouvre tout seul."}
                </li>
              </ol>
              <p className="mt-4 text-[0.95rem]">Utilise le même courriel que dans le formulaire.</p>
              {ended ? (
                <p className="mt-5 font-bold">{"L'offre Black Friday est terminée."}</p>
              ) : (
                <a ref={skoolLink} href={SKOOL_URL} className="btn mt-5 w-full">
                  Ouvrir Skool
                </a>
              )}
            </div>
          ) : (
          <form noValidate onSubmit={onSubmit} className="mt-4 grid gap-4">
            <Field ref={first} label="Prénom" autoComplete="given-name" {...field("prenom")} />
            <Field label="Téléphone" type="tel" autoComplete="tel" {...field("telephone")} />
            <Field label="Courriel" type="email" autoComplete="email" {...field("email")} />
            <Consent />
            <p className="text-[0.95rem] leading-snug">
              {`Le paiement se fait sur Skool, en dollars américains : ${SKOOL_PRICE_USD}. Utilise le même courriel.`}
            </p>
            <button type="submit" disabled={pending || ended} className="btn">
              {ended ? "Offre terminée" : pending ? "Un instant…" : "Continuer vers le paiement"}
            </button>
            <p role="alert" className="font-semibold text-[#b3261e] empty:hidden">
              {message}
            </p>
          </form>
          )}
        </div>
      </dialog>
    </CheckoutContext>
  );
}
