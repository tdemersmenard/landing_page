/**
 * Vraies preuves seulement, avec permission. Images dans public/preuves/.
 * « lien » dit qui parle : "élève" ou "client de ma business de piscines, pas un élève".
 */
type Proof = { qui: string; lien: string; texte?: string } & (
  | { src: string; alt: string; width: number; height: number }
  | { src?: undefined; alt?: undefined; width?: undefined; height?: undefined }
);
export const proofs: Proof[] = [];
