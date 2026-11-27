// npm run ebook:build : content/ebook.md + scripts/ebook-template.html -> public/ebook-7-services.pdf
// Utilise Chrome (ou Edge) déjà installé sur l'ordi : aucun navigateur à télécharger.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (...p) => path.join(root, ...p);
const OUT = file("public", "ebook-7-services.pdf");
const BUDGET = 500;
const NB = " ";

try {
  process.loadEnvFile(file(".env.local"));
} catch {} // Pas de .env.local : le lien sort en placeholder.
// Même repli que lib/config.ts : sans NEXT_PUBLIC_SITE_URL, on pointe vers le domaine Vercel.
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://landingpage-gilt-phi.vercel.app").trim().replace(/\/+$/, "");
// Appel « Plan de match » gratuit (même lien que PLAN_DE_MATCH_URL dans lib/config.ts).
const CALENDLY = "https://calendly.com/tdemersmenard-agencetdm/coaching";

const md = fs.readFileSync(file("content", "ebook.md"), "utf8").replace(/\r\n/g, "\n");

// ---------- Données ----------
/** "[45]" -> { v: 45, est: true } */
function num(cell, where) {
  const m = /^(\[)?\s*(\d+(?:[.,]\d+)?)\s*\$?\s*(\])?$/.exec(cell);
  if (!m || !!m[1] !== !!m[3]) throw new Error(`Chiffre illisible « ${cell} » (${where})`);
  return { v: Number(m[2].replace(",", ".")), est: !!m[1] };
}
function rows(name) {
  const block = md.split(`<!-- donnees: ${name} -->`)[1]?.split("<!--")[0];
  if (!block) throw new Error(`Tableau « ${name} » introuvable dans content/ebook.md`);
  const lines = block.split("\n").filter((l) => l.trim().startsWith("|"));
  return lines.slice(2).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
}
const fmt = (n) => n.toLocaleString("fr-CA").replace(/\s/g, NB);
const wrap = (s, est) => (est ? `<mark>[${s}]</mark>` : s);
const money = (x) => wrap(`${fmt(x.v)}${NB}$`, x.est);
const range = (a, b) =>
  a.v === b.v ? money(a) : wrap(`${fmt(a.v)}${NB}$ à ${fmt(b.v)}${NB}$`, a.est || b.est);
const times = (a, b) => ({ v: a.v * b.v, est: a.est || b.est });

const equip = rows("equipement").map(([id, nom, cout]) => ({ id, nom, cout: num(cout, nom) }));
const services = rows("prix").map(([id, nom, min, max, unite, contrats, saison, difficulte]) => {
  const s = { id, nom, unite, saison, difficulte };
  s.min = num(min, nom);
  s.max = num(max, nom);
  s.contrats = num(contrats, nom);
  s.equip = equip.filter((e) => e.id === id);
  if (!s.equip.length) throw new Error(`Aucun équipement pour « ${id} »`);
  s.total = { v: s.equip.reduce((t, e) => t + e.cout.v, 0), est: s.equip.some((e) => e.cout.est) };
  s.revMin = times(s.min, s.contrats);
  s.revMax = times(s.max, s.contrats);
  if (s.total.v >= BUDGET) throw new Error(`${nom} : ${s.total.v} $ d'équipement, au-dessus du plafond de départ de ${BUDGET} $`);
  return s;
});
for (const e of equip) if (!services.some((s) => s.id === e.id)) throw new Error(`Équipement « ${e.nom} » : id « ${e.id} » inconnu`);
const aValider =
  services.flatMap((s) => [s.min, s.max, s.contrats]).filter((x) => x.est).length + equip.filter((e) => e.cout.est).length;

// ---------- Blocs ----------
const table = (head, body) =>
  `<table><thead><tr>${head.map((h) => (h.startsWith(">") ? `<th class="num">${h.slice(1)}</th>` : `<th>${h}</th>`)).join("")}</tr></thead><tbody>${body.join("")}</tbody></table>`;
const tr = (cells, cls = "") =>
  `<tr class="${cls}">${cells.map((c) => (c.startsWith(">") ? `<td class="num">${c.slice(1)}</td>` : `<td>${c}</td>`)).join("")}</tr>`;
