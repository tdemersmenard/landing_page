import { existsSync } from "node:fs";
import path from "node:path";
import { HeroVideo } from "@/components/HeroVideo";

/** Vidéo de vente : public/video.mp4 par défaut (NEXT_PUBLIC_HERO_VIDEO_URL pour la remplacer). */
export function Vsl() {
  const url = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/video.mp4";
  const poster = existsSync(path.join(process.cwd(), "public", "video-poster.jpg")) ? "/video-poster.jpg" : undefined;
  return (
    <div className="carte mx-auto w-full max-w-[22rem] overflow-hidden p-2">
      <div className="overflow-hidden rounded-[16px]">
        {url ? (
          <HeroVideo src={url} poster={poster} />
        ) : (
          <div className="grid aspect-[9/16] place-items-center bg-black p-6 text-center">
            <div>
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                <svg viewBox="0 0 24 24" className="ml-1 size-9 fill-white" aria-hidden="true">
                  <path d="M6 3.5v17l14-8.5z" />
                </svg>
              </span>
              <p className="mt-5">
                <span className="placeholder">[Ta vidéo ici]</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
