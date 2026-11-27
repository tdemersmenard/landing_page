"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { Field } from "@/components/Field";
import { readAttribution } from "@/lib/attribution";
import { CURRENCY, PRICE, PRICE_CENTS } from "@/lib/config";
import { type Champ, CHAMPS, type Erreurs, validate } from "@/lib/lead";
import { readReference, saveLead, useSavedLead } from "@/lib/savedLead";
import { money } from "@/lib/text";

const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

/* Types minimaux de Stripe.js (chargé depuis js.stripe.com, comme Stripe l'exige). */
type StripeError = { type?: string; message?: string };
type BillingDetails = { name?: string; email?: string; phone?: string };
type ExpressEvent = {
  availablePaymentMethods?: Record<string, boolean> | null;
  billingDetails?: BillingDetails;
  resolve?: (o: object) => void;
  paymentFailed?: (o: object) => void;
};
type StripeElement = { mount(el: HTMLElement): void; destroy(): void; on(event: string, cb: (e: ExpressEvent) => void): void };
type StripeElements = { create(type: string, o?: object): StripeElement; submit(): Promise<{ error?: StripeError }> };
type StripeJs = {
  elements(o: object): StripeElements;
  confirmPayment(o: object): Promise<{ error?: StripeError }>;
};
declare global {
  interface Window {
    Stripe?: (key: string, o?: object) => StripeJs;
  }
}

let loading: Promise<void> | null = null;
function loadStripe(): Promise<void> {
  if (window.Stripe) return Promise.resolve();
  return (loading ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/v3";
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error("Stripe.js n'a pas chargé"));
    };
    document.head.append(s);
  }));
}

/** Calqué sur le site : mêmes couleurs que globals.css, champs comme .champ. */
const appearance = {
  theme: "night",
  variables: {
    colorBackground: "#111814",
    colorText: "#f6f8f3",
    colorTextSecondary: "#a2b0a7",
    colorTextPlaceholder: "#a2b0a7",
    colorPrimary: "#2b7549",
    colorDanger: "#ff8f85",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSizeBase: "16px",
    borderRadius: "14px",
    spacingUnit: "4px",
  },
  rules: {
    ".Label": { fontWeight: "700", fontSize: "17px", color: "#f6f8f3", marginBottom: "4px" },
    ".Input": { backgroundColor: "#090d0b", border: "1px solid #6b7f73", boxShadow: "none", padding: "12.8px 16px" },
    ".Input:focus": { border: "1px solid #5fc98a", boxShadow: "none" },
    ".Input--invalid": { border: "1px solid #ff8f85", boxShadow: "none" },
    ".Tab": { backgroundColor: "#090d0b", border: "1px solid #1f2c25", boxShadow: "none" },
    ".Tab:hover": { border: "1px solid #6b7f73" },
    ".Tab--selected": { border: "1px solid #5fc98a", boxShadow: "none" },
    ".Error": { color: "#ff8f85" },
  },
};

const ERREUR = "Le paiement n'a pas passé. Vérifie tes infos ou essaie une autre carte.";

type Infos = { source: "form" | "express"; prenom: string; email: string; telephone: string };

/** Crée le PaymentIntent côté serveur (montant fixé là-bas). */
async function creerIntent(infos: Infos): Promise<{ clientSecret?: string; erreurs?: Erreurs; error?: string }> {
  try {
    const res = await fetch("/api/paiement/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...infos, reference: readReference(), utm_content: readAttribution().utm_content ?? "" }),
    });
    const body = await res.json();
    if (res.ok && body.clientSecret) return { clientSecret: body.clientSecret };
    if (body.erreurs && Object.keys(body.erreurs).length) return { erreurs: body.erreurs };
    return { error: body.error ?? ERREUR };
  } catch {
    return { error: "Connexion perdue. Vérifie ton internet et réessaie." };
  }
}

const returnUrl = () => `${window.location.origin}/merci-achat`;

