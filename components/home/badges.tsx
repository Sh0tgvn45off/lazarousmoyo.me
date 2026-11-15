import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { badges } from "@/lib/content/badges";
import { profile } from "@/lib/site";
import { formatDate, formatMonth } from "@/lib/utils";

export function Badges() {
  const joined = badges[badges.length - 1].earned;
  return (
    <section id="badges" className="border-t bg-surface/40 py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="02"
          label="Google Developer Program"
          title="Badges earned on the Google Developer Program."
          aside={`${badges.length} badges · member since ${formatMonth(joined)}`}
        />
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {badges.map((b) => (
            <RevealItem key={b.name} className="panel flex flex-col items-center p-5 text-center transition-colors hover:border-accent/40">
              <Image src={b.image} alt="" width={112} height={112} className="size-24 object-contain md:size-28" />
              <p className="mt-4 text-[15px] font-medium leading-snug">{b.name}</p>
              <p className="label mt-2">Earned {formatDate(b.earned)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 flex justify-end">
          <a
            href={profile.links.googleDev}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-accent"
          >
            View my developer profile <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
