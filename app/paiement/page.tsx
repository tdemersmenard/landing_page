import { Footer } from "@/components/Footer";
import { Ancrage, Countdown, DuringOffer } from "@/components/offer";
import { PaiementForm } from "@/components/PaiementForm";
import { BRAND, PRICE } from "@/lib/config";
import { included } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { t } from "@/lib/text";

export const metadata = pageMeta({
  title: `Paiement : ${BRAND}`,
  description: `Les 8 modules de ${BRAND} à ${PRICE} $ CAD.`,
  path: "/paiement",
  index: false,
});

const inclus = included.filter(([id]) => id !== "garantie");
const garantie = included.find(([id]) => id === "garantie");

const Terminee = () => (
  <div className="carte mx-auto max-w-xl p-8 text-center sm:p-12">
    <h1 className="titre">{"L'offre Black Friday est terminée"}</h1>
  </div>
);

export default function Paiement() {
  return (
    <>
      <div className="border-b border-trait bg-[#0f2418] px-4 py-2 text-center text-[0.95rem]">
        <Countdown />
      </div>
      <main className="keo-haut">
        <div className="wrap !max-w-5xl pt-6 pb-14 lg:pt-12 lg:pb-20">
          <DuringOffer after={<Terminee />}>
            <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
              <aside aria-label="Récapitulatif" className="carte p-5 sm:p-7 lg:sticky lg:top-6">
                <p className="etiquette-verte">Ton achat</p>
                <h1 className="large mt-3 text-2xl leading-tight sm:text-3xl">{t(`${BRAND}, les 8 modules`)}</h1>
                <div className="mt-5 border-t border-trait pt-5">
                  <Ancrage etiquette devise taille="text-[min(24vw,6.5rem)]" />
                  <p className="mt-3 text-sm text-doux">Préenregistré, sans appels de coaching. Un seul paiement.</p>
                </div>
                <ul className="mt-5 divide-y divide-trait border-y border-trait">
                  {inclus.map(([id, titre]) => (
                    <li key={id} className="flex items-center justify-between gap-3 py-2.5 text-[0.95rem] leading-snug font-semibold">
                      {titre}
                      <span className="inclus">Inclus</span>
                    </li>
                  ))}
                </ul>
                {garantie && (
                  <div className="mt-5 rounded-2xl border border-trait bg-nuit p-4">
                    <p className="font-bold">
                      <span aria-hidden="true" className="text-accent">
                        ✓{" "}
                      </span>
                      {garantie[1]}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-snug text-doux">{t(garantie[2])}</p>
                    <a href="/remboursement" className="mt-1 inline-block text-sm underline underline-offset-4">
                      Conditions
                    </a>
                  </div>
                )}
                <div className="mt-5 text-sm">
                  <Countdown />
                </div>
              </aside>

              <section aria-label="Paiement" className="carte p-5 sm:p-7">
                <PaiementForm />
              </section>
            </div>
          </DuringOffer>
        </div>
      </main>
      <Footer className="pb-16" />
    </>
  );
}
