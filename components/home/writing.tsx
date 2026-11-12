import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { posts } from "@/lib/content/posts";
import { profile } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function Writing() {
  return (
    <section id="writing" className="py-24 md:py-32">
      <div className="container">
        <SectionHead index="03" label="Writing" title="Notes from LinkedIn." aside={`${posts.length} posts`} />
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <RevealItem key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="panel group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/40"
              >
                {/* The whole image, never cropped, over a soft blurred copy of itself. */}
                <div className="relative aspect-[16/9] overflow-hidden border-b bg-raised">
                  <Image src={p.image} alt="" aria-hidden fill sizes="(min-width: 768px) 540px, 100vw" className="scale-110 object-cover opacity-50 blur-2xl" />
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 540px, 100vw"
                    className="object-contain transition-transform duration-700 ease-apple group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="label">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance">{p.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-2">{p.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li key={t} className="font-mono text-[11px] text-ink-3">
                          #{t.replace(/\s+/g, "")}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-2 group-hover:text-accent">
                      Read on LinkedIn <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 flex justify-end">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-accent"
          >
            <LinkedInIcon className="size-4" /> More on LinkedIn <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
