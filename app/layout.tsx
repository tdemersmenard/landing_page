import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { CheckoutProvider } from "@/components/Checkout";
import { BRAND, OFFER_END_TEXT, PRICE } from "@/lib/config";
import { t } from "@/lib/text";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-archivo" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: t(`${BRAND} : les 8 modules à ${PRICE} $ (Black Friday)`),
  description: t(
    `Lance ta business de service avec le programme ${BRAND} : 8 modules vidéo à ${PRICE} $ CAD jusqu'au ${OFFER_END_TEXT}.`,
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
