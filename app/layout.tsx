import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Figtree } from "next/font/google";
import { CheckoutProvider } from "@/components/Checkout";
import { t } from "@/lib/text";
import "./globals.css";

// Google a fusionné « Big Shoulders Display » dans la police variable
// « Big Shoulders » : l'axe opsz à 72 correspond à la coupe Display.
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-big-shoulders",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: t("Touch Grass Academy : les 8 modules à 87 $ (Black Friday)"),
  description: t(
    "Lance ta business de service avec les 8 modules vidéo de Touch Grass Academy, à 87 $ CAD jusqu'au 30 novembre 2026. Coaching non inclus.",
  ),
};

export const viewport: Viewport = { themeColor: "#14281B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${display.variable} ${body.variable}`}>
      <body>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
