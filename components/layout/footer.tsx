import { ThemeToggle } from "@/components/theme/theme-toggle";
import { profile } from "@/lib/site";

export function Footer() {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "GitHub · Sh0tgvn45off", href: profile.links.github },
    { label: "Google Developer", href: profile.links.googleDev },
  ];

  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline font-mono text-[13px]"
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle withLabel />
          </li>
        </ul>
      </div>
    </footer>
  );
}
