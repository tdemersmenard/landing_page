import { type FormEvent, useState } from "react";
import { type Champ, type Erreurs, type LeadType, validate } from "@/lib/lead";
import { sendLead, type SendResult } from "@/lib/sendLead";

/** Validation, messages d'erreur et envoi, communs au formulaire d'achat et à celui de l'ebook. */
export function useLeadForm(
  type: LeadType,
  champs: readonly Champ[],
  onSent: (r: Exclude<SendResult, { status: "invalid" }>) => void,
) {
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (c: Champ) => String(data.get(c) ?? "");
    const fields = { prenom: get("prenom"), telephone: get("telephone"), email: get("email") };
    const show = (errs: Erreurs) => {
      setErreurs(errs);
      const first = champs.find((c) => errs[c]);
      if (first) form.querySelector<HTMLInputElement>(`[name=${first}]`)?.focus();
      return !!first;
    };

    if (show(validate(fields, champs))) return;
    setPending(true);
    const values = { ...fields, consentement: data.get("consentement") === "on" };
    const result = await sendLead({ type, ...values });
    setPending(false);
    if (result.status === "invalid") show(result.erreurs);
    else onSent(result);
  }

  const field = (c: Champ) => ({
    name: c,
    error: erreurs[c],
    onChange: () => {
      if (erreurs[c]) setErreurs({ ...erreurs, [c]: undefined });
    },
  });

  return { onSubmit, pending, field };
}
