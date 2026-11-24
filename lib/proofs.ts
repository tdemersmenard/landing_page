/**
 * Vraies preuves seulement, avec permission. Fichiers dans public/preuves/.
 * Tant qu'une liste est vide, sa section n'existe pas en ligne.
 * En local (npm run dev), les emplacements vides sont montrés en jaune.
 * « lien » dit qui parle : "élève" ou "client de ma business de piscines, pas un élève".
 */
export type Video = { src: string; poster: string; qui: string; lien: string };
export type Capture = { src: string; alt: string; width: number; height: number; qui: string; lien: string };
type Preuves = {
  /** Ta vidéo de vente (face caméra). Sinon, ta photo. */
  heroVideo: { src: string; poster: string } | null;
  videos: Video[];
  /** L'histoire d'un élève en deux captures, dans l'ordre. */
  transformation: { qui: string; avant: Capture; apres: Capture } | null;
  captures: Capture[];
};

export const preuves: Preuves = {
  heroVideo: null,
  videos: [],
  transformation: null,
  captures: [],
};

export const APERCU = process.env.NODE_ENV === "development" || process.env.APERCU === "1";
