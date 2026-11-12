import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { themeScript } from "@/components/theme/theme-toggle";
import { MotionProvider } from "@/components/ui/motion-provider";
import { profile } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const description =
  "Lazarous Moyo, Full Stack Developer at The Salt Inc. (React, Node.js, Spring Boot, PostgreSQL, AWS, Kotlin). Projects, Google Developer badges, writing and experience.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.url }],
  keywords: [
    "Lazarous Moyo",
    "full-stack developer",
    "The Salt Inc.",
    "React",
    "Node.js",
    "Spring Boot",
    "PostgreSQL",
    "AWS",
    "Kotlin",
    "Android",
    "Next.js",
    "Mumbai",
    "Zambia",
    "Ashoka University",
  ],
  openGraph: { type: "profile", title: profile.name, description, url: profile.url, siteName: profile.name },
  twitter: { card: "summary_large_image", title: profile.name, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0D12" },
    { media: "(prefers-color-scheme: light)", color: "#F6F5F2" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full Stack Developer",
  worksFor: { "@type": "Organization", name: "The Salt Inc." },
  url: profile.url,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Ashoka University" },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.googleDev],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
