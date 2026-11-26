import { CheckoutProvider } from "@/components/Checkout";
import { Footer } from "@/components/Footer";
import { MerciButton, MerciOffer } from "@/components/MerciOffer";
import { DuringOffer } from "@/components/offer";
import { Vsl } from "@/components/Vsl";
import { EBOOK_PDF, PRICE } from "@/lib/config";
import { faq, faqMerci, modules } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { t } from "@/lib/text";

export const metadata = pageMeta({
  title: "Ton ebook s'en vient",
  description: "Merci. Ton ebook s'en va dans tes courriels.",
  path: "/ebook/merci",
  image: "/ebook/opengraph-image",
  index: false,
});

const Pdf = ({ className = "" }: { className?: string }) => (
  <a href={EBOOK_PDF} download className={`underline underline-offset-4 ${className}`}>
    Télécharger le PDF
  </a>
);

const Entete = ({ etiquette, titre }: { etiquette: string; titre: string }) => (
  <div className="text-center">
    <p className="etiquette-verte">{etiquette}</p>
    <h2 className="titre mx-auto mt-4 max-w-3xl">{t(titre)}</h2>
  </div>
);

export default function Merci() {
  return (
    <CheckoutProvider>
      <main>
        <section className="keo-haut">
          <div className="wrap pt-6 pb-12 lg:py-16">
            <p className="text-center">
              <span className="etiquette-verte">
                {"✓ Ton ebook s'en va dans tes courriels."}
                <Pdf />
              </span>
            </p>
            <DuringOffer
              after={
                <div className="py-16 text-center">
                  <h1 className="titre">Merci !</h1>
                  <p className="mt-4 text-lg">Bonne lecture. Si le courriel tarde, vérifie tes promotions.</p>
                  <Pdf className="mt-5 inline-block text-lg font-semibold" />
                </div>
              }
            >
              <h1 className="large mx-auto mt-5 max-w-3xl text-center text-[clamp(1.55rem,3.6vw,2.8rem)] leading-[1.12]">
                {t("Avant que tu partes : t'as choisi ton service ? Voici comment signer ton premier client.")}
              </h1>
              <div className="mx-auto mt-8 grid max-w-5xl items-start gap-5 lg:grid-cols-[minmax(0,22rem)_1fr] lg:justify-center lg:gap-6">
                <Vsl />
                <div className="carte p-5 sm:p-7">
                  <MerciOffer />
                </div>
              </div>
            </DuringOffer>
          </div>
        </section>

        <DuringOffer>
          <section className="section wrap !max-w-4xl">
            <Entete etiquette="Le programme" titre="Les 8 modules" />
            <ol className="carte mt-8 grid gap-x-10 px-5 py-2 sm:grid-cols-2 sm:px-7">
              {modules.map(([titre], i) => (
                <li key={titre} className="border-b border-trait py-3 font-semibold last:border-0 sm:[&:nth-last-child(2)]:border-0">
                  <span className="text-accent">{`${i + 1}. `}</span>
                  {titre}
                </li>
              ))}
            </ol>
          </section>
          <section className="section wrap !max-w-3xl text-center">
            <Entete etiquette="Garantie 30 jours" titre="Pas de client ? Je te rembourse." />
            <p className="mt-5 text-lg text-doux">
              {t(
                `« Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes ${PRICE} $ au complet. »`,
              )}
            </p>
            <a href="/remboursement" className="mt-3 inline-block underline underline-offset-4">
              Conditions
            </a>
          </section>
          <section className="section wrap !max-w-3xl">
            <Entete etiquette="Questions" titre="Tes questions" />
            <div className="mt-10 space-y-3">
              {[...faqMerci, ...faq.filter(([q]) => q.startsWith("Ça me prend") || q.startsWith("Pourquoi juste"))].map(([q, a]) => (
                <details key={q} className="carte px-5 sm:px-6">
                  <summary className="flex items-center justify-between gap-4 py-5 font-bold">
                    {t(q)}
                    <span aria-hidden="true" className="plus text-2xl leading-none text-accent">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-doux">{t(a)}</p>
                </details>
              ))}
            </div>
            <MerciButton className="mx-auto mt-10 max-w-md text-center" />
          </section>
        </DuringOffer>
      </main>
      <Footer className="pb-16" />
    </CheckoutProvider>
  );
}
