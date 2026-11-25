import type { Metadata } from "next";
import { BRAND } from "@/lib/config";
import { t } from "@/lib/text";

type Page = { title: string; description: string; path: string; image?: string; index?: boolean };

/** Titre, Open Graph et carte Twitter, pareils sur chaque page. */
export function pageMeta({ title, description, path, image = "/opengraph-image", index = true }: Page): Metadata {
  title = t(title);
  description = t(description);
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: BRAND, locale: "fr_CA", type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
    robots: { index, follow: index },
  };
}
