"use client";

import { useRef, useState } from "react";

/**
 * Part toute seule, sans le son (les navigateurs bloquent l'autoplay avec son).
 * Au clic : repart du début avec le son. Les sous-titres sont incrustés dans la vidéo.
 */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [son, setSon] = useState(false);

  function ecouter() {
    const v = video.current;
    if (!v) return;
    setSon(true);
    v.currentTime = 0;
    v.muted = false;
    v.loop = false;
    v.play().catch(() => {});
    v.focus();
  }

  return (
    <div className="relative">
      <video
        ref={video}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={son}
        aria-label="Vidéo de présentation de Thomas"
        className="aspect-[9/16] w-full bg-black object-cover"
      />
      {!son && (
        <button
          type="button"
          onClick={ecouter}
          aria-label="Activer le son et regarder la vidéo du début"
          className="absolute inset-0 grid place-items-center focus-visible:!-outline-offset-4"
        >
          <span className="grid w-[min(15rem,70%)] justify-items-center gap-2 rounded-[14px] bg-[#2b7549] px-4 py-4 text-center font-bold text-white shadow-[0_0_28px_rgb(66_178_112/0.55)] ring-1 ring-white/25">
            <span className="text-[0.95rem] leading-tight">La vidéo a commencé</span>
            <svg viewBox="0 0 24 24" className="size-12 animate-pulse" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
              <path d="m23 9-6 6M17 9l6 6" />
            </svg>
            <span className="text-[0.95rem] leading-tight">Clique pour écouter</span>
          </span>
        </button>
      )}
    </div>
  );
}
