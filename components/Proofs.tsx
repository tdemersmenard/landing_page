import Image from "next/image";
import { proofs } from "@/lib/proofs";

/** Se cache toute seule tant que lib/proofs.ts est vide : jamais de fausse preuve. */
export function Proofs() {
  if (!proofs.length) return null;
  return (
    <section className="section wrap">
      <h2 className="titre">Les preuves</h2>
      <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {proofs.map((p) => (
          <li key={p.src ?? p.texte} className="carte mb-4 break-inside-avoid overflow-hidden">
            {p.src && (
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 64rem) 24rem, 90vw" className="w-full" />
            )}
            <div className="p-5">
              {p.texte && <p>« {p.texte} »</p>}
              <p className="mt-1 text-[0.95rem] text-doux">
                {p.qui}, {p.lien}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
