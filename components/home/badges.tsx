import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { badges, githubAchievements } from "@/lib/content/badges";
import { profile } from "@/lib/site";
import { formatDate, formatMonth } from "@/lib/utils";

const card = "panel flex flex-col items-center p-5 text-center transition-colors hover:border-accent/40";
const art = "size-24 object-contain md:size-28";

export function Badges() {
  const joined = badges[badges.length - 1].earned;
  return (
    <section id="badges" className="border-t bg-surface/40 py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="02"
          label="Badges"
          title="Badges earned on the Google Developer Program and GitHub."
          aside={`${badges.length + githubAchievements.length} earned`}
        />

        <BadgeGroup
          title="Google Developer Program"
          note={`${badges.length} badges · member since ${formatMonth(joined)}`}
          href={profile.links.googleDev}
          cta="View my developer profile"
        >
          {badges.map((b) => (
            <RevealItem key={b.name} className={card}>
              <Image src={b.image} alt="" width={112} height={112} className={art} />
              <p className="mt-4 text-[15px] font-medium leading-snug">{b.name}</p>
              <p className="label mt-2">Earned {formatDate(b.earned)}</p>
            </RevealItem>
          ))}
        </BadgeGroup>

        <BadgeGroup
          title="GitHub achievements"
          note={`${githubAchievements.length} achievements`}
          href={`${profile.links.github}?tab=achievements`}
          cta="View on GitHub"
          className="mt-16 md:mt-20"
        >
          {githubAchievements.map((a) => (
            <RevealItem key={a.name} className={card}>
              <Image src={a.image} alt="" width={112} height={112} className={art} />
              <p className="mt-4 flex items-center gap-2 text-[15px] font-medium leading-snug">
                {a.name}
                {a.tier && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent">
                    {a.tier}
                  </span>
                )}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-ink-3">{a.description}</p>
            </RevealItem>
          ))}
        </BadgeGroup>
      </div>
    </section>
  );
}

/** One source of badges: a small header row, the shared five-column grid, and a link to the profile. */
function BadgeGroup({
  title,
  note,
  href,
  cta,
  className,
  children,
}: {
  title: string;
  note: string;
  href: string;
  cta: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="label text-ink-2">{title}</h3>
        <p className="label">{note}</p>
      </div>
      <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{children}</RevealGroup>
      <div className="mt-8 flex justify-end">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-accent"
        >
          {cta} <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
