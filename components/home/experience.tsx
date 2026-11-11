"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/ui/section-head";
import { engineering, otherRoles, type Role } from "@/lib/content/experience";
import { cn } from "@/lib/utils";

const COMPACT_VISIBLE = 4;

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-md border bg-raised px-2 py-1 font-mono text-[11px] text-ink-2">
          {t}
        </li>
      ))}
    </ul>
  );
}

function FullRole({ item }: { item: Role }) {
  return (
    <li className="grid gap-2 py-7 md:grid-cols-[190px_1fr] md:gap-8">
      <p className="font-mono text-[12.5px] text-ink-3 tabular">{item.dates}</p>
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
        <p className="mt-0.5 text-[15px] text-accent">{item.org}</p>
        {item.meta && <p className="mt-1 font-mono text-[11.5px] text-ink-3">{item.meta}</p>}
        {item.summary && <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{item.summary}</p>}
        {item.bullets && (
          <ul className="mt-3 max-w-3xl space-y-2">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed text-ink-2">
                <span aria-hidden className="font-mono text-accent">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {item.tags && <Chips items={item.tags} />}
      </div>
    </li>
  );
}

function CompactRole({ item }: { item: Role }) {
  return (
    <li className="grid gap-1 py-4 md:grid-cols-[190px_1fr] md:gap-8">
      <p className="font-mono text-[12px] text-ink-3 tabular">{item.dates}</p>
      <div>
        <p>
          <span className="font-medium">{item.role}</span>
          <span className="text-ink-3"> · </span>
          <span className="text-accent">{item.org}</span>
        </p>
        {(item.summary || item.meta) && (
          <p className="mt-1 text-[14px] text-ink-3">
            {item.summary}
            {item.summary && item.meta && " · "}
            {item.meta && <span className="font-mono text-[11.5px]">{item.meta}</span>}
          </p>
        )}
      </div>
    </li>
  );
}

export function Experience() {
  const [all, setAll] = useState(false);
  const hidden = otherRoles.length - COMPACT_VISIBLE;
  const total = engineering.length + otherRoles.length;

  return (
    <section id="experience" className="border-t bg-surface/40 py-24 md:py-32">
      <div className="container">
        <SectionHead index="04" label="Experience" title="Where I’ve worked." aside={`${total} roles · since 2018`} />

        <p className="label mb-2 text-accent">Software engineering</p>
        <ul className="divide-y divide-dashed border-y border-dashed">
          {engineering.map((e) => (
            <FullRole key={e.role + e.org + e.dates} item={e} />
          ))}
        </ul>

        <p className="label mb-2 mt-14 text-accent">Also: research, analytics, leadership &amp; more</p>
        <ul className="divide-y divide-dashed border-y border-dashed">
          {otherRoles.slice(0, COMPACT_VISIBLE).map((e) => (
            <CompactRole key={e.role + e.org + e.dates} item={e} />
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {all && (
            <motion.ul
              id="more-roles"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="divide-y divide-dashed overflow-hidden border-b border-dashed"
            >
              {otherRoles.slice(COMPACT_VISIBLE).map((e) => (
                <CompactRole key={e.role + e.org + e.dates} item={e} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            aria-expanded={all}
            aria-controls="more-roles"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-accent"
          >
            {all ? "Show fewer" : `Show ${hidden} more roles`}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform", all && "rotate-180")} />
          </button>
        )}
      </div>
    </section>
  );
}
