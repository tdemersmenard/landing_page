import Image from "next/image";
import { Contact } from "@/components/Contact";
import { EbookForm } from "@/components/EbookForm";
import { BuyButton, Countdown, StickyBar } from "@/components/offer";
import { FULL_PRICE, PRICE, SKOOL_MEMBERS } from "@/lib/config";
import { extras, faq, included, modules, situations } from "@/lib/content";
import { money, t } from "@/lib/text";

const ctaText = `J'embarque à ${money(PRICE)}`;

export default function Page() {
  return (
    <>
      <div className="bg-encre px-4 py-2.5 text-center text-[0.95rem] text-peinture">
        <Countdown />
      </div>

      <main>
        <section id="hero" className="gazon border-b-8 border-peinture">
          <div className="wrap grid items-center gap-x-14 gap-y-8 pt-6 pb-10 lg:grid-cols-[auto_1fr] lg:py-12">
            <div>
              <div className="flex items-center gap-5 lg:block">
                <p className="max-w-56 text-base leading-snug font-bold lg:max-w-80 lg:text-xl">
                  {t("Le programme Touch Grass Academy que je vendais 997 $")}
                </p>
                <del
                  role="img"
                  aria-label={`Prix d'avant, ${FULL_PRICE} dollars canadiens`}
                  className="barre hero-barre chiffre shrink-0 text-[3.75rem] lg:mt-6 lg:text-[6rem]"
                >
                  {money(FULL_PRICE)}
                </del>
              </div>
              <span
                role="img"
                aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`}
                className="hero-prix chiffre mt-11 text-[min(48vw,20rem)] lg:mt-16 lg:text-[19rem]"
              >
                {money(PRICE)}
              </span>
            </div>

            <div>
              <h1 className="text-[clamp(2.1rem,8.6vw,3.75rem)] lg:text-[3.6rem]">
                {t("Lance ta business de service et signe ton premier client en 30 jours. Sinon, t'es remboursé.")}
              </h1>
              <p className="mt-3">
                <a href="#garantie" className="font-semibold underline underline-offset-4">
                  Voir les conditions de la garantie
                </a>
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed">
                {t(
                  "Gazon, piscines, vitres, déneigement : choisis ton service, pis suis les 8 modules vidéo pour fixer tes prix, trouver tes clients et vendre sans être gêné.",
                )}
              </p>
              <div className="mt-6">
                <BuyButton className="w-full sm:w-auto">{ctaText}</BuyButton>
              </div>
              <p className="mt-4 font-bold">{`${SKOOL_MEMBERS} personnes sont déjà dans la communauté Skool gratuite.`}</p>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed">
                Accès immédiat aux modules. Paiement sur Skool.
              </p>
            </div>
          </div>
        </section>

        <section className="wrap py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
            <h2 className="titre">C&apos;est pour toi si…</h2>
            <ul className="divide-y-2 divide-encre/20 border-y-2 border-encre/20">
              {situations.map((s) => (
                <li key={s} className="py-4 text-xl leading-snug font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="gazon border-y-8 border-peinture">
          <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p aria-hidden="true" className="text-xl font-bold">
                Près de
              </p>
              <p aria-hidden="true" className="chiffre mt-3 text-[min(38vw,15rem)] lg:text-[13rem]">
                100K
              </p>
              <h2 className="titre mt-8">{t("Près de 100 000 $ de ventes en un été, avec une business de service")}</h2>
              <p className="mt-5 max-w-lg leading-relaxed">
                C&apos;est mon résultat à moi, pas une promesse. Le tien va dépendre de ton travail, de ton coin et de
                ton service. Ce sont des ventes, avant les dépenses.
              </p>
            </div>
            <figure className="bg-peinture p-5 text-encre">
              <Image src="/thomas.jpg" alt="Thomas, fondateur de Touch Grass Academy" width={520} height={620} sizes="(min-width: 64rem) 32rem, 90vw" className="w-full" />
              <figcaption className="mt-5 leading-loose">
                <p className="text-xl font-bold">
                  Thomas, 18 ans
                </p>
                <p className="mt-2 leading-relaxed">
                  {"Pendant des années, j'ai essayé de faire de l'argent en ligne, sans grand succès. Fait que j'ai décidé de sortir de ce qu'on voit partout et de lancer une business de service bien physique : l'entretien de piscines."}
                </p>
                <p className="mt-3 leading-relaxed">
                  {t("Résultat : près de 100 000 $ de ventes en un seul été. Aujourd'hui, je prends de mon temps pour aider ceux qui veulent lancer leur business de service à leur tour.")}
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="wrap py-16 lg:py-24">
          <h2 className="titre">Les 8 modules, dans l&apos;ordre</h2>
          <ol className="mt-8 grid gap-x-14 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-4">
            {modules.map(([title, text], i) => (
              <li key={title} className="flex gap-5 border-t-2 border-encre/20 py-5">
                <span aria-hidden="true" className="chiffre w-12 shrink-0 pt-1 text-7xl text-gazon">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold">{title}</h3>
                  <p className="mt-1 leading-relaxed">{t(text)}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="titre mt-14">{t("Aussi inclus dans ton 87 $")}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {extras.map(([title, text]) => (
              <li key={title} className="bg-peinture p-5">
                <h3 className="text-xl font-extrabold">{title}</h3>
                <p className="mt-1 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="gazon border-y-8 border-peinture">
          <div className="wrap py-16 lg:py-24">
            <h2 className="titre">Le même programme, au prix Black Friday</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">
              {t("Je le vendais 997 $. C'est exactement le même contenu : rien n'est enlevé.")}
            </p>
            <div className="mt-14">
              <OfferCard />
            </div>
          </div>
        </section>

        <section id="garantie" className="wrap py-16 lg:py-24">
          <div className="border-8 border-gazon-pale bg-encre p-6 text-peinture sm:p-12">
            <h2 className="titre">La garantie</h2>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed font-semibold">
              {t(
                "Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet.",
              )}
            </p>
          </div>
        </section>

        <section className="wrap grid gap-8 pb-16 lg:grid-cols-[1fr_1.6fr] lg:pb-24">
          <h2 className="titre">Tes questions</h2>
          <div className="border-b-2 border-encre/20">
            {faq.map(([q, a]) => (
              <details key={q} className="border-t-2 border-encre/20">
                <summary className="flex items-center justify-between gap-4 py-5 text-lg font-extrabold">
                  {t(q)}
                  <span aria-hidden="true" className="plus text-3xl leading-none text-gazon">
                    +
                  </span>
                </summary>
                <p className="pb-6 leading-relaxed">{t(a)}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="ebook" className="border-t-2 border-encre/20 bg-peinture">
          <div className="wrap grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div>
              <p className="text-lg font-bold">{t("Pas prêt à embarquer ? Prends l'ebook gratuit.")}</p>
              <h2 className="titre mt-3">{t("Les 7 services que tu peux lancer avec moins de 500 $")}</h2>
            </div>
            <EbookForm />
          </div>
        </section>

        <section className="gazon border-t-8 border-peinture">
          <div className="wrap flex flex-col items-center py-16 text-center lg:py-24">
            <h2 className="titre">Lance ta business de service</h2>
            <span
              role="img"
              aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`}
              className="chiffre mt-14 text-[min(46vw,16rem)]"
            >
              {money(PRICE)}
            </span>
            <p className="mt-10 mb-6 text-lg font-semibold">
              Le programme au complet : les 8 modules et les 4 extras.
            </p>
            <BuyButton className="w-full sm:w-auto">{ctaText}</BuyButton>
          </div>
        </section>
      </main>

      <footer className="bg-encre pt-12 pb-40 text-peinture">
        <div className="wrap">
          <p className="max-w-3xl leading-relaxed">
            Les revenus ne sont pas garantis. Les résultats mentionnés sont ceux du fondateur. Les tiens vont dépendre
            de ton travail, de ton coin, de ton service et de la demande.
          </p>
          <nav aria-label="Liens légaux" className="mt-8 flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:flex-wrap">
            {[
              ["/remboursement", "Politique de remboursement"],
              ["/confidentialite", "Politique de confidentialité"],
              ["/conditions", "Conditions"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="underline underline-offset-4">
                {label}
              </a>
            ))}
          </nav>
          <p className="mt-6">
            {t("Contact : ")}
            <Contact />
          </p>
          <p className="mt-8">© 2026 Touch Grass Academy</p>
        </div>
      </footer>

      <StickyBar heroId="hero" />
    </>
  );
}

function OfferCard() {
  return (
    <div className="relative max-w-2xl bg-peinture p-6 text-encre outline-8 outline-cone sm:p-8">
      <p className="absolute -top-6 left-6 bg-cone px-4 py-1.5 font-extrabold">Black Friday</p>
      <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-8">
        <del role="img" aria-label={`Prix d'avant, ${FULL_PRICE} dollars canadiens`} className="barre chiffre text-6xl">
          {money(FULL_PRICE)}
        </del>
        <p role="img" aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`} className="chiffre text-[8.5rem] text-gazon">
          {money(PRICE)}
        </p>
      </div>
      <ul className="mt-8 grid gap-3">
        {included.map((label) => (
          <li key={label} className="flex gap-3 leading-snug">
            <span aria-hidden="true" className="w-5 shrink-0 font-extrabold text-gazon">
              ✓
            </span>
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <BuyButton className="w-full">{ctaText}</BuyButton>
      </div>
    </div>
  );
}
