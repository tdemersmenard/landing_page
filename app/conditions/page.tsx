import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = { title: "Conditions : Touch Grass Academy" };

export default function Conditions() {
  return (
    <LegalPage
      titre="Conditions"
      sections={[
        [
          "Qui vend",
          `[Nom légal de l'entreprise], [NEQ s'il y a lieu], [adresse], [téléphone], ${CONTACT_EMAIL}. Dans cette page, « on » veut dire cette entreprise.`,
        ],
        [
          "Ce que tu achètes",
          "Les 8 modules vidéo préenregistrés, le Kit Copier-Coller (soumission, contrat, facture, flyer, annonce Marketplace), les 25 scripts qui signent, les automatisations IA prêtes à installer et la communauté Skool.",
          "Le programme est préenregistré. Il ne comprend pas d'appels de coaching.",
        ],
        [
          "Le prix et le paiement",
          "Le prix Black Friday est de 87 $ CAD, paiement unique, jusqu'au lundi 30 novembre 2026 à 23 h 59, heure de l'Est. Le paiement se fait sur Skool, qui facture en dollars américains : 60 $ US. Le taux de change et les frais de ta carte peuvent changer le montant final. Taxes : [à confirmer].",
        ],
        [
          "Ton accès",
          "Tu rejoins gratuitement la communauté Skool, puis tu débloques le cours SYSTÈME TDM dans la salle de classe. Ton accès est donné une fois le paiement confirmé. Durée de l'accès : [à confirmer]. Il est personnel : tu ne peux pas le partager, le revendre ni redistribuer le contenu. Les modèles du Kit peuvent être adaptés et utilisés dans ta propre business.",
        ],
        [
          "Les remboursements",
          "Les conditions de la garantie sont dans la politique de remboursement, en bas de la page d'accueil.",
        ],
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
