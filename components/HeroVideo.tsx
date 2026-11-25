"use client";

import { useRef, useState } from "react";

/** Démarre au clic, dans la page. Les sous-titres sont incrustés dans la vidéo. */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  return (
    <div className="relative">
      <video
        ref={video}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        controls={started}
        aria-label="Vidéo de présentation de Thomas"
        onPlay={() => setStarted(true)}
        className="aspect-[9/16] w-full bg-black object-cover"
      />
      {!started && (
        <button
          type="button"
          aria-label="Lire la vidéo"
          onClick={() => {
            setStarted(true);
            video.current?.play().catch(() => {});
            video.current?.focus();
          }}
          className="absolute inset-0 grid place-items-center focus-visible:!-outline-offset-4"
        >
          <span className="grid size-24 place-items-center rounded-full bg-white/95">
            <svg viewBox="0 0 24 24" className="ml-1.5 size-11 fill-black" aria-hidden="true">
              <path d="M6 3.500v17l14-8.500z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
