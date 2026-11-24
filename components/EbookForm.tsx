"use client";

import { useEffect, useRef, useState } from "react";
import { Consent } from "@/components/Consent";
import { Field } from "@/components/Field";
import { useLeadForm } from "@/lib/useLeadForm";

export function EbookForm() {
  const [state, setState] = useState<"form" | "sent" | "failed">("form");
  const message = useRef<HTMLParagraphElement>(null);
  const { onSubmit, pending, field } = useLeadForm("ebook", ["prenom", "email"], (r) => {
    setState(r.status === "ok" ? "sent" : "failed");
  });

  // Le bouton disparaît : on déplace le focus sur le message pour les lecteurs d'écran.
  useEffect(() => {
    if (state === "sent") message.current?.focus();
  }, [state]);

  if (state === "sent")
    return (
      <p ref={message} tabIndex={-1} role="status" className="text-xl leading-relaxed font-semibold">
        C&apos;est envoyé. Regarde tes courriels dans les prochaines minutes. Vérifie aussi l&apos;onglet Promotions.
      </p>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4">
      <Field label="Ton prénom" autoComplete="given-name" {...field("prenom")} />
      <Field label="Ton courriel" type="email" autoComplete="email" {...field("email")} />
      <Consent />
      <button type="submit" disabled={pending} className="btn">
        {pending ? "Un instant…" : "Envoie-moi l'ebook"}
      </button>
      <p role="alert" className="font-semibold text-[#b3261e] empty:hidden">
        {state === "failed" && !pending && "Ça n'a pas marché. Vérifie ta connexion et réessaie."}
      </p>
    </form>
  );
}
