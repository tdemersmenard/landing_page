import { ImageResponse } from "next/og";
import { EBOOK_TITLE } from "@/lib/config";
import { t } from "@/lib/text";
import { archivo, couverture, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `Ebook gratuit : ${EBOOK_TITLE}`;

export default async function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: 70, background: "#08140e", color: "#f6f8f3", fontFamily: "Archivo" }}>
      {/* Image décorative dans l'aperçu : le texte alternatif est `alt` plus haut. */}
      <img src={await couverture()} alt="" width={371} height={480} style={{ borderRadius: 12 }} />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 70, flex: 1, alignItems: "flex-start" }}>
        <div style={{ display: "flex", background: "#fff", color: "#000", padding: "8px 24px", borderRadius: 10, fontSize: 48 }}>Gratuit</div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 56, lineHeight: 1.12 }}>{t(EBOOK_TITLE)}</div>
      </div>
    </div>,
    { ...size, fonts: await archivo() },
  );
}
