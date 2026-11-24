import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { CheckoutProvider } from "@/components/Checkout";
import { t } from "@/lib/text";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-archivo" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: t("Système TDM : les 8 modules à 87 $ (Black Friday)"),
  description: t(
    "Lance ta business de service avec le programme Système TDM : 8 modules vidéo à 87 $ CAD jusqu'au 30 novembre 2026.",
  ),
};

export const viewport: Viewport = { themeColor: "#08140e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
