"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/ui/section-head";
import { experience } from "@/lib/content/experience";
import { cn } from "@/lib/utils";

const VISIBLE = 5;

function Role({ item }: { item: (typeof experience)[number] }) {
  return (
    <li className="grid gap-2 py-6 md:grid-cols-[190px_1fr] md:gap-8">
      <p className="font-mono text-[12.5px] text-ink-3 tabular">{item.dates}</p>
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
        <p className="mt-0.5 text-[15px] text-accent">{item.org}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{item.summary}</p>
        {item.tags && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li key={t} className="rounded-md border bg-raised px-2 py-1 font-mono text-[11px] text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function Experience() {
  const [all, setAll] = useState(false);
  const hidden = experience.length - VISIBLE;

  return (
    <section id="experience" className="border-t bg-surface/40 py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="04"
          label="Experience"
          title="Where I’ve worked."
          aside={`${experience.length} roles · since ${experience[experience.length - 1].dates.slice(-4)}`}
        />
        <ul className="divide-y divide-dashed border-y border-dashed">
          {experience.slice(0, VISIBLE).map((e) => (
            <Role key={e.role + e.org} item={e} />
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
              {experience.slice(VISIBLE).map((e) => (
                <Role key={e.role + e.org} item={e} />
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
            {all ? "Show fewer" : `Show ${hidden} earlier roles`}
            <ChevronDown aria-hidden className={cn("size-4 transition-transform", all && "rotate-180")} />
          </button>
        )}
      </div>
    </section>
  );
}