const contrats = (s) => wrap(fmt(s.contrats.v), s.contrats.est);

const fiche = (s) => `<dl class="fiche">
<div><dt>Prix à charger</dt><dd><b>${range(s.min, s.max)}</b>${s.unite}</dd></div>
<div><dt>Revenu possible par semaine</dt><dd><b>${range(s.revMin, s.revMax)}</b>avec ${contrats(s)} contrats, avant dépenses</dd></div>
<div><dt>Saison</dt><dd>${s.saison}</dd></div>
<div><dt>Difficulté</dt><dd>${s.difficulte}</dd></div></dl>`;
const equipement = (s) =>
  `<h2>Ton équipement de départ</h2><table><tbody>${s.equip.map((e) => tr([e.nom, `>${money(e.cout)}`])).join("")}${tr(["Total", `>${money(s.total)}`], "total")}</tbody></table>`;
const comparaison = () =>
  table(
    ["Service", ">Départ", ">Prix", ">Revenu possible par semaine", "Saison", "Difficulté"],
    services.map((s) =>
      tr([s.nom, `>${money(s.total)}`, `>${range(s.min, s.max)}<br>${s.unite}`, `>${range(s.revMin, s.revMax)}`, s.saison, s.difficulte]),
    ),
  );
const recapPrix = () =>
  table(
    ["Service", ">Prix min", ">Prix max", "Unité", ">Contrats/sem.", ">Revenu/sem.", "Saison", "Difficulté"],
    services.map((s) =>
      tr([s.nom, `>${money(s.min)}`, `>${money(s.max)}`, s.unite, `>${contrats(s)}`, `>${range(s.revMin, s.revMax)}`, s.saison, s.difficulte]),
    ),
  );
const recapEquipement = () =>
  table(
    ["Service", "Équipement", ">Coût"],
    services.flatMap((s) => [
      ...s.equip.map((e, i) => tr([i ? "" : `<b>${s.nom}</b>`, e.nom, `>${money(e.cout)}`])),
      tr(["", "Total", `>${money(s.total)}`], "total"),
    ]),
  );
// Les utm permettent de voir dans Make quelles ventes viennent de l'ebook.
const lien = site && `${site}/?utm_source=ebook&utm_medium=pdf&utm_campaign=7-services`;
const amp = (u) => u.replace(/&/g, "&amp;");
// CTA principal : réserver l'appel Plan de match gratuit. En dessous, plus petit : commencer seul avec les 8 modules.
const bouton = () => {
  const appel = `<a class="bouton" href="${amp(CALENDLY)}">Réserve ton appel Plan de match gratuit (20${NB}min)</a><p class="adresse">${CALENDLY.replace(/^https?:\/\//, "")}</p>`;
  const modules = site
    ? `<p class="aussi"><a href="${amp(lien)}">Ou commence seul avec les 8 modules</a></p>`
    : `<p class="aussi"><mark>[NEXT_PUBLIC_SITE_URL : le lien de ta page]</mark></p>`;
  return appel + modules;
};

// ---------- Pages ----------
/** Espaces insécables, comme lib/text.ts. */
const t = (s) =>
  s
    .replace(/(\d) (?=\d{3}(?!\d)|\$)/g, `$1${NB}`)
    .replace(/(\d) h (?=\d)/g, `$1${NB}h${NB}`)
    .replace(/ (?=[?!:;»])/g, NB)
    .replace(/« /g, `«${NB}`);
let textPlaceholders = 0;
const marks = (s) =>
  s.replace(/\[([^\]\n]+)\](?!\()/g, (_, x) => {
    textPlaceholders++;
    return `<mark>[${x}]</mark>`;
  });

const seen = new Set();
let pages = md
  .split("<!-- donnees:")[0]
  .split(/<!-- page: /)
  .slice(1)
  .map((chunk) => {
    const [, kind, id] = /^([\w-]+)(?: ([\w-]+))? -->/.exec(chunk);
    return { kind, id, body: chunk.slice(chunk.indexOf("-->") + 3) };
  });
if (!aValider) pages = pages.filter((p) => p.kind !== "valider");

