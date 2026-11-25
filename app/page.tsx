import Image from "next/image";
import { CheckoutProvider } from "@/components/Checkout";
import { EbookForm } from "@/components/EbookForm";
import { Footer } from "@/components/Footer";
import { Ancrage, BuyButton, Countdown, CTA as cta, StickyBar } from "@/components/offer";
import { Mur, Videos } from "@/components/Proofs";
import { BRAND, SKOOL_MEMBERS } from "@/lib/config";
import { faq, included, modules } from "@/lib/content";
import { preuves } from "@/lib/proofs";
import { t } from "@/lib/text";

const chiffres = [
  ["Près de 100 000 $", "de ventes en un été, avant dépenses (mon résultat)"],
  [SKOOL_MEMBERS, "personnes dans ma communauté Skool gratuite"],
];

const etapes = [
  ["Rejoins le programme", "Tu remplis le formulaire et tu paies sur Skool."],
  ["Accède à tout", "Modules, kit, scripts et automatisations s'ouvrent tout de suite."],
  ["Va chercher ton premier client", "Tu suis les étapes et tu contactes du monde."],
];

const Profil = () => (
  <p className="flex items-center gap-3 text-left leading-tight">
    <Image src="/thomas-visage.jpg" alt="" width={96} height={96} className="size-13 rounded-full" />
    <span>
      <span className="block font-bold">Thomas</span>
      <span className="text-sm font-semibold text-accent">{t("Plus de 54 000 j'aime sur TikTok")}</span>
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
    <CheckoutProvider>
      <div className="border-b border-trait bg-nuit px-4 py-2 text-center text-[0.95rem]">
        <Countdown />
      </div>

      <main>
        <section id="hero">
          <div className="wrap grid items-center gap-10 pt-6 pb-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-16">
            <div>
              <Profil />
              <h1 className="large mt-5 text-[clamp(2rem,5vw,3.7rem)] leading-[1.08]">
                {t("Lance ta business de service et signe ton ")}
                premier client en 30 jours
              </h1>
              <p className="mt-3 text-lg font-semibold">
                {"Sinon, t'es remboursé. "}
                <a href="#garantie" className="font-medium underline underline-offset-4">
                  Conditions
                </a>
              </p>
              <div className="mt-5">
                <Ancrage etiquette note taille="text-[min(30vw,9rem)]" />
              </div>
              <BuyButton className="mt-5 w-full">{cta}</BuyButton>
            </div>
            <div className="carte overflow-hidden">
              {preuves.heroVideo ? (
                <video {...preuves.heroVideo} controls playsInline preload="none" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <Image
                  src="/thomas.jpg"
                  alt="Thomas, fondateur du programme"
                  width={520}
                  height={620}
                  sizes="(min-width: 64rem) 30rem, 92vw"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              )}
            </div>
          </div>
        </section>

        <section aria-label="En chiffres" className="border-y border-trait bg-panneau">
          <dl className="wrap grid grid-cols-2 gap-5 py-6 lg:py-8">
            {chiffres.map(([n, d]) => (
              <div key={n}>
                <dt className="large text-2xl leading-tight lg:text-4xl">{t(n)}</dt>
                <dd className="mt-1 text-sm leading-snug text-doux lg:text-base">{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Videos />

        <section className="jour">
          <div className="section wrap">
          <h2 className="titre">Ce que tu débloques</h2>
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
          <p className="mt-4 text-sm text-doux">{"Images d'ambiance. Préenregistré, sans appels de coaching."}</p>
          <Cta />
          </div>
        </section>

        <Mur cta={cta} />

        <section className="section wrap !max-w-3xl">
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
        </section>

        <section className="section wrap">
          <h2 className="titre">Ça se passe en 3 étapes</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {etapes.map(([titre, texte], i) => (
              <li key={titre} className="carte flex items-center gap-5 p-5 md:block md:p-7">
                <span aria-hidden="true" className="large w-9 shrink-0 text-5xl leading-none text-accent">
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

        <section className="wrap pb-[clamp(3rem,6vw,5rem)]">
          <div className="jour mx-auto max-w-2xl rounded-2xl p-6 sm:p-10">
            <h2 className="titre">{`${BRAND}, au complet`}</h2>
            <ul className="mt-5 divide-y divide-trait border-y border-trait">
              {included.map(([id, x]) => (
                <li key={id} className="flex items-center gap-3 py-3 text-lg leading-snug font-semibold">
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Ancrage note taille="text-[min(30vw,9rem)]" />
            </div>
            <BuyButton className="mt-7 w-full">{cta}</BuyButton>
          </div>
        </section>

        <section className="jour">
          <div className="section wrap !max-w-3xl">
          <h2 className="titre">Tes questions</h2>
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
          </div>
        </section>

        <section>
          <div className="wrap py-16 text-center lg:py-24">
            <h2 className="titre mx-auto max-w-2xl">{"L'été prochain, t'as un boss ou t'as des clients ?"}</h2>
            <div className="mt-6">
              <Ancrage note taille="text-[min(30vw,9rem)]" />
            </div>
            <Cta />
          </div>
        </section>

        <section id="ebook" className="section wrap grid !max-w-4xl items-center gap-8 lg:grid-cols-2">
          <div className="flex items-center gap-5">
            <Image src="/ebook-couverture.webp" alt="" width={306} height={396} className="w-24 shrink-0 rounded-md sm:w-36" />
            <div>
              <p className="text-sm font-semibold text-accent">Pas prêt ? Ebook gratuit</p>
              <h2 className="large mt-1 text-xl leading-tight">{t("Les 7 services que tu peux lancer avec moins de 500 $")}</h2>
            </div>
          </div>
          <EbookForm />
        </section>
      </main>

      <Footer />

      <StickyBar heroId="hero" />
    </CheckoutProvider>
  );
}
