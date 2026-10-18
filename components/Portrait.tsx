import Image from "next/image";
import { profile } from "@/content";

/**
 * Hero portrait: a tilted frame with a hard shadow, plus two stacked "stickers" across the
 * bottom-left corner: the name (the kit's section label) and the location (a pink tag).
 */
export function Portrait({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative m-0 rotate-[1.5deg] ${className}`}>
      <Image
        src={profile.photo}
        alt={profile.name}
        width={460}
        height={460}
        loading="eager"
        fetchPriority="high"
        className="block h-auto w-full border-[2.5px] border-border bg-surface shadow-tx-hover"
      />
      <figcaption className="absolute bottom-1.5 -left-[22px] flex flex-col items-start">
        <span className="tx-section-label m-0 [transform:rotate(-4deg)] whitespace-nowrap">
          {profile.name}
        </span>
        <span className="-mt-1 ml-[34px] rotate-[2.5deg] border-2 border-border bg-accent px-2.5 py-[3px] font-mono text-xs font-bold tracking-[0.06em] whitespace-nowrap text-accent-contrast uppercase">
          {profile.location}
        </span>
      </figcaption>
    </figure>
  );
}
