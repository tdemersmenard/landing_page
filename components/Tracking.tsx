"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";
import { PIXEL_ID, track } from "@/lib/pixel";

/** Sur toutes les pages : UTM gardés en session, puis PageView. */
export function Tracking() {
  const path = usePathname();
  const last = useRef("");
  useEffect(() => {
    if (last.current === path) return; // StrictMode rejoue les effets en développement.
    last.current = path;
    captureAttribution();
    track("PageView");
  }, [path]);
  if (!PIXEL_ID) return null;
  return <Script id="meta-pixel" src="https://connect.facebook.net/fr_CA/fbevents.js" strategy="afterInteractive" />;
}
