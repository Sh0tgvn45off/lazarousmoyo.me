"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { nav, profile } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-2xl border bg-surface/80 pl-3 pr-2 backdrop-blur-xl backdrop-saturate-150"
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-lg pr-2" aria-label={`${profile.name}, back to top`}>
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-[13px] font-semibold text-accent-ink">
            LM
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Lazarous<span className="text-accent">Moyo</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors",
                    isActive ? "bg-raised text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-raised hover:text-ink"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-lg text-ink transition-colors hover:bg-raised md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1120px] rounded-2xl border bg-surface/95 p-2 backdrop-blur-xl md:hidden"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-ink-2 hover:bg-raised hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
