import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BRAND, CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = { title: `Politique de remboursement : ${BRAND}` };

export default function Remboursement() {
  return (
    <LegalPage
      titre="Politique de remboursement"
      sections={[
        [
          "La garantie",
          "« Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet. »",
          "Les 30 jours commencent [à confirmer : le jour de ton achat].",
        ],
        [
          "Comment demander ton remboursement",
          `Écris à ${CONTACT_EMAIL} avec :`,
          [
            "ton nom et le courriel utilisé pour ton achat ;",
            "la preuve que t'as fait les modules 1 à 5 : [preuve à accepter] ;",
            "la liste de tes 100 contacts : [preuve à accepter, sans renseignements personnels inutiles].",
          ],
          "Tu dois envoyer ta demande au plus tard [délai à confirmer après les 30 jours].",
        ],
        [
          "Le montant et le délai",
          "Si les conditions sont remplies, tu es remboursé au complet, sur le mode de paiement utilisé pour l'achat. Le paiement passe par Skool en dollars américains : on te rembourse le montant facturé. Le montant en dollars canadiens sur ton relevé peut varier un peu selon le taux de change de ta carte. Délai de traitement : [nombre de jours].",
        ],
        [
          "Tes droits",
          "Cette garantie s'ajoute à tes droits. Elle n'enlève rien à ceux que te donne la Loi sur la protection du consommateur du Québec, y compris tes droits d'annulation d'un contrat conclu à distance. Pour les connaître : Office de la protection du consommateur, opc.gouv.qc.ca.",
        ],
      ]}
    />
  );
}
