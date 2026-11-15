import { GraduationCap } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { education, skills } from "@/lib/content/experience";

export function Toolkit() {
  return (
    <section id="toolkit" className="py-24 md:py-32">
      <div className="container">
        <SectionHead index="05" label="Toolkit" title="Skills and education." />
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <RevealItem key={s.group} className="panel p-6">
                <p className="label text-accent">{s.group}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-md border bg-raised px-2.5 py-1 text-[13.5px] text-ink-2">
                      {i}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="panel h-fit p-6">
            <p className="label flex items-center gap-2 text-accent">
              <GraduationCap aria-hidden className="size-4" /> Education
            </p>
            <ul className="mt-2 divide-y divide-dashed">
              {education.map((e) => (
                <li key={e.title} className="py-4">
                  <p className="font-semibold">{e.title}</p>
                  <p className="mt-1 text-[15px] text-ink-2">{e.place}</p>
                  <p className="label mt-2">{e.dates}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
