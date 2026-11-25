/** Toutes les valeurs du site. Rien de ça ne s'écrit en dur dans les pages. */

/** Fin de l'offre : lundi 30 novembre 2026, 23 h 59, heure de l'Est (UTC−5). */
export const OFFER_END = "2026-11-30T23:59:00-05:00";
export const OFFER_END_TEXT = "lundi 30 novembre 2026 à 23 h 59, heure de l'Est";

export const BRAND = "Système TDM"; // NOM_MARQUE
export const CONTACT_EMAIL = "academytouchgrass@gmail.com"; // COURRIEL_CONTACT
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://landingpage-gilt-phi.vercel.app";

export const PRICE = 87;
/** Programme avec appels 1-on-1. Doit être un prix réellement demandé. */
export const PRICE_COACHING = 1500; // PRIX_COACHING

/** LIEN_SKOOL_ACHAT. Pour l'instant : la salle de classe (le lien direct vers l'achat est à fournir). */
export const SKOOL_URL = process.env.NEXT_PUBLIC_SKOOL_URL || "https://www.skool.com/tdm-community-1616/classroom";
export const SKOOL_COURSE = "SYSTÈME TDM";
/** Prix affiché sur Skool (toujours en dollars américains). Doit revenir à 87 $ CAD ou moins. */
export const SKOOL_PRICE_USD = "60 $ US";
/** Membres affichés publiquement sur Skool : 133 le 24 novembre 2026. À garder vrai. */
export const SKOOL_MEMBERS = "Plus de 130";

/** Le PDF de l'ebook, dans public/. */
export const EBOOK_PDF = "/ebook-7-services.pdf";
export const EBOOK_TITLE = "Les 7 services que tu peux lancer avec moins de 500 $";

/** Infos légales. Vide = la ligne n'apparaît pas. À remplir avant de lancer les pubs. */
export const LEGAL = {
  nom: "", // NOM_LEGAL
  neq: "", // NEQ
  adresse: "", // ADRESSE
  telephone: "", // TELEPHONE_ENTREPRISE
  responsable: "Thomas, fondateur", // RESPONSABLE_RENSEIGNEMENTS
  outilMessages: "Make et Gmail", // OUTIL_COURRIELS_TEXTOS
  conservation: "3 ans après le dernier contact, ou jusqu'à ta demande de suppression si elle arrive avant", // CONSERVATION_DONNEES
};

export const GARANTIE = {
  debut: "le jour de l'achat",
  preuveModules: "une capture d'écran de ta progression Skool montrant les modules 1 à 5 complétés",
  preuveContacts:
    "un tableau de 100 contacts avec la date, le moyen (porte, message, appel) et le quartier. Pas de nom ni de numéro de client",
  delaiDemande: "14 jours après la fin des 30 jours",
  delaiTraitement: "10 jours ouvrables",
};

/** Crédit appliqué à la main si la personne passe au coaching. */
export const CREDIT_JOURS = 14;
