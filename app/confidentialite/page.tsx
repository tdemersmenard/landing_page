import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BRAND, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = { title: `Politique de confidentialité : ${BRAND}` };

export default function Confidentialite() {
  return (
    <LegalPage
      titre="Politique de confidentialité"
      sections={[
        [
          "Qui est responsable",
          `${BRAND} est exploitée par [nom légal de l'entreprise]. La personne responsable de la protection des renseignements personnels est [nom et titre]. Pour la joindre : ${CONTACT_EMAIL}.`,
        ],
        [
          "Ce qu'on recueille",
          [
            "Formulaire d'achat : ton prénom, ton téléphone, ton courriel et ton choix de consentement.",
            "Formulaire de l'ebook : ton prénom, ton courriel et ton choix de consentement.",
            "Avec chaque formulaire : la date, la page, un numéro de référence et, s'il y en a dans le lien, les paramètres de campagne (utm et fbclid).",
          ],
          "Les paramètres de campagne sont gardés dans le stockage de session de ton navigateur (sessionStorage), jusqu'à ce que tu fermes l'onglet. On ne reçoit pas ton numéro de carte : le paiement se fait sur Skool.",
          "Si tu remplis le formulaire d'achat sans payer, on reçoit quand même les renseignements que tu as envoyés.",
        ],
        [
          "Pourquoi",
          [
            "T'envoyer l'ebook que tu as demandé.",
            "Faire le suivi de ton achat et de ta garantie.",
            "Savoir de quelle publication ou publicité viennent les visites et les demandes.",
            "T'envoyer des courriels et des textos promotionnels, seulement si tu as coché la case.",
          ],
        ],
        [
          "Ton consentement",
          "La case est facultative et n'est pas cochée d'avance. Tu peux acheter ou recevoir l'ebook sans la cocher, et te désabonner n'importe quand.",
        ],
        [
          "Avec qui on les partage",
          "On ne vend pas tes renseignements. On utilise ces fournisseurs :",
          [
            "Vercel, pour héberger le site ;",
            "Make, pour traiter les formulaires ;",
            "[outil de courriel et de textos], pour t'écrire ;",
            "Skool, pour le paiement et l'accès à la formation. Skool recueille tes renseignements selon sa propre politique.",
          ],
          "Ces fournisseurs peuvent traiter ou conserver des renseignements à l'extérieur du Québec, entre autres aux États-Unis.",
        ],
        [
          "Combien de temps",
          "On garde tes renseignements [durée de conservation], puis on les détruit ou on les anonymise, sauf si la loi oblige à les garder plus longtemps.",
        ],
        [
          "Tes droits",
          `Tu peux demander d'accéder à tes renseignements, de les corriger, d'en recevoir une copie ou de retirer ton consentement. Écris à ${CONTACT_EMAIL}. Si la réponse ne te convient pas, tu peux t'adresser à la Commission d'accès à l'information du Québec, cai.gouv.qc.ca.`,
        ],
        [
          "Si tu as moins de 14 ans",
          "N'envoie pas tes renseignements sans le consentement de ton parent ou de ton tuteur.",
        ],
      ]}
    />
  );
}