let rang = 0;
const html = pages
  .map(({ kind, id, body }, i) => {
    const s = kind === "service" ? services.find((x) => x.id === id) : undefined;
    if (kind === "service" && !s) throw new Error(`Service inconnu : ${id}`);
    if (s) seen.add(s.id);
    const blocs = {
      n: () => String(services.length),
      fiche: () => fiche(s),
      equipement: () => equipement(s),
      comparaison,
      bouton,
      recap_prix: recapPrix,
      recap_equipement: recapEquipement,
      prix: () => `<span class="prix chiffre">87${NB}$</span>`,
    };
    // Le texte d'abord (marques + espaces), les blocs déjà formatés ensuite.
    let out = marked.parse(t(marks(body)));
    out = out.replace(/<p>(\{\{\w+\}\})<\/p>|(\{\{\w+\}\})/g, (_, a, b) => {
      const name = (a ?? b).slice(2, -2);
      if (!blocs[name]) throw new Error(`Bloc inconnu {{${name}}}`);
      return blocs[name]();
    });
    if (s) out = out.replace(/<h1>(.*?)<\/h1>/, `<header class="gazon"><span class="chiffre">${++rang}</span><h1>$1</h1></header>`);
    if (kind === "couverture")
      out = `<p class="cadeau">Ebook gratuit</p><span class="sept chiffre" aria-hidden="true">${services.length}</span>${out}<p class="marque">Système TDM</p>`;
    const gazon = ["couverture", "pivot", "offre"].includes(kind);
    const pied = kind === "couverture" || kind === "offre" ? "" : `<div class="pied"><span>Système TDM</span><span>${i + 1}</span></div>`;
    return `<section class="page ${kind} ${gazon ? "gazon" : ""}">${out}${pied}</section>`;
  })
  .join("\n");
for (const s of services) if (!seen.has(s.id)) throw new Error(`Aucune page pour « ${s.id} »`);

const font = (p) => `data:font/woff2;base64,${fs.readFileSync(file("node_modules", "@fontsource-variable", p)).toString("base64")}`;
const doc = fs
  .readFileSync(file("scripts", "ebook-template.html"), "utf8")
  .replace("%FONT_TITRE%", () => font("../@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2"))
  .replace("%FONT_TEXTE%", () => font("inter/files/inter-latin-wght-normal.woff2"))
  .replace("%PAGES%", () => html);

// ---------- PDF ----------
async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error("Chrome ou Edge doit être installé pour générer le PDF.");
}
const browser = await launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  await page.setContent(doc);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].map((f) => `${f.family} ${f.status}`);
  });
  if (fonts.some((f) => !f.endsWith("loaded"))) throw new Error(`Polices non chargées : ${fonts}`);

  // Rien ne doit dépasser de la page ni toucher au pied de page.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll(".page")].flatMap((p, i) => {
      const r = p.getBoundingClientRect();
      const pied = p.querySelector(".pied, .marque");
      const limite = pied ? pied.getBoundingClientRect().top - 8 : r.bottom - 30;
      const bad = [...p.querySelectorAll("*")].filter((e) => {
        if (e === pied || pied?.contains(e)) return false;
        const b = e.getBoundingClientRect();
        return b.bottom > limite || b.right > r.right + 1;
      });
      return bad.length ? [`page ${i + 1} (${bad[0].tagName}, ${Math.round(bad[0].getBoundingClientRect().bottom - limite)} px)`] : [];
    }),
  );
  if (overflow.length) throw new Error(`Contenu trop long : ${overflow.join(", ")}`);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await page.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
} finally {
  await browser.close();
}

console.log(`OK : public/ebook-7-services.pdf (${pages.length} pages, ${Math.round(fs.statSync(OUT).size / 1024)} Ko)`);
if (aValider) console.warn(`À VALIDER : ${aValider} chiffres entre crochets dans les tableaux.`);
if (textPlaceholders) console.warn(`À REMPLIR : ${textPlaceholders} placeholders entre crochets dans le texte.`);
if (!site) console.warn("À REMPLIR : NEXT_PUBLIC_SITE_URL est vide, le bouton de l'offre n'a pas de lien.");
else if (/localhost|127\.0\.0\.1/.test(site)) console.warn(`ATTENTION : le lien pointe vers ${site}. Mets ton vrai domaine avant d'envoyer l'ebook.`);
