import Image from "next/image";
import { EbookForm } from "@/components/EbookForm";
import { Footer } from "@/components/Footer";
import { EBOOK_TITLE } from "@/lib/config";
import { pageMeta } from "@/lib/meta";
import { t } from "@/lib/text";

export const metadata = pageMeta({
  title: `${EBOOK_TITLE} (ebook gratuit)`,
  description: "Le guide gratuit pour choisir ta business de service : équipement, prix à charger et saison pour 7 services.",
  path: "/ebook",
  image: "/ebook/opengraph-image",
});

// Une page = une action : aucun prix, aucun compte à rebours, aucun lien vers la page de vente.
const puces = [
  "L'équipement de départ de chaque service, avec son coût",
  "Combien charger, et dans quelle saison",
  "Un exercice de 10 minutes pour choisir le tien",
];

export default function Ebook() {
  return (
    <>
      <main className="wrap grid !max-w-5xl items-center gap-x-16 gap-y-4 pt-4 pb-14 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="flex items-center gap-4 lg:block">
            <Image
              src="/ebook-couverture.webp"
              alt="Couverture de l'ebook"
              width={306}
              height={396}
              priority
              sizes="(min-width: 64rem) 13rem, 5.5rem"
              className="w-22 shrink-0 rounded-md lg:mb-8 lg:w-52"
            />
            <div>
              <p className="text-sm font-semibold text-accent">Ebook gratuit</p>
              <h1 className="large mt-1 text-[1.45rem] leading-tight lg:text-4xl">{t(EBOOK_TITLE)}</h1>
            </div>
          </div>
          <ul className="mt-3 space-y-0.5 text-[0.95rem] leading-snug lg:mt-6 lg:space-y-2 lg:text-lg">
            {puces.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm leading-snug text-doux lg:mt-6 lg:text-base">
            {t("Par Thomas : près de 100 000 $ de ventes en un été avec l'entretien de piscines (avant dépenses, mon résultat).")}
          </p>
        </div>
        <EbookForm />
      </main>
      <Footer className="pb-16" />
    </>
  );
}
