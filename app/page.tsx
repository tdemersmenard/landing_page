import Image from "next/image";
import { Contact } from "@/components/Contact";
import { EbookForm } from "@/components/EbookForm";
import { BuyButton, Countdown, StickyBar } from "@/components/offer";
import { Mur, Videos } from "@/components/Proofs";
import { BRAND, PRICE, SKOOL_MEMBERS, SKOOL_PRICE_USD } from "@/lib/config";
import { faq, included, modules } from "@/lib/content";
import { preuves } from "@/lib/proofs";
import { money, t } from "@/lib/text";

const cta = `J'embarque à ${money(PRICE)}`;

const chiffres = [
  ["Près de 100 000 $", "de ventes en un été, avant dépenses (mon résultat)"],
  [SKOOL_MEMBERS, "personnes dans ma communauté Skool gratuite"],
];

const etapes = [
  ["Rejoins le programme", "Tu remplis le formulaire et tu paies sur Skool."],
  ["Accède à tout", "Modules, kit, scripts et automatisations s'ouvrent tout de suite."],
  ["Va chercher ton premier client", "Tu suis les étapes et tu contactes du monde."],
];

const Prix = ({ className = "" }: { className?: string }) => (
  <span role="img" aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`} className={`chiffre inline-block text-accent ${className}`}>
    {money(PRICE)}
  </span>
);

const Profil = () => (
  <p className="flex items-center justify-center gap-3 text-left leading-tight">
    <Image src="/thomas-visage.jpg" alt="" width={96} height={96} className="size-13 rounded-full border-2 border-accent" />
    <span>
      <span className="block font-bold">Thomas</span>
      <span className="text-sm font-semibold text-jaune">{t("Plus de 54 000 j'aime sur TikTok")}</span>
    </span>
  </p>
);

const Cta = () => (
  <div className="mt-10 text-center">
    <BuyButton className="w-full sm:w-auto sm:!px-12">{cta}</BuyButton>
  </div>
);

export default function Page() {
  return (
    <>
      <div className="border-b border-trait bg-nuit px-4 py-2 text-center text-[0.95rem]">
        <Countdown />
      </div>

      <main>
        <section id="hero" className="halo">
          <div className="wrap pt-5 pb-12 text-center lg:pt-8">
            <Profil />
            <h1 className="large mx-auto mt-5 max-w-3xl text-[clamp(1.85rem,5vw,3.4rem)] leading-[1.1]">
              {t("Lance ta business de service et signe ton premier client en 30 jours")}
            </h1>
            <a href="#garantie" className="pastille mt-4 bg-jaune text-black">
              {"Sinon, t'es remboursé"}
              <span className="font-medium"> (conditions)</span>
            </a>
            <div className="mt-7">
              <Prix className="text-[min(34vw,10rem)]" />
            </div>
            <BuyButton className="mt-6 w-full sm:w-auto sm:!px-14">{cta}</BuyButton>
            <p className="mt-3 text-sm text-doux">{t(`Un seul paiement. ${PRICE} $ CAD, facturé ${SKOOL_PRICE_USD} par Skool.`)}</p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
              <div className="carte overflow-hidden">
                {preuves.heroVideo ? (
                  <video {...preuves.heroVideo} controls playsInline preload="none" className="aspect-[4/5] h-full w-full object-cover" />
                ) : (
                  <Image
                    src="/thomas.jpg"
                    alt="Thomas, fondateur du programme"
                    width={520}
                    height={620}
                    sizes="(min-width: 64rem) 32rem, 92vw"
                    className="aspect-[4/5] h-full w-full object-cover object-top lg:aspect-auto"
                  />
                )}
              </div>
              <div className="carte flex flex-col justify-center p-6 sm:p-8">
                <h2 className="large text-2xl">{BRAND}</h2>
                <ul className="mt-4 divide-y divide-trait text-left">
                  {included.map(([id, x]) => (
                    <li key={id} className="flex items-center justify-between gap-4 py-3 leading-snug font-medium">
                      {x}
                      <span className="pastille shrink-0 bg-clair !text-xs text-black">Inclus</span>
                    </li>
                  ))}
                </ul>
                <p className="flex items-center justify-between border-t border-trait pt-5 text-lg font-bold">
                  Ton prix <Prix className="text-5xl" />
                </p>
                <BuyButton className="mt-5 w-full">{cta}</BuyButton>
              </div>
            </div>

            <dl className="mx-auto mt-5 grid max-w-5xl grid-cols-2 gap-3 lg:gap-5">
              {chiffres.map(([n, d]) => (
                <div key={n} className="carte p-4 lg:p-6">
                  <dt className="large text-xl leading-tight text-accent lg:text-3xl">{t(n)}</dt>
                  <dd className="mt-1 text-sm leading-snug text-doux">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Videos />

        <section className="section wrap">
          <h2 className="titre text-center">Ce que tu débloques</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {included.map(([id, titre, texte]) => (
              <li key={id} id={id === "garantie" ? "garantie" : undefined} className="carte flex overflow-hidden sm:block">
                <Image
                  src={`/inclus/${id}.webp`}
                  alt=""
                  width={900}
                  height={600}
                  sizes="(min-width: 64rem) 23rem, 45vw"
                  className="w-28 shrink-0 object-cover sm:aspect-[3/2] sm:w-full"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="sous text-lg">{titre}</h3>
                  <p className="mt-1 text-[0.95rem] leading-snug text-doux">{t(texte)}</p>
                  {id === "garantie" && (
                    <a href="/remboursement" className="mt-1 inline-block text-sm underline underline-offset-4">
                      Conditions
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <details className="carte mt-5 px-5">
            <summary className="flex items-center justify-between gap-4 py-4 font-bold text-accent">
              Voir les 8 modules
              <span aria-hidden="true" className="plus text-2xl leading-none">
                +
              </span>
            </summary>
            <ol className="grid gap-x-10 gap-y-4 pb-6 md:grid-cols-2">
              {modules.map(([titre, texte], i) => (
                <li key={titre}>
                  <strong>{`${i + 1}. ${titre}`}</strong>
                  <p className="text-[0.95rem] leading-snug text-doux">{t(texte)}</p>
                </li>
              ))}
            </ol>
          </details>
          <p className="mt-4 text-center text-sm text-doux">{"Images d'ambiance. Préenregistré, sans appels de coaching."}</p>
          <Cta />
        </section>

        <Mur cta={cta} />

        <section className="section wrap !max-w-2xl text-center">
          <Profil />
          <h2 className="titre mt-5">Pourquoi je fais ça</h2>
          <div className="mt-5 space-y-4 text-left">
            <p>
              {"J'ai 18 ans. Pendant des années, j'ai essayé de faire de l'argent en ligne, sans grand succès. Fait que j'ai lancé une business bien physique : l'entretien de piscines."}
            </p>
            <p className="text-lg font-bold">{t("Près de 100 000 $ de ventes en un seul été, avant dépenses.")}</p>
            <p>{"Aujourd'hui, j'aide ceux qui veulent lancer leur business de service à leur tour."}</p>
            <p className="text-sm text-doux">{"C'est mon résultat. Le tien dépend de ton travail, de ton coin et de ton service."}</p>
          </div>
          <Cta />
        </section>

        <section className="section wrap">
          <h2 className="titre text-center">Ça se passe en 3 étapes</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {etapes.map(([titre, texte], i) => (
              <li key={titre} className="carte flex items-center gap-5 p-5 md:block md:p-7">
                <span aria-hidden="true" className="large grid size-12 shrink-0 place-items-center rounded-full bg-accent text-xl text-black">
                  {i + 1}
                </span>
                <div className="md:mt-4">
                  <h3 className="sous text-lg">{titre}</h3>
                  <p className="mt-1 text-[0.95rem] leading-snug text-doux">{texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section wrap !max-w-3xl">
          <h2 className="titre text-center">Tes questions</h2>
          <div className="mt-8 border-b border-trait">
            {faq.map(([q, a]) => (
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
        </section>

        <section className="halo">
          <div className="wrap py-16 text-center lg:py-24">
            <h2 className="titre mx-auto max-w-2xl">{"L'été prochain, t'as un boss ou t'as des clients ?"}</h2>
            <Prix className="mt-8 text-[min(34vw,10rem)]" />
            <Cta />
          </div>
        </section>

        <section id="ebook" className="section wrap grid !max-w-4xl items-center gap-8 lg:grid-cols-2">
          <div className="flex items-center gap-5">
            <Image src="/ebook-couverture.webp" alt="" width={306} height={396} className="w-24 shrink-0 rounded-md sm:w-36" />
            <div>
              <p className="text-sm font-semibold text-jaune">Pas prêt ? Ebook gratuit</p>
              <h2 className="large mt-1 text-xl leading-tight">{t("Les 7 services que tu peux lancer avec moins de 500 $")}</h2>
            </div>
          </div>
          <EbookForm />
        </section>
      </main>

      <footer className="border-t border-trait pt-12 pb-40 text-doux">
        <div className="wrap">
          <p className="max-w-3xl">
            Les revenus ne sont pas garantis. Les résultats mentionnés sont ceux du fondateur. Les tiens vont dépendre de
            ton travail, de ton coin, de ton service et de la demande.
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
          <p className="mt-8">© 2026 {BRAND}</p>
        </div>
      </footer>

      <StickyBar heroId="hero" />
    </>
  );
}
