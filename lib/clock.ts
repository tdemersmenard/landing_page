import { useSyncExternalStore } from "react";
import { OFFER_END } from "@/lib/config";

const END = new Date(OFFER_END).getTime();

// Une seule horloge partagée par le compte à rebours et tous les boutons.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
function subscribe(cb: () => void) {
  listeners.add(cb);
  timer ??= setInterval(() => listeners.forEach((l) => l()), 1000);
  return () => {
    listeners.delete(cb);
    if (!listeners.size) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Secondes restantes (0 = offre terminée), ou null pendant le rendu serveur. */
export function useRemaining(): number | null {
  return useSyncExternalStore<number | null>(
    subscribe,
    () => Math.max(0, Math.ceil((END - Date.now()) / 1000)),
    () => null,
  );
}
