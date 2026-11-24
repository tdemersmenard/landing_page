import Image from "next/image";
import { Contact } from "@/components/Contact";
import { EbookForm } from "@/components/EbookForm";
import { Automatisation, Soumission, Textos } from "@/components/Kit";
import { BuyButton, Countdown, StickyBar } from "@/components/offer";
import { Proofs } from "@/components/Proofs";
import { BRAND, PRICE, SKOOL_MEMBERS } from "@/lib/config";
import { faq, included, modules, situations } from "@/lib/content";
import { money, t } from "@/lib/text";

const cta = `J'embarque à ${money(PRICE)}`;

const chiffres = [
  ["Près de 100 000 $", "de ventes en un été, avant dépenses. Mon résultat, pas une promesse."],
  [SKOOL_MEMBERS, "personnes dans ma communauté Skool gratuite"],
  ["Plus de 54 000 j'aime", "sur mon TikTok, @tdmlarp"],
];

const etapes = [
  ["Choisis", "Un service qui marche dans ton coin, avec le budget que t'as. Modules 1 à 4."],
  ["Vends", "Tu contactes du monde, tu sais quoi dire, tu signes. Modules 5 et 6."],
  ["Roule", "La paperasse se fait vite, pis tu grossis. Modules 7 et 8."],
];

const Prix = ({ className = "" }: { className?: string }) => (
  <span role="img" aria-label={`Prix Black Friday, ${PRICE} dollars canadiens`} className={`chiffre inline-block ${className}`}>
    {money(PRICE)}
  </span>
);

