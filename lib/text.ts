const NB = " ";

/** Espaces insécables : montants, « 23 h 59 », guillemets et ponctuation double. */
export function t(s: string): string {
  return s
    .replace(/(\d) (?=\d{3}(?!\d)|\$)/g, `$1${NB}`)
    .replace(/(\d) h (?=\d)/g, `$1${NB}h${NB}`)
    .replace(/ (?=[?!:;»])/g, NB)
    .replace(/« /g, `«${NB}`);
}

export const money = (n: number) => `${n}${NB}$`;
