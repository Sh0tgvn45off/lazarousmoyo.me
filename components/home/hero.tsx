"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DevProfileIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { now, profile } from "@/lib/site";

const ease = [0.25, 0.1, 0.25, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

function Line({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay }}>
      {children}
    </motion.div>
  );
}

const Prompt = ({ cmd }: { cmd: string }) => (
  <p>
    <span className="text-accent">$</span> <span className="text-ink">{cmd}</span>
  </p>
);

/** A terminal window: whoami, now, stack. Lines appear one after another. */
function Terminal() {
  return (
    <motion.div
      {...rise(0.35)}
      className="panel overflow-hidden font-mono text-[13px] leading-relaxed shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-xs text-ink-3">lazarous@portfolio: ~</span>
      </div>
      <div className="space-y-3 p-5 text-ink-2 sm:p-6">
        <Line delay={0.6}>
          <Prompt cmd="whoami" />
          <div className="mt-3 flex items-center gap-4">
            <Image
              src="/images/profile.jpg"
              alt={`Portrait of ${profile.name}`}
              width={72}
              height={72}
              priority
              className="size-16 rounded-xl border object-cover sm:size-[72px]"
            />
            <div>
              <p className="font-sans text-base font-semibold text-ink">{profile.name}</p>
              <p className="text-ink-3">Full-stack · Data · ML</p>
            </div>
          </div>
        </Line>
        <Line delay={0.95}>
          <Prompt cmd="now" />
          {now.roles.map((r) => (
            <div key={r.title} className="mt-2 grid grid-cols-[76px_1fr] gap-3">
              <span className="text-ink-3">{r.since}</span>
              <span>
                <span className="text-ink">{r.title}</span>
                <br />
                {r.org}
              </span>
            </div>
          ))}
          <div className="mt-2 grid grid-cols-[76px_1fr] gap-3">
            <span className="text-ink-3">{now.building.since}</span>
            <span>
              Building <span className="text-warm">{now.building.title}</span> ({now.building.note})
            </span>
          </div>
        </Line>
        <Line delay={1.3}>
          <Prompt cmd="stack" />
          <p className="mt-2">{now.stack.join(" · ")}</p>
        </Line>
        <Line delay={1.6}>
          <p>
            <span className="text-accent">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-ink" />
          </p>
        </Line>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_85%_10%,rgb(var(--accent)/0.12),transparent),radial-gradient(35%_40%_at_10%_80%,rgb(var(--warm)/0.08),transparent)]"
      />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <motion.p {...rise(0.05)} className="label flex flex-wrap gap-x-2 gap-y-1 text-accent">
            {profile.eyebrow.map((e, i) => (
              <span key={e} className="whitespace-nowrap">
                {e}
                {i < profile.eyebrow.length - 1 && <span className="ml-2 text-ink-3">·</span>}
              </span>
            ))}
          </motion.p>
          <motion.h1 {...rise(0.12)} className="mt-7 text-name font-semibold">
            {profile.first}
            <br />
            <span className="text-accent">{profile.last}</span>
          </motion.h1>
          <motion.p {...rise(0.22)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl text-pretty">
            {profile.intro}
          </motion.p>
          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#contact"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-medium text-accent-ink transition-transform active:scale-[0.97]"
            >
              Get in touch
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            {[
              { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon },
              { label: "GitHub", href: profile.links.github, Icon: GitHubIcon },
              { label: "Google Dev", href: profile.links.googleDev, Icon: DevProfileIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-accent"
              >
                <Icon className="size-4" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
