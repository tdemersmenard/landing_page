import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import preuves from "@/content/preuves.json";

type Preuve = { fichier: string; alt: string; legende: string };

/** Seulement les images présentes dans public/preuves/ ET légendées dans content/preuves.json. */
function liste(): Preuve[] {
  const dir = path.join(process.cwd(), "public", "preuves");
  const images = existsSync(dir) ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)) : [];
  const ok = (preuves as Preuve[]).filter((p) => images.includes(p.fichier) && p.legende);
  for (const f of images) if (!ok.some((p) => p.fichier === f)) console.warn(`[preuves] ${f} n'a pas de légende dans content/preuves.json : pas affichée.`);
  return ok;
}

export function Proofs() {
  const items = liste().slice(0, 6); // 3 à 6 images, pas plus.
  if (!items.length) return null;
  return (
    <section className="section wrap">
      <h2 className="titre text-center">{"C'est pas de la théorie."}</h2>
      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((p) => (
          <li key={p.fichier} className="carte mb-4 break-inside-avoid overflow-hidden">
            <figure>
              {/* Dimensions inconnues d'avance : balise simple, chargée au défilement. */}
              <img src={`/preuves/${encodeURIComponent(p.fichier)}`} alt={p.alt} loading="lazy" decoding="async" className="w-full" />
              <figcaption className="p-4 text-[0.95rem] text-doux">{p.legende}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
