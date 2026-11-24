import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { errorText } from "@/lib/make";
import { getStripe } from "@/lib/stripe";
import { t } from "@/lib/text";

export const metadata: Metadata = {
  title: "Merci : Touch Grass Academy",
  description: "Confirmation de ton achat.",
  robots: { index: false, follow: false },
  referrer: "no-referrer", // L'identifiant de session est dans l'URL.
};

type Resultat = { etat: "paye" | "en_traitement"; prenom: string } | { etat: "invalide" };

async function verifier(id: unknown): Promise<Resultat> {
  if (typeof id !== "string" || !/^cs_[A-Za-z0-9_]{1,250}$/.test(id)) return { etat: "invalide" };
  try {
    const s = await getStripe().checkout.sessions.retrieve(id);
    if (s.status !== "complete" || !s.metadata?.reference) return { etat: "invalide" };
    return { etat: s.payment_status === "unpaid" ? "en_traitement" : "paye", prenom: s.metadata.prenom ?? "" };
  } catch (e) {
    console.error(`[merci] session non vérifiée ${errorText(e)}`);
    return { etat: "invalide" };
  }
}

export default async function Merci({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const r = await verifier((await searchParams).session_id);

  return (
    <main className="gazon grid min-h-dvh items-center">
      <div className="wrap py-12 lg:py-20">
        <div className="mx-auto max-w-3xl bg-peinture p-6 text-encre sm:p-12">
          {r.etat === "paye" && <Bienvenue prenom={r.prenom} />}
          {r.etat === "en_traitement" && (
            <>
              <h1 className="titre">Merci, {r.prenom}. Ton paiement est en traitement.</h1>
              <p className="mt-5 text-lg leading-relaxed">
                Dès qu&apos;il est confirmé, tu reçois ton accès par courriel. Une question ? Écris-nous à <Contact />.
              </p>
            </>
          )}
          {r.etat === "invalide" && (
            <>
              <h1 className="titre">{t("On n'arrive pas à confirmer ton achat.")}</h1>
              <p className="mt-5 text-lg leading-relaxed">
                Si t&apos;as payé, inquiète-toi pas : écris-nous à <Contact /> avec le courriel de ton achat, et on
                vérifie ça. Si t&apos;as pas payé, rien n&apos;a été facturé.
              </p>
              <a href="/" className="btn mt-8">
                Retour à la page
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Bienvenue({ prenom }: { prenom: string }) {
  return (
    <>
      <h1 className="titre">Bienvenue dans Touch Grass Academy, {prenom}.</h1>
      <p className="mt-5 text-lg font-semibold">Ton paiement est confirmé. Voici les prochaines étapes.</p>
      <ol className="mt-8">
        <Etape n={1} titre="Regarde tes courriels">
          <p>Ton accès arrive dans les prochaines minutes. Vérifie aussi tes indésirables et l&apos;onglet Promotions.</p>
        </Etape>
        <Etape n={2} titre="Rejoins le Discord">
          <Lien href={process.env.DISCORD_INVITE_URL} manque="[DISCORD_INVITE_URL]">
            Rejoindre le Discord
          </Lien>
        </Etape>
        <Etape n={3} titre="Commence le module 1">
          <Lien href={process.env.COURSE_URL} manque="[COURSE_URL]">
            Commencer le module 1
          </Lien>
        </Etape>
      </ol>
      <p className="border-t-2 border-encre/20 pt-5">
        {t("Un problème ? Écris-nous à ")}
        <Contact />.
      </p>
    </>
  );
}

function Etape({ n, titre, children }: { n: number; titre: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-5 border-t-2 border-encre/20 py-5">
      <span aria-hidden="true" className="chiffre w-12 shrink-0 pt-1 text-7xl text-gazon">
        {n}
      </span>
      <div>
        <h2 className="mb-2 text-3xl">{titre}</h2>
        {children}
      </div>
    </li>
  );
}

function Lien({ href, manque, children }: { href?: string; manque: string; children: string }) {
  if (!href) return <mark className="placeholder">{manque}</mark>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn">
      {children}
    </a>
  );
}