export default function Page() {
  return (
    <>
      <div className="border-b border-trait bg-nuit px-4 py-2.5 text-center text-[0.95rem]">
        <Countdown />
      </div>

      <main>
        <section id="hero" className="eau eau-hero">
          <div className="wrap pt-5 pb-14 lg:pb-24">
            <p className="large text-lg">{BRAND}</p>
            <div className="mt-8 grid items-end gap-x-16 gap-y-6 lg:mt-20 lg:grid-cols-[1.35fr_1fr]">
              <div>
                <h1 className="large text-[clamp(1.85rem,8vw,4.4rem)] leading-[1.03]">
                  {t("Lance ta business de service et signe ton premier client en 30 jours.")}
                </h1>
                <p className="mt-4 text-lg leading-snug font-semibold lg:text-2xl">
                  {"Sinon, t'es remboursé. "}
                  <a href="#garantie" className="underline decoration-eau decoration-2 underline-offset-4">
                    Voir les conditions
                  </a>
                </p>
              </div>
              <div>
                <Prix className="text-[min(36vw,11rem)] lg:text-[11.5rem]" />
                <p className="mt-4 font-semibold">8 modules vidéo. Un seul paiement.</p>
                <BuyButton className="mt-4 w-full">{cta}</BuyButton>
                <p className="mt-3 text-[0.95rem]">Accès immédiat. Paiement sur Skool, en dollars américains.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="En chiffres" className="border-y border-trait bg-panneau">
          <dl className="wrap grid divide-y divide-trait md:grid-cols-3 md:divide-x md:divide-y-0">
            {chiffres.map(([n, d]) => (
              <div key={n} className="py-6 md:px-8 md:py-9 md:first:pl-0">
                <dt className="large text-2xl leading-tight lg:text-[1.7rem]">{t(n)}</dt>
                <dd className="mt-1 leading-snug text-doux">{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section wrap grid gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 className="titre">{"Tu veux partir de quoi à toi. T'es juste bloqué."}</h2>
          <ul className="space-y-5">
            {situations.map((s) => (
              <li key={s} className="flex gap-4 text-xl leading-snug">
                <span aria-hidden="true" className="mt-1 h-6 w-1 shrink-0 bg-eau" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-trait bg-panneau">
          <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
            <Image
              src="/thomas.jpg"
              alt={`Thomas, fondateur de ${BRAND}`}
              width={520}
              height={620}
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="h-[26rem] w-full object-cover object-top lg:h-full lg:max-h-[46rem]"
            />
            <div className="px-5 py-14 lg:px-20 lg:py-24">
              <h2 className="titre">{"Moi, c'est Thomas. J'ai 18 ans pis je nettoie des piscines."}</h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg">
                <p>
                  {"Pendant des années, j'ai essayé de faire de l'argent en ligne, sans grand succès. Fait que j'ai décidé de sortir de ce qu'on voit partout et de lancer une business de service bien physique : l'entretien de piscines."}
                </p>
                <p className="font-bold">{t("Résultat : près de 100 000 $ de ventes en un seul été.")}</p>
                <p>{"Aujourd'hui, je prends de mon temps pour aider ceux qui veulent lancer leur business de service à leur tour."}</p>
                <p className="text-[0.95rem] text-doux">
                  {"Ce sont des ventes, avant les dépenses. C'est mon résultat à moi. Le tien va dépendre de ton travail, de ton coin et de ton service."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Proofs />

        <section className="section wrap">
          <h2 className="titre">Comment ça marche</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {etapes.map(([titre, texte], i) => (
              <li key={titre} className="carte p-6 lg:p-8">
                <span aria-hidden="true" className="chiffre text-5xl text-eau">
                  {i + 1}
                </span>
                <h3 className="large mt-5 text-2xl">{titre}</h3>
                <p className="mt-2 text-doux">{texte}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pb-[clamp(4.5rem,10vw,8rem)]">
          <div className="wrap">
            <h2 className="titre">{"Les 8 modules. Du peu profond jusqu'au creux."}</h2>
            <p className="mt-4 max-w-xl text-lg text-doux">
              Tu commences où t&apos;as pied, pis tu descends une étape à la fois.
            </p>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map(([titre, texte], i) => (
                <li key={titre} className="carte flex overflow-hidden sm:block">
                  <div
                    aria-hidden="true"
                    className="eau grid w-24 shrink-0 place-items-center sm:h-40 sm:w-auto"
                    style={{ "--eau-lumiere": 1.9 - i * 0.2 } as React.CSSProperties}
                  >
                    <span className="chiffre text-6xl sm:text-8xl">{i + 1}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="large text-lg leading-tight">{titre}</h3>
                    <p className="mt-2 text-[0.95rem] leading-snug text-doux">{t(texte)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <BuyButton className="w-full sm:w-auto">{cta}</BuyButton>
            </div>
          </div>
        </section>

        <section className="border-y border-trait bg-panneau">
          <div className="section wrap">
            <h2 className="titre">{"Pas juste des vidéos. Des outils prêts à servir."}</h2>
            <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-8">
              {[
                ["Le Kit Copier-Coller", "Soumission, contrat, facture, flyer et annonce Marketplace.", <Soumission key="s" />],
                ["Les 25 scripts qui signent", "Quoi dire à la porte, au téléphone et par texto.", <Textos key="t" />],
                ["Les automatisations IA", "Prêtes à installer, pour perdre moins de temps.", <Automatisation key="a" />],
              ].map(([titre, texte, visuel]) => (
                <div key={titre as string} className="flex flex-col">
                  <div className="grid h-84 place-items-center rounded-[14px] bg-nuit p-6">{visuel}</div>
                  <h3 className="large mt-6 text-xl">{titre}</h3>
                  <p className="mt-1 text-doux">{texte}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[0.95rem] text-doux">Images à titre d&apos;exemple.</p>
          </div>
        </section>

        <section id="offre" className="section wrap grid items-start gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-[18px] border-2 border-eau bg-panneau p-6 sm:p-10">
            <h2 className="titre">Tout ce que t&apos;as</h2>
            <ul className="mt-6 divide-y divide-trait border-y border-trait">
              {included.map((x) => (
                <li key={x} className="flex justify-between gap-4 py-3.5 text-lg leading-snug font-semibold">
                  {x}
                  <span className="shrink-0 text-eau">Inclus</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.95rem] text-doux">Préenregistré. Pas d&apos;appels de coaching.</p>
            <Prix className="mt-9 text-[min(31vw,11rem)]" />
            <p className="mt-5 font-semibold">{t("Prix Black Friday, jusqu'au lundi 30 novembre, 23 h 59.")}</p>
            <BuyButton className="mt-5 w-full">{cta}</BuyButton>
          </div>

          <div id="garantie" className="carte p-6 sm:p-10">
            <h2 className="titre">{"Pas de client ? Je te rembourse."}</h2>
            <p className="mt-5 text-lg">
              {t(
                "« Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet. »",
              )}
            </p>
            <ol className="mt-6 space-y-4">
              {["Fais les modules 1 à 5.", "Contacte au moins 100 clients potentiels en 30 jours.", "Toujours pas de premier client ? Tu récupères ton 87 $."].map((x, i) => (
                <li key={x} className="flex gap-4 leading-snug font-semibold">
                  <span aria-hidden="true" className="chiffre w-6 shrink-0 text-2xl text-eau">
                    {i + 1}
                  </span>
                  {t(x)}
                </li>
              ))}
            </ol>
            <a href="/remboursement" className="mt-6 inline-block underline underline-offset-4">
              Lire la politique de remboursement
            </a>
          </div>
        </section>

        <section className="wrap grid gap-10 pb-[clamp(4.5rem,10vw,8rem)] lg:grid-cols-[1fr_1.7fr]">
          <h2 className="titre">Tes questions</h2>
          <div className="border-b border-trait">
            {faq.map(([q, a]) => (
              <details key={q} className="border-t border-trait">
                <summary className="flex items-center justify-between gap-4 py-5 text-lg font-bold">
                  {t(q)}
                  <span aria-hidden="true" className="plus text-3xl leading-none text-eau">
                    +
                  </span>
                </summary>
                <p className="pb-6 text-doux">{t(a)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="eau border-y border-trait">
          <div className="wrap py-20 text-center lg:py-28">
            <h2 className="titre mx-auto max-w-3xl">{"L'été prochain, t'as un boss ou t'as des clients ?"}</h2>
            <Prix className="mt-10 text-[min(36vw,14rem)]" />
            <div className="mt-9">
              <BuyButton className="w-full sm:w-auto">{cta}</BuyButton>
            </div>
          </div>
        </section>

        <section id="ebook" className="section wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex items-center gap-6">
            <Image src="/ebook-couverture.webp" alt="" width={306} height={396} className="w-28 shrink-0 rounded-md sm:w-44" />
            <div>
              <p className="font-semibold text-doux">{t("Pas prêt ? Prends l'ebook gratuit.")}</p>
              <h2 className="large mt-2 text-2xl leading-tight lg:text-3xl">
                {t("Les 7 services que tu peux lancer avec moins de 500 $")}
              </h2>
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
