import { Footer } from "@/components/Footer";
import { Purchase } from "@/components/Purchase";
import { BRAND, PLAN_DE_MATCH_URL } from "@/lib/config";
import { pageMeta } from "@/lib/meta";
import { type PaymentIntent, stripeApi } from "@/lib/stripe";
import { t } from "@/lib/text";

export const metadata = pageMeta({
  title: `Bienvenue dans ${BRAND}`,
  description: "Ton accès est en route.",
  path: "/merci-achat",
  index: false,
});

type Params = Promise<Record<string, string | string[] | undefined>>;

/** Le PaymentIntent de l'URL, seulement si le client_secret correspond (personne ne devine un paiement). */
async function paiement(params: Awaited<Params>): Promise<PaymentIntent | null> {
  const id = params.payment_intent;
  const secret = params.payment_intent_client_secret;
  if (typeof id !== "string" || typeof secret !== "string" || !/^pi_[A-Za-z0-9]+$/.test(id)) return null;
  try {
    const pi = await stripeApi<PaymentIntent>(`payment_intents/${id}`);
    return pi.client_secret === secret ? pi : null;
  } catch {
    return null;
  }
}

export default async function MerciAchat({ searchParams }: { searchParams: Params }) {
  const pi = await paiement(await searchParams);
  const reussi = pi?.status === "succeeded" || pi?.status === "processing";
  const prenom = pi?.metadata.prenom;

  return (
    <>
      <main className="keo-haut">
        <div className="wrap !max-w-2xl py-16 text-center lg:py-24">
          {reussi ? (
            <>
              <p className="etiquette-verte">✓ Paiement reçu</p>
              <h1 className="titre mt-5">{t(prenom ? `Bienvenue dans ${BRAND}, ${prenom} !` : `Bienvenue dans ${BRAND} !`)}</h1>
              <p className="mt-4 text-lg text-doux">{t("Regarde tes courriels : ton accès est en route.")}</p>
              <div className="carte mt-10 p-6 sm:p-8">
                <p className="sous text-lg">Prochaine étape</p>
                <a href={PLAN_DE_MATCH_URL} className="btn mt-5 w-full">
                  Réserve ton appel Plan de match gratuit de 20 min
                </a>
              </div>
              {pi?.status === "succeeded" && <Purchase id={pi.id} />}
            </>
          ) : (
            <>
              <h1 className="titre">{"On trouve pas ton paiement"}</h1>
              <p className="mt-4 text-lg text-doux">
                {t("S'il n'a pas passé, aucun montant n'a été prélevé. Tu peux réessayer.")}
              </p>
              <a href="/paiement" className="btn mt-8">
                Retour au paiement
              </a>
            </>
          )}
        </div>
      </main>
      <Footer className="pb-16" />
    </>
  );
}
