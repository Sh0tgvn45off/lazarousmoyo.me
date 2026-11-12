import { ArrowUpRight, Mail } from "lucide-react";
import { DevProfileIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/site";

export function Contact() {
  const links = [
    { label: "LinkedIn", note: "lazarous-moyo", href: profile.links.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", note: "Sh0tgvn45off", href: profile.links.github, Icon: GitHubIcon },
    { label: "Google Developer", note: "5 badges", href: profile.links.googleDev, Icon: DevProfileIcon },
  ];

  return (
    <section id="contact" className="border-t py-24 md:py-32">
      <div className="container">
        <Reveal className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="label">
              <span className="text-accent">06</span> / Contact
            </p>
            <h2 className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
              Let’s build something <span className="text-accent">useful.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
              Happy to talk about full-stack, backend or machine-learning work, a collaboration, or just a good problem.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-accent px-6 py-4 text-lg font-medium text-accent-ink transition-transform active:scale-[0.98]"
            >
              <Mail aria-hidden className="size-5" />
              {profile.email}
            </a>
          </div>
          <ul className="divide-y divide-dashed border-y border-dashed">
            {links.map(({ label, note, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-3">
                    <Icon className="size-5 text-ink-3 group-hover:text-accent" />
                    <span className="font-medium group-hover:text-accent">{label}</span>
                    <span className="font-mono text-xs text-ink-3">{note}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-4 text-ink-3 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
