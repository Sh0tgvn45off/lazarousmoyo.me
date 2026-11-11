import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { earlierWork, projects, type Project } from "@/lib/content/projects";
import type { RepoStats } from "@/lib/github";
import { profile } from "@/lib/site";
import { cn, formatMonth } from "@/lib/utils";
import { AudioMidiVisual, VentilationVisual } from "./project-visuals";
import { WindowFrame } from "./window-frame";

const tones: Record<Project["status"]["tone"], string> = {
  live: "border-accent/40 text-accent",
  progress: "border-warm/40 text-warm",
  research: "border-ink-3/40 text-ink-2",
};

/** The project shown whole inside a window: a browser for websites, an app window for illustrations. */
function Visual({ project }: { project: Project }) {
  const v = project.visual;
  if (v.kind === "screenshot") {
    const frame = (
      <WindowFrame address={v.url}>
        <Image src={v.src} alt={v.alt} width={v.width} height={v.height} sizes="(min-width: 1024px) 500px, 92vw" className="block h-auto w-full" />
      </WindowFrame>
    );
    return project.links.live ? (
      <a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} (live site)`} className="block rounded-xl">
        {frame}
      </a>
    ) : (
      frame
    );
  }
  return (
    <WindowFrame title={v.title}>
      <div className="aspect-[16/10]">{v.kind === "audio-midi" ? <AudioMidiVisual /> : <VentilationVisual />}</div>
    </WindowFrame>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
  );
}

function ProjectCard({ project, index, stats }: { project: Project; index: number; stats: RepoStats | null }) {
  const flip = index % 2 === 1;
  return (
    <RevealItem>
      <article className="panel group grid overflow-hidden lg:grid-cols-2">
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden border-b bg-raised/40 p-4 sm:p-8 lg:border-b-0",
            flip ? "lg:order-2 lg:border-l" : "lg:border-r",
          )}
        >
          {/* Dotted backdrop, like a design canvas */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: "radial-gradient(rgb(var(--line) / calc(var(--line-alpha) * 1.6)) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative w-full transition-transform duration-500 ease-apple group-hover:-translate-y-1">
            <Visual project={project} />
          </div>
        </div>
        <div className="flex flex-col p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="label">{project.kind}</span>
            <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em]", tones[project.status.tone])}>
              {project.status.label}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-[28px]">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-2">{project.summary}</p>
          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="font-mono text-accent">→</span>
                <span className="text-ink-2">{h}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md border bg-raised px-2 py-1 font-mono text-[11px] text-ink-2">
                {s}
              </li>
            ))}
          </ul>
          {/* Spacer keeps the footer at the bottom of tall cards, with a minimum gap. */}
          <div aria-hidden className="min-h-7 flex-1" />
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed pt-5">
            <p className="flex items-center gap-3 font-mono text-[11.5px] text-ink-3 tabular">
              {stats ? (
                <>
                  {stats.stars !== null && (
                    <span className="inline-flex items-center gap-1">
                      <Star aria-hidden className="size-3.5" />
                      {stats.stars}
                    </span>
                  )}
                  {stats.language && <span>{stats.language}</span>}
                  {stats.pushedAt && <span>updated {formatMonth(stats.pushedAt)}</span>}
                </>
              ) : (
                <span>{project.note ?? "Private repository"}</span>
              )}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {project.links.live && <ExtLink href={project.links.live}>Live</ExtLink>}
              {stats && <ExtLink href={stats.url}>Code</ExtLink>}
              {project.links.post && <ExtLink href={project.links.post}>Post</ExtLink>}
            </div>
          </div>
        </div>
      </article>
    </RevealItem>
  );
}

export function Projects({ stats, publicRepos }: { stats: (RepoStats | null)[]; publicRepos: number | null }) {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="01"
          label="Selected work"
          title="Things I’ve built, from AI products and mentorship platforms to ICU decision support."
          aside={`${projects.length} featured${publicRepos ? ` · ${publicRepos} public repos` : ""}`}
        />
        <RevealGroup className="space-y-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} stats={stats[i]} />
          ))}
        </RevealGroup>

        <div className="mt-14 grid gap-8 md:grid-cols-[200px_1fr]">
          <p className="label pt-1">Earlier work</p>
          <ul className="divide-y divide-dashed border-y border-dashed">
            {earlierWork.map((w) => (
              <li key={w.title}>
                <a
                  href={w.href}
                  {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="font-medium transition-colors group-hover:text-accent">{w.title}</span>
                    <span className="ml-3 hidden text-sm text-ink-3 sm:inline">{w.note}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-3 group-hover:text-accent">
                    {w.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex justify-end">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-accent"
          >
            <GitHubIcon className="size-4" /> Everything on GitHub
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
