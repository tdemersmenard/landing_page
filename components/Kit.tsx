/** Illustrations du contenu, dessinées en HTML. Ce ne sont pas des captures : c'est écrit sous la section. */
import { t } from "@/lib/text";

const Trait = ({ w }: { w: string }) => <span className={`block h-2 rounded-full bg-[#cfd8de] ${w}`} />;

export function Soumission() {
  return (
    <div className="mx-auto w-full max-w-64 -rotate-2 rounded-md bg-white p-5 text-[#14202a]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="large text-lg">Soumission</p>
        <span className="size-7 rounded-full bg-[#0f8fb5]" />
      </div>
      <div className="mt-4 space-y-2">
        <Trait w="w-3/4" />
        <Trait w="w-1/2" />
      </div>
      <div className="mt-5 border-t border-[#cfd8de]">
        {["Service", "Fréquence", "Total"].map((x) => (
          <p key={x} className="flex justify-between border-b border-[#cfd8de] py-2 text-sm font-semibold">
            {x} <span className="text-[#6b7a86]">{x === "Total" ? "____ $" : "________"}</span>
          </p>
        ))}
      </div>
      <p className="mt-6 border-t border-[#14202a] pt-1 text-xs">Signature du client</p>
    </div>
  );
}

export function Textos() {
  return (
    <div className="mx-auto w-full max-w-64 space-y-3 text-[0.95rem] leading-snug" aria-hidden="true">
      <p className="mr-8 rounded-2xl rounded-bl-sm bg-[#24313c] px-4 py-3">{"C'est trop cher, je vais y penser."}</p>
      <p className="ml-8 rounded-2xl rounded-br-sm bg-eau px-4 py-3 font-medium text-[#021018]">
        {t("Je comprends. C'est le prix qui te fait hésiter, ou ce qui est inclus ?")}
      </p>
      <p className="mr-8 rounded-2xl rounded-bl-sm bg-[#24313c] px-4 py-3">{"Ben, c'est quoi qui est inclus?"}</p>
      <p className="ml-24 rounded-2xl rounded-br-sm bg-eau/25 px-4 py-3">•••</p>
    </div>
  );
}

export function Automatisation() {
  return (
    <div className="mx-auto w-full max-w-64" aria-hidden="true">
      {["Nouveau client", "Texto de confirmation", "Soumission envoyée", "Rappel la veille"].map((x, i) => (
        <div key={x}>
          {i > 0 && <span className="ml-7 block h-4 w-0.5 bg-eau" />}
          <p className="flex items-center gap-3 rounded-lg border border-trait bg-nuit px-4 py-3 text-[0.95rem] font-semibold">
            <span className="size-3 rounded-full bg-eau" />
            {x}
          </p>
        </div>
      ))}
    </div>
  );
}
