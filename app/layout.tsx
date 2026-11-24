import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { CheckoutProvider } from "@/components/Checkout";
import { t } from "@/lib/text";
import "./globals.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: t("Système TDM : les 8 modules à 87 $ (Black Friday)"),
  description: t(
    "Lance ta business de service avec le programme Système TDM : 8 modules vidéo à 87 $ CAD jusqu'au 30 novembre 2026.",
  ),
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
