import Image from "next/image";
import { CheckoutProvider } from "@/components/Checkout";
import { Footer } from "@/components/Footer";
import { Ancrage, BuyButton, Countdown, CTA as cta, DuringOffer, StickyBar } from "@/components/offer";
import { Proofs } from "@/components/Proofs";
import { Vsl } from "@/components/Vsl";
import { BRAND, EBOOK_TITLE, OFFER_END_TEXT, PRICE, SKOOL_MEMBERS } from "@/lib/config";
import { faq, included, modules } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { t } from "@/lib/text";

export const metadata = pageMeta({
  title: `${BRAND} : les 8 modules à ${PRICE} $ (Black Friday)`,
  description: `Lance ta business de service avec ${BRAND} : 8 modules vidéo à ${PRICE} $ CAD jusqu'au ${OFFER_END_TEXT}.`,
  path: "/",
});

const chiffres = [
  ["Près de 100 000 $", "de ventes en un été, avant dépenses (mon résultat)"],
  [SKOOL_MEMBERS, "personnes dans ma communauté Skool gratuite"],
];

const etapes = [
  ["Rejoins le programme", "Tu remplis le formulaire et tu paies sur Skool."],
  ["Accède à tout", "Modules, kit, scripts et automatisations s'ouvrent tout de suite."],
  ["Va chercher ton premier client", "Tu suis les étapes et tu contactes du monde."],
];

const Profil = ({ className = "" }: { className?: string }) => (
  <p className={`flex items-center gap-3 text-left leading-tight ${className}`}>
    <Image
      src="/thomas-visage.jpg"
      alt=""
      width={96}
      height={96}
      className="size-13 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-nuit"
    />
    <span>
      <span className="block font-bold">Thomas</span>
      <span className="text-sm font-semibold text-accent">{t("Plus de 54 000 j'aime sur TikTok")}</span>
    </span>
  </p>
);

const Entete = ({ etiquette, titre, sous }: { etiquette: string; titre: string; sous?: string }) => (
  <div className="text-center">
    <p className="etiquette-verte">{etiquette}</p>
    <h2 className="titre mx-auto mt-4 max-w-3xl">{t(titre)}</h2>
    {sous && <p className="mt-3 text-doux">{t(sous)}</p>}
  </div>
);

const Cta = () => (
  <div className="mt-10 text-center">
    <BuyButton className="w-full sm:w-auto sm:!px-12">{cta}</BuyButton>
  </div>
);

