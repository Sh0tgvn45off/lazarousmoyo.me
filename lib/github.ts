/**
 * Live GitHub data, fetched on the server and cached for a day.
 * Set GITHUB_TOKEN on Vercel to avoid the 60-requests-per-hour anonymous limit (optional).
 */
const OWNER = "Sh0tgvn45off";
const DAY = 60 * 60 * 24;

export interface RepoStats {
  url: string;
  stars: number | null;
  language: string | null;
  pushedAt: string | null;
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: DAY },
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function getRepoStats(repo: string): Promise<RepoStats> {
  const data = await gh<{ html_url: string; stargazers_count: number; language: string | null; pushed_at: string }>(
    `/repos/${OWNER}/${repo}`,
  );
  return {
    url: data?.html_url ?? `https://github.com/${OWNER}/${repo}`,
    stars: data?.stargazers_count ?? null,
    language: data?.language ?? null,
    pushedAt: data?.pushed_at ?? null,
  };
}

export async function getGitHubProfile() {
  const data = await gh<{ public_repos: number; followers: number }>(`/users/${OWNER}`);
  return { publicRepos: data?.public_repos ?? null, followers: data?.followers ?? null, url: `https://github.com/${OWNER}` };
}
