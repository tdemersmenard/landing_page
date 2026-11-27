// Faire valider par un avocat (entre autres : Loi 25, pixel Meta et correspondance avancée).
import { LegalPage } from "@/components/LegalPage";
import { BRAND, CONTACT_EMAIL, LEGAL } from "@/lib/config";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: `Politique de confidentialité : ${BRAND}`,
  description: "Les renseignements qu'on recueille, pourquoi, avec qui on les partage et combien de temps on les garde.",
  path: "/confidentialite",
});

export default function Confidentialite() {
  return (
    <LegalPage
      titre="Politique de confidentialité"
      sections={[
        [
          "Qui est responsable",
          `${LEGAL.nom ? `${BRAND} est exploité par ${LEGAL.nom}. ` : ""}La personne responsable de la protection des renseignements personnels (Loi 25) est ${LEGAL.responsable}. Pour la joindre : ${CONTACT_EMAIL}.`,
        ],
        [
          "Ce qu'on recueille",
          [
            "Formulaires d'achat et de l'ebook : ton prénom, ton téléphone, ton courriel et ton choix de consentement.",
            "Avec chaque formulaire : la date, la page, un numéro de référence et, s'il y en a dans le lien, les paramètres de campagne (utm et fbclid).",
            "Par le pixel Meta : les pages vues, la demande de l'ebook, le départ vers le paiement, ainsi que des données techniques comme l'adresse IP, le navigateur et les témoins (cookies) de Meta. Si tu as rempli un formulaire, ton courriel et ton téléphone sont aussi transmis à Meta sous forme hachée.",
          ],
          "Tes renseignements et les paramètres de campagne sont gardés dans le stockage de session de ton navigateur (sessionStorage) jusqu'à ce que tu fermes l'onglet, pour ne pas te les redemander. On ne reçoit pas ton numéro de carte : il est traité directement par Stripe.",
          "Si tu remplis le formulaire d'achat sans payer, ou si tu cliques sur le bouton d'achat après avoir demandé l'ebook, on reçoit quand même les renseignements que tu as envoyés.",
        ],
        [
          "Pourquoi",
          [
            "T'envoyer l'ebook que tu as demandé.",
            "Faire le suivi de ton achat et de ta garantie.",
            "Mesurer et améliorer nos publicités, et savoir d'où viennent les visites et les demandes.",
            "T'envoyer des courriels et des textos promotionnels, seulement si tu as coché la case.",
          ],
        ],
        [
          "Ton consentement",
          "La case est facultative et n'est pas cochée d'avance. Tu peux acheter ou recevoir l'ebook sans la cocher, et te désabonner n'importe quand. Tu peux bloquer le pixel Meta avec les réglages de ton navigateur ou un bloqueur, et gérer tes préférences publicitaires dans ton compte Meta.",
        ],
        [
          "Avec qui on les partage",
          "On ne vend pas tes renseignements. Ils sont transmis à ces fournisseurs :",
          [
            "Stripe, pour le paiement. Stripe traite ta carte selon sa propre politique ;",
            "Skool, pour l'accès à la formation et à la communauté. Skool recueille tes renseignements selon sa propre politique ;",
            "Meta, pour mesurer les publicités ;",
            `${LEGAL.outilMessages}, pour traiter les formulaires et t'écrire ;`,
            "Vercel, pour héberger le site.",
          ],
          "Ces fournisseurs peuvent traiter ou conserver des renseignements à l'extérieur du Québec, entre autres aux États-Unis.",
        ],
        [
          "Combien de temps",
          `On garde tes renseignements ${LEGAL.conservation}. Ensuite, on les détruit ou on les anonymise, sauf si la loi oblige à les garder plus longtemps.`,
        ],
        [
          "Tes droits",
          `Tu peux demander d'accéder à tes renseignements, de les corriger, d'en recevoir une copie ou de retirer ton consentement. Écris à ${CONTACT_EMAIL}. Si la réponse ne te convient pas, tu peux t'adresser à la Commission d'accès à l'information du Québec, cai.gouv.qc.ca.`,
        ],
        ["Si tu as moins de 14 ans", "N'envoie pas tes renseignements sans le consentement de ton parent ou de ton tuteur."],
      ]}
    />
  );
}
