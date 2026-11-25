// Faire valider par un avocat.
import { LegalPage } from "@/components/LegalPage";
import { BRAND, CONTACT_EMAIL, GARANTIE, PRICE, SKOOL_PRICE_USD } from "@/lib/config";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: `Politique de remboursement : ${BRAND}`,
  description: "Les conditions de la garantie et comment demander ton remboursement.",
  path: "/remboursement",
});

export default function Remboursement() {
  return (
    <LegalPage
      titre="Politique de remboursement"
      sections={[
        [
          "La garantie",
          `« Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes ${PRICE} $ au complet. »`,
          `Les 30 jours commencent ${GARANTIE.debut}.`,
        ],
        [
          "Comment demander ton remboursement",
          `Écris à ${CONTACT_EMAIL} avec :`,
          [
            "ton nom et le courriel utilisé pour ton achat ;",
            `${GARANTIE.preuveModules} ;`,
            `${GARANTIE.preuveContacts}.`,
          ],
          `Tu dois envoyer ta demande au plus tard ${GARANTIE.delaiDemande}.`,
        ],
        [
          "Le montant et le délai",
          `Si les conditions sont remplies, tu es remboursé au complet, sur le mode de paiement utilisé pour l'achat. Le paiement passe par Skool, qui facture ${SKOOL_PRICE_USD} : on te rembourse le montant facturé. Le montant en dollars canadiens sur ton relevé peut varier un peu selon le taux de change de ta carte. Délai de traitement : ${GARANTIE.delaiTraitement}.`,
        ],
        [
          "Tes droits",
          "Cette garantie s'ajoute à tes droits. Elle n'enlève rien à ceux que te donne la Loi sur la protection du consommateur du Québec, y compris tes droits d'annulation d'un contrat conclu à distance. Pour les connaître : Office de la protection du consommateur, opc.gouv.qc.ca.",
        ],
      ]}
    />
  );
}
