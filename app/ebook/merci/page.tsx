import { CheckoutProvider } from "@/components/Checkout";
import { Footer } from "@/components/Footer";
import { HeroMedia } from "@/components/HeroMedia";
import { MerciButton, MerciOffer } from "@/components/MerciOffer";
import { DuringOffer } from "@/components/offer";
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

export default function Merci() {
  return (
    <CheckoutProvider>
      <main>
        <section className="wrap pt-4 pb-12 lg:py-16">
          <p className="text-sm font-semibold text-accent">
            {"✓ Ton ebook s'en va dans tes courriels. "}
            <Pdf />
          </p>
          <DuringOffer
            after={
              <div className="py-16">
                <h1 className="titre">Merci !</h1>
                <p className="mt-4 text-lg">Bonne lecture. Si le courriel tarde, vérifie tes promotions.</p>
                <Pdf className="mt-5 inline-block text-lg font-semibold" />
              </div>
            }
          >
            <div className="mt-3 grid items-center gap-10 lg:mt-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <div>
                <h1 className="large text-[clamp(1.55rem,3.6vw,2.8rem)] leading-[1.12]">
                  {t("Avant que tu partes : t'as choisi ton service ? Voici comment signer ton premier client.")}
                </h1>
                <MerciOffer />
              </div>
              <HeroMedia />
            </div>
          </DuringOffer>
        </section>

        <DuringOffer>
          <section className="jour">
            <div className="section wrap !max-w-4xl">
              <h2 className="titre">Les 8 modules</h2>
              <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {modules.map(([titre], i) => (
                  <li key={titre} className="border-b border-trait py-3 text-lg font-semibold">
                    {`${i + 1}. ${titre}`}
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section className="section wrap !max-w-4xl">
            <h2 className="titre">{t("Pas de client ? Je te rembourse.")}</h2>
            <p className="mt-4 text-lg">
              {t(
                `« Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes ${PRICE} $ au complet. »`,
              )}
            </p>
            <a href="/remboursement" className="mt-3 inline-block underline underline-offset-4">
              Conditions
            </a>
          </section>
          <section className="jour">
            <div className="section wrap !max-w-4xl">
              <h2 className="titre">Tes questions</h2>
              <div className="mt-6 border-b border-trait">
                {[...faqMerci, ...faq.filter(([q]) => q.startsWith("Ça me prend") || q.startsWith("Pourquoi juste"))].map(([q, a]) => (
                  <details key={q} className="border-t border-trait">
                    <summary className="flex items-center justify-between gap-4 py-5 text-lg font-bold">
                      {t(q)}
                      <span aria-hidden="true" className="plus text-3xl leading-none">
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-doux">{t(a)}</p>
                  </details>
                ))}
              </div>
              <MerciButton className="mt-8" />
            </div>
          </section>
        </DuringOffer>
      </main>
      <Footer className="pb-16" />
    </CheckoutProvider>
  );
}