export function PaiementForm() {
  const lead = useSavedLead();
  const stripe = useRef<StripeJs | null>(null);
  const elements = useRef<StripeElements | null>(null);
  const paymentBox = useRef<HTMLDivElement>(null);
  const expressBox = useRef<HTMLDivElement>(null);
  const [pret, setPret] = useState(false);
  const [express, setExpress] = useState(false);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!PK) return;
    let annule = false;
    const crees: StripeElement[] = [];
    loadStripe()
      .then(() => {
        if (annule || !window.Stripe || !paymentBox.current || !expressBox.current) return;
        const s = window.Stripe(PK, { locale: "fr-CA" });
        const els = s.elements({
          mode: "payment",
          amount: PRICE_CENTS,
          currency: CURRENCY,
          appearance,
          locale: "fr-CA",
          fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" }],
        });
        stripe.current = s;
        elements.current = els;

        const payment = els.create("payment", {
          fields: { billingDetails: { name: "never", email: "never", phone: "never" } },
          wallets: { applePay: "never", googlePay: "never" }, // Déjà offerts au-dessus.
        });
        payment.on("ready", () => setPret(true));
        payment.mount(paymentBox.current);
        crees.push(payment);

        const exp = els.create("expressCheckout", {
          buttonHeight: 52,
          buttonType: { applePay: "buy", googlePay: "buy" },
          buttonTheme: { applePay: "white", googlePay: "white" },
          paymentMethods: { applePay: "auto", googlePay: "auto", link: "never", paypal: "never", amazonPay: "never", klarna: "never" },
        });
        exp.on("ready", (e) => setExpress(Object.values(e.availablePaymentMethods ?? {}).some(Boolean)));
        exp.on("click", (e) => e.resolve?.({ emailRequired: true, phoneNumberRequired: true }));
        exp.on("confirm", async (e) => {
          setMessage("");
          const b = e.billingDetails ?? {};
          const r = await creerIntent({
            source: "express",
            prenom: (b.name ?? "").trim().split(/\s+/)[0] ?? "",
            email: b.email ?? "",
            telephone: b.phone ?? "",
          });
          if (!r.clientSecret) {
            e.paymentFailed?.({ reason: "fail" });
            return setMessage(r.error ?? ERREUR);
          }
          const { error } = await s.confirmPayment({ elements: els, clientSecret: r.clientSecret, confirmParams: { return_url: returnUrl() } });
          if (error) setMessage(error.message ?? ERREUR);
        });
        exp.mount(expressBox.current);
        crees.push(exp);
      })
      .catch(() => setMessage("Le formulaire de paiement n'a pas chargé. Recharge la page."));
    return () => {
      annule = true;
      crees.forEach((el) => el.destroy());
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !stripe.current || !elements.current) return;
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (c: Champ) => String(data.get(c) ?? "").trim();
    const infos = { prenom: get("prenom"), telephone: get("telephone"), email: get("email") };

    const show = (errs: Erreurs) => {
      setErreurs(errs);
      const first = CHAMPS.find((c) => errs[c]);
      if (first) form.querySelector<HTMLInputElement>(`[name=${first}]`)?.focus();
      return !!first;
    };
    const champsOk = !show(validate(infos, CHAMPS));

    setBusy(true);
    // Valide aussi la carte, pour montrer toutes les erreurs d'un coup.
    const { error: carte } = await elements.current.submit();
    if (!champsOk || carte) return setBusy(false);

    saveLead({ ...infos, consentement: lead?.consentement ?? false });
    const r = await creerIntent({ source: "form", ...infos });
    if (!r.clientSecret) {
      setBusy(false);
      if (r.erreurs) return void show(r.erreurs);
      return setMessage(r.error ?? ERREUR);
    }
    const { error } = await stripe.current.confirmPayment({
      elements: elements.current,
      clientSecret: r.clientSecret,
      confirmParams: {
        return_url: returnUrl(),
        receipt_email: infos.email,
        payment_method_data: { billing_details: { name: infos.prenom, email: infos.email, phone: infos.telephone } },
      },
    });
    // Sans erreur, Stripe redirige vers /merci-achat.
    setBusy(false);
    if (error) setMessage(error.type === "card_error" || error.type === "validation_error" ? (error.message ?? ERREUR) : ERREUR);
  }

  const field = (c: Champ) => ({
    name: c,
    error: erreurs[c],
    onChange: () => {
      if (erreurs[c]) setErreurs({ ...erreurs, [c]: undefined });
    },
  });

  if (!PK)
    return (
      <p className="font-semibold">
        <span className="placeholder">[Paiement pas configuré : NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY est vide]</span>
      </p>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4">
      <h2 className="large text-2xl">Tes infos</h2>
      {/* Remonté quand les infos de la session arrivent, pour préremplir. */}
      <div key={lead?.email ?? "vide"} className="grid gap-4">
        <Field label="Prénom" autoComplete="given-name" defaultValue={lead?.prenom} {...field("prenom")} />
        <Field label="Courriel" type="email" autoComplete="email" defaultValue={lead?.email} {...field("email")} />
        <Field label="Téléphone" type="tel" autoComplete="tel" defaultValue={lead?.telephone} {...field("telephone")} />
      </div>

      <h2 className="large mt-4 text-2xl">Paiement</h2>
      <div hidden={!express}>
        <div ref={expressBox} />
        <p className="mt-4 flex items-center gap-3 text-sm text-doux before:h-px before:flex-1 before:bg-trait after:h-px after:flex-1 after:bg-trait">
          ou par carte
        </p>
      </div>
      <div ref={paymentBox} className="min-h-[12rem]" aria-busy={!pret} />

      <button type="submit" disabled={busy || !pret} className="btn mt-2 w-full">
        {busy ? "Un instant…" : `Payer ${money(PRICE)} et accéder au programme`}
      </button>
      <p className="text-center text-sm leading-snug text-doux">
        Paiement sécurisé par Stripe. Ton accès arrive par courriel tout de suite après le paiement.
      </p>
      <p id="paiement-erreur" role="alert" className="font-semibold text-erreur empty:hidden">
        {message}
      </p>
    </form>
  );
}
