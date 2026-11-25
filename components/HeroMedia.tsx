import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";

const exists = (f: string) => existsSync(path.join(process.cwd(), "public", f));

/** Vidéo, sinon photo de Thomas au travail, sinon placeholder bien visible. Choisi au build. */
export function HeroMedia() {
  const url = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;
  return (
    <div className="carte mx-auto w-full max-w-sm overflow-hidden">
      {url ? (
        <HeroVideo src={url} poster={exists("video-poster.jpg") ? "/video-poster.jpg" : undefined} />
      ) : exists("thomas-travail.jpg") ? (
        <Image
          src="/thomas-travail.jpg"
          alt="Thomas au travail, de face"
          width={800}
          height={1000}
          sizes="(min-width: 64rem) 24rem, 92vw"
          className="aspect-[4/5] w-full object-cover"
        />
      ) : (
        <div className="grid aspect-[4/5] place-items-center p-6 text-center">
          <span>
            <span className="placeholder">[Vidéo ou photo de toi au travail]</span>
          </span>
        </div>
      )}
    </div>
  );
}
