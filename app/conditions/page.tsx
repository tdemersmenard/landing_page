// Faire valider par un avocat.
import { LegalPage } from "@/components/LegalPage";
import { BRAND, CONTACT_EMAIL, LEGAL, OFFER_END_TEXT, PRICE, SKOOL_COURSE } from "@/lib/config";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: `Conditions : ${BRAND}`,
  description: "Ce que tu achètes, le prix, l'accès et les conditions de vente.",
  path: "/conditions",
});

const vendeur = [
  LEGAL.nom || BRAND,
  LEGAL.neq && (/\d/.test(LEGAL.neq) ? `NEQ ${LEGAL.neq}` : `entreprise ${LEGAL.neq}`),
  LEGAL.adresse,
  LEGAL.telephone,
  CONTACT_EMAIL,
].filter(Boolean);

export default function Conditions() {
  return (
    <LegalPage
      titre="Conditions"
      sections={[
        ["Qui vend", `${vendeur.join(", ")}. Dans cette page, « on » veut dire cette entreprise.`],
        [
          "Ce que tu achètes",
          "Les 8 modules vidéo préenregistrés, le Kit Copier-Coller (soumission, contrat, facture, flyer, annonce Marketplace), les 25 scripts qui signent, les automatisations IA prêtes à installer et la communauté Skool.",
          "Le programme est préenregistré. Il ne comprend pas d'appels de coaching. Le programme avec coaching 1-on-1 est une offre séparée.",
        ],
        [
          "Le prix et le paiement",
          `Le prix Black Friday est de ${PRICE} $ CAD, paiement unique, jusqu'au ${OFFER_END_TEXT}. Le paiement se fait sur ce site, par l'entremise de Stripe, en dollars canadiens. Le total à payer, taxes comprises s'il y a lieu, est affiché avant que tu confirmes.`,
        ],
        [
          "Ton accès",
          `Ton accès au cours ${SKOOL_COURSE}, sur Skool, t'est envoyé par courriel une fois le paiement confirmé. Il est personnel : tu ne peux pas le partager, le revendre ni redistribuer le contenu. Les modèles du Kit peuvent être adaptés et utilisés dans ta propre business.`,
        ],
        ["Les remboursements", "Les conditions de la garantie sont dans la politique de remboursement, dans le pied de page du site."],
        [
          "Les résultats",
          "Les revenus ne sont pas garantis. Les résultats mentionnés sont ceux du fondateur. Les prix et revenus de l'ebook sont des estimations. Les tiens vont dépendre de ton travail, de ton coin, de ton service et de la demande.",
        ],
        [
          "Tes responsabilités",
          "La formation donne de l'information générale. Ce n'est pas un avis juridique, comptable ou fiscal. Tu dois vérifier les permis, les assurances, les taxes et les règles de sécurité qui s'appliquent à ta business. Si tu es mineur, demande à ton parent ou à ton tuteur avant d'acheter.",
        ],
        [
          "La loi qui s'applique",
          "Les lois du Québec s'appliquent. Rien dans ces conditions n'enlève les droits que te donne la Loi sur la protection du consommateur.",
        ],
      ]}
    />
  );
}
