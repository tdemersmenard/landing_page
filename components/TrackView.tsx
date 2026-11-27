"use client";

import { useEffect, useRef } from "react";
import { trackView } from "@/lib/pixel";

/** ViewContent, une seule fois au chargement de la page (accueil et /ebook/merci). */
export function TrackView() {
  const envoye = useRef(false);
  useEffect(() => {
    if (envoye.current) return; // StrictMode rejoue les effets en développement.
    envoye.current = true;
    trackView();
  }, []);
  return null;
}
