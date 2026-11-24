import Image from "next/image";
import { BuyButton } from "@/components/offer";
import { APERCU, type Capture, preuves } from "@/lib/proofs";

const { videos, captures, transformation } = preuves;

/** Emplacement vide, jamais montré en ligne. */
const Vide = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`carte grid place-items-center p-4 text-center ${className}`}>
    <span>
      <span className="placeholder">{children}</span>
    </span>
  </div>
);

const Shot = ({ c }: { c: Capture }) => (
  <figure className="carte overflow-hidden">
    <Image src={c.src} alt={c.alt} width={c.width} height={c.height} sizes="(min-width: 64rem) 24rem, 50vw" className="w-full" />
    <figcaption className="p-3 text-sm text-doux">
      {c.qui}, {c.lien}
    </figcaption>
  </figure>
);

/** Vidéos d'élèves, on glisse sur mobile. */
export function Videos() {
  if (!videos.length && !APERCU) return null;
  return (
    <section className="section wrap text-center">
      <h2 className="titre">Ils partagent leur expérience</h2>
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 lg:justify-center">
        {videos.map((v) => (
          <li key={v.src} className="w-64 shrink-0 snap-center">
            <video src={v.src} poster={v.poster} controls playsInline preload="none" className="aspect-[9/16] w-full rounded-2xl bg-black object-cover" />
            <p className="mt-3 font-bold">{v.qui}</p>
            <p className="text-sm text-doux">{v.lien}</p>
          </li>
        ))}
        {!videos.length &&
          [1, 2, 3].map((i) => (
            <li key={i} className="w-64 shrink-0 snap-center">
              <Vide className="aspect-[9/16]">{`[vidéo élève ${i}]`}</Vide>
            </li>
          ))}
      </ul>
    </section>
  );
}

/** Une transformation, puis le mur de captures. */
export function Mur({ cta }: { cta: string }) {
  const histoire = transformation || APERCU;
  const mur = captures.length > 0 || APERCU;
  if (!histoire && !mur) return null;
  return (
    <section className="section wrap text-center">
      {histoire && (
        <>
          <h2 className="titre">{transformation ? `La transformation de ${transformation.qui}` : "La transformation d'un élève"}</h2>
          <div className="mx-auto mt-8 grid max-w-3xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            {transformation ? <Shot c={transformation.avant} /> : <Vide className="h-64">[message de départ]</Vide>}
            <span aria-hidden="true" className="rotate-90 text-4xl text-accent md:rotate-0">
              →
            </span>
            {transformation ? <Shot c={transformation.apres} /> : <Vide className="h-64">[premier client signé]</Vide>}
          </div>
        </>
      )}
      {mur && (
        <>
          <h2 className={`titre ${histoire ? "mt-16" : ""}`}>{histoire ? "Pis c'est pas le seul résultat" : "Ce qu'ils m'écrivent"}</h2>
          <div className="mt-8 grid grid-cols-2 items-start gap-3 lg:grid-cols-3 lg:gap-5">
            {captures.map((c) => (
              <Shot key={c.src} c={c} />
            ))}
            {!captures.length && [1, 2, 3, 4, 5, 6].map((i) => <Vide key={i} className="h-56">{`[capture ${i}]`}</Vide>)}
          </div>
        </>
      )}
      <BuyButton className="mt-10 w-full sm:w-auto">{cta}</BuyButton>
    </section>
  );
}
