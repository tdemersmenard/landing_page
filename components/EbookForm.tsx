"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Consent } from "@/components/Consent";
import { Field } from "@/components/Field";
import { CHAMPS } from "@/lib/lead";
import { track } from "@/lib/pixel";
import { useLeadForm } from "@/lib/useLeadForm";

export function EbookForm() {
  const router = useRouter();
  const [state, setState] = useState<"form" | "leaving" | "failed">("form");
  const { onSubmit, pending, field } = useLeadForm("ebook", CHAMPS, (r) => {
    if (r.status !== "ok") return setState("failed");
    setState("leaving");
    track("Lead", { content_name: "ebook" });
    router.push("/ebook/merci"); // Navigation interne : le pixel a le temps de partir.
  });
  const busy = pending || state === "leaving";

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-3">
      <Field label="Prénom" autoComplete="given-name" {...field("prenom")} />
      <Field label="Téléphone" type="tel" autoComplete="tel" {...field("telephone")} />
      <Field label="Courriel" type="email" autoComplete="email" {...field("email")} />
      <Consent />
      <button type="submit" disabled={busy} className="btn">
        {busy ? "Un instant…" : "Envoie-moi l'ebook gratuit"}
      </button>
      <p role="alert" className="font-semibold text-erreur empty:hidden">
        {state === "failed" && !pending && "Ça n'a pas marché. Vérifie ta connexion et réessaie."}
      </p>
    </form>
  );
}
