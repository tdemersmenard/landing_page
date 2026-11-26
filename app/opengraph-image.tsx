import { ImageResponse } from "next/og";
import { BRAND, OFFER_END, PRICE, PRICE_COACHING_TXT } from "@/lib/config";
import { archivo, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${BRAND} : les 8 modules à ${PRICE} $`;
export const revalidate = 3600; // L'étiquette Black Friday part après la fin de l'offre.

export default async function Image() {
  const offre = Date.now() < new Date(OFFER_END).getTime();
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 70, backgroundColor: "#090d0b", backgroundImage: "radial-gradient(circle at 50% 0%, #1f5a37, #090d0b 70%)", color: "#f6f8f3", fontFamily: "Archivo" }}>
      <div style={{ display: "flex", gap: 28, alignItems: "center", fontSize: 44 }}>
        {offre && <div style={{ display: "flex", background: "#fff", color: "#000", padding: "8px 24px", borderRadius: 10 }}>BLACK FRIDAY</div>}
        <div style={{ display: "flex" }}>{BRAND}</div>
      </div>
      {offre && (
        <div style={{ display: "flex", marginTop: 44, fontSize: 40, color: "#a2b0a7" }}>
          <div style={{ display: "flex", marginRight: 16 }}>Le programme avec coaching 1-on-1 :</div>
          <div style={{ display: "flex", textDecoration: "line-through" }}>{PRICE_COACHING_TXT}</div>
        </div>
      )}
      <div style={{ display: "flex", marginTop: 12, fontSize: 44 }}>{offre ? "Les 8 modules seuls :" : "Lance ta business de service."}</div>
      {offre && <div style={{ display: "flex", fontSize: 270, lineHeight: 1, letterSpacing: -8 }}>{`${PRICE} $`}</div>}
    </div>,
    { ...size, fonts: await archivo() },
  );
}