export default function Page() {
  return (
    <CheckoutProvider>
      <div>
        <div className="border-b border-trait bg-[#0f2418] px-4 py-2 text-center text-[0.95rem]">
          <Countdown />
        </div>

        <main>
          <section id="hero" className="keo-haut">
            <div className="wrap pt-8 pb-12 text-center lg:pt-12 lg:pb-16">
              <Profil className="mx-auto w-fit" />
              <DuringOffer>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-trait bg-panneau px-3 py-1 text-xs font-bold">
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                  Black Friday
                  <span className="text-doux">{BRAND}</span>
                </p>
              </DuringOffer>
              <h1 className="large mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.08]">
                {t("Lance ta business de service et signe ton ")}
                premier client en 30 jours
              </h1>
              <p className="mt-3 text-doux">Regarde la vidéo pour voir comment.</p>
              <a href="#garantie" className="etiquette-verte mt-4">
                <span aria-hidden="true">✓</span>
                {"Sinon, t'es remboursé (conditions)"}
              </a>

              <div className="mx-auto mt-8 grid max-w-5xl items-start gap-5 text-left lg:grid-cols-[minmax(0,22rem)_1fr] lg:justify-center lg:gap-6">
                <Vsl />

                <div className="carte p-5 sm:p-7">
                  <h2 className="large text-center text-3xl">{BRAND}</h2>
                  <p className="mt-1 text-center text-[0.95rem] text-doux">
                    Tout ce que ça te prend pour lancer ta business de service
                  </p>
                  <p className="mt-4 text-center">
                    <span className="etiquette-verte">Ce qui est inclus</span>
                  </p>
                  <ul className="mt-4 divide-y divide-trait">
                    {included.map(([id, titre]) => (
                      <li key={id} className="flex items-center justify-between gap-3 py-2.5 text-[0.95rem] leading-snug font-semibold">
                        {titre}
                        <span className="inclus">Inclus</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-trait pt-5">
                    <Ancrage etiquette note taille="text-[min(28vw,7.5rem)]" />
                  </div>
                  <BuyButton className="mt-6 w-full">{cta}</BuyButton>
                </div>
              </div>

              <dl className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:gap-5">
                {chiffres.map(([n, d]) => (
                  <div key={n} className="carte px-3 py-4 text-center sm:px-5">
                    <dt className="large text-xl leading-tight text-accent sm:text-3xl">{t(n)}</dt>
                    <dd className="mt-1 text-xs leading-snug text-doux sm:text-sm">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="section wrap">
            <Entete etiquette="Inclus" titre={`Ce que tu débloques dans ${BRAND}`} sous="Tout s'ouvre dès ton inscription." />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {included.map(([id, titre, texte]) => (
                <li key={id} id={id === "garantie" ? "garantie" : undefined} className="carte overflow-hidden">
                  <Image
                    src={`/inclus/${id}.webp`}
                    alt=""
                    width={900}
                    height={600}
                    sizes="(min-width: 64rem) 23rem, (min-width: 40rem) 45vw, 92vw"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="p-5 sm:p-6">
                    <span className="etiquette-verte !px-2.5 !py-0.5 !text-xs">Inclus</span>
                    <h3 className="sous mt-3 text-lg">{titre}</h3>
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
            <details className="carte mt-5 px-5 sm:px-6">
              <summary className="flex items-center justify-between gap-4 py-4 font-bold">
                Voir les 8 modules
                <span aria-hidden="true" className="plus text-2xl leading-none text-accent">
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

          <section className="section wrap !max-w-2xl">
            <Entete etiquette="Mon histoire" titre="Pourquoi je fais ça" />
            <Profil className="mx-auto mt-8 w-fit" />
            <div className="mt-6 space-y-4 text-doux">
              <p>
                {"J'ai 18 ans. Pendant des années, j'ai essayé de faire de l'argent en ligne, sans grand succès. Fait que j'ai lancé une business bien physique : l'entretien de piscines."}
              </p>
              <p className="text-lg font-bold text-clair">{t("Près de 100 000 $ de ventes en un seul été, avant dépenses.")}</p>
              <p>{"Aujourd'hui, j'aide ceux qui veulent lancer leur business de service à leur tour."}</p>
              <p className="text-sm">{"C'est mon résultat. Le tien dépend de ton travail, de ton coin et de ton service."}</p>
            </div>
            <Cta />
          </section>

          <Proofs />

          <section className="section wrap !max-w-5xl">
            <Entete etiquette="3 étapes simples" titre="Ça se passe en 3 étapes" />
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {etapes.map(([titre, texte], i) => (
                <li key={titre} className="carte p-6">
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-full bg-[#2b7549] font-bold text-white shadow-[0_0_18px_rgb(66_178_112/0.45)]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="sous mt-4 text-lg">{titre}</h3>
                  <p className="mt-1 text-[0.95rem] leading-snug text-doux">{texte}</p>
                </li>
              ))}
            </ol>
            <Cta />
          </section>

          <section className="section wrap text-center">
            <p className="etiquette-verte">À toi de choisir</p>
            <h2 className="large mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] leading-[1.05]">
              {"L'été prochain, t'as un boss ou t'as des clients ?"}
            </h2>
            <Cta />
          </section>

          <section className="section wrap !max-w-3xl">
            <Entete etiquette="Questions" titre="Tes questions" />
            <div className="mt-10 space-y-3">
              {faq.map(([q, a]) => (
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
          </section>

          <section className="wrap pb-[clamp(3rem,6vw,5rem)]">
            <div className="carte mx-auto max-w-xl p-6 text-center sm:p-10">
              <p className="etiquette-verte">Démarrer</p>
              <h2 className="titre mt-4">{`${BRAND}, au complet`}</h2>
              <ul className="mt-6 divide-y divide-trait border-y border-trait text-left">
                {included.map(([id, x]) => (
                  <li key={id} className="flex items-center gap-3 py-3 leading-snug font-semibold">
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

          <p className="wrap pb-14 text-center text-doux">
            {t("Pas prêt ? Prends l'ebook gratuit : ")}
            <a href="/ebook" className="underline underline-offset-4">
              {t(EBOOK_TITLE)}
            </a>
          </p>
        </main>

        <Footer />

        <StickyBar heroId="hero" />
      </div>
    </CheckoutProvider>
  );
}
