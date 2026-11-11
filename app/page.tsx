import { Badges } from "@/components/home/badges";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Projects } from "@/components/home/projects";
import { Toolkit } from "@/components/home/toolkit";
import { Writing } from "@/components/home/writing";
import { projects } from "@/lib/content/projects";
import { getGitHubProfile, getRepoStats } from "@/lib/github";

/** Rebuild at most once a day so GitHub stars and "updated" dates stay fresh. */
export const revalidate = 86400;

export default async function HomePage() {
  const [stats, gh] = await Promise.all([
    Promise.all(projects.map((p) => (p.repo ? getRepoStats(p.repo) : Promise.resolve(null)))),
    getGitHubProfile(),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <Projects stats={stats} publicRepos={gh.publicRepos} />
      <Badges />
      <Writing />
      <Experience />
      <Toolkit />
      <Contact />
    </>
  );
}
