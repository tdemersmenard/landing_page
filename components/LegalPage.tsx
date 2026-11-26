import { t } from "@/lib/text";

/** Texte simple : [crochets] surlignés, espaces insécables. */
function Texte({ children }: { children: string }) {
  return t(children)
    .split(/(\[[^\]]+\])/)
    .map((s, i) =>
      s.startsWith("[") ? (
        <mark key={i} className="placeholder">
          {s}
        </mark>
      ) : (
        s
      ),
    );
}

/** Une section : titre, puis des paragraphes (chaîne) ou des listes (tableau). */
export type Section = [titre: string, ...blocs: (string | string[])[]];

export function LegalPage({ titre, sections }: { titre: string; sections: Section[] }) {
  return (
    <>
      <header className="keo-haut">
        <div className="wrap !max-w-3xl pt-10 pb-8 lg:pt-14">
          <a href="/" className="etiquette-verte">
            ← Retour à la page
          </a>
          <h1 className="titre mt-5">{titre}</h1>
          <p className="mt-3 text-doux">Dernière mise à jour : 24 novembre 2026</p>
        </div>
      </header>
      <main>
        <div className="wrap !max-w-3xl pb-12 lg:pb-16">
        <div className="carte p-5 sm:p-9">
          {sections.map(([h, ...blocs]) => (
            <section key={h} className="mb-9 last:mb-0">
              <h2 className="sous text-xl">
                <Texte>{h}</Texte>
              </h2>
              {blocs.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i} className="mt-3 leading-relaxed">
                    <Texte>{b}</Texte>
                  </p>
                ) : (
                  <ul key={i} className="mt-3 list-disc space-y-2 pl-6 leading-relaxed marker:text-accent">
                    {b.map((x) => (
                      <li key={x}>
                        <Texte>{x}</Texte>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
        </div>
      </main>
    </>
  );
}
