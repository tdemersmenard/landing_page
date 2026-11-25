import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export const archivo = async () => [
  { name: "Archivo", data: await readFile(path.join(process.cwd(), "assets/archivo-900.woff")), weight: 900 as const },
];

export const couverture = async () =>
  `data:image/png;base64,${(await readFile(path.join(process.cwd(), "assets/ebook-couverture.png"))).toString("base64")}`;
