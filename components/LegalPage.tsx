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
      <header className="gazon border-b-8 border-peinture">
        <div className="wrap py-10">
          <a href="/" className="font-semibold underline underline-offset-4">
            Retour à la page
          </a>
          <h1 className="titre mt-5">{titre}</h1>
          <p className="mt-3">Dernière mise à jour : 24 novembre 2026</p>
        </div>
      </header>
      <main className="wrap py-12 lg:py-16">
        <div className="max-w-3xl">
          {sections.map(([h, ...blocs]) => (
            <section key={h} className="mb-9">
              <h2 className="text-3xl">
                <Texte>{h}</Texte>
              </h2>
              {blocs.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i} className="mt-3 leading-relaxed">
                    <Texte>{b}</Texte>
                  </p>
                ) : (
                  <ul key={i} className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
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
      </main>
    </>
  );
}
