import { existsSync } from "node:fs";
import path from "node:path";
import { HeroVideo } from "@/components/HeroVideo";
import { VIDEO_URL } from "@/lib/config";

/** Vidéo de vente. Rien du tout tant que NEXT_PUBLIC_HERO_VIDEO_URL est vide. */
export function Vsl() {
  if (!VIDEO_URL) return null;
  const poster = existsSync(path.join(process.cwd(), "public", "video-poster.jpg")) ? "/video-poster.jpg" : undefined;
  return (
    <div className="carte mx-auto w-full max-w-[22rem] overflow-hidden p-2">
      <div className="overflow-hidden rounded-[16px]">
        <HeroVideo src={VIDEO_URL} poster={poster} />
      </div>
    </div>
  );
}

/** Avec vidéo : vidéo à gauche, offre à droite. Sans vidéo : l'offre seule, centrée. */
export const offreGrille = VIDEO_URL
  ? "mx-auto mt-8 grid max-w-5xl items-start gap-5 text-left lg:grid-cols-[minmax(0,22rem)_1fr] lg:justify-center lg:gap-6"
  : "mx-auto mt-8 grid max-w-xl text-left";
