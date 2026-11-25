import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Tracking } from "@/components/Tracking";
import { BRAND, SITE_URL } from "@/lib/config";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-archivo" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), title: BRAND };

export const viewport: Viewport = { themeColor: "#08140e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        {children}
        <Tracking />
      </body>
    </html>
  );
}
