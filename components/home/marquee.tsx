import { marquee } from "@/lib/content/experience";

/** A slow, endless strip of the tools I work with. Pauses on hover. */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="mask-fade-x group overflow-hidden border-y border-dashed py-4" aria-label="Tools I work with">
      <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <li key={`${item}-${i}`} aria-hidden={i >= marquee.length} className="label flex items-center gap-10 whitespace-nowrap text-ink-2">
            {item}
            <span className="text-accent">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
