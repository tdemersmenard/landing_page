/** Case facultative, jamais cochée d'avance (loi canadienne anti-pourriel). */
export function Consent() {
  return (
    <label className="flex gap-3 text-[0.95rem] leading-snug">
      <input type="checkbox" name="consentement" className="mt-0.5 size-5 shrink-0 accent-eau" />
      <span>
        J&apos;accepte de recevoir des courriels et des textos de Système TDM. Je peux me désabonner
        n&apos;importe quand.
      </span>
    </label>
  );
}
